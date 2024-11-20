import React, { useState } from 'react';
import './UserManagement.css';

const initialUsers = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    phone: "123-456-7890",
    type: "Family",
    dob: "1990-05-12",
    locality: "New York",
    rating: 4.5,
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@example.com",
    phone: "987-654-3210",
    type: "Single",
    dob: "1995-08-25",
    locality: "Aspen",
    rating: 4.8,
  },
];

const UserManagement = () => {
  const [users, setUsers] = useState(initialUsers);
  const [newUser, setNewUser] = useState({
    id: "",
    name: "",
    email: "",
    phone: "",
    type: "",
    dob: "",
    locality: "",
    rating: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const addUser = () => {
    if (
      !newUser.id ||
      !newUser.name ||
      !newUser.email ||
      !newUser.phone ||
      !newUser.type ||
      !newUser.dob ||
      !newUser.locality
    ) {
      alert("Please fill out all fields!");
      return;
    }
    setUsers([...users, { ...newUser, rating: 0 }]);
    setNewUser({
      id: "",
      name: "",
      email: "",
      phone: "",
      type: "",
      dob: "",
      locality: "",
      rating: 0,
    });
  };

  const deleteUser = (id) => {
    const updatedUsers = users.filter((user) => user.id !== id);
    setUsers(updatedUsers);
  };

  return (
    <div className="user-management">
      <h2>User Management</h2>
      
      {/* Add User Form */}
      <div className="add-user-form">
        <h3>Add New User</h3>
        <input
          type="number"
          name="id"
          placeholder="ID"
          value={newUser.id}
          onChange={handleInputChange}
        />
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
          name="phone"
          placeholder="Phone"
          value={newUser.phone}
          onChange={handleInputChange}
        />
        <select
          name="type"
          value={newUser.type}
          onChange={handleInputChange}
        >
          <option value="">Select Type</option>
          <option value="Family">Family</option>
          <option value="Single">Single</option>
        </select>
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          value={newUser.dob}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="locality"
          placeholder="Locality"
          value={newUser.locality}
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
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Type</th>
              <th>DOB</th>
              <th>Locality</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>{user.type}</td>
                <td>{user.dob}</td>
                <td>{user.locality}</td>
                <td>{user.rating} ⭐</td>
                <td>
                  <button
                    className="delete-btn"
                    onClick={() => deleteUser(user.id)}
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
