import React from "react";
import "./Tenants.css";
import { Rating } from "@mui/material";

// Stub data for active tenants
const activeTenants = [
  {
    id: 1,
    name: "Alice Johnson",
    profileImage: './man-user-circle-icon.png',
    property: "Modern Apartment, New York",
    email: "alice@example.com",
    phone: "123-456-7890",
    rating: 4.5,
  },
  {
    id: 2,
    name: "John Doe",
    profileImage: './man-user-circle-icon.png',
    property: "Cozy Cabin, Aspen",
    email: "john@example.com",
    phone: "987-654-3210",
    rating: 4.8,
  },
];

// Stub data for tenant requests
const tenantRequests = [
  {
    id: 1,
    name: "Emma Watson",
    profileImage: './man-user-circle-icon.png',
    property: "Beachfront Villa, Miami",
    email: "emma@example.com",
    phone: "112-233-4455",
    rating: 4.5,
    details: "Wants to rent for 6 months. No pets.",
  },
  {
    id: 2,
    name: "Robert Brown",
    profileImage: './man-user-circle-icon.png',
    property: "Studio Apartment, Chicago",
    email: "robert@example.com",
    phone: "667-788-9900",
    rating: 4.7,
    details: "Looking for a 1-year lease. Single occupant.",
  },
];

const Tenants = () => {
  return (
    <div className="tenants-container">
      <h2>Active Tenants</h2>
      {/* Active Tenants Table */}
      <table className="tenants-table">
        <thead>
          <tr>
            <th>Profile</th>
            <th>Name</th>
            <th>Property</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          {activeTenants.map((tenant) => (
            <tr key={tenant.id}>
              <td>
                <img
                  src={tenant.profileImage}
                  alt={`${tenant.name}'s profile`}
                  className="profile-image"
                />
              </td>
              <td>{tenant.name}</td>
              <td>{tenant.property}</td>
              <td>{tenant.email}</td>
              <td>{tenant.phone}</td>
              <td>
                <Rating
                  value={tenant.rating}
                  precision={0.5}
                  readOnly
                  size="small"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Tenant Requests</h2>
      {/* Tenant Requests */}
      <div className="requests-grid">
        {tenantRequests.map((request) => (
          <div className="request-card" key={request.id}>
            <img
              src={request.profileImage}
              alt={`${request.name}'s profile`}
              className="profile-image-large"
            />
            <h3>{request.name}</h3>
            <p>
              <strong>Property:</strong> {request.property}
            </p>
            <p>
              <strong>Email:</strong> {request.email}
            </p>
            <p>
              <strong>Phone:</strong> {request.phone}
            </p>
            <p>
              <strong>Rating:</strong>{" "}
              <Rating
                value={request.rating}
                precision={0.5}
                readOnly
                size="small"
              />
            </p>
            <p>
              <strong>Details:</strong> {request.details}
            </p>
            <div className="actions">
              <button className="accept-btn">Accept</button>
              <button className="reject-btn">Reject</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tenants;
