import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import "./Signup.css";

function Signup() {
  const navigate = useNavigate(); 
  const { login, isAuthenticated } = useAuth();

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
  }, [isAuthenticated, navigate]);

  const handleLoginSuccess = async (credentialResponse) => {
    const credential = credentialResponse.credential;
    console.log("Encoded JWT ID token: " + credential);

    const decodedToken = jwtDecode(credential);
    console.log("Decoded User Information:", decodedToken);

    // Send token to backend to store/retrieve user
    try {
      const response = await fetch('http://localhost:3001/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ token: credential }),
      });
      if (response.ok) {
        const user = await response.json();
        console.log('User stored in DB:', user);
        
        // Set user in context (this will also store in localStorage)
        login(user);
        
        navigate('/home');
      } else {
        const error = await response.json();
        console.error('Backend error:', error);
      }
    } catch (err) {
      console.error('Network error:', err);
    }
  };

  const handleLoginError = () => {
    console.log('Login Failed');
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="welcome-section">
          <h1>
            Welcome <br /> to CMRIT Clubs
          </h1>
        </div>
        <div className="form-section">
          <form>
            <GoogleLogin
              onSuccess={handleLoginSuccess}
              onError={handleLoginError}
              useOneTap
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;