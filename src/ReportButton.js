import React, { useState } from 'react';
import './ReportButton.css';

const ReportButton = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [reportFormData, setReportFormData] = useState({ issue: '', details: '' });

    const togglePopup = () => setIsPopupOpen(!isPopupOpen);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setReportFormData({ ...reportFormData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Property reported:', reportFormData);
        alert('Thank you! The property has been reported.');
        setReportFormData({ issue: '', details: '' }); // Reset form
        setIsPopupOpen(false); // Close popup
    };

    return (
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
        </div>
    );
};

export default ReportButton;
