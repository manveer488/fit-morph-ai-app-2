import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/MobileContainer.jsx';

export default function KeyBenefits() {
  const navigate = useNavigate();

  return (
    <MobileContainer>
      <div className="relative flex min-h-screen w-full flex-col bg-background-light dark:bg-background-dark overflow-x-hidden font-display text-slate-900 dark:text-slate-100 antialiased">
        {/* Header Section */}
        <div className="flex items-center p-6 pb-2 justify-between">
          <button onClick={() => navigate(-1)} className="text-primary flex size-10 shrink-0 items-center justify-center rounded-full bg-primary/10 active:scale-95 transition-all">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <h2 className="text-slate-900 dark:text-white text-lg font-bold leading-tight tracking-tight flex-1 text-center pr-10 font-urbanist">FitMorph AI</h2>
        </div>

        {/* Progress Indicators */}
        <div className="flex w-full flex-row items-center justify-center gap-3 py-6">
          <div className="h-1.5 w-6 rounded-full bg-primary/20"></div>
          <div className="h-1.5 w-12 rounded-full bg-primary shadow-[0_0_8px_rgba(110,61,255,0.6)]"></div>
          <div className="h-1.5 w-6 rounded-full bg-primary/20"></div>
        </div>

        {/* Main Heading */}
        <div className="px-6 text-center">
          <h1 className="text-slate-900 dark:text-white tracking-tight text-4xl font-extrabold leading-tight pb-3 pt-4 font-urbanist">
            Key AI Benefits
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-base font-normal leading-relaxed px-4">
            Experience the future of fitness with our advanced AI-driven transformation engine.
          </p>
        </div>

        {/* Features Section (Glassmorphism Cards) */}
        <div className="p-6 flex flex-col gap-6 flex-1">
          {/* Benefit 1: AI Body Analysis */}
          <div className="relative group cursor-pointer" onClick={() => navigate('/join')}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary to-[#00f2ff] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative flex items-center justify-between gap-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-5 shadow-xl">
              <div className="flex flex-col gap-1.5 flex-[2_2_0px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[#00f2ff] text-2xl">android_fingerprint</span>
                  <p className="text-slate-900 dark:text-white text-lg font-bold leading-tight font-urbanist">AI Body Analysis</p>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-normal">
                  High-precision 3D scanning for real-time tracking of your physical evolution.
                </p>
              </div>
              <div 
                className="w-24 h-24 bg-center bg-no-repeat bg-cover rounded-lg shrink-0 border border-white/10" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuBykp06im9aAxhAMwJ_M1IbOlVRp21s8983dTpSxkWF5peKVWSkYDR3c4AimDzDFm3VwB-akzmyry66WvtM0e005MuH9RgME0ECBsS1zVeIJRFHtCHsUIX1AwHaHJf0jx_Nrrto1Ubcng5POYI8b3ojbZ3fBcvy_UDLKTNof_bmZr14jBjEjnCR9i9r3BKdmPX2JUdmH7wnCM7YahIqOJmSF7gnJ6-40TwhJAkEkluAM3j0es20M6AyQLIEdD_3N5lVNo6TAtTTZVb2')` }}
              ></div>
            </div>
          </div>

          {/* Benefit 2: Personalized Workouts */}
          <div className="relative group cursor-pointer" onClick={() => navigate('/join')}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-[#00f2ff] to-primary rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative flex items-center justify-between gap-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-5 shadow-xl">
              <div className="flex flex-col gap-1.5 flex-[2_2_0px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-primary text-2xl">fitness_center</span>
                  <p className="text-slate-900 dark:text-white text-lg font-bold leading-tight font-urbanist">Smart Workouts</p>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-normal">
                  Dynamic training plans that adapt instantly based on your performance.
                </p>
              </div>
              <div 
                className="w-24 h-24 bg-center bg-no-repeat bg-cover rounded-lg shrink-0 border border-white/10" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuCmYcVHZE8r2VO1KkNYthW9MGn2FBsUoPCBn9-5fdA809qrlgbtGIhWKjGb7qX0_8f5qPAgwLfTvLZXeuA7DQlTc4r2qGOgLJl3YTHA1O4oXPan703CjLLUDTsZ_boGnn7yzzwgZmOgIjF8DP2ubho4GWIA1bXjrvJ_MExyYkPRxg6bBbM4NpVOZact1OdNkQRjk9SVaCUeFYG8bZMnn4L3U3bJ-xC8FFVo6b0LawefuZlxR2Ex-Fpn-Nv5FbgmJX44BW7KOAmi7i8y')` }}
              ></div>
            </div>
          </div>

          {/* Benefit 3: Smart Diet Planning */}
          <div className="relative group cursor-pointer" onClick={() => navigate('/join')}>
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-[#00f2ff] to-primary rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
            <div className="relative flex items-center justify-between gap-4 rounded-xl bg-white/50 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 p-5 shadow-xl">
              <div className="flex flex-col gap-1.5 flex-[2_2_0px]">
                <div className="flex items-center gap-2 mb-1">
                  <span className="material-symbols-outlined text-[#00f2ff] text-2xl">restaurant</span>
                  <p className="text-slate-900 dark:text-white text-lg font-bold leading-tight font-urbanist">Diet Tracking</p>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-sm font-medium leading-normal">
                  Hyper-personalized nutrition insights with real-time macro adjustments.
                </p>
              </div>
              <div 
                className="w-24 h-24 bg-center bg-no-repeat bg-cover rounded-lg shrink-0 border border-white/10" 
                style={{ backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuAfqUS5AjRH1QiUrqi-1UM-jlZmevBN94vsoseDxHnShkRd_GgI88DcJPBeHuofgI0ukpm4qrGHjq7QszQ2j_DzyTb1H9xqnJzFq4NTjbiNYpQR0Z1vf2BYSTIPhhYbYVh_2F2EpC1Lp4g92MxPhzukkWvPF6os08faJ785lRBEyiOARUSie1gBi6XT0sUV6tZ60WBhmQCeIilASQ6PtD7IJlZiFAFv1lL967KQTtSYiwLvsFXfwVh_t7lS5UHEZiEuyIyRtMP5wH9y')` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Footer / Action Button */}
        <div className="mt-auto p-6 pb-10">
          <button 
            onClick={() => navigate('/join')}
            className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-5 rounded-xl shadow-[0_0_20px_rgba(110,61,255,0.4)] transition-all flex items-center justify-center gap-2 text-lg active:scale-95"
          >
            Next Step
            <span className="material-symbols-outlined font-bold">trending_flat</span>
          </button>
          <p className="text-center text-slate-500 dark:text-slate-500 text-sm mt-4 font-medium">Step 2 of 3</p>
        </div>
      </div>
    </MobileContainer>
  );
}
