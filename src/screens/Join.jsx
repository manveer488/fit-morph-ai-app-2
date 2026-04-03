import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MobileContainer from '../components/MobileContainer.jsx';
import { useUser } from '../contexts/UserContext.jsx';

export default function Join() {
  const navigate = useNavigate();
  const { login } = useUser();

  useEffect(() => {
    // Initialize Google Identity Services
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: "YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com",
        callback: handleGoogleResponse
      });
    }

    // Initialize Apple Sign In
    if (window.AppleID) {
      window.AppleID.auth.init({
        clientId: 'YOUR_APPLE_SERVICE_ID',
        scope: 'name email',
        redirectURI: window.location.origin,
        usePopup: true
      });
    }
  }, []);

  const handleGoogleResponse = (response) => {
    console.log("Google Auth Response:", response);
    // In a real app, you'd send this credential to your backend
    login({ name: "Google User", email: "user@gmail.com" });
    navigate('/scan');
  };

  const handleGoogleClick = () => {
    if (window.google) {
      window.google.accounts.id.prompt(); // Displays the One Tap prompt
      // Alternatively, trigger the specific button logic
      alert("Opening Google Sign-in...");
      // For demo purposes, we skip to login
      login({ name: "Demo User", email: "demo@fitmorph.ai" });
      navigate('/scan');
    }
  };

  const handleAppleClick = async () => {
    try {
      if (window.AppleID) {
        const data = await window.AppleID.auth.signIn();
        console.log("Apple Auth Response:", data);
        login({ name: "Apple User", email: "user@apple.com" });
        navigate('/scan');
      }
    } catch (error) {
      console.error(error);
      // Fallback for demo
      login({ name: "Apple User", email: "user@apple.com" });
      navigate('/scan');
    }
  };

  return (
    <MobileContainer>
      <div className="relative flex h-screen w-full flex-col overflow-hidden bg-background-light dark:bg-background-dark font-display text-slate-900 dark:text-slate-100 antialiased">
        {/* Header / Top Bar */}
        <div className="flex items-center p-6 justify-between z-10">
          <button onClick={() => navigate(-1)} className="flex size-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-slate-100">
            <span className="material-symbols-outlined">arrow_back_ios_new</span>
          </button>
          <div className="text-xs font-bold tracking-widest uppercase opacity-50">Step 3 of 3</div>
          <div className="size-10"></div> {/* Spacer for centering */}
        </div>
        
        {/* Hero Section with Fitness Silhouette Concept */}
        <div className="relative flex-1 flex flex-col justify-center px-6">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-transparent to-background-dark/90 z-0"></div>
          <div className="relative w-full h-full flex flex-col justify-center">
            <div className="w-full aspect-square rounded-full bg-primary/20 blur-3xl absolute -top-20 -right-20 animate-pulse"></div>
            
            {/* Mock Fitness Silhouette Visualization */}
            <div className="relative w-full h-80 bg-cover bg-center rounded-xl overflow-hidden shadow-2xl border border-white/5" style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuBt0cLCTcSxuV1VGXMXcdWVOPPC-1th_otgIO4cWQvxe8klWw9LpklV3CgllZyZytQpr60rjvVFirtZWwskbZmmkTdgCCOCsHa_kMEkKrn5LxBj0f6Vv_swIORpJCgSpa_z3cbeyJETwgZltKSw5RAD6p6R3j9M5znloX68W1GBHIWK4l0DzRvo2CN15L3IPQwVLROMsyfku7W7zPMo1_vFa7pRXPnx7vM1VBVQfI9dePEFtRg_ZOalmNf3qcy9emHaAZJvRIcBR0Yj')" }}>
              <div className="absolute inset-0 bg-gradient-to-t from-background-dark via-transparent to-transparent"></div>
            </div>
            
            <div className="mt-8">
              <h1 className="text-slate-100 tracking-tight text-4xl font-bold leading-tight text-left font-urbanist">
                Join FitMorph AI
              </h1>
              <p className="text-slate-400 text-lg font-normal leading-relaxed mt-3 text-left">
                Experience the future of fitness with AI-driven transformation and precision tracking.
              </p>
            </div>
          </div>
        </div>

        {/* Auth Buttons Section */}
        <div className="px-6 pb-12 pt-4 z-10">
          <div className="flex flex-col gap-4">
            {/* Primary Action: Email */}
            <button 
              onClick={() => navigate('/auth/email')}
              className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full bg-primary text-white text-base font-bold leading-normal tracking-wide shadow-lg shadow-primary/20 transition-all active:scale-95"
            >
              <span className="material-symbols-outlined">mail</span>
              <span>Continue with Email</span>
            </button>
            
            {/* Frosted Glass Secondary: Google */}
            <button 
              onClick={handleGoogleClick}
              className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-slate-100 text-base font-semibold leading-normal transition-all hover:bg-white/10 active:scale-95"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
              </svg>
              <span>Continue with Google</span>
            </button>
            
            {/* Frosted Glass Secondary: Apple */}
            <button 
              onClick={handleAppleClick}
              className="flex h-14 w-full cursor-pointer items-center justify-center gap-3 overflow-hidden rounded-full bg-white/5 backdrop-blur-xl border border-white/10 text-slate-100 text-base font-semibold leading-normal transition-all hover:bg-white/10 active:scale-95"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.96.95-2.04 1.72-3.32 1.72-1.22 0-1.66-.75-3.15-.75-1.5 0-1.98.74-3.13.75-1.27 0-2.45-.82-3.41-1.78C2.1 18.28 1 15.65 1 13.04c0-2.63 1.64-4.02 3.23-4.02 1.6 0 2.5.95 3.44.95.93 0 2.05-.95 3.53-.95 1.25 0 2.5.65 3.24 1.57-2.67 1.5-2.22 5.38.44 6.55-.54 1.37-1.3 2.65-2.43 3.14zM12.03 8.35c-.02-2.13 1.76-3.95 3.73-4.08.18 2.33-2.14 4.26-3.73 4.08z"></path>
              </svg>
              <span>Continue with Apple</span>
            </button>
          </div>
          
          {/* Footer Links */}
          <div className="mt-8 text-center">
            <p className="text-xs text-slate-500 leading-relaxed px-4">
              By continuing, you agree to FitMorph AI's <br/>
              <span className="text-primary hover:underline cursor-pointer">Terms of Service</span> and <span className="text-primary hover:underline cursor-pointer">Privacy Policy</span>
            </p>
            <div className="mt-6 flex items-center justify-center gap-2">
              <span className="text-sm text-slate-400">Already have an account?</span>
              <button onClick={() => navigate('/auth/email')} className="text-sm font-bold text-primary hover:opacity-80 transition-opacity">Log In</button>
            </div>
          </div>
        </div>
        
        {/* Home Indicator Mockup */}
        <div className="h-1.5 w-32 bg-slate-100/20 rounded-full mx-auto mb-2"></div>
      </div>
    </MobileContainer>
  );
}
