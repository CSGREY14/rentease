import React, { useState } from 'react';
import './PropertyProfile.css';

function PropertyProfile({ formData, updateFormData, prevStep, nextStep }) {
  const { 
    bedrooms, bathrooms, balconies, roomType, peopleSharing,
    carpetArea, isFurnished, appliances, numberOfFloors,
    propertyAge, availableFrom, tenantPreference, genderPreference,
    uniqueFeatures, propertyType // Add propertyType to destructured formData
  } = formData;

  const [customBedroom, setCustomBedroom] = useState(false);
  const [customBathroom, setCustomBathroom] = useState(false);
  const [customBalcony, setCustomBalcony] = useState(false);

  // Update values when predefined option is selected
  const handleChange = (field, value) => {
    updateFormData({ [field]: value });
    if (field === 'bedrooms') setCustomBedroom(false);
    if (field === 'bathrooms') setCustomBathroom(false);
    if (field === 'balconies') setCustomBalcony(false);
  };
  const handleNext = (e) => {
    e.preventDefault();
    nextStep(); // Move to the next step
  };

  // Update values for custom input
  const handleCustomInput = (e, field) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value)) {
      updateFormData({ [field]: value });
    }
  };

  const handleBack = () => {
    prevStep();
  };


  return (
    <div className="property-profile-container">
      <div className="left-section">
        <div className="progress-steps">
          <div className="step completed">Basic Details <span>Edit</span></div>
          <div className="step completed">Location Details <span>Edit</span></div>
          <div className="step active">Property Profile</div>
          <div className="step">Videos & Photos</div>
          <div className="step">Pricing & Others</div>
        </div>

        <div className="property-score">
          <h4>Property Score</h4>
          <div className="score-circle">
            <span>21%</span>
          </div>
          <p>Better your property score, greater your visibility</p>
        </div>
      </div>

      <div className="main-section">
        <h2>Tell us about your property</h2>
        <form onSubmit={handleNext} className="room-details-form">
          <div className="room-details">
            <h4>Add Room Details</h4>
            
            {/* Bedrooms */}
            <label>No. of Bedrooms</label>
            <div className="options">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  className={bedrooms === num ? 'selected' : ''}
                  onClick={() => handleChange('bedrooms', num)}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                className="add-other"
                onClick={() => setCustomBedroom(true)}
              >
                + Add other
              </button>
            </div>
            {customBedroom && (
              <input
                type="number"
                placeholder="Enter custom number"
                value={bedrooms}
                onChange={(e) => handleCustomInput(e, 'bedrooms')}
                min="1"
              />
            )}

            {/* Bathrooms */}
            <label>No. of Bathrooms</label>
            <div className="options">
              {[1, 2, 3, 4].map((num) => (
                <button
                  key={num}
                  type="button"
                  className={bathrooms === num ? 'selected' : ''}
                  onClick={() => handleChange('bathrooms', num)}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                className="add-other"
                onClick={() => setCustomBathroom(true)}
              >
                + Add other
              </button>
            </div>
            {customBathroom && (
              <input
                type="number"
                placeholder="Enter custom number"
                value={bathrooms}
                onChange={(e) => handleCustomInput(e, 'bathrooms')}
                min="1"
              />
            )}

            {/* Balconies */}
            <label>No. of Balconies</label>
            <div className="options">
              {[0, 1, 2, 3].map((num) => (
                <button
                  key={num}
                  type="button"
                  className={balconies === num ? 'selected' : ''}
                  onClick={() => handleChange('balconies', num)}
                >
                  {num}
                </button>
              ))}
              <button
                type="button"
                className="add-other"
                onClick={() => setCustomBalcony(true)}
              >
                + Add other
              </button>
            </div>
            {customBalcony && (
              <input
                type="number"
                placeholder="Enter custom number"
                value={balconies}
                onChange={(e) => handleCustomInput(e, 'balconies')}
                min="0"
              />
            )}

            {/* Conditional Rendering for PG vs Residential */}
            {propertyType === 'PG' ? (
              <>
                {/* Room Type Selection */}
                <label>Room Type</label>
                <div className="options">
                  {['Sharing', 'Private'].map((type) => (
                    <button
                      key={type}
                      type="button"
                      className={roomType === type ? 'selected' : ''}
                      onClick={() => {
                        updateFormData({ roomType: type });
                        // Reset people sharing when switching to Private
                        if (type === 'Private') {
                          updateFormData({ peopleSharing: 1 }); // Default to 1
                        }
                      }}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                {/* People Sharing Input (only displayed if Sharing is selected) */}
                {roomType === 'Sharing' && (
                  <>
                    <label>How many people can share this room?</label>
                    <input
                      type="number"
                      value={peopleSharing}
                      onChange={(e) => updateFormData({ peopleSharing: parseInt(e.target.value, 10) })}
                      min="1"
                    />
                  </>
                )}
              </>
            ) : (
              // No Room Type or Sharing input for Residential
              <></>
            )}

            {/* Carpet Area */}
            <label>Carpet Area (in sqft)</label>
            <input
              type="number"
              value={carpetArea}
              onChange={(e) => updateFormData({ carpetArea: e.target.value })}
              min="1"
            />

            {/* Furnished */}
            <label>Furnished</label>
            <div className="options">
              {['Yes', 'No'].map((option) => (
                <button
                  key={option}
                  type="button"
                  className={isFurnished === option ? 'selected' : ''}
                  onClick={() => updateFormData({ isFurnished: option })}
                >
                  {option}
                </button>
              ))}
            </div>

            {/* Appliances Count (shown only if furnished) */}
            {isFurnished === 'Yes' && (
              <>
                <h4>Appliance Count</h4>
                <div className="appliance-row">
                  {Object.entries(appliances).map(([appliance, count]) => (
                    <div key={appliance} className="appliance-item">
                      <label>{appliance}</label>
                      <input
                        type="number"
                        value={count}
                        onChange={(e) => updateFormData({
                          appliances: { ...appliances, [appliance]: parseInt(e.target.value, 10) }
                        })}
                        min="0"
                      />
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Number of Floors */}
            <label>Number of Floors</label>
            <input
              type="number"
              value={numberOfFloors}
              onChange={(e) => updateFormData({ numberOfFloors: e.target.value })}
              min="1"
            />

            {/* Age of Property */}
            <label>Age of Property (in years)</label>
            <input
              type="number"
              value={propertyAge}
              onChange={(e) => updateFormData({ propertyAge: e.target.value })}
              min="0"
            />

            {/* Available From Date */}
            <label>Available From</label>
            <input
              type="date"
              value={availableFrom}
              onChange={(e) => updateFormData({ availableFrom: e.target.value })}
            />

            {/* Tenant Preference (Modified for Residential) */}
            {propertyType === 'Residential' && (
              <>
                <label>Tenant Preference</label>
                <div className="options">
                  {['Family', 'Single Men', 'Single Women'].map((preference) => (
                    <button
                      key={preference}
                      type="button"
                      className={tenantPreference === preference ? 'selected' : ''}
                      onClick={() => updateFormData({ tenantPreference: preference })}
                    >
                      {preference}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Gender Preference (Modified for PG) */}
            {propertyType === 'PG' && (
              <>
                <label>Gender Preference</label>
                <div className="options">
                  {['Male', 'Female', 'Any'].map((gender) => (
                    <button
                      key={gender}
                      type="button"
                      className={genderPreference === gender ? 'selected' : ''}
                      onClick={() => updateFormData({ genderPreference: gender })}
                    >
                      {gender}
                    </button>
                  ))}
                </div>
              </>
            )}

            {/* Unique Features */}
            <label>Unique Features</label>
            <textarea
              value={uniqueFeatures}
              onChange={(e) => updateFormData({ uniqueFeatures: e.target.value })}
              rows="15"
              cols="50"
              placeholder="Highlight any unique features of your property"
            />

            <div className="form-actions">
              <button type="button" className="back-button" onClick={handleBack}>Back</button>
              <button type="submit" className="submit-button">Continue</button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PropertyProfile;
