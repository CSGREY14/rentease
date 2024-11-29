import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Tenants.css";

const Tenants = () => {
  const [allTenants, setAllTenants] = useState([]);
  const [pendingTenants, setPendingTenants] = useState([]);

  // Fetch all tenants
  const fetchAllTenants = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/tenants");
      setAllTenants(response.data);
    } catch (error) {
      console.error("Error fetching all tenants:", error);
    }
  };

  // Fetch all pending tenants
  const fetchPendingTenants = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/tenants/pending");
      setPendingTenants(response.data);
    } catch (error) {
      console.error("Error fetching pending tenants:", error);
    }
  };

// Handle status change
const updateTenantStatus = async (propertyid, id, status) => {
  try {
    // Update tenant status
    await axios.put(`http://localhost:5001/api/tenants/${id}/status`, { status });
    alert(`Tenant status updated to ${status}`);

    // If the status is set to "Active", update the property's availableStatus to false
    if (status === "Active") {
      await axios.put(`http://localhost:5001/api/properties/${propertyid}/false`);
      alert("Property availability status updated to unavailable");
    }

    // Refresh tenant data
    fetchAllTenants();
    fetchPendingTenants();
  } catch (error) {
    console.error("Error updating tenant status or property availability:", error);
  }
};

  useEffect(() => {
    fetchAllTenants();
    fetchPendingTenants();
  }, []);

  return (
    <div className="tenants-container">
      <h2>All Tenants</h2>
      {/* All Tenants Table */}
      <table className="tenants-table">
        <thead>
          <tr>
            <th>S.No</th>
            <th>Profile</th>
            <th>Tenant Name</th>
            <th>Property ID</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {allTenants.map((tenant, index) => (
            <tr key={tenant._id}>
              <td>{index + 1}</td>
              <td>
                <img
                  src={tenant.profileImage || "./man-user-circle-icon.png"}
                  alt={`${tenant.tenantName}'s profile`}
                  className="profile-image"
                />
              </td>
              <td>{tenant.tenantName}</td>
              <td>{tenant.propertyId}</td>
              <td>{tenant.tenantEmail}</td>
              <td>{tenant.tenantPhoneNo}</td>
              <td
                className={`status ${
                  tenant.status === "Active"
                    ? "active"
                    : tenant.status === "Pending"
                    ? "pending"
                    : tenant.status === "Rejected"
                    ? "rejected"
                    : "finished"
                }`}
              >
                {tenant.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Tenant Requests (Pending)</h2>
      {/* Tenant Requests */}
      <div className="requests-grid">
        {pendingTenants.map((request) => (
          <div className="request-card" key={request._id}>
            <img
              src={request.profileImage || "./man-user-circle-icon.png"}
              alt={`${request.tenantName}'s profile`}
              className="profile-image-large"
            />
            <h3>{request.tenantName}</h3>
            <p>
              <strong>Property ID:</strong> {request.propertyId}
            </p>
            <p>
              <strong>Email:</strong> {request.tenantEmail}
            </p>
            <p>
              <strong>Phone:</strong> {request.tenantPhoneNo}
            </p>
            
            <div className="actions">
              <button
                className="accept-btn"
                onClick={() => updateTenantStatus(request.propertyId,request._id, "Active")}
              >
                Accept
              </button>
              <button
                className="reject-btn"
                onClick={() => updateTenantStatus(request.propertyId,request._id, "Rejected")}
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tenants;
