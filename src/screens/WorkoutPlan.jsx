import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/MobileContainer.jsx';
import { useUser } from '../contexts/UserContext.jsx';

export default function WorkoutPlan() {
  const navigate = useNavigate();
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  
  const [activeTab, setActiveTab] = useState("AI Plan");
  const [selectedExercise, setSelectedExercise] = useState(null);
  
  // Robust normalization of workout data based on active tab
  const getPlanData = (tab) => {
    let source;
    if (tab === "Muscle Focus") source = user.aiPlan?.muscleFocusPlan || window.fitmorphData?.muscleFocusPlan;
    else if (tab === "Recovery") source = user.aiPlan?.recoveryPlan || window.fitmorphData?.recoveryPlan;
    else source = user.aiPlan?.workoutPlan || user.aiPlan || window.fitmorphData?.workoutPlan || window.fitmorphData?.aiResponse?.workoutPlan;

    let normalized = [];
    if (source && typeof source === 'object') {
      if (Array.isArray(source)) normalized = source;
      else if (source.days && Array.isArray(source.days)) normalized = source.days;
      else normalized = Object.entries(source)
             .filter(([k]) => k.toLowerCase().includes('day'))
             .map(([k, v]) => ({ day: k, ...v }));
    }
    return normalized.length > 0 ? normalized : null;
  };

  const initialWorkout = [
    {
      day: "Monday",
      focus: "Hypertrophy Push",
      exercises: [
        { name: "Diamond Pushups", sets: "3", reps: "12", imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80" },
        { name: "Dumbbell Renegade Rows", sets: "3", reps: "10", imageUrl: "https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?w=400&q=80" },
        { name: "Burpee Broad Jumps", sets: "3", reps: "45 Sec", imageUrl: "https://images.unsplash.com/photo-1599058917233-3583503c989e?w=400&q=80" }
      ]
    }
  ];

  const currentPlan = getPlanData(activeTab);
  const [workoutData, setWorkoutData] = useState(currentPlan || initialWorkout);
  const [selectedDay, setSelectedDay] = useState(0);

  // Sync workoutData when activeTab or user.aiPlan changes
  useEffect(() => {
    const data = getPlanData(activeTab);
    if (data) {
      setWorkoutData(data);
      setSelectedDay(0);
    }
  }, [activeTab, user.aiPlan]);

  const isPlanAvailable = Array.isArray(workoutData) && workoutData.length > 0 && workoutData[0]?.exercises?.length > 0;

  if (!isPlanAvailable && !loading) {
    return (
      <MobileContainer>
        <div className="bg-background-light dark:bg-background-dark min-h-screen flex flex-col items-center justify-center p-10 text-center">
          <div className="size-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 animate-pulse">
            <span className="material-symbols-outlined text-4xl">Auto_Awesome</span>
          </div>
          <h2 className="text-2xl font-bold font-urbanist mb-2">Routine Pending</h2>
          <p className="text-slate-500 text-sm mb-8">Your personalized AI training routine is being synchronized. Please ensure you've completed a body scan.</p>
          <button onClick={() => navigate('/scan')} className="px-8 py-4 bg-primary text-white rounded-2xl font-bold uppercase tracking-widest text-xs shadow-xl shadow-primary/20 active:scale-95 transition-all">
            Go to Scanner
          </button>
        </div>
      </MobileContainer>
    );
  }

  const getImage = (term, name) => {
    const search = term || name || "gym workout";
    const encoded = encodeURIComponent(search);
    // Primary: Unsplash - targeting gym/fitness explicitly
    return `https://source.unsplash.com/featured/800x600/?${encoded},fitness,gym`;
  };

  const currentDayPlan = isPlanAvailable ? (workoutData[selectedDay] || workoutData[0]) : { focus: "Training", exercises: [] };

  return (
    <MobileContainer>
      <div className="relative mx-auto min-h-screen w-full flex flex-col bg-background-light dark:bg-background-dark overflow-hidden pb-24 font-display text-slate-900 dark:text-slate-100 antialiased">
        {/* Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between p-6 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-slate-200 dark:border-primary/10">
          <button onClick={() => navigate(-1)} className="flex items-center justify-center size-10 rounded-full bg-slate-100 dark:bg-primary/20 text-primary active:scale-95 transition-all">
            <span className="material-symbols-outlined">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold tracking-tight font-urbanist">AI Generator</h1>
          <button className="flex items-center justify-center size-10 rounded-full bg-slate-100 dark:bg-primary/20 text-primary active:scale-95 transition-all">
            <span className="material-symbols-outlined">tune</span>
          </button>
        </header>

        <main className="flex-1 px-6 space-y-8 overflow-y-auto pt-4 pb-32">
          {/* Tab Selector */}
          <div className="flex gap-4 border-b border-slate-200 dark:border-white/5">
            {["AI Plan", "Muscle Focus", "Recovery"].map((tab) => (
              <button 
                key={tab} 
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-bold transition-all px-1 ${activeTab === tab ? 'text-primary border-b-2 border-primary' : 'text-slate-500'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* AI Generated Exercises */}
          <section className="space-y-4">
            <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-bold tracking-tight font-urbanist">Generated Routine</h2>
              <span className="text-[10px] font-bold px-3 py-1 bg-[#00f2ff]/10 text-[#00f2ff] rounded-full border border-[#00f2ff]/20 tracking-wider uppercase mb-1 neon-glow">AI OPTIMIZED</span>
            </div>

            {/* Day Selector */}
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-2">
              {workoutData.map((day, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedDay(idx)}
                  className={`flex-1 min-w-[80px] py-3 rounded-xl text-[10px] font-bold uppercase tracking-widest border transition-all active:scale-95 ${selectedDay === idx ? 'bg-primary/10 border-primary text-primary shadow-lg shadow-primary/10' : 'bg-transparent border-slate-200 dark:border-white/5 text-slate-400'}`}
                >
                  {(() => {
                    const dayNames = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
                    if (day.day && day.day.toString().length > 3 && !day.day.toString().includes('Day')) {
                      return day.day.toString().substring(0, 3);
                    }
                    return dayNames[idx % 7];
                  })()}
                </button>
              ))}
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{currentDayPlan.focus || "AI Selected"} Protocol</h3>
                <div className="flex items-center gap-2">
                  <span className="flex items-center gap-1 text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    <span className="material-symbols-outlined text-[12px]">timer</span> 35 min
                  </span>
                  <span className="flex items-center gap-1 text-[10px] font-bold text-accent-aqua bg-accent-aqua/10 px-2 py-0.5 rounded-full">
                    <span className="material-symbols-outlined text-[12px]">bolt</span> Medium
                  </span>
                </div>
              </div>

              {currentDayPlan.exercises && currentDayPlan.exercises.map((ex, idx) => (
                <div key={idx} className="flex items-center gap-4 p-4 rounded-2xl bg-white/50 dark:bg-white/[0.03] border border-slate-200 dark:border-white/10 shadow-xl transition-all hover:border-primary/40 group cursor-pointer backdrop-blur-xl">
                  <div className="relative size-20 shrink-0 rounded-xl overflow-hidden bg-slate-200 dark:bg-primary/10">
                    <img className="w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500" src={ex.imageUrl || getImage(ex.imageSearchTerm, ex.name)} alt={ex.name} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold text-base tracking-tight mb-1 font-urbanist">{ex.name}</h3>
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{ex.sets} Sets x {ex.reps} Reps</p>
                  </div>
                  <button 
                    onClick={() => setSelectedExercise(ex)}
                    className="size-10 flex items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 text-slate-400 group-hover:text-primary transition-colors active:scale-95"
                  >
                    <span className="material-symbols-outlined">play_circle</span>
                  </button>
                </div>
              ))}
            </div>
          </section>
          <div className="h-20"></div>
        </main>

        {/* Exercise Detail Modal */}
        {selectedExercise && (
          <div className="fixed inset-0 z-[100] flex items-end justify-center px-4 pb-10 sm:pb-20 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="w-full max-w-lg bg-background-light dark:bg-[#161229] rounded-[3rem] overflow-hidden border border-white/10 shadow-[0_-20px_50px_rgba(0,0,0,0.5)] animate-in slide-in-from-bottom-10 duration-500 max-h-[85vh] flex flex-col">
              <div className="relative h-64 shrink-0">
                <img className="size-full object-cover" src={selectedExercise.imageUrl || getImage(selectedExercise.imageSearchTerm, selectedExercise.name)} alt={selectedExercise.name} />
                <div className="absolute inset-0 bg-gradient-to-t from-[#161229] via-transparent to-transparent"></div>
                <button onClick={() => setSelectedExercise(null)} className="absolute top-4 right-4 size-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/10 active:scale-90 transition-all">
                  <span className="material-symbols-outlined">close</span>
                </button>
                <div className="absolute bottom-6 left-8">
                   <h3 className="text-3xl font-black text-white drop-shadow-lg font-urbanist">{selectedExercise.name}</h3>
                   <div className="flex gap-3 mt-2">
                     <span className="text-[10px] font-bold text-primary bg-primary/20 px-3 py-1 rounded-full border border-primary/30 uppercase tracking-widest">{selectedExercise.sets} Sets</span>
                     <span className="text-[10px] font-bold text-accent-aqua bg-accent-aqua/20 px-3 py-1 rounded-full border border-accent-aqua/30 uppercase tracking-widest">{selectedExercise.reps} Reps</span>
                   </div>
                </div>
              </div>
              
              <div className="p-8 overflow-y-auto no-scrollbar space-y-8 pb-12">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-[#00f2ff] mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">precision_manufacturing</span> Pro Form Guide
                  </h4>
                  <div className="bg-white/5 p-5 rounded-2xl border border-white/5 space-y-4">
                    <p className="text-sm text-slate-600 dark:text-slate-300 font-medium leading-relaxed italic">
                      "{selectedExercise.formTips || "Maintain core tension and control the eccentric phase of the movement for maximum fiber recruitment."}"
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-primary mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">history_edu</span> Performance Cues
                  </h4>
                  <div className="grid grid-cols-1 gap-3">
                    {[
                      "Controlled tempo (3:1:1)",
                      "Full range of motion",
                      "Mind-muscle connection peak",
                      "Breathe on exertion"
                    ].map((cue, i) => (
                      <div key={i} className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/5">
                        <span className="material-symbols-outlined text-primary text-sm">check_circle</span>
                        <span className="text-sm font-bold text-slate-500 dark:text-slate-400">{cue}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedExercise(null)}
                  className="w-full py-5 bg-primary text-white rounded-2xl font-black uppercase tracking-widest shadow-xl shadow-primary/20 transition-all active:scale-95"
                >
                  Got it, Let's go
                </button>
              </div>
            </div>
          </div>
        )}

        {/* CTA Action */}
        <div className="fixed bottom-24 left-0 right-0 px-6 z-30 pointer-events-none">
          <button 
            onClick={() => alert("Starting session...")}
            className="pointer-events-auto w-full max-w-sm mx-auto flex items-center justify-center gap-3 bg-[#00f2ff] hover:bg-[#00f2ff]/90 text-background-dark py-5 rounded-2xl font-bold text-lg uppercase tracking-wider shadow-[0_10px_20px_rgba(0,242,255,0.3)] transition-all active:scale-95"
          >
            <span className="material-symbols-outlined font-bold">play_arrow</span>
            Start Workout
          </button>
        </div>

        {/* Bottom Navigation Bar */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto px-6 pb-8 pointer-events-none z-50">
          <div className="flex items-center justify-around bg-white/10 dark:bg-[#1e1b28]/95 backdrop-blur-2xl rounded-full p-2 pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
            <button onClick={() => navigate('/scan')} key="scan" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">scan</span>
              <p className="text-[9px] font-bold uppercase tracking-tighter">Scan</p>
            </button>
            <button onClick={() => navigate('/diet')} key="diet" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">restaurant</span>
              <p className="text-[9px] font-bold uppercase tracking-tighter">Nutrition</p>
            </button>
            <button key="workout" className="flex flex-1 flex-col items-center justify-center gap-1 text-primary relative">
              <div className="bg-primary/20 rounded-full p-3 -mt-6 mb-1 border border-primary/30 shadow-[0_0_20px_rgba(110,61,255,0.3)]">
                <span className="material-symbols-outlined fill-1 text-2xl">fitness_center</span>
              </div>
              <p className="text-[9px] font-bold uppercase tracking-tighter">Workout</p>
            </button>
            <button onClick={() => navigate('/progress')} key="stats" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">leaderboard</span>
              <p className="text-[9px] font-bold uppercase tracking-tighter">Stats</p>
            </button>
            <button onClick={() => navigate('/settings')} key="profile" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">person</span>
              <p className="text-[9px] font-bold uppercase tracking-tighter">Profile</p>
            </button>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
