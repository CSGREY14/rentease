import React, { useEffect, useState } from "react";
import "./Listings.css";
import axios from "axios";
import { useNavigate } from 'react-router-dom'; // Import useNavigate


const Listings = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  
  const viewDetails = (property) => {
    
    navigate('/property-details', { state: { property } }); // Pass property data as state
  };
  // Fetch properties from the API
  const fetchProperties = async () => {
    try {
      // Get user ID from localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        throw new Error("User not found in localStorage");
      }

      const userId = user._id;

      // Call API to fetch properties
      const response = await axios.post("http://localhost:5001/api/properties-by-owner", { userId });
      setProperties(response.data.properties);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching properties:", err);
      setError(err.message || "Failed to fetch properties");
      setLoading(false);
    }
  };

  // Fetch properties on component mount
  useEffect(() => {
    fetchProperties();
  }, []);

  return (
    <div className="listings-container">
      <h2>Your Posted Properties</h2>
      {loading ? (
        <p>Loading properties...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : properties.length === 0 ? (
        <p>No properties found.</p>
      ) : (
        <div className="card-grid">
          {properties.map((property) => (
            <div className="card" key={property._id}>
              <div className="carousel">
                {property.uploadedPhotos.map((image, index) => (
                  <img
                    src={`http://localhost:5001/${image}`}
                    alt="Property"
                    key={index}
                  />
                ))}
              </div>
              <div className="details">
                <h3>{property.propertyType}</h3>
                <p><strong>Location:</strong> {property.locality}</p>
                <p><strong>Price:</strong> {property.expectedRent}</p>
                <p><strong>Type:</strong> {property.propertySubtype}</p>
                <p>
  <strong>Available Status:</strong>{" "}
  <span
    style={{
      color: property.availableStatus ? "green" : "red",
    }}
  >
    {property.availableStatus ? "Available" : "Not Available"}
  </span>
</p>

                <button
          className="view-details-button"
          onClick={() => viewDetails(property)}
        >
          View Details
        </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Listings;
