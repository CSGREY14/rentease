import React, { useState } from 'react';
import './PropertyProfile.css';

function PropertyProfile({ formData, updateFormData, prevStep, nextStep }) {
  const { 
    propertyType, // Add propertyType to destructured formData
    carpetArea, numberOfFloors,
    propertyAge, availableFrom, 
    uniqueFeatures, seats, meetingRooms, cabins, washrooms, // For commercial properties
    conferenceArea, receptionArea, oxygenDuct, maintenanceStaff, 
    serviceLift, waterStorage, wasteDisposal, ups, parking, 
    fireAlarm, securityAlarm, fireExtinguisher, centralAC, cctv, securityPersonnel
  } = formData;

 
  const handleBack = () => {
    prevStep();
  };

  const handleNext = (e) => {
    e.preventDefault();
    nextStep(); // Move to the next step
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

            {/* Conditional Fields for Commercial Property */}
            {propertyType === 'Commercial' && (
              <>
                <label>No. of Seats</label>
                <input
                  type="number"
                  value={seats}
                  onChange={(e) => updateFormData({ seats: e.target.value })}
                  min="0"
                />

                <label>No. of Meeting Rooms</label>
                <input
                  type="number"
                  value={meetingRooms}
                  onChange={(e) => updateFormData({ meetingRooms: e.target.value })}
                  min="0"
                />

                <label>No. of Cabins</label>
                <input
                  type="number"
                  value={cabins}
                  onChange={(e) => updateFormData({ cabins: e.target.value })}
                  min="0"
                />

                <label>No. of Washrooms</label>
                <input
                  type="number"
                  value={washrooms}
                  onChange={(e) => updateFormData({ washrooms: e.target.value })}
                  min="0"
                />
                <label>Ready to Move?</label>
                <div className="options">
                  {['yes', 'no'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={conferenceArea === option ? 'selected' : ''}
                      onClick={() => updateFormData({ readyToMove: option })}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <label>Conference Area Available?</label>
                <div className="options">
                  {['Available', 'Not Available'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={conferenceArea === option ? 'selected' : ''}
                      onClick={() => updateFormData({ conferenceArea: option })}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <label>Reception Area Available?</label>
                <div className="options">
                  {['Available', 'Not Available'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={receptionArea === option ? 'selected' : ''}
                      onClick={() => updateFormData({ receptionArea: option })}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                
                {/* Other Commercial-Specific Details */}
                <label>Oxygen Duct Available?</label>
                <div className="options">
                  {['Available', 'Not Available'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={oxygenDuct === option ? 'selected' : ''}
                      onClick={() => updateFormData({ oxygenDuct: option })}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <label>Maintenance Staff Available?</label>
                <div className="options">
                  {['Available', 'Not Available'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={maintenanceStaff === option ? 'selected' : ''}
                      onClick={() => updateFormData({ maintenanceStaff: option })}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <label>Service/Goods Lift Available?</label>
                <div className="options">
                  {['Available', 'Not Available'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={serviceLift === option ? 'selected' : ''}
                      onClick={() => updateFormData({ serviceLift: option })}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <label>Water Storage/Tank Available?</label>
                <div className="options">
                  {['Available', 'Not Available'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={waterStorage === option ? 'selected' : ''}
                      onClick={() => updateFormData({ waterStorage: option })}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <label>Waste Disposal Available?</label>
                <div className="options">
                  {['Available', 'Not Available'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={wasteDisposal === option ? 'selected' : ''}
                      onClick={() => updateFormData({ wasteDisposal: option })}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <label>UPS Available?</label>
                <div className="options">
                  {['Available', 'Not Available'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={ups === option ? 'selected' : ''}
                      onClick={() => updateFormData({ ups: option })}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                <label>Parking Available?</label>
                <div className="options">
                  {['Available', 'Not Available'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      className={parking === option ? 'selected' : ''}
                      onClick={() => updateFormData({ parking: option })}
                    >
                      {option}
                    </button>
                  ))}
                </div>
                {/* Security Measures */}
                <h4>Security Measures</h4>
                <div className="options-grid">
                  <label>
                    <input
                      type="checkbox"
                      checked={fireAlarm}
                      onChange={() => updateFormData({ fireAlarm: !fireAlarm })}
                    />
                    Fire Alarm
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={securityAlarm}
                      onChange={() => updateFormData({ securityAlarm: !securityAlarm })}
                    />
                    Security Alarm
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={fireExtinguisher}
                      onChange={() => updateFormData({ fireExtinguisher: !fireExtinguisher })}
                    />
                    Fire Extinguisher/Hose
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={centralAC}
                      onChange={() => updateFormData({ centralAC: !centralAC })}
                    />
                    Central AC
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={cctv}
                      onChange={() => updateFormData({ cctv: !cctv })}
                    />
                    CCTV Surveillance
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={securityPersonnel}
                      onChange={() => updateFormData({ securityPersonnel: !securityPersonnel })}
                    />
                    Security Personnel
                  </label>
                </div>


                {/* Carpet Area */}
                <label>Carpet Area (sq. ft)</label>
                <input
                  type="number"
                  value={carpetArea}
                  onChange={(e) => updateFormData({ carpetArea: e.target.value })}
                  min="0"
                />

                {/* Number of Floors */}
                <label>No. of Floors</label>
                <input
                  type="number"
                  value={numberOfFloors}
                  onChange={(e) => updateFormData({ numberOfFloors: e.target.value })}
                  min="0"
                />

                {/* Age of Property */}
                <label>Age of Property</label>
                <input
                  type="number"
                  value={propertyAge}
                  onChange={(e) => updateFormData({ propertyAge: e.target.value })}
                  min="0"
                />

                {/* Available From */}
                <label>Available From</label>
                <input
                  type="date"
                  value={availableFrom}
                  onChange={(e) => updateFormData({ availableFrom: e.target.value })}
                />
              </>
            )}

            {/* Unique Features */}
            <label>Unique Features</label>
            <textarea
              value={uniqueFeatures}
              rows="15"
              cols="50"
              onChange={(e) => updateFormData({ uniqueFeatures: e.target.value })}
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
