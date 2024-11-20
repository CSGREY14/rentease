import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './PropertyCard.css';
import { FaStar, FaRupeeSign } from 'react-icons/fa';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Carousel styles

function PropertyCard({ property }) {

  const navigate = useNavigate();
  const viewDetails = () => {
    
    navigate('/property-details', { state: { property } }); // Pass property data as state
  };
  // Label for furnished properties
  //const furnishedLabel = property.isFurnished === "Yes" ? <span className="furnished-label">Furnished</span> : null;
// Label for furnished properties or ready-to-move commercial properties
const furnishedLabel =
  property.propertyType === "Commercial" && property.readyToMove === "yes" ? (
    <span className="furnished-label">Ready to Move</span>
  ) :property.isFurnished === "Yes" ? (
    <span className="furnished-label">Furnished</span>
  ): null;

  // Highlight amenities for residential and commercial properties
  const highlightAmenities = (amenities) => {
    return Object.entries(amenities)
      .filter(([_, value]) => value === true)
      .slice(0, 3) // Get the first 3 available amenities
      .map(([key]) => key.replace(/([A-Z])/g, ' $1').trim()) // Format the key
      .join(', ');
  };
  const highlightHouseRules = (houseRules) => {
    return Object.entries(houseRules)
      .filter(([_, value]) => value === true)
      .slice(0, 3) // Get the first 3 house rules
      .map(([key]) => key.replace(/([A-Z])/g, ' $1').trim()) // Format the key
      .join(', ');
  };
  // Specific highlights for commercial properties
  const commercialHighlights = () => {
    const highlights = [];
    if (property.conferenceArea && property.conferenceArea !== "Not Available") {
      highlights.push(`Conference Area: ${property.conferenceArea}`);
    }
    if (property.receptionArea && property.receptionArea !== "Not Available") {
      highlights.push(`Reception Area: ${property.receptionArea}`);
    }
    if (property.oxygenDuct && property.oxygenDuct !== "Not Available") {
      highlights.push(`Oxygen Duct: ${property.oxygenDuct}`);
    }
    if (property.maintenanceStaff && property.maintenanceStaff !== "Not Available") {
      highlights.push(`Maintenance Staff: ${property.maintenanceStaff}`);
    }
    if (property.serviceLift && property.serviceLift !== "Not Available") {
      highlights.push(`Service Lift: ${property.serviceLift}`);
    }
    if (property.waterStorage && property.waterStorage !== "Not Available") {
      highlights.push(`Water Storage: ${property.waterStorage}`);
    }
    if (property.wasteDisposal && property.wasteDisposal !== "Not Available") {
      highlights.push(`Waste Disposal: ${property.wasteDisposal}`);
    }
    if (property.ups && property.ups !== "Not Available") {
      highlights.push(`UPS: ${property.ups}`);
    }
    if (property.parking && property.parking !== "Not Available") {
      highlights.push(`Parking: ${property.parking}`);
    }
    if (property.fireAlarm === true) {
      highlights.push(`Fire Alarm: Yes`);
    }
    if (property.securityAlarm === true) {
      highlights.push(`Security Alarm: Yes`);
    }
    if (property.fireExtinguisher === true) {
      highlights.push(`Fire Extinguisher: Yes`);
    }
    if (property.centralAC === true) {
      highlights.push(`Central AC: Yes`);
    }
    if (property.cctv === true) {
      highlights.push(`CCTV: Yes`);
    }
    if (property.securityPersonnel === true) {
      highlights.push(`Security Personnel: Yes`);
    }
    return highlights.join(', ');
  };

  
  return (
    <div className="property-card">
      <div className="property-images">
        {/* Carousel for displaying images */}
      <Carousel
        showThumbs={false} // Hide thumbnail preview below images
        showStatus={false} // Hide current image index/status
        infiniteLoop // Loop images infinitely
        autoPlay // Automatically play the slideshow
        interval={3000} // Interval for auto-play
        stopOnHover
        className="property-carousel"
      >
        {property.uploadedPhotos.map((image, index) => (
          <div key={index}>
            <img src={`http://localhost:5001/${image}`} alt="Property" className="carousel-image" />
          </div>
        ))}
      </Carousel>
      </div>

      <div className="property-details">
        <div className="header-row">
          <h2 className="owner-rating">
            {property.ownerName} <FaStar className="star-icon yellow" /> {property.rating}
          </h2>
          {furnishedLabel}
        </div>

        <p className="type-location">
          {property.propertyType} - {property.propertySubtype} in {property.locality}, {property.city}
        </p>

        <div className="price-info">
          <p>
            <FaRupeeSign /> {property.expectedRent} / month
            <span className="divider"> | </span>
            {property.carpetArea} sqft
            {property.propertyType === 'Residential' && <span className="divider"> | </span>}
            {property.propertyType === 'Residential' && `${property.bedrooms} BHK`}
            {property.propertyType === 'PG' && <span className="divider"> | </span>}
            {property.propertyType === 'PG' && property.roomType==='Sharing' && `Shared by ${property.peopleSharing}`}
            {property.propertyType === 'PG' && property.roomType==='Private' && `Private`}
          </p>
        </div>

        <div className="additional-info">
          <p>Security Deposit: <FaRupeeSign /> {property.securityDeposit}</p>
        </div>

        <div className="highlights">
          <p><strong>Highlights:</strong> {property.propertyType === 'PG' ? highlightHouseRules(property.houseRules) : property.propertyType === 'Commercial' ? commercialHighlights() : highlightAmenities(property.amenities)}</p>
        </div>

        <p className="unique-features"><strong>Unique Features:</strong> {property.uniqueFeatures}</p>
        <div className="vastu-rating">
        <img src='./vastu-icon.png' alt="Vastu Icon" className="vastu-icon" /> Vastu Score: {property.vastuScore}
        </div>
        <button onClick={viewDetails} className="view-details-button">View Property Details</button>
      </div>
    </div>
  );
}

export default PropertyCard;
