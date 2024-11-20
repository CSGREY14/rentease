import React, { useState } from 'react';
import { Slider, Chip, Box, Rating } from '@mui/material'; // Import necessary MUI components
import './resultheader.css'; // Use a separate CSS file for PG filter panel styles

// Declare sharing options
const sharingOptions = ['Private',1,2,3,'4+'];
// BHK options
const bhkOptions = [1, 2, 3, '4+'];

// Declare amenities for PG
const houseRulesOptions = [
  'breakfast', 'lunch', 'dinner', 'mealsProvidedVeg', 'mealsProvidedNonVeg', 
  'visitorsAllowed', 'partyAllowed', 'warden', 'smokingAllowed', 'drinkingAllowed'
];
const amenityOptions = [
  'parkingAvailable', 'lift', 'petFriendly', 'wifi', 'ac', 'powerBackup', 
  'roomCleaningService', 'electricChargesIncluded', 'waterChargesIncluded', 
  'swimmingPool', 'gymnasium', 'wheelchairFriendly', 'laundry', 
   'waterCooler', 'waterPurifier'
];

const genderPreferenceOptions=['Male','Female','Any'];

// Declare localities
const localities = [
  "White Town", "Muthialpet", "Lawspet", "Reddiarpalayam", "Ouppalam", 
  "Auroville", "Serenity Beach", "Chinna Veerampattinam", "Kottakuppam", 
  "Mudaliarpet", "Ariyankuppam", "Thavalakuppam", "Kuyavarpalayam", 
  "Villiyanur", "Thirubuvanai", "Karuvadikuppam", "Bahour"
];

function PGFilterPanel({ applyFilters, handleFilterChange, clearFilters, appliedFilters }) {
  const [budget, setBudget] = useState({ min: 0, max: 100000 });
  const [area, setArea] = useState({ min: 0, max: 5000 });
  const [rating, setRating] = useState(0);
  const [vastuScore, setVastuScore] = useState({ min: 0, max: 100 });
  const [selectedSharing, setSelectedSharing] = useState([]);
  const [selectedLocalities, setSelectedLocalities] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [selectedHouseRules, setSelectedHouseRules] = useState([]);
  const [furnishingStatus, setFurnishingStatus] = useState([]);
  const [genderPreference, setGenderPreference] = useState([]);
  const [selectedBHKs, setSelectedBHKs] = useState([]); // Manage BHK state


  const handleChipToggle = (filterKey, value) => {
    let updatedList;

    if (filterKey === 'roomType') {
      updatedList = selectedSharing.includes(value) 
        ? selectedSharing.filter((item) => item !== value) 
        : [...selectedSharing, value];
      setSelectedSharing(updatedList);
    } else if (filterKey === 'localities') {
      updatedList = selectedLocalities.includes(value) 
        ? selectedLocalities.filter((item) => item !== value) 
        : [...selectedLocalities, value];
      setSelectedLocalities(updatedList);
    } else if (filterKey === 'amenities') {
      updatedList = selectedAmenities.includes(value) 
        ? selectedAmenities.filter((item) => item !== value) 
        : [...selectedAmenities, value];
      setSelectedAmenities(updatedList);
    }else if (filterKey === 'houseRules') {
      updatedList = selectedHouseRules.includes(value) 
        ? selectedHouseRules.filter((item) => item !== value) 
        : [...selectedHouseRules, value];
      setSelectedHouseRules(updatedList);
    }else if (filterKey === 'furnishingStatus') {
      updatedList = furnishingStatus.includes(value) 
        ? furnishingStatus.filter((item) => item !== value) 
        : [...furnishingStatus, value];
      setFurnishingStatus(updatedList);
    } else if (filterKey === 'genderPreference') {
      updatedList = genderPreference.includes(value) 
        ? genderPreference.filter((item) => item !== value) 
        : [...genderPreference, value];
      setGenderPreference(updatedList);
    }  else if (filterKey === 'bedrooms') {
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

  const handleClearFilters = () => {
    // Reset all filter states to their initial values
    setBudget({ min: 0, max: 100000 });
    setArea({ min: 0, max: 5000 });
    setVastuScore({ min: 0, max: 100 });
    setRating(0);
    setSelectedLocalities([]);
    setFurnishingStatus([]);
    setSelectedAmenities([]);
    setSelectedBHKs([]);
    setSelectedHouseRules([]);
    setSelectedSharing([]);
    setGenderPreference([]);

    // Call the clearFilters function passed as a prop from the parent
    clearFilters();
  };


  return (
    <div className="pg-filter-panel">
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

     
      <h3>Sharing Options</h3>
      <div className="sharing-filter">
        {sharingOptions.map((sharing) => (
          <Chip
            key={sharing}
            label={sharing}
            onClick={() => handleChipToggle('roomType', sharing)}
            color={selectedSharing.includes(sharing) ? 'primary' : 'default'}
            style={{ margin: '4px' }}
          />
        ))}
      </div>

      <h3>Gender options</h3>
      <div className="sharing-filter">
        {genderPreferenceOptions.map((gender) => (
          <Chip
            key={gender}
            label={gender}
            onClick={() => handleChipToggle('genderPreference', gender)}
            color={genderPreference.includes(gender) ? 'primary' : 'default'}
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
          color={furnishingStatus.includes('Furnished') ? 'primary' : 'default'}
          style={{ margin: '4px' }}
        />
        <Chip
          label="Unfurnished"
          onClick={() => handleChipToggle('furnishingStatus', 'No')}
          color={furnishingStatus.includes('Unfurnished') ? 'primary' : 'default'}
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

      <h3>House Rules</h3>
      <div className="amenities-filter">
        {houseRulesOptions.map((rule) => (
          <Chip
            key={rule}
            label={rule.replace(/([A-Z])/g, ' $1').trim()} // Format label names
            onClick={() => handleChipToggle('houseRules', rule)}
            color={selectedHouseRules.includes(rule) ? 'primary' : 'default'}
            style={{ margin: '4px' }}
          />
        ))}
      </div>

      <div className="filter-buttons">
        <button onClick={applyFilters}>Apply Filters</button>
        <button onClick={handleClearFilters}>Clear Filters</button>
      </div>

    </div>
  );
}

export default PGFilterPanel;
