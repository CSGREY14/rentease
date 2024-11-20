import React, { useState } from 'react';
import './Sidebar.css';

const Sidebar = ({ menuItems, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar-container ${isOpen ? 'open' : ''}`}>
      {/* Hamburger Button */}
      <div className="hamburger" onClick={toggleSidebar}>
        <div className="line"></div>
        <div className="line"></div>
        <div className="line"></div>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
        <ul>
          {menuItems.map((item) => (
            <li key={item.key} onClick={() => onSelect(item.key)}>
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
