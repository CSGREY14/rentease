import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecommendedProperties.css';

function RecommendedProperties({ locality, category }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  // Fetch properties based on locality and category when component mounts or props change
  useEffect(() => {
    axios.get(`http://localhost:5001/api/properties`, {
      params: {
        category,
        locality,
      },
    })
    .then(response => setProperties(response.data))
    .catch(error => console.error("Error fetching properties:", error));
  }, [locality, category]);

  const handleScrollLeft = () => {
    setScrollPosition(scrollPosition + 300); // Adjust based on your card width
  };

  const handleScrollRight = () => {
    setScrollPosition(scrollPosition - 300); // Adjust based on your card width
  };

  // Function to navigate to the property details page
  const viewDetails = (property) => {
    navigate('/property-details', { state: { property } }); // Pass property data as state
  };

  return (
    <section className="recommended-section">
      <h2 className="recommended-title">Recommended Properties</h2>

      {/* Arrow to scroll left */}
      <button className="scroll-btn-left" onClick={handleScrollLeft}>
        &#10094; {/* Left arrow icon */}
      </button>

      {/* Property cards container */}
      <div className="recommended-cards-wrapper" style={{ transform: `translateX(${scrollPosition}px)` }}>
        {properties.map((property, index) => (
          <div className="recommended-card" key={index}>
            <img src={`http://localhost:5001/${property.uploadedPhotos[0]}`} alt="Property" />
            <div className="recommended-card-details">
              <h3>{property.propertyType}</h3>
              <p>Price: ₹ {property.expectedRent}</p>
              <p>Locality: {property.locality}</p>
              <p>Posted by: {property.ownerName}</p>
              {/* View Property Button */}
              <button className="view-property-btn" onClick={() => viewDetails(property)}>
                View Property
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Arrow to scroll right */}
      <button className="scroll-btn-right" onClick={handleScrollRight}>
        &#10095; {/* Right arrow icon */}
      </button>
    </section>
  );
}

export default RecommendedProperties;
