import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/MobileContainer.jsx';

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <MobileContainer>
      <div className="relative flex flex-col h-full min-h-screen w-full bg-background-light dark:bg-background-dark overflow-hidden font-display text-slate-900 dark:text-slate-100 antialiased">
        {/* Status Bar Spacer */}
        <div className="h-12 w-full"></div>

        {/* Top AppBar */}
        <div className="flex items-center p-4 justify-end z-20">
          <button onClick={() => navigate('/join')} className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 active:scale-90 transition-all">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Content Section */}
        <div className="flex-1 flex flex-col items-center px-6">
          {/* Hero Hologram */}
          <div className="relative w-full aspect-square mb-8 group mt-4">
            <div className="absolute inset-0 bg-primary/20 blur-[60px] rounded-full"></div>
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-white/5 backdrop-blur-3xl border border-white/10 flex items-center justify-center shadow-2xl">
              <div 
                className="w-full h-full bg-center bg-no-repeat bg-cover opacity-90 transition-transform duration-1000 group-hover:scale-105" 
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDzzQ5ROnWqIFe3a-etVPzxkPoZCoyo1MeGcWzedeH-zFUfRqaxuaQw7BI8wPYxA0RwaqrR7YCZJQaVL6lGGldMlxH1RNorI96EzexSzPDMv17BIsMBQDQEfyXYI6dLO_R3v5p5tXsOngxAGtL9Ydknj0u-5ullmnrkLf1VeTtZtWbpGdocXDms8jZE6S4pAb8HIGn-6Esp1fuJxHVtq-7sIn7aPYpojBgDJkUz_VG6pmSj1fqU1VaPkEMUWBMKCHXfOF7i-jfHQp7C")' }}
              ></div>
              {/* High-tech grid overlay */}
              <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(0,242,255,0.1)_1px,transparent_1px)] bg-[length:20px_20px] pointer-events-none"></div>
            </div>
          </div>

          {/* Text Content */}
          <div className="space-y-4 text-center z-10">
            <h1 className="font-urbanist text-4xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100">
              Welcome to <span className="text-primary">FitMorph AI</span>
            </h1>
            <p className="text-lg font-normal leading-relaxed text-slate-600 dark:text-slate-400 max-w-[280px] mx-auto">
              Your AI-powered body transformation journey starts now
            </p>
          </div>

          {/* Pagination Indicators */}
          <div className="flex w-full items-center justify-center gap-2 mt-10">
            <div className="h-2.5 w-8 rounded-full bg-primary shadow-[0_0_15px_rgba(110,61,255,0.6)]"></div>
            <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-white/10"></div>
            <div className="h-2 w-2 rounded-full bg-slate-300 dark:bg-white/10"></div>
          </div>
        </div>

        {/* Footer Area */}
        <div className="p-8 space-y-4 z-20">
          <button 
            onClick={() => navigate('/benefits')}
            className="w-full py-5 px-6 rounded-full bg-neon-blue text-slate-950 font-bold text-lg shadow-[0_0_20px_rgba(0,242,255,0.4)] active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            Get Started
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
          <button 
            onClick={() => navigate('/join')}
            className="w-full py-5 px-6 rounded-full bg-white/5 dark:bg-white/[0.03] backdrop-blur-xl border border-slate-200 dark:border-white/10 text-slate-900 dark:text-white font-semibold active:scale-95 transition-colors hover:bg-white/10"
          >
            I already have an account
          </button>
        </div>
      </div>
    </MobileContainer>
  );
}
