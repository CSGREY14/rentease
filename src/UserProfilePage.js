import React, { useState } from 'react';
import './UserProfilePage.css'; // Add custom CSS
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import User from './User';
import Listings from './Listings';
import Wishlist from './Wishlist';
import Tenants from './Tenants';
import Navbar from './navbar';

const UserProfilePage = () => {
  const [activeSection, setActiveSection] = useState('Dashboard');

  const menuItems = [
    
    { text: 'User', key: 'User' },
    { text: 'Listings', key: 'Listings' },
    { text: 'Wishlist', key: 'Wishlist' },
    { text: 'Tenants', key: 'Tenants' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      
      case 'User': return <User />;
      case 'Listings': return <Listings />;
      case 'Wishlist': return <Wishlist />;
      case 'Tenants': return <Tenants />;
      default: return <User />;
    }
  };

  return (
    <><Navbar/>
    <div className="user-profile-page">
      <Sidebar menuItems={menuItems} onSelect={setActiveSection} />
      <div className="content">
        {renderContent()}
      </div>
    </div></>
  );
};

export default UserProfilePage;
