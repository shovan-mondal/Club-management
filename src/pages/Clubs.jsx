import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Clubs.css';

const Clubs = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentTechIndex, setCurrentTechIndex] = useState(0);
  const [currentNonTechIndex, setCurrentNonTechIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const technicalClubs = [
    'CodeCraft Club',
    'AI & ML Society',
    'Robotics Club',
    'Web Development Club',
    'Cybersecurity Club',
    'Data Science Club',
    'Game Development Club',
    'IoT Innovation Club'
  ];

  const nonTechnicalClubs = [
    'Literature Club',
    'Music Society',
    'Dance Club',
    'Drama Club',
    'Photography Club',
    'Art & Craft Club',
    'Debate Society',
    'Sports Club',
    'Environmental Club',
    'Social Service Club'
  ];

  // Auto-slide functionality for technical clubs
  useEffect(() => {
    const techInterval = setInterval(() => {
      setCurrentTechIndex((prevIndex) => 
        prevIndex === technicalClubs.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(techInterval);
  }, [technicalClubs.length]);

  // Auto-slide functionality for non-technical clubs
  useEffect(() => {
    const nonTechInterval = setInterval(() => {
      setCurrentNonTechIndex((prevIndex) => 
        prevIndex === nonTechnicalClubs.length - 1 ? 0 : prevIndex + 1
      );
    }, 3500);

    return () => clearInterval(nonTechInterval);
  }, [nonTechnicalClubs.length]);

  const nextTechClub = () => {
    setCurrentTechIndex((prevIndex) => 
      prevIndex === technicalClubs.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTechClub = () => {
    setCurrentTechIndex((prevIndex) => 
      prevIndex === 0 ? technicalClubs.length - 1 : prevIndex - 1
    );
  };

  const nextNonTechClub = () => {
    setCurrentNonTechIndex((prevIndex) => 
      prevIndex === nonTechnicalClubs.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevNonTechClub = () => {
    setCurrentNonTechIndex((prevIndex) => 
      prevIndex === 0 ? nonTechnicalClubs.length - 1 : prevIndex - 1
    );
  };

  const handleInterested = async (clubName, clubType) => {
    if (!user) {
      alert('Please log in to show interest in clubs');
      return;
    }

    console.log('Full user context object:', user);
    console.log('Available keys:', Object.keys(user));

    const userId = user.user?._id || user._id || user.user?.googleId || user.googleId || user.id;
    
    console.log('Extracted userId:', userId);
    
    if (!userId) {
      alert('Error: User ID not found. Please try logging in again.');
      console.error('User object missing ID field:', user);
      return;
    }

    setLoading(true);
    
    try {
      const requestBody = {
        userId: userId,
        clubName: clubName,
        clubType: clubType
      };

      console.log('Sending request with data:', requestBody);

      const response = await fetch('http://localhost:3001/api/interested/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        alert(`✅ ${data.message}`);
        console.log('Interest saved successfully:', data.interest);
      } else {
        // Handle specific error cases
        if (response.status === 409) {
          alert(`ℹ️ ${data.message}`);
        } else {
          alert(`❌ Error: ${data.message}`);
        }
        console.error('Error saving interest:', data);
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('❌ Network error. Please check if the server is running and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="clubs-container">
      <button 
        className="back-button"
        onClick={() => navigate('/home')}
      >
        ← Back to Home
      </button>
      
      <div className="clubs-header">
        <h1 className="clubs-title">CMRIT Clubs</h1>
        <p className="clubs-subtitle">Discover your passion and join like-minded students</p>
      </div>

      <div className="clubs-sections">
        {/* Technical Clubs Section */}
        <div className="club-section technical-section">
          <div className="section-header">
            <h2 className="section-title">Technical Clubs</h2>
          </div>
          
          <div className="slider-container">
            <button className="slider-btn prev-btn" onClick={prevTechClub}>
              ❮
            </button>
            
            <div className="club-slider">
              <div className="club-card">
                <h3 className="club-name">{technicalClubs[currentTechIndex]}</h3>
                <div className="club-description">
                  Enhance your technical skills and innovate with technology
                </div>
                <button 
                  className="interested-btn"
                  onClick={() => handleInterested(technicalClubs[currentTechIndex], 'Technical')}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Interested'}
                </button>
              </div>
            </div>
            
            <button className="slider-btn next-btn" onClick={nextTechClub}>
              ❯
            </button>
          </div>
          
          <div className="slider-dots">
            {technicalClubs.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentTechIndex ? 'active' : ''}`}
                onClick={() => setCurrentTechIndex(index)}
              ></span>
            ))}
          </div>
        </div>

        {/* Non-Technical Clubs Section */}
        <div className="club-section non-technical-section">
          <div className="section-header">
            <h2 className="section-title">Non-Technical Clubs</h2>
          </div>
          
          <div className="slider-container">
            <button className="slider-btn prev-btn" onClick={prevNonTechClub}>
              ❮
            </button>
            
            <div className="club-slider">
              <div className="club-card">
                <h3 className="club-name">{nonTechnicalClubs[currentNonTechIndex]}</h3>
                <div className="club-description">
                  Express your creativity and explore your artistic side
                </div>
                <button 
                  className="interested-btn"
                  onClick={() => handleInterested(nonTechnicalClubs[currentNonTechIndex], 'Non-Technical')}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Interested'}
                </button>
              </div>
            </div>
            
            <button className="slider-btn next-btn" onClick={nextNonTechClub}>
              ❯
            </button>
          </div>
          
          <div className="slider-dots">
            {nonTechnicalClubs.map((_, index) => (
              <span
                key={index}
                className={`dot ${index === currentNonTechIndex ? 'active' : ''}`}
                onClick={() => setCurrentNonTechIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Clubs;