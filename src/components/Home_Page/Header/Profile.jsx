import React, { useState } from "react";
import "./profile.css";

const Profile = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    department: "",
    semester: "",
    email: "",
    usn: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
    // Add save logic here (API call or localStorage)
  };

  return (
    <div className="profile-container">
      <div className="profile-card">
        <h2 className="profile-title">PROFILE</h2>

        <div className="profile-avatar">
          <i className="fas fa-user"></i>
        </div>

        <form className="profile-form" onSubmit={handleSubmit}>
          <label>First name:*</label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
          />

          <label>Last name:*</label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
          />

          <label>Department:*</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          />

          <label>Semester:*</label>
          <input
            type="text"
            name="semester"
            value={formData.semester}
            onChange={handleChange}
            required
          />

          <label>E-mail ID:*</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />

          <label>USN:*</label>
          <input
            type="text"
            name="usn"
            value={formData.usn}
            onChange={handleChange}
            required
          />

          <button type="submit" className="save-btn">SAVE</button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
