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
        
        <div className="navbar-buttons">
          <Link to="/msf">
            <button className="post-property-btn">Post Property</button>
          </Link>
          <Link to="/contact">
          <button className="contact-btn">
            <FaPhoneAlt />
          </button>
          </Link>
          <div className="profile-dropdown">
            <button className="profile-btn">
              <FaUserCircle />
            </button>
            <div className="dropdown-content">
              {isLoggedIn ? (
                <>
                  <p className="dropdown-item">{username}</p>
                  
                  <Link to="/user-profile-page" className="dropdown-item">Manage Profile</Link>
                  
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
