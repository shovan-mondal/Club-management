import React from "react";
import "./Footer.css";
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>About Us</h3>
          <p>We are dedicated to creating memorable experiences and fostering community engagement through various club activities and events.</p>
        </div>

        <div className="footer-section">
          <h3>Contact Info</h3>
          <div className="contact-item">
            <FaMapMarkerAlt className="icon" />
            <p>123 College Street, Bangalore, Karnataka 560001</p>
          </div>
          <div className="contact-item">
            <FaEnvelope className="icon" />
            <p>contact@clubmanagement.com</p>
          </div>
          <div className="contact-item">
            <FaPhone className="icon" />
            <p>+91 98765 43210</p>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/gallery">Gallery</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-links">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook className="social-icon" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <FaTwitter className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="social-icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} Club Management. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
