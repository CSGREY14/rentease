import React, { useState, useEffect } from 'react';
import './resultheader.css'; // Keep CSS for header
import PropertyCard from './propertycard';
import FilterPanel from './filterpanel';
import ResultHeader from './result-header'; // Ensure it imports correctly
import { useLocation } from 'react-router-dom';
import PGFilterPanel from './pgfilterpanel'; // Import PG filter panel
import CommercialFilterPanel from './commercialfilterpanel'; // Import Commercial filter panel

function SearchResults() {
  const [properties, setProperties] = useState([]);
  const [filteredProperties, setFilteredProperties] = useState([]);
  const [appliedFilters, setAppliedFilters] = useState({
    bedrooms: [],
    minBudget: null,
    maxBudget: null,
    minArea: null,
    maxArea: null,
    localities: [],
    furnishingStatus: [],
    minVastuScore: null,
    maxVastuScore: null,
    minRating: null,
    amenities: [],
    propertySubtypes:[],
    readyToMove:[],
    age:[],
    commercialAmenities:[],
    houseRules:[],
    roomType:[],
    genderPreference:[]
  });
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category'); // Get the category from URL
  const subtype = queryParams.get('subtype'); // New subtype query
  const locality = queryParams.get('locality'); // Get the locality


   useEffect(() => {
    // Fetch properties by category
    fetch(`http://localhost:5001/api/properties?category=${category}&subtype=${subtype}&locality=${locality}`)
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
        setFilteredProperties(data);
      })
      .catch((error) => {
        console.error('Error fetching properties:', error);
      });
  }, [category, subtype, locality]);

  // Function to filter properties based on the applied filters
  const applyFilters = () => {
    let filtered = properties;
   
    if (appliedFilters.bedrooms && appliedFilters.bedrooms.length > 0) {
      filtered = filtered.filter((property) => { if (property.bedrooms>=4) {return appliedFilters.bedrooms.includes('4+')}
      else {return appliedFilters.bedrooms.includes(property.bedrooms)}});
    }
    if (appliedFilters.roomType && appliedFilters.roomType.length > 0) {
      filtered = filtered.filter((property) => { if (property.roomType=='Private') {return appliedFilters.roomType.includes('Private')}
      
      else {if (property.peopleSharing>=4) {return appliedFilters.roomType.includes('4+')} else {return appliedFilters.roomType.includes(property.peopleSharing)}}});
    }
    // Filter by budget
    if (appliedFilters.minBudget !== null && appliedFilters.maxBudget !== null) {
      filtered = filtered.filter(
        (property) => property.expectedRent >= appliedFilters.minBudget && property.expectedRent <= appliedFilters.maxBudget
      );
    }

    // Filter by area
    if (appliedFilters.minArea !== null && appliedFilters.maxArea !== null) {
      filtered = filtered.filter(
        (property) => property.carpetArea >= appliedFilters.minArea && property.carpetArea <= appliedFilters.maxArea
      );
    }

    // Filter by localities
    if (appliedFilters.localities.length > 0) {
      filtered = filtered.filter((property) => appliedFilters.localities.includes(property.locality));
    }
    // Filter by gender pref
    if (appliedFilters.genderPreference.length > 0) {
      filtered = filtered.filter((property) => appliedFilters.genderPreference.includes(property.genderPreference));
    }
    //subtypes
    if (appliedFilters.propertySubtypes.length > 0) {
      filtered = filtered.filter((property) => appliedFilters.propertySubtypes.includes(property.propertySubtype));
    }

    // Filter by furnishing status
    if (appliedFilters.furnishingStatus.length > 0) {
      filtered = filtered.filter((property) => appliedFilters.furnishingStatus.includes(property.isFurnished));
    }
    if (appliedFilters.readyToMove.length > 0) {
      filtered = filtered.filter((property) => appliedFilters.readyToMove.includes(property.readyToMove));
    }
    // Filter by Vastu score
    if (appliedFilters.minVastuScore !== null && appliedFilters.maxVastuScore !== null) {
      filtered = filtered.filter(
        (property) => property.vastuScore >= appliedFilters.minVastuScore && property.vastuScore <= appliedFilters.maxVastuScore
      );
    }

    // Filter by property rating
    if (appliedFilters.minRating !== null && appliedFilters.maxRating !== null) {
      filtered = filtered.filter(
        (property) => property.rating >= appliedFilters.minRating );
    }

    // Filter by amenities
    if (appliedFilters.amenities.length > 0) {
      filtered = filtered.filter((property) => {
        return appliedFilters.amenities.every((amenity) => property.amenities[amenity] === true);
      });
    }
// Filter by houserules
if (appliedFilters.houseRules.length > 0) {
  filtered = filtered.filter((property) => {
    return appliedFilters.houseRules.every((rule) => property.houseRules[rule] === true);
  });
}
//age
    if (appliedFilters.age && appliedFilters.age.length > 0) {
      filtered = filtered.filter((property) => { if (property.propertyAge>=5) {return appliedFilters.age.includes('5+')}
      else {return appliedFilters.age.includes(property.propertyAge)}});
    }
    
    // Filter by commercial
    if (appliedFilters.commercialAmenities.length > 0) {
      filtered = filtered.filter((property) => {
        return appliedFilters.commercialAmenities.every((commercialAmenity) => property[commercialAmenity] === true || property[commercialAmenity] === 'Available');
      }); 
    }

    setFilteredProperties(filtered);
  };

  // Function to handle filter changes
  const handleFilterChange = (filterKey, value) => {
    setAppliedFilters((prev) => ({
      ...prev,
      [filterKey]: value,
    }));
    console.log(appliedFilters);
  };

  // Function to clear all filters
  const clearFilters = () => {
    setAppliedFilters({
      bedrooms: [],
      minBudget: null,
      maxBudget: null,
      minArea: null,
      maxArea: null,
      localities: [],
      furnishingStatus: [],
      minVastuScore: null,
      maxVastuScore: null,
      minRating: null,
      amenities: [],
      propertySubtypes:[],
      readyToMove:[],
      age:[],
      commercialAmenities:[],
      houseRules:[],
      roomType:[],
      genderPreference:[]
    });
    setFilteredProperties(properties); // Reset to show all properties
  };

   // Select the appropriate filter panel based on the category
   const renderFilterPanel = () => {
    switch (category) {
      case 'PG':
        return (
          <PGFilterPanel
            applyFilters={applyFilters}
            handleFilterChange={handleFilterChange}
            clearFilters={clearFilters}
            appliedFilters={appliedFilters}
          />
        );
      case 'Commercial':
        return (
          <CommercialFilterPanel
            applyFilters={applyFilters}
            handleFilterChange={handleFilterChange}
            clearFilters={clearFilters}
            appliedFilters={appliedFilters}
          />
        );
      default:
        return (
          <FilterPanel
            applyFilters={applyFilters}
            handleFilterChange={handleFilterChange}
            clearFilters={clearFilters}
            appliedFilters={appliedFilters}
          />
        );
    }
  };


  return (
    <div className="search-results-page">
      <ResultHeader /> {/* Ensure this renders at the top */}
      <div className="content-wrapper">
      {renderFilterPanel()} {/* Render the appropriate filter panel */}
        <div className="property-list">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard key={property._id} property={property} /> // Use _id for unique key from MongoDB
            ))
          ) : (
            <p>No properties found.</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;