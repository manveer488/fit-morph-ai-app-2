import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/MobileContainer.jsx';

export default function PrivacyPolicy() {
  const navigate = useNavigate();

  return (
    <MobileContainer>
      <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col relative antialiased">
        <header className="flex items-center p-6 justify-between sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10 border-b border-slate-200 dark:border-white/5">
          <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 active:scale-95 transition-all">
            <span className="material-symbols-outlined font-bold">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold tracking-tight font-urbanist">Privacy Policy</h1>
          <div className="size-10"></div>
        </header>

        <main className="flex-1 px-6 py-8 space-y-6 overflow-y-auto pb-20">
          <section className="space-y-4">
            <h2 className="text-2xl font-bold font-urbanist">Your Privacy Matters</h2>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              At FitMorph AI, we take your privacy seriously. This document outlines how we collect, use, and protect your biometric data and personal information.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-bold font-urbanist">1. Biometric Data</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              Your body scans and physique assessments are processed locally on your device whenever possible. AI analysis is performed using secured neural networks, and your images are never shared with third parties.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-bold font-urbanist">2. Personal Information</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              We collect your name, email, and fitness preferences to personalize your transformation roadmap. You have full control over your data and can request deletion at any time.
            </p>
          </section>

          <section className="space-y-4">
            <h3 className="text-lg font-bold font-urbanist">3. Data Security</h3>
            <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium">
              We employ military-grade encryption to protect your data during transmission and at rest.
            </p>
          </section>
        </main>
      </div>
    </MobileContainer>
  );
}
