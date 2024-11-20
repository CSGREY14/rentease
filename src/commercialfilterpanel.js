import React, { useState } from 'react';
import { Slider, Chip, Box, Rating } from '@mui/material';
import './resultheader.css';

// Declare all Commercialamenities for commercial properties
const amenityOptions = [
  'conferenceArea', 'receptionArea', 'oxygenDuct', 'maintenanceStaff',
  'serviceLift', 'waterStorage', 'wasteDisposal', 'ups', 'parking',
  'fireAlarm', 'securityAlarm', 'fireExtinguisher', 'centralAC',
  'cctv', 'securityPersonnel'
];

// Declare property subtypes for commercial properties
const propertySubtypes = [
  'Manufacturing Factory', 'Warehouse', 'Godown', 'Office', 'Shop/Showroom'
];

// BHK options (optional for commercial, you can modify as needed)
const ageOptions = [0, 1, 2, 3, 4, '5+']; // Age of properties in years

function CommercialFilterPanel({ applyFilters, handleFilterChange, clearFilters }) {
  const [budget, setBudget] = useState({ min: 0, max: 100000 });
  const [area, setArea] = useState({ min: 0, max: 5000 });
  const [vastuScore, setVastuScore] = useState({ min: 0, max: 100 });
  const [rating, setRating] = useState(0);
  const [readyToMove,setreadyToMove]= useState([]);
  
  const [selectedLocalities, setSelectedLocalities] = useState([]);
  const [selectedCommercialAmenities, setSelectedCommercialAmenities] = useState([]);
  const [selectedSubtypes, setSelectedSubtypes] = useState([]);
  const [selectedAges, setSelectedAges] = useState([]);

  const localities = [
    "White Town", "Muthialpet", "Lawspet", "Reddiarpalayam", "Ouppalam",
    "Auroville", "Serenity Beach", "Chinna Veerampattinam", "Kottakuppam",
    "Mudaliarpet", "Ariyankuppam", "Thavalakuppam", "Kuyavarpalayam",
    "Villiyanur", "Thirubuvanai", "Karuvadikuppam", "Bahour"
  ];

  const handleChipToggle = (filterKey, value) => {
    let updatedList;

    if (filterKey === 'commercialAmenities') {
      updatedList = selectedCommercialAmenities.includes(value)
        ? selectedCommercialAmenities.filter((item) => item !== value)
        : [...selectedCommercialAmenities, value];
      setSelectedCommercialAmenities(updatedList);
    } else if (filterKey === 'localities') {
      updatedList = selectedLocalities.includes(value)
        ? selectedLocalities.filter((item) => item !== value)
        : [...selectedLocalities, value];
      setSelectedLocalities(updatedList);
    } else if (filterKey === 'readyToMove') {
      updatedList = readyToMove.includes(value) 
        ? readyToMove.filter((item) => item !== value) 
        : [...readyToMove, value];
      setreadyToMove(updatedList);
    } else if (filterKey === 'propertySubtypes') {
      updatedList = selectedSubtypes.includes(value)
        ? selectedSubtypes.filter((item) => item !== value)
        : [...selectedSubtypes, value];
      setSelectedSubtypes(updatedList);
    } else if (filterKey === 'age') {
      updatedList = selectedAges.includes(value)
        ? selectedAges.filter((item) => item !== value)
        : [...selectedAges, value];
      setSelectedAges(updatedList);
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
    setreadyToMove([]);
    setSelectedCommercialAmenities([]);
    setSelectedSubtypes([]);
    setSelectedAges([]);

    // Call the clearFilters function passed as a prop from the parent
    clearFilters();
  };


  return (
    <div className="commercial-filter-panel">
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
            handleFilterChange('minRating', newValue);
          }}
          precision={0.1}
          sx={{ fontSize: "30px !important" }}
        />
      </Box>

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

  <div>
  <h3>Furnishing Status</h3>
  <div className="furnishing-filter">
    <Chip
      label="Ready to move"
      onClick={() => handleChipToggle('readyToMove', 'yes')}
      color={readyToMove.includes('yes') ? 'primary' : 'default'}
      style={{ margin: '4px' }}
    />
    <Chip
      label="Bare shell"
      onClick={() => handleChipToggle('readyToMove', 'no')}
      color={readyToMove.includes('no') ? 'primary' : 'default'}
      style={{ margin: '4px' }}
    />
  </div>
</div>

      <h3>Commercial Amenities</h3>
      <div className="amenities-filter">
        {amenityOptions.map((amenity) => (
          <Chip
            key={amenity}
            label={amenity.replace(/([A-Z])/g, ' $1').trim()}
            onClick={() => handleChipToggle('commercialAmenities', amenity)}
            color={selectedCommercialAmenities.includes(amenity) ? 'primary' : 'default'}
            style={{ margin: '4px' }}
          />
        ))}
      </div>

      <h3>Age of Properties (Years)</h3>
      <div className="age-filter">
        {ageOptions.map((age) => (
          <Chip
            key={age}
            label={`${age} years`}
            onClick={() => handleChipToggle('age', age)}
            color={selectedAges.includes(age) ? 'primary' : 'default'}
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

export default CommercialFilterPanel;
