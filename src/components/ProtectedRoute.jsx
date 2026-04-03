import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../contexts/UserContext.jsx';

export default function ProtectedRoute() {
  const { user } = useUser();
  
  const isScanExpired = user.lastScanDate && (Date.now() - user.lastScanDate > 7 * 24 * 60 * 60 * 1000);

  if (!user.hasCompletedBodyScan || isScanExpired) {
    const message = !user.hasCompletedBodyScan 
      ? "Please upload your full body image to continue." 
      : "Your 7-day transformation cycle has ended. A new scan is required for updated plans.";
    
    window.alert(message);
    return <Navigate to="/scan" replace />;
  }

  return <Outlet />;
}
