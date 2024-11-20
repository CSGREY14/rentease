import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { FaPhoneAlt, FaUserCircle } from 'react-icons/fa'; // Import Font Awesome icons
import { Link } from 'react-router-dom';

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [usertype, setUsertype] = useState('');

  useEffect(() => {
    // Check if user is logged in by checking localStorage
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      setIsLoggedIn(true);
      setUsername(user.name);
      setUsertype(user.type);
    }
  }, []);

  const handleLogout = () => {
    // Clear user data from localStorage and log out
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    window.location.href = '/login'; // Redirect to home or login page after logout
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-brand">RentEase</div>
        <ul className="navbar-links">
          <li><a href="#">For Buyers</a></li>
          <li><a href="#">For Tenants</a></li>
          <li><a href="#">For Owners</a></li>
          <li><a href="#">For Dealers</a></li>
          <li><a href="#">Insights</a></li>
        </ul>
        <div className="navbar-buttons">
          <Link to="/msf">
            <button className="post-property-btn">Post Property</button>
          </Link>
          <button className="contact-btn">
            <FaPhoneAlt />
          </button>

          <div className="profile-dropdown">
            <button className="profile-btn">
              <FaUserCircle />
            </button>
            <div className="dropdown-content">
              {isLoggedIn ? (
                <>
                  <p className="dropdown-item">{username}</p>
                  <Link to="/manage-listings" className="dropdown-item">Manage Listings</Link>
                  <Link to="/user-profile-page" className="dropdown-item">Manage Profile</Link>
                  <Link to="/shortlisted-properties" className="dropdown-item">Shortlisted Properties</Link>
                  {usertype==="Admin" && (<><Link to="/admin-panel" className="dropdown-item">Admin Panel</Link></>)}
                  <button onClick={handleLogout} className="dropdown-item">Logout</button>
                  {console.log(usertype)}
                </>
              ) : (
                <Link to="/login" className="dropdown-item">Log In</Link>
              )}
              
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
