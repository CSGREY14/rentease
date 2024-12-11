import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserManagement.css';

const localities = [
  "White Town", "Muthialpet", "Lawspet", "Reddiarpalayam", "Ouppalam", "Auroville",
  "Serenity Beach", "Chinna Veerampattinam", "Kottakuppam", "Mudaliarpet",
  "Ariyankuppam", "Thavalakuppam", "Kuyavarpalayam", "Villiyanur",
  "Thirubuvanai", "Karuvadikuppam", "Bahour"
];

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phone_no: "",
    type: "",
    dob: "",
    locality: "",
    password: "",
  });

  useEffect(() => {
    axios
      .get('http://localhost:5001/api/users')
      .then((response) => setUsers(response.data))
      .catch((error) => console.error('Error fetching users:', error));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addUser = () => {
    if (
      !newUser.name ||
      !newUser.email ||
      !newUser.phone_no ||
      !newUser.type ||
      !newUser.dob ||
      !newUser.locality ||
      !newUser.password
    ) {
      alert('Please fill out all fields!');
      return;
    }

    axios
      .post('http://localhost:5000/signup', newUser)
      .then((response) => {
        if (response.data.status === 'success') {
          alert(response.data.message);
          setUsers([...users, { ...newUser }]);
          setNewUser({
            name: "",
            email: "",
            phone_no: "",
            type: "",
            dob: "",
            locality: "",
            password: "",
          });
        } else {
          alert(response.data.message || 'Failed to add user.');
        }
      })
      .catch((error) => {
        console.error('Error adding user:', error);
        alert('Failed to add user.');
      });
  };

  const deleteUser = (name) => {
    axios
      .delete(`http://localhost:5001/api/users/${name}`)
      .then((response) => {
        alert(response.data.message);
        setUsers(users.filter((user) => user.name !== name));
      })
      .catch((error) => console.error('Error deleting user:', error));
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>

      {/* Add User Form */}
      <div className="add-user-form">
        <h3>Add New User</h3>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={newUser.name}
          onChange={handleInputChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={newUser.email}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="phone_no"
          placeholder="Phone"
          value={newUser.phone_no}
          onChange={handleInputChange}
        />
        <select name="type" value={newUser.type} onChange={handleInputChange}>
          <option value="">Select Type</option>
          <option value="student">Student</option>
          <option value="single_men">Single Men</option>
          <option value="family">Family</option>
          <option value="commercial">Commercial Buyer</option>
          <option value="Owner">Owner</option>
          <option value="Admin">Admin</option>
        </select>
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={newUser.dob}
          onChange={handleInputChange}
        />
        <select name="locality" value={newUser.locality} onChange={handleInputChange}>
          <option value="">Select Locality</option>
          {localities.map((locality, index) => (
            <option key={index} value={locality}>
              {locality}
            </option>
          ))}
        </select>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={newUser.password}
          onChange={handleInputChange}
        />
        <button onClick={addUser}>Add User</button>
      </div>

      {/* User List Table */}
      <div className="user-list">
        <h3>All Users</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Type</th>
              <th>DOB</th>
              <th>Locality</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.email}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone_no}</td>
                <td>{user.type}</td>
                <td>{user.dob.split('T')[0]}</td>
                <td>{user.locality}</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user.name)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
