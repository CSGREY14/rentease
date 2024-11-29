import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { FaPhoneAlt, FaUserCircle, FaHome } from "react-icons/fa"; // Import FaHome
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [usertype, setUsertype] = useState("");
  const navigate = useNavigate(); // Use navigate for programmatic routing

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setIsLoggedIn(true);
      setUsername(user.name);
      setUsertype(user.type);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar-brand" onClick={() => navigate("/home")}>
          RentEase
        </div>
        <div className="navbar-buttons">
          {/* Home Icon Button */}
          <div className="tooltip">
            <Link to="/home">
              <button className="home-btn">
                <FaHome />
              </button>
            </Link>
            <span className="tooltiptext">Home</span>
          </div>
          <Link to="/msf">
            <button className="post-property-btn">Post Property</button>
          </Link>
          <div className="tooltip">
            <Link to="/contact">
              <button className="contact-btn">
                <FaPhoneAlt />
              </button>
            </Link>
            <span className="tooltiptext">Contact Us</span>
          </div>
          <div className="profile-dropdown">
            <button className="profile-btn">
              <FaUserCircle />
            </button>
            <div className="dropdown-content">
              {isLoggedIn ? (
                <>
                  <p className="dropdown-item">{username}</p>
                  <Link to="/user-profile-page" className="dropdown-item">
                    Manage Profile
                  </Link>
                  {usertype === "Admin" && (
                    <Link to="/admin-panel" className="dropdown-item">
                      Admin Panel
                    </Link>
                  )}
                  <button onClick={handleLogout} className="dropdown-item">
                    Logout
                  </button>
                </>
              ) : (
                <Link to="/login" className="dropdown-item">
                  Log In
                </Link>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
