import React, { useState } from 'react';
import './PhotoUpload.css';

function PhotoUpload({ formData, updateFormData, prevStep, nextStep }) {
  const { uploadedPhotos } = formData; // Destructure uploaded photos from formData
  const [photoPreviews, setPhotoPreviews] = useState(uploadedPhotos || []); // Store photo previews

  // Handle file input change
  const handlePhotoUpload = (e) => {
    const files = Array.from(e.target.files);
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPhotoPreviews([...photoPreviews, ...newPreviews]);

    // Append uploaded photos to formData
    updateFormData({ uploadedPhotos: [...(formData.uploadedPhotos || []), ...files] });
  };

  // Handle photo removal
  const handleRemovePhoto = (index) => {
    const newPreviews = photoPreviews.filter((_, i) => i !== index);
    setPhotoPreviews(newPreviews);

    // Update formData as well
    const newUploadedPhotos = formData.uploadedPhotos.filter((_, i) => i !== index);
    updateFormData({ uploadedPhotos: newUploadedPhotos });
  };

  // Handle next step
  const handleNext = (e) => {
    e.preventDefault();
    
    nextStep(); // Move to the next step
  };

  // Handle back step
  const handleBack = () => {
    prevStep();
  };

  return (
    <div className="photo-upload-container">
      <div className="left-section">
        <div className="progress-steps">
          <div className="step completed">Basic Details <span>Edit</span></div>
          <div className="step completed">Location Details <span>Edit</span></div>
          <div className="step completed">Property Profile <span>Edit</span></div>
          <div className="step active">Videos & Photos</div>
          <div className="step">Pricing & Others</div>
        </div>

        <div className="property-score">
          <h4>Property Score</h4>
          <div className="score-circle">
            <span>45%</span> {/* Adjust the score dynamically if needed */}
          </div>
          <p>Better your property score, greater your visibility</p>
        </div>
      </div>

      <div className="main-section">
        <h2>Upload Photos and Videos of your Property</h2>
        <form onSubmit={handleNext} className="photo-upload-form">
          <div className="photo-upload">
            <label>Upload Photos</label>
            <input
              type="file"
              accept="image/*"
              multiple
              onChange={handlePhotoUpload}
            />
            <div className="photo-previews">
              {photoPreviews.map((preview, index) => (
                <div key={index} className="photo-preview">
                  <img src={preview} alt={`Uploaded ${index}`} />
                  <button type="button" onClick={() => handleRemovePhoto(index)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add video upload if required */}
          {/* <div className="video-upload">
            <label>Upload Videos</label>
            <input
              type="file"
              accept="video/*"
              multiple
              onChange={handleVideoUpload} // Add video upload handler
            />
          </div> */}

          <div className="form-actions">
            <button type="button" className="back-button" onClick={handleBack}>Back</button>
            <button type="submit" className="submit-button">Continue</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PhotoUpload;
