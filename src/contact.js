import React from 'react';
import './contact.css';

const Contact = () => {
  return (
    <div className='contact-body'> 
    <div className="contact-app-container">
      {/* Image Section */}
      <div className="contact-image-section">
        <img src="/house-at-night.jpg" alt="Get in Touch" className="contact-image" />
        <div className="contact-overlay">
          <h1>GET IN TOUCH</h1>
          <p>We'd love to hear from you. Reach out with any questions or comments.</p>
        </div>
      </div>

      {/* Content Section */}
      <div className="contact-content-section">
        {/* Contact Form */}
        <div className="contact-form-container">
          <h2 className="contact-section-heading">Mail Us</h2>
          <form className="contact-form">
            <div className="contact-form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" />
            </div>
            <div className="contact-form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" />
            </div>
            <div className="contact-form-group">
              <label htmlFor="message">Message</label>
              <textarea id="message" name="message"></textarea>
            </div>
            <button type="submit" className="contact-submit-button">Submit</button>
          </form>
        </div>

        {/* Contact Info */}
        <div className="contact-info-container">
          <h2 className="contact-section-heading">Contact Information</h2>
          <p>Email: rentalwebsite@mini.com</p>
          <p>Phone: 9994196538</p>
          <p>Address: 140, White Town, Pondicherry-605001</p>
        </div>
      </div>

      {/* Hero Section */}
      <div className="contact-hero-section">
        <p className="contact-hero-text">
          Have a question? Need help? Don't hesitate, drop us a line.
        </p>
      </div>
    </div>
    </div>
  );
};

export default Contact;
