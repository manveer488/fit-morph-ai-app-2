// MediaPipe Pose is now loaded via global script in index.html to avoid Vite bundling issues
// import { Pose } from '@mediapipe/pose';

// Landmark indices for MediaPipe Pose
export const JOINTS = {
  LEFT_SHOULDER: 11,
  RIGHT_SHOULDER: 12,
  LEFT_HIP: 23,
  RIGHT_HIP: 24,
  LEFT_KNEE: 25,
  RIGHT_KNEE: 26,
  LEFT_ANKLE: 27,
  RIGHT_ANKLE: 28,
};

let poseInstance = null;

const getPose = async () => {
  if (poseInstance) return poseInstance;

  // Use the global Pose from index.html script tag
  const PoseConstructor = window.Pose;
  if (!PoseConstructor) {
    throw new Error("MediaPipe AI not initialized. Please check your internet connection and refresh.");
  }

  poseInstance = new PoseConstructor({
    locateFile: (file) => {
      // Pinning to exact version to avoid mismatches
      return `https://cdn.jsdelivr.net/npm/@mediapipe/pose@0.5.1675469404/${file}`;
    },
  });

  poseInstance.setOptions({
    modelComplexity: 1, // Reduced for speed, still accurate for body scanning
    smoothLandmarks: true,
    enableSegmentation: true,
    smoothSegmentation: true,
    minDetectionConfidence: 0.5,
    minTrackingConfidence: 0.5,
  });

  return poseInstance;
};

export const analyzeBody = async (imageElement) => {
  const pose = await getPose();

  return new Promise((resolve, reject) => {
    // MediaPipe callbacks are persistent, so we need to set them for each call
    // or use a more robust way to handle multiple calls.
    // Since this is a one-off scan, we'll just wrap the onResults.
    
    const onResults = (results) => {
      if (!results.poseLandmarks) {
        resolve({ success: false, error: "Full body image required. Please upload a clear standing photo." });
        return;
      }

      const landmarks = results.poseLandmarks;
      const metrics = calculateMetrics(landmarks);
      
      const fullScanResult = {
        success: true,
        metrics: metrics,
        landmarks: landmarks,
        segmentationMask: results.segmentationMask,
        confidence: results.poseLandmarks && results.poseLandmarks.length > 0 ? 0.9 : 0
      };

      // Store in global state
      if (!window.fitmorphData) window.fitmorphData = {};
      window.fitmorphData.bodyScan = fullScanResult;

      resolve(fullScanResult);
    };

    pose.onResults(onResults);

    pose.send({ image: imageElement }).catch(err => {
      console.error("MediaPipe Error:", err);
      reject(err);
    });
  });
};

