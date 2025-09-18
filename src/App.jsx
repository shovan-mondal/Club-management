// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './context/AuthContext';
import Signup from './SignupPage/Signup';
import ProtectedRoute from './components/ProtectedRoute'; 
import Home from './components/Home_Page/Home';
import Clubs from './pages/Clubs'
function App() {
  // Use import.meta.env for client-side environment variables in Vite
  const googleClientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;

  if (!googleClientId) {
    console.error("Missing Google Client ID. Please set VITE_GOOGLE_CLIENT_ID in your .env file.");
    return <div>Error: Google Client ID is not configured.</div>;
  }

  return (
    <GoogleOAuthProvider clientId={googleClientId}>
      <AuthProvider>
        <Router>
          <div className="App">
            <Routes>
              <Route path="/login" element={<Signup />} />
              <Route path="/home" element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              } />
              <Route path="/clubs" element={
                <ProtectedRoute>
                  <Clubs />
                </ProtectedRoute>
              } />
              <Route path="/" element={<Signup />} /> 
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;