import React, { useState } from 'react';
import { Slider, Chip, Box, Rating } from '@mui/material'; // Import necessary MUI components
import './resultheader.css';

// Declare all amenities in a separate constant
const amenityOptions = [
  'parkingAvailable', 'lift', 'petFriendly', 'wifi', 'ac', 'powerBackup', 
  'roomCleaningService', 'electricChargesIncluded', 'waterChargesIncluded', 
  'swimmingPool', 'gymnasium', 'wheelchairFriendly', 'laundry', 
   'waterCooler', 'waterPurifier'
];

// Declare property subtypes
const propertySubtypes = [
  'Residential Apartment', 'Independent House/Villa', 'Studio Apartment', 'Serviced Apartment', 'Penthouse/Farmhouse'
]

// BHK options
const bhkOptions = [1, 2, 3, '4+'];

function FilterPanel({ applyFilters, handleFilterChange, clearFilters, appliedFilters }) {
  const [budget, setBudget] = useState({ min: 0, max: 100000 }); // Updated budget max to ₹1,00,000
  const [area, setArea] = useState({ min: 0, max: 5000 });
  const [vastuScore, setVastuScore] = useState({ min: 0, max: 100 });
  const [rating, setRating] = useState(0); // Updated to single rating state

  const localities = [
    "White Town", "Muthialpet", "Lawspet", "Reddiarpalayam", "Ouppalam", "Auroville", 
    "Serenity Beach", "Chinna Veerampattinam", "Kottakuppam", "Mudaliarpet", "Ariyankuppam", 
    "Thavalakuppam", "Kuyavarpalayam", "Villiyanur", "Thirubuvanai", "Karuvadikuppam", "Bahour"
  ];

  const [selectedLocalities, setSelectedLocalities] = useState([]);
  const [furnishingStatus, setFurnishingStatus] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedSubtypes, setSelectedSubtypes] = useState([]);
  const [selectedBHKs, setSelectedBHKs] = useState([]); // Manage BHK state

  const handleChipToggle = (filterKey, value) => {
    let updatedList;

    if (filterKey === 'amenities') {
      updatedList = selectedAmenities.includes(value) 
        ? selectedAmenities.filter((item) => item !== value) 
        : [...selectedAmenities, value];
      setSelectedAmenities(updatedList);
    } else if (filterKey === 'localities') {
      updatedList = selectedLocalities.includes(value) 
        ? selectedLocalities.filter((item) => item !== value) 
        : [...selectedLocalities, value];
      setSelectedLocalities(updatedList);
    } else if (filterKey === 'furnishingStatus') {
      updatedList = furnishingStatus.includes(value) 
        ? furnishingStatus.filter((item) => item !== value) 
        : [...furnishingStatus, value];
      setFurnishingStatus(updatedList);
    } else if (filterKey === 'propertySubtypes') {
      updatedList = selectedSubtypes.includes(value)
        ? selectedSubtypes.filter((item) => item !== value)
        : [...selectedSubtypes, value];
      setSelectedSubtypes(updatedList);
    } else if (filterKey === 'bedrooms') {
      updatedList = selectedBHKs.includes(value)
        ? selectedBHKs.filter((item) => item !== value)
        : [...selectedBHKs, value];
      setSelectedBHKs(updatedList);
    }

    handleFilterChange(filterKey, updatedList); // Pass updated list to parent
  };

  const handleMultiRangeChange = (filterKey, newValue) => {
    handleFilterChange(filterKey, newValue);
  };

  const handleApplyFilters = () => {
    // Call the applyFilters function with the current state values
    applyFilters();
  };

  const handleClearFilters = () => {
    // Reset all filter states to their initial values
    setBudget({ min: 0, max: 100000 });
    setArea({ min: 0, max: 5000 });
    setVastuScore({ min: 0, max: 100 });
    setRating(0);
    setSelectedLocalities([]);
    setFurnishingStatus([]);
    setSelectedAmenities([]);
    setSelectedSubtypes([]);
    setSelectedBHKs([]);

    // Call the clearFilters function passed as a prop from the parent
    clearFilters();
  };

  return (
    <div className="filter-panel">
      <h3>Budget (₹)</h3>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Slider
          value={[budget.min, budget.max]}
          onChange={(e, newValue) => {
            setBudget({ min: newValue[0], max: newValue[1] });
            handleMultiRangeChange('minBudget',newValue[0]);
            handleMultiRangeChange('maxBudget',newValue[1]);
          }}
          min={0}
          max={100000}
          step={1000}
          valueLabelDisplay="on"
        />
      </Box>

      <h3>Area (sq ft)</h3>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Slider
          value={[area.min, area.max]}
          onChange={(e, newValue) => {
            setArea({ min: newValue[0], max: newValue[1] });
            handleMultiRangeChange('minArea', newValue[0]);
            handleMultiRangeChange('maxArea',newValue[1]);
          }}
          min={0}
          max={5000}
          step={100}
          valueLabelDisplay="on"
        />
      </Box>

      <h3>Vastu Score</h3>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Slider
          value={[vastuScore.min, vastuScore.max]}
          onChange={(e, newValue) => {
            setVastuScore({ min: newValue[0], max: newValue[1] });
            handleMultiRangeChange('minVastuScore', newValue[0]);
            handleMultiRangeChange('maxVastuScore',newValue[1]);
          }}
          min={0}
          max={100}
          step={1}
          valueLabelDisplay="on"
        />
      </Box>

      <h3>Rating</h3>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Rating
          name="rating"
          value={rating}
          onChange={(event, newValue) => {
            setRating(newValue);
            handleFilterChange('minRating', newValue); // Pass the selected rating to parent
          }}
          precision={0.1} // Set precision to allow half ratings
          sx={{ fontSize: "30px !important" }}  
          className="custom-rating" // Add a custom class
        />
      </Box>

      <h3>BHK Options</h3>
      <div className="bhk-filter">
        {bhkOptions.map((bhk) => (
          <Chip
            key={bhk}
            label={`${bhk} BHK`}
            onClick={() => handleChipToggle('bedrooms', bhk)}
            color={selectedBHKs.includes(bhk) ? 'primary' : 'default'}
            style={{ margin: '4px' }}
          />
        ))}
      </div>

      <h3>Property Subtypes</h3>
      <div className="property-subtype-filter">
        {propertySubtypes.map((subtype) => (
          <Chip
            key={subtype}
            label={subtype}
            onClick={() => handleChipToggle('propertySubtypes', subtype)}
            color={selectedSubtypes.includes(subtype) ? 'primary' : 'default'}
            style={{ margin: '4px' }}
          />
        ))}
      </div>

      <h3>Localities</h3>
      <div className="locality-filter">
        {localities.map((locality) => (
          <Chip
            key={locality}
            label={locality}
            onClick={() => handleChipToggle('localities', locality)}
            color={selectedLocalities.includes(locality) ? 'primary' : 'default'}
            style={{ margin: '4px' }}
          />
        ))}
      </div>

      <h3>Furnishing Status</h3>
      <div className="furnishing-filter">
        <Chip
          label="Furnished"
          onClick={() => handleChipToggle('furnishingStatus', 'Yes')}
          color={furnishingStatus.includes('Yes') ? 'primary' : 'default'}
          style={{ margin: '4px' }}
        />
        <Chip
          label="Unfurnished"
          onClick={() => handleChipToggle('furnishingStatus', 'No')}
          color={furnishingStatus.includes('No') ? 'primary' : 'default'}
          style={{ margin: '4px' }}
        />
      </div>

      <h3>Amenities</h3>
      <div className="amenities-filter">
        {amenityOptions.map((amenity) => (
          <Chip
            key={amenity}
            label={amenity.replace(/([A-Z])/g, ' $1').trim()} // Format label names
            onClick={() => handleChipToggle('amenities', amenity)}
            color={selectedAmenities.includes(amenity) ? 'primary' : 'default'}
            style={{ margin: '4px' }}
          />
        ))}
      </div>

      <div className="filter-buttons">
        <button onClick={handleApplyFilters}>Apply Filters</button>
        <button onClick={handleClearFilters}>Clear Filters</button>
      </div>
    </div>
  );
  
}

export default FilterPanel;
