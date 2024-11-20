import React, { useState } from 'react';
import './SearchBar.css';
import { useNavigate } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import Chip from '@mui/material/Chip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';  // Import Grid for layout
import Button from '@mui/material/Button';

const localities = [
  "White Town", "Muthialpet", "Lawspet", "Reddiarpalayam", "Ouppalam", "Auroville",
  "Serenity Beach", "Chinna Veerampattinam", "Kottakuppam", "Mudaliarpet",
  "Ariyankuppam", "Thavalakuppam", "Kuyavarpalayam", "Villiyanur",
  "Thirubuvanai", "Karuvadikuppam", "Bahour"
];

 // Define the items for the autocomplete
 const items = [
  ...localities.map((item) => ({ key: 'locality', name: item }))
];
function SearchBar() {
  const [activeCategory, setActiveCategory] = useState('Residential');
  const [activeSubtype, setActiveSubtype] = useState('all');
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    // Encode the query string to handle special characters
    const query = selectedItems
      .map((item) => item.label)
      .join(','); // Format the query string
    console.log(query); // Use the query here, e.g., pass it to a URL or API request
    // Use navigate to go to the search results page, passing the query parameters
    navigate(`/search-results?category=${encodeURIComponent(activeCategory)}&subtype=${encodeURIComponent(activeSubtype)}&locality=${encodeURIComponent(query)}`);
  };
   // Handle selecting an item
   const handleOnSelect = (selectedItem) => {
    const newChip = { key: selectedItem.key, label: selectedItem.name };
    setSelectedItems((prevItems) => [...prevItems, newChip]);
  };


  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setActiveSubtype('all'); // Reset subtype when category changes
  };

  const handleSubtypeChange = (event) => {
    setActiveSubtype(event.target.value);
  };

  return (
    <div className="search-bar">
      <div className="search-options">
        <button
          className={activeCategory === 'Residential' ? 'active' : ''}
          onClick={() => handleCategoryChange('Residential')}
        >
          Residential
        </button>
        <button
          className={activeCategory === 'Commercial' ? 'active' : ''}
          onClick={() => handleCategoryChange('Commercial')}
        >
          Commercial
        </button>
        <button
          className={activeCategory === 'PG' ? 'active' : ''}
          onClick={() => handleCategoryChange('PG')}
        >
          PG/Co-living
        </button>
      </div>

      <div className="search-input">
        <select
          className="property-type"
          value={activeSubtype}
          onChange={handleSubtypeChange}
        >
          {activeCategory === 'Residential' && (
            <>
              <option value="all">All Residential</option>
              <option value="Independent House/Villa">Independent House/Villa</option>
              <option value="Residential Apartment">Residential Apartment</option>
              <option value="Studio Apartment">Studio Apartment</option>
              <option value="Serviced Apartment">Serviced Apartment</option>
              <option value="Penthouse/Farmhouse">Penthouse/Farmhouse</option>
            </>
          )}
          {activeCategory === 'Commercial' && (
            <>
              <option value="all">All Commercial</option>
              <option value="Manufacturing Factory">Manufacturing Factory</option>
              <option value="Warehouse">Warehouse</option>
              <option value="Godown">Godown</option>
              <option value="Office">Office</option>
              <option value="Shop/Showroom">Shop/Showroom</option>
            </>
          )}
          {activeCategory === 'PG' && (
            <option value="all">All PG/Co-living</option>
          )}
        </select>

        {/* Autocomplete Input with Chips for Multiple Keywords */}
        <div className="search-text-wrapper">

      
        </div>

        
      </div>
      <div className="chips">
        {/* Render the selected chips */}
        {selectedItems.map((chip, index) => (
          <Chip
            key={index}
            label={`${chip.key}: ${chip.label}`}
            onDelete={() => {
              setSelectedItems((prevItems) =>
                prevItems.filter((item) => item.key !== chip.key || item.label !== chip.label)
              );
            }}
          />
        ))}
      </div>

      <div>
        {/* ReactSearchAutocomplete */}
        <ReactSearchAutocomplete
          items={items}
          onSearch={(value) => setSearchQuery(value)} // Update the search query
          onSelect={handleOnSelect} // Add selected item as chip
          fuseOptions={{ keys: ['name'] }} // Match against name
          resultStringKeyName="name" // Display name in search results
          autoFocus
          showIcon={false} // Optionally hide search icon
          placeholder="Search for Locality..."
          inputDebounce={300} // Optional: adjust debounce for search input
        />

        <button onClick={handleSearch}>Search</button>
      </div>

    </div>
  );
}

export default SearchBar;
