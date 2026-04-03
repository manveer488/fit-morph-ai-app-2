import React from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/MobileContainer.jsx';

export default function HelpCenter() {
  const navigate = useNavigate();

  const faqs = [
    { q: "How does the AI Body Scan work?", a: "Our AI uses neural synthesis to analyze your physique landmarks and estimate body fat and muscle mass from a single photo." },
    { q: "Why do I need to scan every week?", a: "Transformation is dynamic! Weekly scans allow the AI to adjust your macros and training intensity based on real-time physiological changes." },
    { q: "Is my data secure?", a: "Yes, we use advanced encryption and process sensitive images in a secure, isolated environment." },
    { q: "Can I use FitMorph without equipment?", a: "Absolutely! The AI can generate bodyweight-only protocols if you specify 'No Equipment' in your profile." }
  ];

  return (
    <MobileContainer>
      <div className="bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 min-h-screen flex flex-col relative antialiased">
        <header className="flex items-center p-6 justify-between sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10 border-b border-slate-200 dark:border-white/5">
          <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 active:scale-95 transition-all">
            <span className="material-symbols-outlined font-bold">arrow_back</span>
          </button>
          <h1 className="text-xl font-bold tracking-tight font-urbanist">Help Center</h1>
          <div className="size-10"></div>
        </header>

        <main className="flex-1 px-6 py-8 space-y-8 overflow-y-auto pb-20">
          <h2 className="text-2xl font-bold font-urbanist text-center">How can we help?</h2>
          
          <div className="space-y-4">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">Frequently Asked Questions</h3>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <div key={idx} className="bg-white/50 dark:bg-white/5 border border-slate-200 dark:border-white/10 p-5 rounded-2xl shadow-sm">
                  <h4 className="font-bold text-primary mb-2 font-urbanist">{faq.q}</h4>
                  <p className="text-sm text-slate-500 dark:text-slate-400 font-medium leading-relaxed">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-primary/10 border border-primary/20 p-6 rounded-3xl text-center space-y-4">
            <h3 className="text-lg font-bold font-urbanist">Still have questions?</h3>
            <p className="text-sm text-slate-500 font-medium">Our support team is available 24/7 to help you with your transformation.</p>
            <button className="w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg active:scale-95 transition-all">
              Contact Support
            </button>
          </div>
        </main>
      </div>
    </MobileContainer>
  );
}
