import React, { createContext, useContext, useState, useEffect } from 'react';

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState({
    name: '',
    email: '',
    isLoggedIn: false,
    hasCompletedBodyScan: false,
    lastScanDate: null,
    metrics: null,
    // Detailed profile for AI
    profile: {
      age: "24",
      gender: "Female",
      height: "172cm",
      weight: "68kg",
      goal: "recomposition",
      experience: "intermediate",
      dietType: "mixed",
      medicalConditions: "none"
    },
    aiPlan: null,
    notificationsEnabled: true,
    language: "English"
  });

  // Load state from localStorage on mount (mocking persistence)
  useEffect(() => {
    const saved = localStorage.getItem('fitmorph_user');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Aggressive Migration: Clear any old hardcoded or generic names to ensure accurate personalization
        const staleNames = ['Sarah', 'Sahra', 'Demo User', 'Warrior', 'Google User', 'Apple User'];
        if (staleNames.some(n => parsed.name && parsed.name.toLowerCase().includes(n.toLowerCase()))) {
          parsed.name = '';
        }
        setUser(parsed);
      } catch (e) {
        console.error("Failed to load user state", e);
      }
    }
  }, []);

  // Save to localStorage whenever user state changes
  useEffect(() => {
    localStorage.setItem('fitmorph_user', JSON.stringify(user));
  }, [user]);

  const login = (userData = {}) => setUser(prev => ({ 
    ...prev, 
    ...userData, 
    isLoggedIn: true 
  }));
  const logout = () => {
    setUser({ 
      name: '', 
      email: '',
      isLoggedIn: false, 
      hasCompletedBodyScan: false, 
      lastScanDate: null,
      metrics: null,
      profile: {
        age: "", gender: "", height: "", weight: "", goal: "", 
        experience: "", dietType: "", medicalConditions: ""
      },
      aiPlan: null,
      notificationsEnabled: true,
      language: "English"
    });
    localStorage.removeItem('fitmorph_user');
  };
  
  const completeBodyScan = (metrics) => {
    setUser(prev => ({ ...prev, hasCompletedBodyScan: true, metrics }));
  };

  const saveScanResult = (metrics, plan) => {
    setUser(prev => ({ 
      ...prev, 
      hasCompletedBodyScan: true, 
      lastScanDate: Date.now(),
      metrics, 
      aiPlan: plan 
    }));
  };

  const setAiPlan = (plan) => {
    setUser(prev => ({ ...prev, aiPlan: plan }));
  };

  const updateProfile = (profileData) => {
    setUser(prev => ({ ...prev, profile: { ...prev.profile, ...profileData } }));
  };

  const toggleNotifications = () => {
    setUser(prev => ({ ...prev, notificationsEnabled: !prev.notificationsEnabled }));
  };

  const setLanguage = (lang) => {
    setUser(prev => ({ ...prev, language: lang }));
  };

  return (
    <UserContext.Provider value={{ user, login, logout, completeBodyScan, saveScanResult, updateProfile, setAiPlan, toggleNotifications, setLanguage }}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
