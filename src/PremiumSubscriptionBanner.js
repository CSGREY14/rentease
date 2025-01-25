import React from 'react';
import { useNavigate } from 'react-router-dom';
import './PremiumSubscriptionBanner.css';

const PremiumSubscriptionBanner = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/subscribe');
  };

  return (
    <div className="premium-banner">
      <div className="premium-content">
        <div className="text-column">
          <h1 className="premium-title">Unlock Premium Benefits!</h1>
          <ul className="premium-benefits">
            <li>Featured Property Listings</li>
            <li>Advanced Analytics and Insights</li>
            <li>Priority Customer Support</li>
            <li>Exclusive Tools and Resources</li>
          </ul>
          <button className="premium-button" onClick={handleButtonClick}>
            Upgrade to Premium
          </button>
        </div>
        <div className="image-column">
          <img
            src="/premium_banner.jpg"
            alt="Premium Benefits"
            className="premium-image"
          />
        </div>
      </div>
    </div>
  );
};

export default PremiumSubscriptionBanner;
