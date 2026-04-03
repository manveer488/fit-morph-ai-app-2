import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/MobileContainer.jsx';
import { useUser } from '../contexts/UserContext.jsx';

export default function Dashboard() {
  const navigate = useNavigate();
  const { user } = useUser();

  // Compute real stats from AI plan if available
  const planCalories = user.aiPlan?.mealPlan?.days?.[0]?.calories || 2000;
  const stats = {
    weeklyGoal: user.hasCompletedBodyScan ? 85 : 0,
    eaten: Math.round(planCalories * 0.7), // Mocking 70% eaten for the day
    burned: user.aiPlan?.workoutPlan ? 550 : 0,
    left: Math.round(planCalories * 0.3)
  };

  return (
    <MobileContainer>
      <div className="relative flex min-h-screen w-full flex-col overflow-x-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased italic-none">
        {/* Header */}
        <header className="flex items-center justify-between p-6 pb-2">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="size-12 rounded-full border-2 border-primary p-0.5">
                <img 
                  alt="Profile" 
                  className="size-full rounded-full object-cover" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBYi1EmfLDml6oywKZoHPCrHaKhmoMX8NXkFSpVE0kP530Fm8N-QfuLg4aUhs3rc4v_WiUohqt9WmUd57IEn-7mKDL_TdhT8be0tiRcAHFstO-wnIhxoBiZMGonNF24ZMlQE2ufcpU4AfcAuQAqAiALSK3ZnTDHOupx6Z6Zkng7snCXvYbZV95PCY8DxKLfSrbCkKeJ4xUUhfkVYiKlMLuIYzVKz0QTCflrOPbmAqB7JpX3CGJJ_1tolMapER9MQOBJKTG8nj77qgAK" 
                />
              </div>
              <div className="absolute bottom-0 right-0 size-3 bg-accent-aqua rounded-full border-2 border-background-dark shadow-[0_0_10px_rgba(0,242,234,0.5)]"></div>
            </div>
            <div>
              <p className="text-[10px] text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest leading-none mb-1">
                {new Date().toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' }).toUpperCase()}
              </p>
              <h2 className="text-xl font-bold tracking-tight leading-none font-urbanist text-slate-900 dark:text-white">
                Good Morning, {user.email || user.name || 'Warrior'}
              </h2>
            </div>
          </div>
          <button className="size-12 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 flex items-center justify-center text-slate-900 dark:text-slate-100 active:scale-95 transition-all">
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </header>

        {/* Main Content */}
        <main className="flex-1 px-6 py-4 space-y-6 overflow-y-auto pb-32 scroll-smooth">
          {/* Weekly Goal Progress Ring */}
          <section className="relative flex flex-col items-center justify-center py-6 bg-white/50 dark:bg-primary/5 rounded-3xl border border-slate-200 dark:border-primary/20 overflow-hidden shadow-2xl group transition-all hover:border-primary/40 backdrop-blur-xl">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent"></div>
            <div className="relative size-48 flex items-center justify-center">
              {/* Progress Circle */}
              <svg className="size-full -rotate-90">
                <circle className="text-slate-100 dark:text-white/10" cx="96" cy="96" fill="transparent" r="88" stroke="currentColor" strokeWidth="8"></circle>
                <circle 
                  className="drop-shadow-[0_0_15px_rgba(0,242,255,0.4)] transition-all duration-1000 ease-out" 
                  cx="96" cy="96" fill="transparent" r="88" 
                  stroke="url(#aquaGradient)" 
                  strokeDasharray="552.9" 
                  strokeDashoffset={552.9 * (1 - stats.weeklyGoal / 100)} 
                  strokeLinecap="round" 
                  strokeWidth="12"
                ></circle>
                <defs>
                  <linearGradient id="aquaGradient" x1="0%" x2="100%" y1="0%" y2="0%">
                    <stop offset="0%" stopColor="#6e3dff"></stop>
                    <stop offset="100%" stopColor="#00f2ea"></stop>
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold tracking-tighter text-[#00f2ff] font-urbanist neon-glow">{stats.weeklyGoal}%</span>
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Weekly Goal</span>
              </div>
            </div>
            <div className="mt-4 text-center z-10 px-6">
              <p className="text-sm font-medium text-slate-600 dark:text-slate-300">Almost there! <span className="text-primary font-bold">2 more sessions</span> to go.</p>
            </div>
          </section>

          {/* Quick Action Tiles */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold tracking-tight font-urbanist">Quick Actions</h3>
              <span className="text-xs text-primary font-bold uppercase tracking-widest cursor-pointer hover:opacity-70 transition-opacity">View All</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {/* Tile 1: Workout */}
              <div onClick={() => navigate('/workout')} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-white/10 transition-transform active:scale-95">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-colors group-hover:from-primary/60"></div>
                <img alt="Workout" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANarHOFn0yrV2uyQKavM1kj0dQrfmBbQSaFWXT7miTb9T9jJO_5e34nUEZ5riMwg0aSSYGgBzYzr5eLYukk0oDE4JQcNVIDBNvfi5nhEmgVUx__Lg3SwRm3Lv0fnCvIyL4U4w3kIlunDLL6E7J-L0E6YWVaV8Wq43XtIOPv1pzm2rDhGakZMS3rEUkA-TH6PV0FwLC26gZM7PoMXRr2mWbE6vAed4NyYKaV-Wl_Wq92e8Kh8jOxDDiW6VVIoCjyVusxiQajbutnz7p" />
                <div className="absolute bottom-3 left-3 z-20 flex flex-col gap-1 transition-transform group-hover:-translate-y-1">
                  <span className="material-symbols-outlined text-[#00f2ff] text-2xl">fitness_center</span>
                  <p className="text-white font-bold text-sm uppercase tracking-wider font-urbanist">Start Workout</p>
                </div>
              </div>

              {/* Tile 2: Body Scan */}
              <div onClick={() => navigate('/scan')} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-white/10 transition-transform active:scale-95">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-colors group-hover:from-primary/60"></div>
                <img alt="AI Scanner" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJlBt91T-GSxlZgXhAOlr8X3WLcniEGSy1YGUukTEdYzjOI4s1mHsjEr-3EOqWsC9Y7BtDU8mA1-v3nCfphTSv4TLhB833A0lTQgpo2DZqgOwbZ_ymtceENEMmoB0u8trFE4QjhoydkTmFeZaicrwC-XCokwOF82l5iAR7JZN3dpiUddAGlLhXynhewdkw0MxBEtw0sdHwdZcdrytJctXVxxM_YFdLmX3mYTtL9OldgaVHqOdFgsS5-TKIexvugwwKD13JzknlWA_R" />
                <div className="absolute top-3 right-3 z-20">
                  {(() => {
                    const isExpired = user.lastScanDate && (Date.now() - user.lastScanDate > 7 * 24 * 60 * 60 * 1000);
                    return (
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded-full border ${isExpired ? 'bg-red-500/20 text-red-500 border-red-500/20' : 'bg-emerald-500/20 text-emerald-500 border-emerald-500/20'}`}>
                        {isExpired ? 'REQUIRED' : 'UP TO DATE'}
                      </span>
                    );
                  })()}
                </div>
                <div className="absolute bottom-3 left-3 z-20 flex flex-col gap-1 transition-transform group-hover:-translate-y-1">
                  <span className="material-symbols-outlined text-[#00f2ff] text-2xl">body_system</span>
                  <p className="text-white font-bold text-sm uppercase tracking-wider font-urbanist">Analyze Body</p>
                </div>
              </div>

              {/* Tile 3: Meal Plan */}
              <div onClick={() => navigate('/diet')} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-white/10 transition-transform active:scale-95">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-colors group-hover:from-primary/60"></div>
                <img alt="Meal Plan" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuCmevuf3TVRAm023uP9c0n8JIhpvMCqUPTRp8LSw63K3FybO_etbcbmbP2wsyVaIvgUgkPyHKuFeVWu2Tv7df9UX0o3pcyMA_qsCIbwJEoEkYlf9u3GUzcj1ot8nspvovgLbrYWs0Fz5Or424quHraMuDUkO4RrEUwspJJIcdWa6yt3yNeEVW7EAzRBn8ORVoQ6aTm3A7PXHQ78rVjYRLwwfF5DjXtJHkEYiwzJ0ojgh5g_onSTErqVhbU0uA3wxfbXtBkKdkt-eHFb" />
                <div className="absolute bottom-3 left-3 z-20 flex flex-col gap-1 transition-transform group-hover:-translate-y-1">
                  <span className="material-symbols-outlined text-[#00f2ff] text-2xl">restaurant</span>
                  <p className="text-white font-bold text-sm uppercase tracking-wider font-urbanist">Meal Plan</p>
                </div>
              </div>

              {/* Tile 4: My Progress */}
              <div onClick={() => navigate('/progress')} className="group relative aspect-square rounded-2xl overflow-hidden cursor-pointer shadow-xl border border-white/10 transition-transform active:scale-95">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10 transition-colors group-hover:from-primary/60"></div>
                <img alt="Progress" className="size-full object-cover transition-transform duration-700 group-hover:scale-110" src="https://lh3.googleusercontent.com/aida-public/AB6AXuACJcVI4SBVUwIn9RezbgqfEOFuil-EYH-ZPC1rfN_0W4DVRaSfuG8QLub535ujVu74W6ojXisUaz30cMc0EmAKB94WdZ-Xxccha742MJUcuD4HHi_bsF8sGP7SoWpPZt-cd0G47WmHHz-uKRx537jgBf8xDfvKlRHFAwBo9QYlCeJVYD8HUHP9dNnP9XY3uLGZJZALQaELdWJAFuHiLK1eFIui_bBELA-YaT0UEZEIu3MECH4UQRqyTNxU_t1CXCmfvgYPUyA_sbZE" />
                <div className="absolute bottom-3 left-3 z-20 flex flex-col gap-1 transition-transform group-hover:-translate-y-1">
                  <span className="material-symbols-outlined text-[#00f2ff] text-2xl">query_stats</span>
                  <p className="text-white font-bold text-sm uppercase tracking-wider font-urbanist">My Progress</p>
                </div>
              </div>
            </div>
          </section>

          {/* AI Assistant Insight Card */}
          <section onClick={() => navigate('/progress')} className="p-5 rounded-2xl bg-primary/20 border border-primary/30 relative overflow-hidden shadow-2xl cursor-pointer group hover:bg-primary/30 transition-all backdrop-blur-xl">
            <div className="absolute top-0 right-0 p-3">
              <span className="flex size-8 items-center justify-center rounded-full bg-primary/40 text-primary group-hover:scale-110 transition-transform">
                <span className="material-symbols-outlined text-sm font-bold">auto_awesome</span>
              </span>
            </div>
            <div className="flex flex-col gap-2 relative z-10">
              <span className="text-[10px] font-bold uppercase tracking-widest text-primary mb-1">AI Physique Assessment</span>
              <h4 className="text-lg font-bold tracking-tight font-urbanist text-slate-900 dark:text-white">Analysis Complete</h4>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">
                {user.metrics?.physiqueAssessment || "Based on your latest scan, we've optimized your transformation roadmap. Tap to view details."}
              </p>
              <div className="grid grid-cols-2 gap-3 mt-2">
                <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                  <p className="text-[8px] text-slate-400 uppercase font-bold">AI Body Fat</p>
                  <p className="text-sm font-bold text-[#00f2ff]">{user.metrics?.bodyFat || '--'}%</p>
                </div>
                <div className="bg-white/5 p-2 rounded-lg border border-white/5">
                  <p className="text-[8px] text-slate-400 uppercase font-bold">AI Muscle</p>
                  <p className="text-sm font-bold text-primary">{user.metrics?.muscleMass || '--'}kg</p>
                </div>
              </div>
            </div>
          </section>

          {/* Calorie Stats Widget */}
          <section className="grid grid-cols-3 gap-4 p-4 rounded-2xl bg-slate-100 dark:bg-card-dark border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md">
            <div className="flex flex-col items-center text-center">
              <span className="text-xs text-slate-500 mb-1">Eaten</span>
              <span className="text-lg font-bold text-[#00f2ff] leading-none font-urbanist">{stats.eaten}</span>
              <span className="text-[8px] text-slate-400 font-bold uppercase">kcal</span>
            </div>
            <div className="flex flex-col items-center text-center border-x border-slate-200 dark:border-slate-800 px-2">
              <span className="text-xs text-slate-500 mb-1">Burned</span>
              <span className="text-lg font-bold text-primary leading-none font-urbanist">{stats.burned}</span>
              <span className="text-[8px] text-slate-400 font-bold uppercase">kcal</span>
            </div>
            <div className="flex flex-col items-center text-center">
              <span className="text-xs text-slate-500 mb-1">Remaining</span>
              <span className="text-lg font-bold text-white leading-none font-urbanist">{stats.left}</span>
              <span className="text-[8px] text-slate-400 font-bold uppercase">kcal</span>
            </div>
          </section>
        </main>

        {/* Bottom Navigation Bar */}
        <nav className="fixed bottom-0 left-1/2 -translate-x-1/2 w-full max-w-[430px] z-50">
          <div className="flex items-center justify-around bg-white/10 dark:bg-background-dark/95 backdrop-blur-2xl px-6 pb-8 pt-4 rounded-t-3xl border-t border-white/5 shadow-[0_-10px_40px_rgba(0,0,0,0.4)] pointer-events-auto">
            <button key="home" className="flex flex-1 flex-col items-center justify-center gap-1 text-primary">
              <span className="material-symbols-outlined text-[28px] fill-1">home</span>
              <p className="text-[9px] font-bold uppercase tracking-widest">Home</p>
            </button>
            <button onClick={() => navigate('/workout')} key="workout" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[28px]">fitness_center</span>
              <p className="text-[9px] font-bold uppercase tracking-widest">Workouts</p>
            </button>
            <button onClick={() => navigate('/scan')} className="flex flex-1 flex-col items-center justify-center gap-1">
              <div className="size-12 -mt-10 flex items-center justify-center bg-primary rounded-full shadow-lg shadow-primary/40 text-white transform active:scale-90 transition-transform">
                <span className="material-symbols-outlined text-[32px]">scan</span>
              </div>
              <p className="text-[9px] font-bold uppercase tracking-widest text-primary">Scan</p>
            </button>
            <button onClick={() => navigate('/diet')} key="diet" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[28px]">restaurant</span>
              <p className="text-[9px] font-bold uppercase tracking-widest">Nutrition</p>
            </button>
            <button onClick={() => navigate('/settings')} key="profile" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-500 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-[28px]">person</span>
              <p className="text-[9px] font-bold uppercase tracking-widest">Profile</p>
            </button>
          </div>
        </nav>
      </div>
    </MobileContainer>
  );
}
