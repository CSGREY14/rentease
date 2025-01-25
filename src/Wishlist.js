import React, { useEffect, useState } from "react";
import "./Wishlist.css";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import useNavigate

const Wishlist = () => {
  const [wishlistedProperties, setWishlistedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Navigate to property details page
  const viewDetails = (property) => {
    navigate("/property-details", { state: { property } }); // Pass property data as state
  };

  // Fetch wishlisted properties from the API
  const fetchWishlistedProperties = async () => {
    try {
      // Get user ID from localStorage
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        throw new Error("User not found in localStorage");
      }

      const userId = user._id;

      // Call API to fetch wishlisted properties
      const response = await axios.post(
        "http://localhost:5001/api/wishlisted-properties",
        { userId }
      );
      setWishlistedProperties(response.data.data); // Use the `data` field from API response
      setLoading(false);
    } catch (err) {
      console.error("Error fetching wishlisted properties:", err);
      setError(err.message || "Failed to fetch wishlisted properties");
      setLoading(false);
    }
  };

  // Fetch wishlisted properties on component mount
  useEffect(() => {
    fetchWishlistedProperties();
  }, []);

  return (
    <div className="wishlist-container">
      <h2>Your Wishlisted Properties</h2>
      {loading ? (
        <p>Loading wishlisted properties...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : wishlistedProperties.length === 0 ? (
        <p>No wishlisted properties found.</p>
      ) : (
        <div className="card-grid">
          {wishlistedProperties.map((property) => (
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
                <p>
                  <strong>Location:</strong> {property.locality}
                </p>
                <p>
                  <strong>Price:</strong> {property.expectedRent}
                </p>
                <p>
                  <strong>Type:</strong> {property.propertyType} {property.propertySubtype}
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

export default Wishlist;
