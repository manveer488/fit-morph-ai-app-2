import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/MobileContainer.jsx';
import { useUser } from '../contexts/UserContext.jsx';

export default function Settings() {
  const navigate = useNavigate();
  const { user, logout, toggleNotifications, setLanguage } = useUser();
  const [darkMode, setDarkMode] = useState(document.documentElement.classList.contains('dark'));

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    if (newMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  const handleRowClick = (label) => {
    if (label === "Body Scan" || label === "Analyze Body") navigate('/scan');
    else if (label === "Privacy") navigate('/privacy');
    else if (label === "Help") navigate('/help');
    else if (label === "Health Data") navigate('/progress');
    else if (label === "Language") {
      const nextLang = user.language === "English" ? "Spanish" : "English";
      setLanguage(nextLang);
      alert(`Language switched to ${nextLang} (AI Optimized UI)`);
    }
    else alert(`${label} settings coming soon!`);
  };

  const displayName = user.name || user.email?.split('@')[0] || 'Warrior';

  return (
    <MobileContainer>
      <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col relative overflow-x-hidden antialiased">
        {/* Header */}
        <header className="flex items-center p-6 justify-between sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10 border-b border-slate-200 dark:border-white/5">
          <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 active:scale-95 transition-all">
            <span className="material-symbols-outlined font-bold">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold tracking-tight font-urbanist">Profile</h1>
          <div className="size-10 invisible"></div>
        </header>

        <main className="flex-1 px-6 py-6 space-y-10 overflow-y-auto pb-32 scroll-smooth">
          {/* User Profile Info */}
          <section className="flex flex-col items-center">
            <div className="relative">
              <div className="size-32 rounded-full p-1 bg-gradient-to-tr from-primary to-accent-aqua shadow-xl">
                <div 
                  className="size-full rounded-full bg-cover bg-center border-4 border-background-light dark:border-background-dark" 
                  style={{ backgroundImage: `url('https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&q=80')` }}
                ></div>
              </div>
              <div className="absolute bottom-1 right-1 size-8 bg-emerald-500 rounded-full border-4 border-background-light dark:border-background-dark shadow-lg"></div>
            </div>
            <div className="mt-4 text-center">
              <h2 className="text-2xl font-bold tracking-tight font-urbanist">{displayName}</h2>
              <p className="text-slate-500 text-sm font-medium">@{displayName.toLowerCase().replace(/\s+/g, '_')} • Active</p>
            </div>
          </section>

          {/* Quick Action Grid */}
          <section className="grid grid-cols-2 gap-4">
            {[
              { label: "Health Data", icon: "favorite", color: "red-500" },
              { label: "Body Scan", icon: "visibility", color: "primary" },
              { label: "Privacy", icon: "lock", color: "slate-400" },
              { label: "Help", icon: "help", color: "slate-400" }
            ].map((item, idx) => (
              <button 
                key={idx}
                onClick={() => handleRowClick(item.label)}
                className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 rounded-3xl p-6 flex flex-col items-start gap-3 shadow-lg active:scale-95 transition-all"
              >
                <div className={`size-10 flex items-center justify-center rounded-2xl bg-${item.color}/10 text-${item.color}`}>
                  <span className="material-symbols-outlined font-bold">{item.icon}</span>
                </div>
                <span className="text-sm font-bold tracking-tight font-urbanist">{item.label}</span>
              </button>
            ))}
          </section>

          {/* Settings List */}
          <section className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 px-1">Preferences</h3>
            <div className="space-y-3">
              <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 flex items-center justify-between p-5 rounded-[2rem] shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="size-10 flex items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500">
                    <span className="material-symbols-outlined font-bold">notifications</span>
                  </div>
                  <span className="font-bold tracking-tight font-urbanist">Notifications</span>
                </div>
                <button 
                  onClick={toggleNotifications}
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${user.notificationsEnabled ? 'bg-primary' : 'bg-slate-300'}`}
                >
                  <div className={`size-4 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${user.notificationsEnabled ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>

               <div className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 flex items-center justify-between p-5 rounded-[2rem] shadow-lg">
                <div className="flex items-center gap-4">
                  <div className="size-10 flex items-center justify-center rounded-2xl bg-slate-900/10 dark:bg-white/10 text-slate-900 dark:text-white">
                    <span className="material-symbols-outlined font-bold">dark_mode</span>
                  </div>
                  <span className="font-bold tracking-tight font-urbanist">Dark Mode</span>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleDarkMode();
                  }}
                  className={`w-12 h-6 rounded-full p-1 cursor-pointer transition-colors duration-300 ${darkMode ? 'bg-primary' : 'bg-slate-300'}`}
                >
                  <div className={`size-4 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${darkMode ? 'translate-x-6' : 'translate-x-0'}`}></div>
                </button>
              </div>

              <div onClick={() => handleRowClick('Language')} className="bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-slate-200 dark:border-white/10 flex items-center justify-between p-5 rounded-[2rem] shadow-lg cursor-pointer active:scale-95 transition-all">
                <div className="flex items-center gap-4">
                  <div className="size-10 flex items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500">
                    <span className="material-symbols-outlined font-bold">language</span>
                  </div>
                  <span className="font-bold tracking-tight font-urbanist">Language</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-400">{user.language}</span>
                  <span className="material-symbols-outlined text-slate-400">chevron_right</span>
                </div>
              </div>
            </div>
          </section>

          {/* Sign Out */}
          <div className="pt-4 pb-12">
            <button 
              onClick={handleSignOut}
              className="w-full py-5 rounded-[2rem] font-bold bg-white dark:bg-white/5 text-red-500 border border-slate-200 dark:border-white/10 flex items-center justify-center gap-3 active:scale-95 transition-all shadow-xl tracking-widest text-sm uppercase"
            >
              <span className="material-symbols-outlined font-bold">logout</span>
              Sign Out
            </button>
            <p className="text-center text-slate-400 text-[10px] mt-8 font-bold uppercase tracking-widest opacity-40">FitMorph AI v4.8.2</p>
          </div>
        </main>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 max-w-[430px] mx-auto px-6 pb-8 pointer-events-none z-50">
          <div className="flex items-center justify-around bg-white/10 dark:bg-[#1e1b28]/95 backdrop-blur-2xl rounded-full p-2 pointer-events-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10">
            <button onClick={() => navigate('/dashboard')} key="home" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">grid_view</span>
              <p className="text-[9px] font-bold uppercase tracking-tighter">Home</p>
            </button>
            <button onClick={() => navigate('/scan')} key="scan" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">scan</span>
              <p className="text-[9px] font-bold uppercase tracking-tighter">Scan</p>
            </button>
            <button onClick={() => navigate('/diet')} key="diet" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">restaurant</span>
              <p className="text-[9px] font-bold uppercase tracking-tighter">Nutrition</p>
            </button>
            <button onClick={() => navigate('/workout')} key="workout" className="flex flex-1 flex-col items-center justify-center gap-1 text-slate-400 hover:text-primary transition-colors">
              <span className="material-symbols-outlined text-2xl">fitness_center</span>
              <p className="text-[9px] font-bold uppercase tracking-tighter">Workout</p>
            </button>
            <button key="profile" className="flex flex-1 flex-col items-center justify-center gap-1 text-primary relative">
               <div className="bg-primary/20 rounded-full p-3 -mt-6 mb-1 border border-primary/30 shadow-[0_0_20px_rgba(110,61,255,0.3)]">
                <span className="material-symbols-outlined fill-1 text-2xl">person</span>
              </div>
              <p className="text-[9px] font-bold uppercase tracking-tighter">Profile</p>
            </button>
          </div>
        </div>
      </div>
    </MobileContainer>
  );
}
