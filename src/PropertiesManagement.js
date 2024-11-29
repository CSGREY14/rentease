import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PropertiesManagement.css";

const localities = [
  "White Town", "Muthialpet", "Lawspet", "Reddiarpalayam", "Ouppalam", "Auroville", 
  "Serenity Beach", "Chinna Veerampattinam", "Kottakuppam", "Mudaliarpet", 
  "Ariyankuppam", "Thavalakuppam", "Kuyavarpalayam", "Villiyanur", 
  "Thirubuvanai", "Karuvadikuppam", "Bahour"
];

const propertyTypes = ["Residential", "Commercial", "PG"];
const residentialSubtypes = [
  "Independent House/Villa", "Residential Apartment", "Studio Apartment",
  "Serviced Apartment", "Penthouse/Farmhouse"
];
const commercialSubtypes = [
  "Manufacturing Factory", "Warehouse", "Godown", "Office", "Shop/Showroom"
];

const PropertiesManagement = () => {
  const [properties, setProperties] = useState([]);
  const [editProperty, setEditProperty] = useState(null);
  const [subtypes, setSubtypes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProperties();
  }, []);

  const fetchProperties = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/allproperties");
      setProperties(response.data);
    } catch (error) {
      console.error("Error fetching properties:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change for editing property
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditProperty({ ...editProperty, [name]: value });
    
    if (name === "propertyType") {
      updateSubtypes(value);
    }
  };

  // Update the available subtypes based on property type
  const updateSubtypes = (propertyType) => {
    if (propertyType === "Residential") {
      setSubtypes(residentialSubtypes);
    } else if (propertyType === "Commercial") {
      setSubtypes(commercialSubtypes);
    } else {
      setSubtypes([]); // For PG, no subtypes
    }
  };

  // Save edited property
  const saveEdit = async () => {
    try {
      await axios.put(`http://localhost:5001/api/properties/${editProperty._id}`, editProperty);
      setEditProperty(null);
      fetchProperties();
    } catch (error) {
      alert("An error occurred, check console for details");
      console.error("Error saving property:", error);
    }
  };

  // Delete property
  const deleteProperty = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/properties/${id}`);
      fetchProperties();
    } catch (error) {
      alert("An error occurred, check console for details");
      console.error("Error deleting property:", error);
    }
  };

  return (
    <div className="properties-management">
      <h2>Properties Management</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          {/* Edit Property Form */}
          {editProperty && (
            <div className="edit-property-form">
              <h3>Edit Property</h3>
              <select
                name="propertyType"
                value={editProperty.propertyType}
                onChange={handleInputChange}
              >
                <option value="">Select Property Type</option>
                {propertyTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>

              {editProperty.propertyType && (
                <select
                  name="propertySubtype"
                  value={editProperty.propertySubtype}
                  onChange={handleInputChange}
                >
                  <option value="">Select Property Subtype</option>
                  {subtypes.map((subtype) => (
                    <option key={subtype} value={subtype}>
                      {subtype}
                    </option>
                  ))}
                </select>
              )}

              <select
                name="locality"
                value={editProperty.locality}
                onChange={handleInputChange}
              >
                <option value="">Select Locality</option>
                {localities.map((locality) => (
                  <option key={locality} value={locality}>
                    {locality}
                  </option>
                ))}
              </select>

              <input
                type="number"
                name="rating"
                placeholder="Rating"
                value={editProperty.rating}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="vastuScore"
                placeholder="Vastu Score"
                value={editProperty.vastuScore}
                onChange={handleInputChange}
              />
              <input
                type="number"
                name="expectedRent"
                placeholder="Expected Rent"
                value={editProperty.expectedRent}
                onChange={handleInputChange}
              />
              <select
                name="availableStatus"
                value={editProperty.availableStatus}
                onChange={handleInputChange}
              >
                <option value={true}>Available</option>
                <option value={false}>Rented</option>
              </select>
              
              <button onClick={saveEdit}>Save</button>
            </div>
          )}

          {/* Properties List */}
          <div className="properties-list">
            <h3>All Properties</h3>
            <table>
              <thead>
                <tr>
                  <th>Serial No</th>
                  <th>ID</th>
                  <th>Type</th>
                  <th>Subtype</th>
                  <th>Owner</th>
                  <th>Locality</th>
                  <th>Rating</th>
                  <th>Vastu Score</th>
                  <th>Rent</th>
                  <th>Status</th>
                  
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {properties.map((property, index) => (
                  <tr key={property._id}>
                    <td>{index + 1}</td> {/* Serial number */}
                    <td>{property._id}</td>
                    <td>{property.propertyType}</td>
                    <td>{property.propertySubtype}</td>
                    <td>{property.ownerName}</td>
                    <td>{property.locality}</td>
                    <td>{property.rating}</td>
                    <td>{property.vastuScore}</td>
                    <td>{property.expectedRent}</td>
                    <td>{property.availableStatus ? "Available" : "Rented"}</td>
                    
                    <td>
                      <button onClick={() => setEditProperty(property)}>Edit</button>
                      <button onClick={() => deleteProperty(property._id)}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default PropertiesManagement;
