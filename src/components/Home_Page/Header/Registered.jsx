import React from "react";
import "./registered.css";

const events = [
  {
    id: 1,
    image: "https://via.placeholder.com/300x200",
    name: "Event Name 1",
    organizers: "Organizer 1",
    date: "DD/MM/YYYY",
    time: "HH:MM",
    venue: "Venue 1",
    status: "Upcoming",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/300x200",
    name: "Event Name 2",
    organizers: "Organizer 2",
    date: "DD/MM/YYYY",
    time: "HH:MM",
    venue: "Venue 2",
    status: "Tomorrow",
  },
];

const Registered = () => {
  return (
    <div className="registered-container">
      <div className="registered-header">
        <h1>My Registered Events</h1>
        <button className="menu-btn">
          <span className="hamburger">&#9776;</span>
        </button>
      </div>

      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="event-image-container">
              <img src={event.image} alt={event.name} className="event-image" />
              <span className="event-status">{event.status}</span>
            </div>

            <div className="event-details">
              <h2 className="event-name">{event.name}</h2>
              <div className="event-info">
                <div className="info-item">
                  <i className="fas fa-users"></i>
                  <span>{event.organizers}</span>
                </div>
                <div className="info-item">
                  <i className="fas fa-calendar"></i>
                  <span>{event.date}</span>
                </div>
                <div className="info-item">
                  <i className="fas fa-clock"></i>
                  <span>{event.time}</span>
                </div>
                <div className="info-item">
                  <i className="fas fa-map-marker-alt"></i>
                  <span>{event.venue}</span>
                </div>
              </div>
            </div>

            <button
              className="notification-btn"
              title="Toggle notifications"
            >
              <i className="fas fa-bell"></i>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Registered;
