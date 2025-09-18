import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';
import { useAuth } from '../context/AuthContext';
import "./Signup.css";

function Signup() {
  const navigate = useNavigate(); 
  const { login, isAuthenticated } = useAuth();
  const [activeTab, setActiveTab] = useState('student');
  const [adminForm, setAdminForm] = useState({
    username: '',
    password: ''
  });

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

  const handleAdminInputChange = (e) => {
    setAdminForm({
      ...adminForm,
      [e.target.name]: e.target.value
    });
  };

  const handleAdminSubmit = (e) => {
    e.preventDefault();
    
    // Check admin credentials
    if (adminForm.username === 'admin' && adminForm.password === 'admin') {
      console.log('Admin login successful');
      // Redirect to admin page
      navigate('/admin');
    } else {
      console.log('Invalid admin credentials');
      alert('Invalid username or password. Please use "admin" for both username and password.');
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="welcome-section">
          <h1>
            Welcome <br /> to CMRIT Clubs
          </h1>
          <p className="welcome-subtitle">
            Connect, Explore, and Join the Clubs that Match Your Interests
          </p>
        </div>
        
        <div className="form-section">
          {/* Tab Navigation */}
          <div className="login-tabs">
            <button 
              className={`tab-button ${activeTab === 'student' ? 'active' : ''}`}
              onClick={() => setActiveTab('student')}
            >
              Student Login
            </button>
            <button 
              className={`tab-button ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
            >
              Admin Login
            </button>
          </div>

          {/* Student Login */}
          {activeTab === 'student' && (
            <div className="login-content student-login">
              <h3>Student Access</h3>
              <p>Sign in with your institutional Google account</p>
              <div className="google-login-wrapper">
                <GoogleLogin
                  onSuccess={handleLoginSuccess}
                  onError={handleLoginError}
                  useOneTap
                />
              </div>
            </div>
          )}

          {/* Admin Login */}
          {activeTab === 'admin' && (
            <div className="login-content admin-login">
              <h3>Administrator Access</h3>
              <p>Manage clubs and student activities</p>
              <form onSubmit={handleAdminSubmit} className="admin-form">
                <div className="input-group">
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={adminForm.username}
                    onChange={handleAdminInputChange}
                    required
                  />
                </div>
                <div className="input-group">
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={adminForm.password}
                    onChange={handleAdminInputChange}
                    required
                  />
                </div>
                <button type="submit" className="admin-login-btn">
                  Sign In as Admin
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Signup;