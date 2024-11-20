import React from 'react';
import { FaRupeeSign } from 'react-icons/fa';

function PropertyHeader({ property }) {
  const pricePerSqft = (property.expectedRent / property.carpetArea).toFixed(2);

  return (
    <div className="result-header">
      <h2>{property.propertyType} for Rent</h2>
      <p>
        Price: <FaRupeeSign /> {property.expectedRent} @{pricePerSqft} per sqft { property.propertyType=='Residential'&&<>| {property.bedrooms} BHK | {property.bathrooms} Baths</>}
      </p>
      <p>EMI Available| {property.propertySubtype}</p>
      <p>Location: {property.locality}, {property.city}</p>
      <span className="status-label">{property.status || 'Available'}</span>
    </div>
  );
}

export default PropertyHeader;
