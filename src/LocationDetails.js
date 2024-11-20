import React, { useState } from 'react';
import './LocationDetails.css';
import { Link } from 'react-router-dom';

function LocationDetails({ formData, updateFormData, nextStep, prevStep }) {
  const { city, locality, subLocality, apartment, houseNumber } = formData;

  const handleChange = (e) => {
    updateFormData({ [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    nextStep(); // Move to the next step
  };

  const handleBack = () => {
    prevStep(); // Move back to the previous step
  };
  return (
    <div className="location-details-container">
      <div className="left-section">
        <div className="progress-steps">
          <div className="step completed">Basic Details</div>
          <div className="step active">Location Details</div>
          <div className="step">Property Profile</div>
          <div className="step">Videos & Photos</div>
          <div className="step">Pricing & Others</div>
        </div>
      </div>
      <div className="main-section">
        <h2>Where is your property located?</h2>
        <p>An accurate location helps you connect with the right buyers</p>

        <form onSubmit={handleNext}>
        <label>City</label>
        <input
          type="text"
          name="city"
          value={city}
          onChange={handleChange}
          placeholder="Enter your city"
          required
        />

        <label>Locality</label>
        <input
          type="text"
          name="locality"
          value={locality}
          onChange={handleChange}
          placeholder="Enter locality"
          required
        />

        <label>Sub Locality (Optional)</label>
        <input
          type="text"
          name="subLocality"
          value={subLocality}
          onChange={handleChange}
          placeholder="Enter sub locality"
        />

        <label>Apartment / Society</label>
        <input
          type="text"
          name="apartment"
          value={apartment}
          onChange={handleChange}
          placeholder="Enter apartment or society"
          required
        />

        <label>House No. (Optional)</label>
        <input
          type="text"
          name="houseNumber"
          value={houseNumber}
          onChange={handleChange}
          placeholder="Enter house number"
        />

        <button type="button" onClick={handleBack}>Back</button>
        <button type="submit">Next</button>
      </form>
      </div>

      <div className="right-section">
        <div className="why-need-location">
          <h3>Why we need an accurate location?</h3>
          <p>Location is the most important for buyers. By capturing a detailed location, we ensure you get genuine inquiries.</p>
        </div>
        <div className="property-score">
          <h4>Property Score</h4>
          <div className="score-circle">
            <span>18%</span>
          </div>
          <p>Better your property score, greater your visibility</p>
        </div>
      </div>
    </div>
  );
}

export default LocationDetails;
