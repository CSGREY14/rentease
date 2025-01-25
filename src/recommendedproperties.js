import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RecommendedProperties.css';

function RecommendedProperties({ locality, category }) {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  // Fetch subscription tier for a property based on ownerName
  const fetchSubscriptionTier = (ownerName) => {
    return axios.get('http://localhost:5001/api/get-subscription-tier', {
      params: { name: ownerName },
    })
    .then(response => response.data.subscription_tier) // Assuming the response has subscription_tier
    .catch(error => {
      console.error("Error fetching subscription tier:", error);
      return "Free"; // Default to Basic if error occurs
    });
  };

  // Fetch properties based on locality and category when component mounts or props change
  useEffect(() => {
    axios.get('http://localhost:5001/api/properties', {
      params: {
        category,
        locality,
      },
    })
    .then(async response => {
      // For each property, fetch the subscription tier
      const propertiesWithSubscription = await Promise.all(response.data.map(async (property) => {
        const subscriptionTier = await fetchSubscriptionTier(property.ownerName);
        return { ...property, subscription_tier: subscriptionTier };
      }));

      // Sort properties based on subscription tier (Premium > Pro > Basic)
      const sortedProperties = propertiesWithSubscription.sort((a, b) => {
        const tierOrder = { Premium: 2, Pro: 3, Free: 1 };
        return tierOrder[b.subscription_tier] - tierOrder[a.subscription_tier];
      });

      setProperties(sortedProperties);
    })
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
            {/* Display premium badge for Premium tier */}
            {property.subscription_tier === 'Premium' && (
           <span className="premium-badge">Premium</span>
            )}

{property.subscription_tier === 'Pro' && (
  <span className="premium-badge">Pro</span>
)}

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
