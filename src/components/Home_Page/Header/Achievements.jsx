import React from "react";
import "./achievements.css";

const achievements = [
  {
    id: 1,
    certificate: "https://via.placeholder.com/120x90", // Replace with certificate image
    event: "Event Name 1",
    achievement: "Achievement 1",
    file: "#", // link to download certificate
  },
  {
    id: 2,
    certificate: "https://via.placeholder.com/120x90",
    event: "Event Name 2",
    achievement: "Achievement 2",
    file: "#",
  },
  {
    id: 3,
    certificate: "https://via.placeholder.com/120x90",
    event: "Event Name 3",
    achievement: "Achievement 3",
    file: "#",
  },
];

const Achievements = () => {
  const handleDownload = (file) => {
    // Add download logic here
    window.open(file, "_blank");
  };

  return (
    <div className="achievements-container">
      <div className="achievements-header">
        <div className="title">
          <span className="medal">🏅</span>
          <h2>ACHIEVEMENTS</h2>
        </div>
        <div className="hamburger">&#9776;</div>
      </div>

      {achievements.map((item) => (
        <div className="achievement-card" key={item.id}>
          <img
            src={item.certificate}
            alt={item.event}
            className="certificate-img"
          />

          <div className="achievement-info">
            <p><strong>{item.event}</strong></p>
            <p>{item.achievement}</p>
          </div>

          <button
            className="download-btn"
            onClick={() => handleDownload(item.file)}
          >
            Download
          </button>
        </div>
      ))}
    </div>
  );
};

export default Achievements;
