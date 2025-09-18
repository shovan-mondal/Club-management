import React from "react";
import "./interested.css";

const events = [
  {
    id: 1,
    image: "https://via.placeholder.com/120x180",
    name: "Event Name 1",
    organizers: "Organizer 1",
    lastDay: false,
  },
  {
    id: 2,
    image: "https://via.placeholder.com/120x180",
    name: "Event Name 2",
    organizers: "Organizer 2",
    lastDay: false,
  },
  {
    id: 3,
    image: "https://via.placeholder.com/120x180",
    name: "Event Name 3",
    organizers: "Organizer 3",
    lastDay: true, // badge on this card
  },
  {
    id: 4,
    image: "https://via.placeholder.com/120x180",
    name: "Event Name 4",
    organizers: "Organizer 4",
    lastDay: false,
  },
];

const Interested = () => {
  return (
    <div className="interested-container">
      <div className="interested-header">
        <h2>Interests</h2>
        <div className="hamburger">&#9776;</div>
      </div>

      <div className="events-grid">
        {events.map((event) => (
          <div key={event.id} className="event-card">
            <div className="image-wrapper">
              {event.lastDay && <div className="badge">Last day to register</div>}
              <img src={event.image} alt={event.name} className="event-image" />
            </div>
            <p className="event-text"><strong>Event Name:</strong> {event.name}</p>
            <p className="event-text"><strong>Organizers:</strong> {event.organizers}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Interested;
