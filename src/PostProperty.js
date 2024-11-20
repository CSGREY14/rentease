import React, { useEffect, useState } from 'react';
import './PostProperty.css';

function PostProperty({ formData, updateFormData, nextStep }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);
  
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setUserData(user);
      // Automatically update form data with user's contact info
      updateFormData({
        ownerName: user.name,
        contactNumber: user.phone_no,
      });
    }
  }, []);

  const { propertyType, propertySubtype, sellRent, contactNumber, ownerName } = formData;

  const handlePropertyTypeChange = (event) => {
    updateFormData({ propertyType: event.target.value });
  };

  const handleSellRentChange = (event) => {
    updateFormData({ sellRent: event.target.value });
  };

  const handleContactChange = (event) => {
    updateFormData({ contactNumber: event.target.value });
  };

  const handlePropertySubtypeChange = (event) => {
    updateFormData({ propertySubtype: event.target.value });
  };

  const handleOwnerNameChange = (event) => {
    updateFormData({ ownerName: event.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    nextStep(); // Move to the next step
  };

  const getPropertyOptions = () => {
    if (propertyType === 'Residential') {
      return (
        <>
          <option value="Independent House/Villa">Independent House/Villa</option>
          <option value="Residential Apartment">Residential Apartment</option>
          <option value="Studio Apartment">Studio Apartment</option>
          <option value="Serviced Apartment">Serviced Apartment</option>
          <option value="Penthouse/Farmhouse">Penthouse/Farmhouse</option>
          
        </>
      );
    } else if (propertyType === 'Commercial') {
      return (
        <>
          <option value="Manufacturing Factory">Manufacturing Factory</option>
          <option value="Warehouse">Warehouse</option>
          <option value="Godown">Godown</option>
          <option value="Office">Office</option>
          <option value="Shop/Showroom">Shop/Showroom</option>
        </>
      );
    }
    return null;
  };

  return (
    <div className="post-property-container">
      <div className="left-section">
        <h1>Sell or Rent your property faster with RentEase.com</h1>
        <ul className="bullet-points">
          <li>Advertise for FREE</li>
          <li>Get unlimited inquiries</li>
          <li>Shortlisted buyers and tenants</li>
          <li>Assistance in site visits</li>
        </ul>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR93El6-viypV8yeUhu1PngY5QUUUkW3Fe4ng&s" alt="Property" className="property-image" />
      </div>
      <div className="right-section">
        <form className="property-form" onSubmit={handleNext}>
          <h2>Start posting your property, it’s free</h2>

          <label>You're looking to:</label>
          <div className="radio-group">
            <label><input type="radio" value="Sell" checked={sellRent === 'Sell'} onChange={handleSellRentChange} /> Sell</label>
            <label><input type="radio" value="Rent/Lease" checked={sellRent === 'Rent/Lease'} onChange={handleSellRentChange} /> Rent/Lease</label>
          </div>

          <label>And it's a:</label>
          <div className="radio-group">
            <label><input type="radio" value="Residential" checked={propertyType === 'Residential'} onChange={handlePropertyTypeChange} /> Residential</label>
            <label><input type="radio" value="Commercial" checked={propertyType === 'Commercial'} onChange={handlePropertyTypeChange} /> Commercial</label>
            <label><input type="radio" value="PG" checked={propertyType === 'PG'} onChange={handlePropertyTypeChange} /> PG</label>
          </div>

          {propertyType !== 'PG' && (
            <>
              <label>Property SubType:</label>
              <select onChange={handlePropertySubtypeChange} value={propertySubtype}>
                <option value="" disabled>Select SubType</option>
                {getPropertyOptions()}
              </select>
            </>
          )}

          {isLoggedIn ? (
            <>
              <label>Owner Name:</label>
              <div>{userData.name}</div> {/* Display the owner's name from local storage */}
              <label>Contact Number:</label>
              <div>{userData.phone_no}</div> {/* Display the owner's contact number from local storage */}
            </>
          ) : (
            <>
              <label>Owner Name:</label>
              <input
                type="text"
                placeholder="Enter your name"
                value={ownerName}
                onChange={handleOwnerNameChange}
              />
              <label>Contact Number:</label>
              <input
                type="tel"
                placeholder="Enter your phone number"
                onChange={handleContactChange}
                value={contactNumber}
              />
            </>
          )}

          <button type="submit">Next</button>
        </form>
      </div>
    </div>
  );
}

export default PostProperty;
