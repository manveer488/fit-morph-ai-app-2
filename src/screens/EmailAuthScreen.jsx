import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/MobileContainer.jsx';
import { useUser } from '../contexts/UserContext.jsx';

export default function EmailAuthScreen() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login
    setTimeout(() => {
      login({ name: email.split('@')[0], email: email });
      setIsLoading(false);
      navigate('/scan');
    }, 1500);
  };

  return (
    <MobileContainer>
      <div className="relative flex min-h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-primary/20 blur-[100px] rounded-full pointer-events-none"></div>

        <header className="flex items-center p-6 justify-between sticky top-0 bg-background-light/80 dark:bg-background-dark/80 backdrop-blur-md z-10">
          <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full bg-slate-100 dark:bg-primary/20 text-primary active:scale-90 transition-all">
            <span className="material-symbols-outlined font-black">arrow_back_ios_new</span>
          </button>
          <h1 className="text-xl font-black tracking-tight uppercase">Email Login</h1>
          <div className="size-10"></div>
        </header>

        <main className="relative z-10 flex flex-1 flex-col px-8 pt-10">
          <div className="mb-10">
            <h2 className="text-3xl font-black tracking-tight mb-2">Welcome Back</h2>
            <p className="text-slate-500 font-medium italic">Enter your credentials to synchronize with AI</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Email Address</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">mail</span>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                  placeholder="name@example.com"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-primary ml-1">Secure Password</label>
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400">lock</span>
                <input 
                  type="password" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all font-medium"
                  placeholder="••••••••"
                  required
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button type="button" className="text-xs font-black text-primary uppercase tracking-widest hover:opacity-70 transition-opacity">Forgot Password?</button>
            </div>

            <button 
              type="submit"
              disabled={isLoading}
              className="w-full py-5 rounded-3xl bg-primary text-white font-black text-sm uppercase tracking-[0.2em] shadow-[0_20px_40px_rgba(110,61,255,0.4)] active:scale-95 transition-all disabled:opacity-50 flex items-center justify-center gap-3 mt-4"
            >
              {isLoading ? (
                <div className="size-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  <span>Authorize Account</span>
                  <span className="material-symbols-outlined text-sm font-black">arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-12 flex items-center gap-4 py-4">
            <div className="h-[1px] flex-1 bg-slate-200 dark:bg-white/10"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">New to FitMorph?</span>
            <div className="h-[1px] flex-1 bg-slate-200 dark:bg-white/10"></div>
          </div>

          <button 
            type="button"
            onClick={() => navigate('/join')}
            className="mt-4 w-full py-5 rounded-2xl border border-primary/20 text-primary font-black text-sm uppercase tracking-widest active:scale-95 transition-all"
          >
            Create AI Profile
          </button>
        </main>
      </div>
    </MobileContainer>
  );
}
