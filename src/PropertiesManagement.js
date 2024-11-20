import React, { useState } from "react";
import "./PropertiesManagement.css";

const initialProperties = [
  {
    id: 1,
    name: "Cozy Cabin",
    location: "Aspen, CO",
    type: "Residential",
    price: "$1200/month",
    status: "Available",
    rating: 4.5,
  },
  {
    id: 2,
    name: "Luxury Apartment",
    location: "Los Angeles, CA",
    type: "Residential",
    price: "$2500/month",
    status: "Rented",
    rating: 4.8,
  },
];

const PropertiesManagement = () => {
  const [properties, setProperties] = useState(initialProperties);
  const [newProperty, setNewProperty] = useState({
    id: "",
    name: "",
    location: "",
    type: "",
    price: "",
    status: "Available",
    rating: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const addProperty = () => {
    if (
      !newProperty.id ||
      !newProperty.name ||
      !newProperty.location ||
      !newProperty.type ||
      !newProperty.price
    ) {
      alert("Please fill out all fields!");
      return;
    }
    setProperties([...properties, { ...newProperty }]);
    setNewProperty({
      id: "",
      name: "",
      location: "",
      type: "",
      price: "",
      status: "Available",
      rating: 0,
    });
  };

  const deleteProperty = (id) => {
    const updatedProperties = properties.filter((property) => property.id !== id);
    setProperties(updatedProperties);
  };

  const editProperty = (id) => {
    const propertyToEdit = properties.find((property) => property.id === id);
    setNewProperty(propertyToEdit);
    deleteProperty(id);
  };

  return (
    <div className="properties-management">
      <h2>Properties Management</h2>

      {/* Add/Edit Property Form */}
      <div className="add-property-form">
        <h3>{newProperty.id ? "Edit Property" : "Add New Property"}</h3>
        <input
          type="number"
          name="id"
          placeholder="Property ID"
          value={newProperty.id}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="name"
          placeholder="Property Name"
          value={newProperty.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newProperty.location}
          onChange={handleInputChange}
        />
        <select name="type" value={newProperty.type} onChange={handleInputChange}>
          <option value="">Select Type</option>
          <option value="Residential">Residential</option>
          <option value="Commercial">Commercial</option>
          <option value="PG">PG</option>
        </select>
        <input
          type="text"
          name="price"
          placeholder="Price (e.g., $1200/month)"
          value={newProperty.price}
          onChange={handleInputChange}
        />
        <select name="status" value={newProperty.status} onChange={handleInputChange}>
          <option value="Available">Available</option>
          <option value="Rented">Rented</option>
        </select>
        <input
          type="number"
          name="rating"
          placeholder="Rating"
          value={newProperty.rating}
          onChange={handleInputChange}
        />
        <button onClick={addProperty}>
          {newProperty.id ? "Update Property" : "Add Property"}
        </button>
      </div>

      {/* Properties List */}
      <div className="properties-list">
        <h3>All Properties</h3>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Type</th>
              <th>Price</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {properties.map((property) => (
              <tr key={property.id}>
                <td>{property.id}</td>
                <td>{property.name}</td>
                <td>{property.location}</td>
                <td>{property.type}</td>
                <td>{property.price}</td>
                <td>{property.status}</td>
                <td>{property.rating} ⭐</td>
                <td>
                  <button onClick={() => editProperty(property.id)}>Edit</button>
                  <button onClick={() => deleteProperty(property.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PropertiesManagement;
