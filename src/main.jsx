import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { UserProvider } from './contexts/UserContext.jsx'

try {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
      <UserProvider>
        <App />
      </UserProvider>
    </React.StrictMode>,
  )
} catch (error) {
  console.error('Top-level render error:', error);
  document.body.innerHTML = `<div style="padding: 20px; color: white; background: #140f23; height: 100vh;">
    <h1>Application Error</h1>
    <p>The application failed to start. Please check the console for details.</p>
    <pre style="background: rgba(255,255,255,0.1); padding: 10px; border-radius: 8px;">${error.message}</pre>
  </div>`;
}
