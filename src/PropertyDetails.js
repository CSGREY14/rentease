import React from 'react';
import { useLocation } from 'react-router-dom';
import PropertyHeader from './PropertyHeader';
import Overview from './Overview';
import DealerDetails from './DealerDetails';
import './PropertyDetails.css';
import RecommendedProperties from './recommendedproperties';
import ReviewRatings from './ReviewRatings';
import { useEffect } from 'react';
import LocalityDetailsComponent from './LocalityDetailsComponent';
import ReportButton from './ReportButton';

function PropertyDetails() {
  const { state } = useLocation();
  const { property } = state || {};

   // Scroll to top on component mount
   useEffect(() => {
    window.scrollTo(0, 0);
  }, [property]);

  if (!property) {
    return <p>No property details found.</p>;
  }

  return (
    <div className="property-details-page">
      <PropertyHeader property={property} />

      {/* Navigation Bar for Page Sections */}
      <nav className="property-nav">
        <a href="#overview" className="nav-link">Overview</a>
        <a href="#society-details" className="nav-link">Society Details</a>
        <a href="#dealer-details" className="nav-link">Dealer Details</a>
        <a href="#reviews" className="nav-link">Reviews</a>
        <a href="#recommendations" className="nav-link">Recommendations</a>
      </nav>

      {/* Page Sections */}
      <section id="overview">
        <Overview property={property} />
      </section>

      <section id="dealer-details">
        <DealerDetails property={property}/>
      </section>

      <section id="report-button">
        <ReportButton property={property}/>
      </section>
      
      <section id="society-details">
        <LocalityDetailsComponent/>
      </section>

      <section id="reviews">
        <ReviewRatings/>
      </section>

      

      <section id="recommendations">
        <RecommendedProperties locality={property.locality} category={property.propertyType}/>
      </section>
    </div>
  );
}

export default PropertyDetails;
