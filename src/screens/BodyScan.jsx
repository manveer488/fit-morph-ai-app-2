import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/MobileContainer.jsx';
import { analyzeBody, JOINTS } from '../services/ai';
import { generateTransformationPlan } from '../services/geminiService';
import { useUser } from '../contexts/UserContext.jsx';
import { resizeImage } from '../utils/imageUtils';

export default function BodyScan() {
  const navigate = useNavigate();
  const { user, completeBodyScan, saveScanResult, setAiPlan } = useUser();
  const [activeFile, setActiveFile] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [scanStep, setScanStep] = useState(0);
  const [aiAnalysisStep, setAiAnalysisStep] = useState("");
  const [metrics, setMetrics] = useState(window.fitmorphData.bodyScan?.metrics || window.fitmorphData.bodyScan || {
    bodyFat: "18.4",
    muscleMass: "64.2",
    posture: "Mild anterior pelvic tilt detected. Recommended core stability exercises.",
    postureScore: "85",
    waistHipRatio: "0.88",
    torsoProportion: "1.05",
    shoulderRatio: "1.25",
    symmetryScore: "92",
    shoulderWidth: "0.45",
    hipWidth: "0.38"
  });
  const [imagePreview, setImagePreview] = useState(null);
  const [generating, setGenerating] = useState(false);
  const fileInputRef = useRef(null);

  const scanSteps = [
    "Initializing neural vision...",
    "Detecting 33 body landmarks...",
    "Analyzing posture alignment...",
    "Calculating muscle-fat ratio...",
    "Finalizing biometric synthesis..."
  ];

  const handleRetake = () => {
    fileInputRef.current?.click();
  };

  const fileToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setActiveFile(file);
    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    
    // Start Processing
    setScanning(true);
    setScanStep(0);

    const stepInterval = setInterval(() => {
      setScanStep(prev => (prev < scanSteps.length - 1 ? prev + 1 : prev));
    }, 600);

    try {
      const img = new Image();
      img.src = previewUrl;
      await img.decode();
      
      const result = await analyzeBody(img);
      clearInterval(stepInterval);
      
      if (result.success) {
        console.log("MediaPipe Scan successful, now triggering Real AI Vision...");
        setMetrics(result.metrics);
        window.fitmorphData.bodyScan = result; 
        setScanning(false);
        
        // Auto-trigger Real AI Generation for accurate metrics
        await runRealAIAnalysis(result, file);
      } else {
        alert(result.error);
        setScanning(false);
      }
    } catch (err) {
      console.error("Scan failed detailed error:", err);
      // More descriptive error for Vercel/Production debugging
      const errorMsg = err.message || JSON.stringify(err);
      alert(`Scan processing error: ${errorMsg}. Please ensure you have a stable connection and are well-lit.`);
      setScanning(false);
      clearInterval(stepInterval);
    }
  };

  const runRealAIAnalysis = async (scanResult, file) => {
    setGenerating(true);
    try {
      setAiAnalysisStep("Compressing biometrics...");
      // Reduced resolution to 800px for faster mobile upload and processing
      const resizedBase64 = await resizeImage(file, 800);

      setAiAnalysisStep("Uploading to secure AI...");
      console.log("Starting Real AI Vision analysis with compressed image...");
      
      setAiAnalysisStep("Analyzing Physique...");
      const plan = await generateTransformationPlan(scanResult.metrics || scanResult, user.profile, resizedBase64);
      console.log("Real AI analysis complete:", plan);
      
      setAiAnalysisStep("Finalizing results...");
      
      const finalScanResult = {
        ...(scanResult.metrics || scanResult),
        ...(plan.aiAnalysis ? {
          bodyFat: plan.aiAnalysis.predictedBodyFat || (scanResult.metrics?.bodyFat || scanResult.bodyFat),
          muscleMass: plan.aiAnalysis.predictedMuscleMass || (scanResult.metrics?.muscleMass || scanResult.muscleMass),
          physiqueAssessment: plan.aiAnalysis.physiqueAssessment
        } : {})
      };

      // Update local state and global context with CORRECT data (Atomic Update)
      setMetrics(finalScanResult);
      saveScanResult(finalScanResult, plan); 
      console.log("Real AI metrics and Plan synchronized atomically.");
    } catch (err) {
      console.error("Real AI analysis failed:", err);
      // More descriptive error for Vercel/Production debugging
      const errorMsg = err.message || "Unknown error";
      alert(`AI Transformation Plan failed: ${errorMsg}. Using preliminary biometric estimation for now.`);
    } finally {
      setGenerating(false);
    }
  };

  const handleGenerate = async () => {
    if (!imagePreview) {
      alert("Please upload your full body image for scanning.");
      return;
    }

    // Since we now auto-run Real AI during upload, handleGenerate just ensures we have a plan
    // and navigates to the dashboard.
    navigate('/dashboard'); 
  };

  return (
    <MobileContainer>
      <div className="flex-1 flex flex-col bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 overflow-hidden relative">
        <input 
          type="file" 
          ref={fileInputRef} 
          onChange={handleImageUpload} 
          accept="image/*" 
          className="hidden" 
        />

        {/* Header */}
        <header className="sticky top-0 z-50 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md px-6 py-4 flex items-center justify-between border-b border-slate-200 dark:border-primary/10">
          <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-primary/20 text-slate-900 dark:text-primary transition-all active:scale-95">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <h1 className="text-lg font-bold tracking-tight font-urbanist">AI Body Analysis</h1>
          <button className="w-10 h-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-primary/20 text-slate-900 dark:text-primary transition-all active:scale-95">
            <span className="material-symbols-outlined">info</span>
          </button>
        </header>

        <main className="flex-1 overflow-y-auto px-6 pb-40 scroll-smooth">
          {/* Hero Section: Scan Display */}
          <section className="mt-6 text-center">
            <h2 className="text-3xl font-extrabold tracking-tight mb-2 font-urbanist">3D Body Scan</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 font-medium italic">Full-body heatmap based on AI visual synthesis</p>
            
            <div className="relative w-full aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-b from-primary/10 to-transparent border border-primary/20 flex items-center justify-center group shadow-2xl">
              {/* Image Preview or Placeholder */}
              {imagePreview ? (
                <img src={imagePreview} className="absolute inset-0 w-full h-full object-cover" alt="Body preview" />
              ) : (
                <div 
                  className="absolute inset-0 opacity-40 bg-center bg-no-repeat bg-contain" 
                  style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBniWLhdwIz7nru9svkZEOkkrYQxGLUdsS8-ACEZnc-YNL7_4ZC1F1VbbqdBRRJiQH-CTYI-NlWxhIlxysclTipiBAnB1NfV-oMUuyJS67nFkE_WdKX7Tm4D1dGB1UOThRuYclCqnxCCNJuSTbO3eIExoVKRDfdhc7ZoanxTyVP20V-MEsWZDIyMulTnqk_-yzEbNTAsRNmI7_LU7fwo3FgYLZqa496vugksOk5KavyHM_HACxmNFT0NAHsT0UM9uoW02_akZm9KOO8')" }}
                />
              )}

              {/* Scan Overlay Effects */}
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark/80 via-transparent to-transparent"></div>
              
              {/* Dynamic Heatmap Indicators */}
              {!scanning && (
                <>
                  <div className="absolute top-1/4 left-1/3 w-4 h-4 rounded-full bg-accent-cyan animate-pulse shadow-[0_0_20px_rgba(0,242,255,0.6)]"></div>
                  <div className="absolute top-1/2 right-1/4 w-3 h-3 rounded-full bg-accent-pink animate-pulse shadow-[0_0_20px_rgba(255,0,229,0.6)]"></div>
                  <div className="absolute bottom-1/3 left-1/2 w-5 h-5 rounded-full bg-primary animate-pulse shadow-[0_0_20px_rgba(110,61,255,0.6)]"></div>
                </>
              )}

              {/* Scanning Beam Animation */}
              {scanning && (
                <div className="absolute inset-x-0 h-1 bg-accent-cyan shadow-[0_0_20px_rgba(0,242,255,1)] z-20 animate-scan-beam"></div>
              )}

              {/* Processing Overlay */}
              {scanning && (
                <div className="absolute inset-0 bg-background-dark/60 backdrop-blur-sm z-30 flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-16 h-16 border-4 border-primary border-t-accent-cyan rounded-full animate-spin mb-6"></div>
                  <p className="text-lg font-bold text-white mb-2 font-urbanist">{scanSteps[scanStep]}</p>
                  <p className="text-white/60 text-sm italic font-medium">Do not close the application</p>
                </div>
              )}

              {/* Retake Button */}
              <button 
                id="retake-body-photo"
                onClick={handleRetake}
                className="relative z-10 flex flex-col items-center gap-3 bg-white/10 dark:bg-primary/30 backdrop-blur-xl px-8 py-6 rounded-2xl border border-white/20 hover:scale-105 active:scale-95 transition-all group"
              >
                <span className="material-symbols-outlined text-4xl text-white group-hover:rotate-12 transition-transform">photo_camera</span>
                <span className="text-white font-bold tracking-wide">Retake Body Photo</span>
              </button>
            </div>
          </section>

          {/* Metrics Grid */}
          <section className="mt-8 grid grid-cols-2 gap-4">
            <div className="bg-primary/5 backdrop-blur-md border border-primary/20 p-4 rounded-2xl shadow-xl transition-all hover:border-primary/40 group">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-primary text-xl">monitor_weight</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">Body Fat</span>
              </div>
              <div className="flex items-baseline gap-1">
                {generating ? (
                  <div className="flex flex-col items-center gap-1 animate-pulse">
                    <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Analyzing...</span>
                  </div>
                ) : (
                  <>
                    <span className="text-2xl font-black font-urbanist">{metrics.bodyFat?.toString().replace(/%/g, '')}</span>
                    <span className="text-sm font-bold text-slate-400 opacity-60">%</span>
                  </>
                )}
              </div>
              <div className="mt-3 w-full bg-slate-200 dark:bg-white/10 h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-primary h-full transition-all duration-1000 shadow-[0_0_8px_rgba(110,61,255,0.6)]" 
                  style={{ width: `${Math.min(100, parseFloat(metrics.bodyFat) * 3)}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-primary/5 backdrop-blur-md border border-primary/20 p-4 rounded-2xl shadow-xl transition-all hover:border-primary/40 group">
              <div className="flex items-center gap-2 mb-2">
                <span className="material-symbols-outlined text-accent-cyan text-xl">fitness_center</span>
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">Muscle Mass</span>
              </div>
              <div className="flex items-baseline gap-1">
                {generating ? (
                  <div className="flex flex-col items-center gap-1 animate-pulse">
                    <div className="w-8 h-8 border-2 border-accent-cyan border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-[10px] font-black text-accent-cyan uppercase tracking-widest">Analyzing...</span>
                  </div>
                ) : (
                  <>
                    <span className="text-2xl font-black font-urbanist">{metrics.muscleMass?.toString().replace(/kg/g, '')}</span>
                    <span className="text-sm font-bold text-slate-400 opacity-60">kg</span>
                  </>
                )}
              </div>
              <div className="mt-3 w-full bg-slate-200 dark:bg-white/10 h-1 rounded-full overflow-hidden">
                <div 
                  className="bg-accent-cyan h-full transition-all duration-1000 shadow-[0_0_8px_rgba(0,242,255,0.6)]" 
                  style={{ width: `${Math.min(100, parseFloat(metrics.muscleMass))}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-primary/5 backdrop-blur-md border border-primary/20 p-4 rounded-2xl col-span-2 shadow-xl hover:border-accent-pink/40 transition-all">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-accent-pink text-xl">accessibility_new</span>
                  <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.15em]">Posture Analysis</span>
                </div>
                <span className="bg-accent-pink/20 text-accent-pink text-[10px] font-black px-2 py-0.5 rounded-full border border-accent-pink/20 neon-glow">
                  {parseFloat(metrics.postureScore) < 80 ? "ACTION NEEDED" : "OPTIMAL"}
                </span>
              </div>
              <p className="text-sm text-white/80 leading-relaxed font-medium">
                {generating ? "AI analyzing posture and symmetry..." : metrics.posture}
              </p>
            </div>
          </section>

          {/* Insights */}
          <section className="mt-8 mb-4">
            <h3 className="text-xl font-bold mb-4 tracking-tight font-urbanist">FitMorph Insights</h3>
            <div className="flex gap-4 overflow-x-auto pb-4 -mx-2 px-2 scrollbar-hide">
              <div className="min-w-[280px] bg-slate-100 dark:bg-white/5 p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg">
                <p className="text-sm font-medium leading-relaxed italic text-slate-600 dark:text-slate-400">
                  {generating ? "Computing metabolic baseline..." : `"Your metabolic rate has increased by 4% since your last scan. Keep up the HIIT sessions."`}
                </p>
              </div>
              <div className="min-w-[280px] bg-slate-100 dark:bg-white/5 p-5 rounded-2xl border border-slate-200 dark:border-white/10 shadow-lg">
                <p className="text-sm font-medium leading-relaxed italic text-slate-600 dark:text-slate-400">
                  {generating ? "Analyzing upper body symmetry..." : `"Upper body symmetry has improved (${metrics.symmetryScore}% score). Right deltoid activation is now balanced."`}
                </p>
              </div>
            </div>
          </section>
        </main>

        {/* Floating Action Button */}
        <div className="fixed bottom-24 left-0 right-0 px-6 flex justify-center pointer-events-none z-40">
          <button 
            onClick={handleGenerate}
            disabled={scanning || generating}
            className={`pointer-events-auto flex items-center gap-3 bg-primary hover:bg-primary/90 text-white px-8 py-5 rounded-full shadow-2xl shadow-primary/40 transform active:scale-95 transition-all w-full max-w-sm justify-center ${ (scanning || generating) ? 'opacity-50 cursor-not-allowed' : '' }`}
          >
            <span className={`material-symbols-outlined fill-1 ${generating ? 'animate-spin' : ''}`}>
              {generating ? 'refresh' : 'auto_awesome'}
            </span>
            <span className="font-bold tracking-tight uppercase text-sm font-urbanist">
              {generating ? (aiAnalysisStep || 'AI Vision Analyzing...') : (scanning ? 'Neural Scanning...' : 'Generate Transformation Plan')}
            </span>
          </button>
        </div>

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-0 right-0 bg-background-light dark:bg-[#1e1b28] border-t border-slate-200 dark:border-[#2c273a] px-4 pb-8 pt-2 z-50">
          <div className="flex gap-2">
            <button key="scan" className="flex flex-1 flex-col items-center justify-center gap-1 text-primary">
              <span className="material-symbols-outlined text-2xl fill-1">scan</span>
              <p className="text-[10px] font-bold uppercase tracking-widest leading-none">Scan</p>
            </button>
            <button onClick={() => navigate('/diet')} key="plan" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 dark:text-[#a29abc]">
              <span className="material-symbols-outlined text-2xl">calendar_today</span>
              <p className="text-[10px] font-bold uppercase tracking-widest leading-none">Plan</p>
            </button>
            <button onClick={() => navigate('/progress')} key="progress" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 dark:text-[#a29abc]">
              <span className="material-symbols-outlined text-2xl">leaderboard</span>
              <p className="text-[10px] font-bold uppercase tracking-widest leading-none">Stats</p>
            </button>
            <button onClick={() => navigate('/settings')} key="profile" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 dark:text-[#a29abc]">
              <span className="material-symbols-outlined text-2xl">person</span>
              <p className="text-[10px] font-bold uppercase tracking-widest leading-none">Profile</p>
            </button>
          </div>
        </nav>
      </div>
    </MobileContainer>
  );
}
