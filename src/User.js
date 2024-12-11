import React, { useState, useEffect } from "react";
import "./User.css";
import axios from "axios";

const User = () => {
  const [user, setUser] = useState(null); // User data from localStorage
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState(null); // Temporarily edited user data
  const [error, setError] = useState(null);

  const localities = [
    "White Town", "Muthialpet", "Lawspet", "Reddiarpalayam", "Ouppalam", "Auroville", 
    "Serenity Beach", "Chinna Veerampattinam", "Kottakuppam", "Mudaliarpet", 
    "Ariyankuppam", "Thavalakuppam", "Kuyavarpalayam", "Villiyanur", 
    "Thirubuvanai", "Karuvadikuppam", "Bahour"
  ];

  // Load user from localStorage
  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
      setEditedUser({ ...storedUser });
    } else {
      setError("User not found in localStorage.");
    }
  }, []);

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  // Save changes to localStorage and call API
  const handleSave = async () => {
    try {
      // Update localStorage
      localStorage.setItem("user", JSON.stringify(editedUser));
      setUser(editedUser);

      // Call API endpoint to update user details
      const response = await axios.post(
        "http://localhost:5001/api/update-user",
        editedUser
      );

      console.log("User updated successfully:", response.data);
      setIsEditing(false);
    } catch (err) {
      console.error("Error updating user:", err);
      setError("Failed to update user details. Please try again.");
    }
  };

  // Cancel editing
  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  if (!user) {
    return <p>Loading user details...</p>;
  }

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-container">
        <img
          src={user.profileImage || "./man-user-circle-icon.png"}
          alt="Profile"
          className="profile-images"
        />
        <div className="profile-details">
          {isEditing ? (
            <>
              <label>
                Username:
                <input
                  type="text"
                  name="name"
                  value={editedUser.name}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Email:
                <input
                  type="email"
                  name="email"
                  value={editedUser.email}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Phone No:
                <input
                  type="text"
                  name="phone_no"
                  value={editedUser.phone_no}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Type:
                <select
                  name="type"
                  value={editedUser.type}
                  onChange={handleInputChange}
                >
                  <option value="student">Student</option>
                  <option value="single_men">Single Men</option>
                  <option value="family">Family</option>
                  <option value="commercial">Commercial Buyer</option>
                  <option value="Owner">Owner</option>
                </select>
              </label>
              <label>
                DOB:
                <input
                  type="date"
                  name="dob"
                  value={editedUser.dob.split("T")[0]} // Format the date
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Locality:
                <select
                  name="locality"
                  value={editedUser.locality}
                  onChange={handleInputChange}
                >
                  {localities.map((locality) => (
                    <option key={locality} value={locality}>
                      {locality}
                    </option>
                  ))}
                </select>
              </label>
              <div className="action-buttons">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p><strong>Username:</strong> {user.name}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone No:</strong> {user.phone_no}</p>
              <p><strong>Type:</strong> {user.type}</p>
              <p><strong>DOB:</strong> {user.dob.split("T")[0]}</p>
              <p><strong>Locality:</strong> {user.locality}</p>
              <button
                className="edit-button"
                onClick={() => setIsEditing(true)}
              >
                Edit User Info
              </button>
              <button className="reset-password-button">
                Reset Password
              </button>
            </>
          )}
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default User;