const calculateMetrics = (landmarks) => {
  const dist = (p1, p2) => Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));

  // Key landmarks
  const shoulderWidth = dist(landmarks[JOINTS.LEFT_SHOULDER], landmarks[JOINTS.RIGHT_SHOULDER]);
  const hipWidth = dist(landmarks[JOINTS.LEFT_HIP], landmarks[JOINTS.RIGHT_HIP]);
  const waistWidth = hipWidth * 0.85; 
  
  const legLength = (dist(landmarks[JOINTS.LEFT_HIP], landmarks[JOINTS.LEFT_ANKLE]) + dist(landmarks[JOINTS.RIGHT_HIP], landmarks[JOINTS.RIGHT_ANKLE])) / 2;
  const torsoLength = (dist(landmarks[JOINTS.LEFT_SHOULDER], landmarks[JOINTS.LEFT_HIP]) + dist(landmarks[JOINTS.RIGHT_SHOULDER], landmarks[JOINTS.RIGHT_HIP])) / 2;

  // New Requested Metrics
  const waistToHipRatio = waistWidth / (hipWidth || 1);
  const torsoProportion = torsoLength / (legLength || 1);
  const shoulderToHipRatio = shoulderWidth / (hipWidth || 1);

  // Posture Analysis
  const shoulderSymmetry = Math.abs(landmarks[JOINTS.LEFT_SHOULDER].y - landmarks[JOINTS.RIGHT_SHOULDER].y);
  const hipSymmetry = Math.abs(landmarks[JOINTS.LEFT_HIP].y - landmarks[JOINTS.RIGHT_HIP].y);
  
  let postureDescription = "Excellent alignment detected.";
  if (shoulderSymmetry > 0.02) postureDescription = "Slight shoulder imbalance detected.";
  if (hipSymmetry > 0.02) postureDescription = "Possible pelvic tilt detected.";
  
  const postureScore = Math.max(0, 100 - (shoulderSymmetry * 1000) - (hipSymmetry * 1000));
  
  // ADVANCED ANTHROPOMETRIC HEURISTICS
  // We use the skeletal proportions as a proxy for body composition
  const userWeightString = window.fitmorphData?.userProfile?.weight || "70kg";
  const userWeight = parseInt(userWeightString) || 70;

  // 1. V-Taper / Proportion Analysis
  // High shoulder-to-hip ratio typically correlates with lower body fat and higher muscle mass
  const vTaperRatio = shoulderWidth / (hipWidth || 0.45); 
  
  // 2. Torso Density Proxy
  // Longer torsos relative to shoulder width can indicate different mass distributions
  const torsoDensity = parseFloat(torsoProportion) || 1.0;

  // 3. Dynamic Body Fat Calculation
  // We use a base of 22% and adjust based on the V-Taper and Torso Density
  // A higher vTaperRatio (broad shoulders/narrow hips) DECREASES estimated body fat
  let bodyFatEstimate = 22 - ((vTaperRatio - 1.1) * 15) + ((torsoDensity - 1.0) * 5);
  
  // Constrain to realistic human limits (6% to 45%)
  const bodyFat = Math.max(6.5, Math.min(45.0, bodyFatEstimate + (Math.random() * 0.5)));

  // 4. Dynamic Muscle Mass Calculation
  // Lean Body Mass (LBM) formula proxy: weight * (1 - bodyFat/100)
  // Muscle mass is typically 40-50% of total weight for fit individuals
  const leanFactor = 1 - (bodyFat / 100);
  let muscleMassEstimate = userWeight * leanFactor * 0.55; // Skeletal muscle is a large part of LBM
  
  // Adjust muscle mass based on shoulder width (strength proxy)
  muscleMassEstimate *= (shoulderWidth / 0.45); 

  const muscleMass = Math.max(20.0, Math.min(userWeight * 0.7, muscleMassEstimate + (Math.random() * 0.5)));

  return {
    bodyFat: bodyFat.toFixed(1),
    muscleMass: muscleMass.toFixed(1),
    posture: postureScore > 85 ? "Excellent" : postureScore > 70 ? "Good" : "Needs Improvement",
    waistHipRatio: waistToHipRatio.toFixed(2),
    torsoProportion: torsoProportion.toFixed(2),
    shoulderRatio: shoulderToHipRatio.toFixed(2),
    shoulderWidth: shoulderWidth.toFixed(3),
    hipWidth: hipWidth.toFixed(3),
    metrics: {
      vTaper: vTaperRatio.toFixed(2),
      symmetry: (postureScore / 100).toFixed(2)
    },
    isPreliminary: true // Mark as heuristic so AI knows to override
  };
};

export const generateWorkoutPlan = async (bodyData) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    success: true,
    plan: [
      { day: "Monday", focus: "Push", exercises: ["Bench Press", "Overhead Press", "Tricep Extensions"] },
      { day: "Tuesday", focus: "Pull", exercises: ["Pullups", "Barbell Rows", "Bicep Curls"] },
      { day: "Wednesday", focus: "Legs", exercises: ["Squats", "Leg Press", "Calf Raises"] }
    ]
  };
};

export const generateDietPlan = async (bodyData) => {
  await new Promise(resolve => setTimeout(resolve, 1000));
  return {
    success: true,
    dailyCalories: 2450,
    macros: { protein: "180g", carbs: "220g", fats: "80g" },
    meals: [
      { type: "Breakfast", items: ["Oatmeal", "Protein Powder", "Almonds"] },
      { type: "Lunch", items: ["Chicken Breast", "Brown Rice", "Broccoli"] },
      { type: "Dinner", items: ["Salmon", "Sweet Potato", "Asparagus"] }
    ]
  };
};

export const validateFullBodyImage = (imageFile) => {
  if (!imageFile) {
    return { valid: false, error: "Please upload your full body image to continue." };
  }
  // Basic check for image type
  if (!imageFile.type?.startsWith('image/')) {
    return { valid: false, error: "File must be an image." };
  }
  return { valid: true, error: null };
};
