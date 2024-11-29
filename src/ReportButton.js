import React, { useState } from 'react';
import axios from 'axios';
import './ReportButton.css';

const ReportButton = ({property}) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [reportFormData, setReportFormData] = useState({ propertyId: property._id, ownerName:property.ownerName ,issue: '', details: '' ,flagged:true});

    const togglePopup = () => setIsPopupOpen(!isPopupOpen);
    const addWishlist = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user')); // Retrieve and parse user data from localStorage
            if (!user || !user._id) {
                alert("User not logged in");
                return;
            }
    
            const userId = user._id;
            const propertyId = property._id;
    
            const response = await axios.post('http://localhost:5001/api/wishlist', { userId, propertyId });
    
            if (response.status === 201) {
                alert('Wishlisted successfully');
            }
        } catch (error) {
            console.error("Error adding to wishlist:", error);
            alert('Failed to add to wishlist', error);
        }
    };        
    const handleChange = (e) => {
        const { name, value } = e.target;
        setReportFormData({ ...reportFormData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
          const response = await axios.post('http://localhost:5001/api/reportProperty', reportFormData);
          console.log('Property reported:', response.data);
          alert('Thank you! The property has been reported.');
          setReportFormData({ propertyId: property._id, ownerName: property.ownerName, issue: '', details: '',flagged:true }); // Reset form
          setIsPopupOpen(false); // Close popup
        } catch (error) {
          console.error('Error reporting the property:', error);
          alert('There was an issue reporting the property. Please try again later.');
        }
      };

    return (
        <><div className="favourite-button-container">
        <span>Like this property?</span>
        <button className="report-button" onClick={addWishlist}>
            <img src="./wish-list.png" alt="Favourite Logo" className="report-logo" />
            Wishlist
        </button>
        </div>
        <div className="report-button-container">
            
            <span>Something wrong with this property?</span>
            <button className="report-button" onClick={togglePopup}>
                <img src="./error.png" alt="Report Logo" className="report-logo" />
                Report
            </button>
            {isPopupOpen && (
                <div className="report-popup-overlay">
                    <div className="report-popup-content">
                        <h3>Report an Issue</h3>
                        <form onSubmit={handleSubmit}>
                            <label>
                                What's wrong?
                                <select
                                    name="issue"
                                    value={reportFormData.issue}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>
                                        Select an issue
                                    </option>
                                    <option value="Incorrect Details">Incorrect Details</option>
                                    <option value="Fraudulent Listing">Fraudulent Listing</option>
                                    <option value="Other">Other</option>
                                </select>
                            </label>
                            <label>
                                Additional Details:
                                <textarea
                                    name="details"
                                    value={reportFormData.details}
                                    onChange={handleChange}
                                    placeholder="Provide more information"
                                    rows="4"
                                />
                            </label>
                            <div className="report-popup-actions">
                                <button type="submit" className="report-submit-button">
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="report-cancel-button"
                                    onClick={togglePopup}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div></>
    );
};

export default ReportButton;
