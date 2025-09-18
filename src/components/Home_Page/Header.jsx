import React, { useState } from "react";
import "./Header.css";
const Header = () => {
  const [showCalendar, setShowCalendar] = useState(false);

  return (
    <header className="header">
      {/* Logo */}
      <div className="logo">
        <img src="/logo.png" alt="CMRIT Logo" />
      </div>

      {/* Nav Links */}
      <nav className="nav-links">
        <a href="#">HOME</a>
        <a href="#">CLUBS</a>
      </nav>

      {/* Search Bar */}
      <div className="search-container">
        <input type="text" placeholder="SEARCH" />
        
        {/* Calendar */}
        <span 
          className="calendar-icon" 
          onClick={() => setShowCalendar(!showCalendar)}
        >
          📅
        </span>
        {showCalendar && (
          <input 
            type="date" 
            className="calendar-picker"
            onChange={(e) => console.log("Selected date:", e.target.value)}
          />
        )}
      </div>

      {/* Hamburger Menu with Dropdown */}
      <div className="menu-container">
        <div className="menu-icon">
          ☰
        </div>
        <div className="dropdown">
          <ul>
            <li>Profile</li>
            <li>Registered</li>
            <li>Interested</li>
            <li>Achievements</li>
            <li>Leaderboard</li>
            <li>Settings</li>
          </ul>
        </div>
      </div>
    </header>
    
  );
};

export default Header;
