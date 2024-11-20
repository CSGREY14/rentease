import React, { useState } from 'react';
import './PricingForm.css'; // Add appropriate styles here

function PricingForm({ formData, updateFormData, prevStep, nextStep }) {
  const { propertyType } = formData; // Get property type from formData
  const [pricingData, setPricingData] = useState({
    expectedRent: formData.expectedRent || '',
    securityDeposit: formData.securityDeposit || '',
    contractDuration: formData.contractDuration || '',
    noticePeriod: formData.noticePeriod || '',
    vastuScore: formData.vastuScore || '',
    amenities: formData.amenities || {},
    houseRules: formData.houseRules || {},
  });

  // Handle input changes for common fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPricingData({
      ...pricingData,
      [name]: value,
    });
    updateFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle checkbox changes for amenities (Residential)
  const handleAmenityChange = (e) => {
    const { name, checked } = e.target;
    setPricingData({
      ...pricingData,
      amenities: {
        ...pricingData.amenities,
        [name]: checked,
      },
    });
    updateFormData({
      ...formData,
      amenities: {
        ...formData.amenities,
        [name]: checked,
      },
    });
  };

  // Handle checkbox changes for house rules (PG)
  const handleHouseRulesChange = (e) => {
    const { name, checked } = e.target;
    setPricingData({
      ...pricingData,
      houseRules: {
        ...pricingData.houseRules,
        [name]: checked,
      },
    });
    updateFormData({
      ...formData,
      houseRules: {
        ...formData.houseRules,
        [name]: checked,
      },
    });
  };
  const handleAutoSuggestClick = async () => {
    try {
      console.log(formData);
      const response = await fetch('http://localhost:5001/api/suggest-price', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          property: formData,  // Send the property data here
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Suggested Rent:', data.suggestedRent);
  
        handleInputChange({
          target: {
            name: 'expectedRent',
            value: data.suggestedRent, // Set the suggested rent as the value
          },
        });
      } else {
        console.error('Error fetching suggested price');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };
  
  // Handle form submission
  const handleNext = async (e) => {
    e.preventDefault();
    console.log(formData);
    
    // Create a FormData object to store all fields
    const data = new FormData();
  
    // Combine formData and pricingData
    const completeFormData = {
      ...formData,
      ...pricingData, // Merge pricingData into formData
    };
  
    // Append each individual field to the FormData object
    Object.keys(completeFormData).forEach((key) => {
      // If the key is an object (like appliances or amenities), handle it separately
      if (typeof completeFormData[key] === 'object' && !Array.isArray(completeFormData[key])) {
        Object.keys(completeFormData[key]).forEach((subKey) => {
          data.append(`${key}.${subKey}`, completeFormData[key][subKey]);
        });
      } else if (Array.isArray(completeFormData[key]) && key === 'uploadedPhotos') {
        // Handle the uploaded photos separately
        formData.uploadedPhotos.forEach((photo) => {
          data.append('uploadedPhotos', photo);
        });
      } else {
        // For all other fields, just append normally
        data.append(key, completeFormData[key]);
      }
    });
  
    // Sending the formData via a POST request to the backend
    try {
      const response = await fetch('http://localhost:5001/api/properties', {
        method: 'POST',
        body: data,
      });
  
      if (response.ok) {
        alert('Data and photos uploaded successfully!');
      } else {
        alert('Error uploading data.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while uploading data.');
    }
  };
  
  const handleBack = () => {
    prevStep();
  };

  return (
    <div className="pricing-form-container">
      <div className="left-section">
        <div className="progress-steps">
          <div className="step completed">Basic Details <span>Edit</span></div>
          <div className="step completed">Location Details <span>Edit</span></div>
          <div className="step completed">Property Profile <span>Edit</span></div>
          <div className="step completed">Videos & Photos <span>Edit</span></div>
          <div className="step active">Pricing & Others</div>
        </div>

        <div className="property-score">
          <h4>Property Score</h4>
          <div className="score-circle">
            <span>85%</span>
          </div>
          <p>Improve your property score for better visibility</p>
        </div>
      </div>

      <div className="main-section">
        <h2>Pricing and Other Information</h2>
        <form onSubmit={handleNext}>
          {/* Residential Fields */}
          {(propertyType === 'Residential' || propertyType==='PG') && (
            <div className="amenities">
              <h4>Amenities</h4>
              <div className="amenity-group">
                <label><input type="checkbox" name="parkingAvailable" checked={pricingData.amenities.parkingAvailable || false} onChange={handleAmenityChange} /> Parking Available</label>
                <label><input type="checkbox" name="lift" checked={pricingData.amenities.lift || false} onChange={handleAmenityChange} /> Lift</label>
                <label><input type="checkbox" name="petFriendly" checked={pricingData.amenities.petFriendly || false} onChange={handleAmenityChange} /> Pet Friendly</label>
                <label><input type="checkbox" name="wifi" checked={pricingData.amenities.wifi || false} onChange={handleAmenityChange} /> WiFi</label>
                <label><input type="checkbox" name="ac" checked={pricingData.amenities.ac || false} onChange={handleAmenityChange} /> AC</label>
                <label><input type="checkbox" name="powerBackup" checked={pricingData.amenities.powerBackup || false} onChange={handleAmenityChange} /> Power Backup</label>
                <label><input type="checkbox" name="roomCleaning" checked={pricingData.amenities.roomCleaning || false} onChange={handleAmenityChange} /> Room Cleaning Service</label>
                <label><input type="checkbox" name="electricChargesIncluded" checked={pricingData.amenities.electricChargesIncluded || false} onChange={handleAmenityChange} /> Electric Charges (Included)</label>
                <label><input type="checkbox" name="waterChargesIncluded" checked={pricingData.amenities.waterChargesIncluded || false} onChange={handleAmenityChange} /> Water Charges (Included)</label>
                <label><input type="checkbox" name="swimmingPool" checked={pricingData.amenities.swimmingPool || false} onChange={handleAmenityChange} /> Swimming Pool</label>
                <label><input type="checkbox" name="gymnasium" checked={pricingData.amenities.gymnasium || false} onChange={handleAmenityChange} /> Gymnasium</label>
                <label><input type="checkbox" name="wheelchairFriendly" checked={pricingData.amenities.wheelchairFriendly || false} onChange={handleAmenityChange} /> Wheelchair Friendly</label>
                <label><input type="checkbox" name="tv" checked={pricingData.amenities.tv || false} onChange={handleAmenityChange} /> TV </label>
                <label><input type="checkbox" name="waterCooler" checked={pricingData.amenities.waterCooler || false} onChange={handleAmenityChange} /> Water Cooler</label>
                <label><input type="checkbox" name="waterPurifier" checked={pricingData.amenities.waterPurifier || false} onChange={handleAmenityChange} /> Water Purifier/RO</label>
              </div>
            </div>
          )}

          {/* PG Fields */}
          {propertyType === 'PG' && (
            <div className="house-rules">
              <h4>House Rules</h4>
              <label><input type="checkbox" name="breakfast" checked={pricingData.houseRules.breakfast || false} onChange={handleHouseRulesChange} /> Breakfast</label>
    <label><input type="checkbox" name="lunch" checked={pricingData.houseRules.lunch || false} onChange={handleHouseRulesChange} /> Lunch</label>
    <label><input type="checkbox" name="dinner" checked={pricingData.houseRules.dinner || false} onChange={handleHouseRulesChange} /> Dinner</label>
    <label><input type="checkbox" name="mealsProvidedVeg" checked={pricingData.houseRules.mealsProvidedVeg || false} onChange={handleHouseRulesChange} /> Meals Provided (Veg)</label>
    <label><input type="checkbox" name="mealsProvidedNonVeg" checked={pricingData.houseRules.mealsProvidedNonVeg || false} onChange={handleHouseRulesChange} /> Meals Provided (Non-Veg)</label>
    <label><input type="checkbox" name="visitorsAllowed" checked={pricingData.houseRules.visitorsAllowed || false} onChange={handleHouseRulesChange} /> Visitors Allowed</label>
    <label><input type="checkbox" name="partyAllowed" checked={pricingData.houseRules.partyAllowed || false} onChange={handleHouseRulesChange} /> Party Allowed</label>
    <label><input type="checkbox" name="warden" checked={pricingData.houseRules.warden || false} onChange={handleHouseRulesChange} /> Warden Available</label>
    <label><input type="checkbox" name="smokingAllowed" checked={pricingData.houseRules.smokingAllowed || false} onChange={handleHouseRulesChange} /> Smoking Allowed</label>
    <label><input type="checkbox" name="drinkingAllowed" checked={pricingData.houseRules.drinkingAllowed || false} onChange={handleHouseRulesChange} /> Drinking Allowed</label>
 
  </div>
          )}

        <div className="form-group">
            <label>Vastu Score</label>
            <input
              type="number"
              name="vastuScore"
              value={pricingData.vastuScore}
              onChange={handleInputChange}
              placeholder="Enter Vastu score"
            />
          </div>

          <div className="form-group" style={{ marginBottom: '20px' }}>
  <label style={{ marginRight: '10px' }}>Expected Rent</label>
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
    <input
      type="number"
      name="expectedRent"
      value={pricingData.expectedRent}
      onChange={handleInputChange}
      placeholder="Enter expected rent"
      style={{
        flex: '1',
        padding: '8px',
        fontSize: '14px',
        width: '800px',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxShadow: '0 0 8px rgba(0, 255, 0, 0.4)', // Green glow effect
        transition: 'box-shadow 0.3s ease-in-out', // Smooth transition for glowing effect
      }}
      onFocus={(e) => {
        e.target.style.boxShadow = '0 0 12px rgba(0, 255, 0, 0.8)';
      }}
      onBlur={(e) => {
        e.target.style.boxShadow = '0 0 8px rgba(0, 255, 0, 0.4)';
      }}
    />
  <button
  type="button"
  onClick={handleAutoSuggestClick}
  style={{
    padding: '8px 15px',
    backgroundColor: '#28a745', // Green button
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    boxShadow: '0 0 8px rgba(0, 255, 0, 0.4)', // Green glow effect
    cursor: 'pointer',
    transition: 'box-shadow 0.3s ease-in-out', // Smooth transition for glowing effect
    position: 'relative',
    overflow: 'hidden',
  }}
  onMouseOver={(e) => {
    e.target.style.boxShadow = '0 0 12px rgba(0, 255, 0, 0.8)';
  }}
  onMouseOut={(e) => {
    e.target.style.boxShadow = '0 0 8px rgba(0, 255, 0, 0.4)';
  }}
>
  Auto Suggest
  <div
    style={{
      position: 'absolute',
      top: '0',
      left: '-100%',
      width: '100%',
      height: '100%',
      background: 'linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0%, rgba(0, 255, 0, 0.5) 50%, rgba(255, 255, 255, 0.3) 100%)',
      animation: 'shine 10s ease-out infinite', // Subtle shine effect with more time in between
    }}
  ></div>
</button>

  </div>
  {/* Adding the animated icon next to the text */}
  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px' }}>
    <img
      src="./ai-assistant.gif"
      alt="AI Assistant Icon"
      style={{ width: '70px', height: '70px' }}
    />
    <p style={{ margin: 0 }}>
      <b>Can't decide on a price? Use our auto-suggest feature to recommend you one.</b>
    </p>
  </div></div>

          <div className="form-group">
            <label>Security Deposit</label>
            <input
              type="number"
              name="securityDeposit"
              value={pricingData.securityDeposit}
              onChange={handleInputChange}
              placeholder="Enter security deposit"
            />
          </div>

          <div className="form-group">
            <label>Minimum Contract Duration (months)</label>
            <input
              type="number"
              name="contractDuration"
              value={pricingData.contractDuration}
              onChange={handleInputChange}
              placeholder="Enter contract duration"
            />
          </div>

          <div className="form-group">
            <label>Months of Notice</label>
            <input
              type="number"
              name="noticePeriod"
              value={pricingData.noticePeriod}
              onChange={handleInputChange}
              placeholder="Enter notice period"
            />
          </div>

          
          
          <div className="button-group">
            <button type="button" onClick={handleBack}>Back</button>
            <button type="submit">Next</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PricingForm;
