import React from 'react';
import { FaRupeeSign } from 'react-icons/fa';
import Navbar from './navbar';
function PropertyHeader({ property }) {
  const pricePerSqft = (property.expectedRent / property.carpetArea).toFixed(2);

  return (
<>
<Navbar/>
    <div className="result-header">
      <h2>{property.propertyType} for Rent</h2>
      <p>
        Price: <FaRupeeSign /> {property.expectedRent} @{pricePerSqft} per sqft { property.propertyType=='Residential'&&<>| {property.bedrooms} BHK | {property.bathrooms} Baths</>}
      </p>
      <p>EMI Available| {property.propertySubtype}</p>
      <p>Location: {property.locality}, {property.city}</p>
      <div>
  <span
    style={{
      color: property.availableStatus ? 'green' : 'red',
      fontWeight: 'bold',
    }}
  >
    {property.availableStatus ? 'Available' : 'Not Available'}
  </span>
  
</div>

    </div>
    </>
  );
}

export default PropertyHeader;
