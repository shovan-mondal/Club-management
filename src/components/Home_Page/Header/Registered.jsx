import React from "react";
import "./registered.css";

const events = [
  {
    id: 1,
    image: "https://via.placeholder.com/100x150", // Replace with your event image URL
    name: "Event Name 1",
    organizers: "Organizer 1",
    date: "DD/MM/YYYY",
    time: "HH:MM",
    venue: "Venue 1",
  },
  {
    id: 2,
    image: "https://via.placeholder.com/100x150", // Replace with your event image URL
    name: "Event Name 2",
    organizers: "Organizer 2",
    date: "DD/MM/YYYY",
    time: "HH:MM",
    venue: "Venue 2",
  },
];

const Registered = () => {
  return (
    <div className="registered-container">
      <div className="registered-header">
        <h2>REGISTERED</h2>
        <div className="hamburger">&#9776;</div>
      </div>

      {events.map((event) => (
        <div key={event.id} className="event-card">
          <img src={event.image} alt={event.name} className="event-image" />

          <div className="event-details">
            <p><strong>Event Name:</strong> {event.name}</p>
            <p><strong>Organizers:</strong> {event.organizers}</p>
            <p><strong>Date:</strong> {event.date}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Venue:</strong> {event.venue}</p>
          </div>

          <div className="notification-bell">🔔</div>
        </div>
      ))}
    </div>
  );
};

export default Registered;
