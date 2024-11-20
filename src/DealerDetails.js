// DealerDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './DealerDetails.css';

function DealerDetails({ property }) {
  const [dealerInfo, setDealerInfo] = useState({});
  const [propertyCount, setPropertyCount] = useState(0);
  const [localities, setLocalities] = useState([]);
  const [isEmailVisible, setIsEmailVisible] = useState(false);
  const [isPhoneVisible, setIsPhoneVisible] = useState(false);
  const [enquiry, setEnquiry] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [agreement, setAgreement]=useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [detailType, setDetailType] = useState(null); // 'email' or 'phone'
  const user = JSON.parse(localStorage.getItem('user'));
  const userName = user.name;
  const userEmail = user.email;
  const userPhone = user.phone_no;

  const handleViewDetails = (type) => {
    setDetailType(type);
    setIsModalOpen(true);
  };

  const handleAgreeAndView = () => {
    if (agreeTerms) {
      if (detailType === 'email') setIsEmailVisible(true);
      if (detailType === 'phone') setIsPhoneVisible(true);
      setIsModalOpen(false);
      setAgreeTerms(false); // Reset checkbox for next use
    } else {
      alert("Please agree to the terms and conditions.");
    }
  };

  useEffect(() => {
    // Fetch dealer info based on owner name
    axios.get(`http://localhost:5002/api/dealer-info?ownerName=${property.ownerName}`)
      .then((response) => setDealerInfo(response.data))
      .catch((error) => console.error("Error fetching dealer info", error));

    // Fetch properties count and localities
    axios.get(`http://localhost:5002/api/properties-info?dealer_name=${property.ownerName}`)
      .then((response) => {
        setPropertyCount(response.data.propertyCount);
        setLocalities(response.data.localities);
      })
      .catch((error) => console.error("Error fetching properties info", error));
  }, [property.ownerName]);

  const handleSendEnquiry = () => {
    if (agreement) {
      const enquiryData = {
        dealerEmail: dealerInfo.email,
        userName,
        userEmail,
        userPhone,
        message: enquiry,
      };
      axios.post('http://localhost:5002/api/send-enquiry', enquiryData)
        .then(() => alert('Enquiry sent successfully!'))
        .catch((error) => console.error("Error sending enquiry", error));
    } else {
      alert('Please agree to the terms and conditions.');
    }
  };

  return (
    <div className="dealer-details">
      <div className="dealer-info">
        <h2>Dealer Details</h2>
        <img src="./dealer_pnava.png" alt="Dealer" className="dealer-photo" />
        <p>Name: {dealerInfo.name}</p>
        {isEmailVisible ? (
        <p>Email: {dealerInfo.email}</p>
      ) : (
        <button onClick={() => handleViewDetails('email')}>View Email</button>
      )}

      {isPhoneVisible ? (
        <p>Phone: {dealerInfo.phone_no}</p>
      ) : (
        <button onClick={() => handleViewDetails('phone')}>View Phone No</button>
      )}

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>You are requesting to view dealer details</h3>
            <label>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={() => setAgreeTerms(!agreeTerms)}
              />
              I agree to the terms and conditions
            </label>
            <button onClick={handleAgreeAndView}>View Details</button>
            <button onClick={() => setIsModalOpen(false)}>Close</button>
          </div>
        </div>
      )}
      <p>No. of Properties Listed: {propertyCount}</p>
        <p>Localities: {localities.join(", ")}</p>
        <p>Address: {dealerInfo.locality}</p>
      </div>

      <div className="enquiry-form">
        <h2>Send Enquiry to Dealer</h2>
        <label>
          You are:
          <input type="text" defaultValue={userName || ""} />
        </label>
        <label>
          Email:
          <input type="text" defaultValue={userEmail || ""}  />
        </label>
        <label>
          Phone:
          <input type="text" defaultValue={userPhone || ""} />
        </label>
        <textarea
          placeholder="Why are you interested in this property?"
          value={enquiry}
          onChange={(e) => setEnquiry(e.target.value)}
          rows="5"
          cols="25"
        />
        <label>
          <input type="checkbox" checked={agreement} onChange={() => setAgreement(!agreement)} />
          I agree to the terms and conditions and privacy policy
        </label>
        <button onClick={handleSendEnquiry}>Send Enquiry</button>
      </div>
    </div>
  );
}

export default DealerDetails;
