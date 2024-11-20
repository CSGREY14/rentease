import React, { useState } from 'react';
import './User.css';

const User = () => {
  // Stub user data
  const [user, setUser] = useState({
    profileImage: './man-user-circle-icon.png', // Default profile image
    username: 'John Doe',
    email: 'john.doe@example.com',
    phoneNo: '123-456-7890',
    type: 'Family',
    dob: '1990-01-01',
    locality: 'New York',
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({ ...user });

  // Handle form field changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser({ ...editedUser, [name]: value });
  };

  // Save changes
  const handleSave = () => {
    setUser(editedUser);
    setIsEditing(false);
  };

  // Cancel editing
  const handleCancel = () => {
    setEditedUser({ ...user });
    setIsEditing(false);
  };

  return (
    <div className="user-profile">
      <h2>User Profile</h2>
      <div className="profile-container">
        <img
          src={user.profileImage}
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
                  name="username"
                  value={editedUser.username}
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
                  name="phoneNo"
                  value={editedUser.phoneNo}
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
                  <option value="Family">Family</option>
                  <option value="Single">Single</option>
                </select>
              </label>
              <label>
                DOB:
                <input
                  type="date"
                  name="dob"
                  value={editedUser.dob}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Locality:
                <input
                  type="text"
                  name="locality"
                  value={editedUser.locality}
                  onChange={handleInputChange}
                />
              </label>
              <div className="action-buttons">
                <button onClick={handleSave}>Save</button>
                <button onClick={handleCancel}>Cancel</button>
              </div>
            </>
          ) : (
            <>
              <p><strong>Username:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone No:</strong> {user.phoneNo}</p>
              <p><strong>Type:</strong> {user.type}</p>
              <p><strong>DOB:</strong> {user.dob}</p>
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
    </div>
  );
};

export default User;
