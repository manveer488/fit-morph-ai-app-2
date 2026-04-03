import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute.jsx';

// Screens
import Welcome from './screens/Welcome.jsx';
import KeyBenefits from './screens/KeyBenefits.jsx';
import Join from './screens/Join.jsx';
import EmailAuthScreen from './screens/EmailAuthScreen.jsx';
import GoogleAuthHandler from './screens/GoogleAuthHandler.jsx';
import AppleAuthHandler from './screens/AppleAuthHandler.jsx';
import BodyScan from './screens/BodyScan.jsx';
import Dashboard from './screens/Dashboard.jsx';
import WorkoutPlan from './screens/WorkoutPlan.jsx';
import DietPlan from './screens/DietPlan.jsx';
import Progress from './screens/Progress.jsx';
import Settings from './screens/Settings.jsx';
import PrivacyPolicy from './screens/PrivacyPolicy.jsx';
import HelpCenter from './screens/HelpCenter.jsx';

// Simple Error Boundary Component
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', color: 'white', background: '#140f23', height: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
          <h1 style={{ color: '#6e3dff' }}>Component Error</h1>
          <p>Something went wrong in this section of the app.</p>
          <pre style={{ background: 'rgba(255,255,255,0.05)', padding: '15px', borderRadius: '12px', maxWidth: '90%', overflow: 'auto', fontSize: '12px' }}>
            {this.state.error?.message}
          </pre>
          <button 
            onClick={() => window.location.reload()}
            style={{ marginTop: '20px', padding: '12px 24px', background: '#00f2ff', color: '#140f23', border: 'none', borderRadius: '50px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Reload Application
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/benefits" element={<KeyBenefits />} />
          <Route path="/join" element={<Join />} />
          <Route path="/auth/email" element={<EmailAuthScreen />} />
          <Route path="/auth/google" element={<GoogleAuthHandler />} />
          <Route path="/auth/apple" element={<AppleAuthHandler />} />
          <Route path="/scan" element={<BodyScan />} />
          
          {/* Protected Routes - require body scan */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/workout" element={<WorkoutPlan />} />
            <Route path="/diet" element={<DietPlan />} />
            <Route path="/plan" element={<WorkoutPlan />} />
            <Route path="/progress" element={<Progress />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/help" element={<HelpCenter />} />
          </Route>
          
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
