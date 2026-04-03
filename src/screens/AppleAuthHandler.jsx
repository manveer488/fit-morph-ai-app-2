import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../contexts/UserContext.jsx';
import MobileContainer from '../components/MobileContainer.jsx';

export default function AppleAuthHandler() {
  const navigate = useNavigate();
  const { login } = useUser();
  const [status, setStatus] = useState('Starting Apple Sign-In...');

  useEffect(() => {
    // Simulate Apple Auth Window
    const timer = setTimeout(() => {
      setStatus('Verifying iCloud Identity...');
      const successTimer = setTimeout(() => {
        login();
        navigate('/scan');
      }, 2000);
      return () => clearTimeout(successTimer);
    }, 800);

    return () => clearTimeout(timer);
  }, [login, navigate]);

  return (
    <MobileContainer>
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="relative size-24 mb-8">
          <div className="absolute inset-0 bg-white/10 blur-xl rounded-full"></div>
          <div className="relative w-full h-full glass-panel rounded-3xl flex items-center justify-center border border-white/20">
            <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.05 20.28c-.96.95-2.04 1.72-3.32 1.72-1.22 0-1.66-.75-3.15-.75-1.5 0-1.98.74-3.13.75-1.27 0-2.45-.82-3.41-1.78C2.1 18.28 1 15.65 1 13.04c0-2.63 1.64-4.02 3.23-4.02 1.6 0 2.5.95 3.44.95.93 0 2.05-.95 3.53-.95 1.25 0 2.5.65 3.24 1.57-2.67 1.5-2.22 5.38.44 6.55-.54 1.37-1.3 2.65-2.43 3.14zM12.03 8.35c-.02-2.13 1.76-3.95 3.73-4.08.18 2.33-2.14 4.26-3.73 4.08z"></path>
            </svg>
          </div>
        </div>
        
        <h2 className="text-xl font-bold mb-2">{status}</h2>
        <div className="flex gap-1">
          <div className="size-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="size-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="size-2 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
        
        <button 
          onClick={() => navigate('/join')}
          className="mt-12 text-sm font-semibold opacity-50 hover:opacity-100 transition-opacity"
        >
          Cancel Apple Sign-In
        </button>
      </div>
    </MobileContainer>
  );
}
