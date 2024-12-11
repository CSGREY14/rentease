import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Tenants.css";

const Tenants = () => {
  const [allTenants, setAllTenants] = useState([]);
  const [pendingTenants, setPendingTenants] = useState([]);
  const navigate = useNavigate(); // Initialize navigate

   // Fetch property details by ID
   const fetchPropertyDetails = async (propertyId) => {
    try {
      const response = await axios.get(`http://localhost:5001/api/get-property-by-id/${propertyId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching property ${propertyId}:`, error);
      return null;
    }
  };
  const viewDetails = async (propertyId) => {
    try {
      const property = await fetchPropertyDetails(propertyId);
      if (property) {
        // Navigate to the property details page and pass the property data
        navigate('/property-details', { state: { property } });
      }
    } catch (error) {
      console.error("Error navigating to property details:", error);
    }
  };

  const fetchAllTenants = async () => {
    try {
      // Retrieve the user object from localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      
      if (!user || !user.name) {
        console.error("User name not found in localStorage.");
        return;
      }
  
      const ownerName = user.name;
  
      // Fetch all tenants filtered by ownerName
      const response = await axios.get("http://localhost:5001/api/tenants");
      const tenants = response.data;
  
      // Filter tenants where tenant.ownerName matches the logged-in user's name
      const userTenants = tenants.filter(tenant => tenant.ownerName === ownerName);
  
      // Update the state with filtered tenants
      setAllTenants(userTenants);
    } catch (error) {
      console.error("Error fetching tenants for the current user:", error);
    }
  };
  
  const fetchPendingTenants = async () => {
    try {
      // Retrieve the user object from localStorage
      const user = JSON.parse(localStorage.getItem("user"));
  
      if (!user || !user.name) {
        console.error("User name not found in localStorage.");
        return;
      }
  
      const ownerName = user.name;
  
      // Fetch all pending tenants
      const response = await axios.get("http://localhost:5001/api/tenants/pending");
      const pendingTenants = response.data;
  
      // Filter tenants where tenant.ownerName matches the logged-in user's name
      const userPendingTenants = pendingTenants.filter(tenant => tenant.ownerName === ownerName);
  
      // Update the state with filtered tenants
      setPendingTenants(userPendingTenants);
    } catch (error) {
      console.error("Error fetching pending tenants for the current user:", error);
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
            <th>Property Details</th>
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
              <td>
                <button onClick={() => viewDetails(tenant.propertyId)}>
                  View Details
                </button>
              </td>
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
              <strong>Email:</strong> {request.tenantEmail}
            </p>
            <p>
              <strong>Phone:</strong> {request.tenantPhoneNo}
            </p>
            <button onClick={() => viewDetails(request.propertyId)}>
              View Property Details
            </button>
            
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
