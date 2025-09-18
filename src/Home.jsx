import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import "./SignupPage/Signup.css";

function Home() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleViewClubs = () => {
    navigate('/clubs');
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="welcome-section">
          <h1>
            Welcome to <br /> CMRIT Clubs
          </h1>
          {user && (
            <div style={{ marginTop: '20px', textAlign: 'center' }}>
              <div style={{ marginBottom: '15px' }}>
                {user.imageUrl && (
                  <img 
                    src={user.imageUrl} 
                    alt="Profile" 
                    style={{ 
                      width: '60px', 
                      height: '60px', 
                      borderRadius: '50%',
                      marginBottom: '10px'
                    }} 
                  />
                )}
                <p style={{ margin: '5px 0', fontSize: '18px', fontWeight: 'bold' }}>
                  {user.name}
                </p>
                <p style={{ margin: '5px 0', fontSize: '14px', color: '#666' }}>
                  {user.email}
                </p>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', marginTop: '20px' }}>
                <button 
                  onClick={handleViewClubs}
                  style={{
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    padding: '12px 24px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    width: '200px'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
                >
                  Explore Clubs
                </button>
                <button 
                  onClick={handleLogout}
                  style={{
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    fontSize: '16px',
                    width: '200px'
                  }}
                  onMouseOver={(e) => e.target.style.backgroundColor = '#c82333'}
                  onMouseOut={(e) => e.target.style.backgroundColor = '#dc3545'}
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;