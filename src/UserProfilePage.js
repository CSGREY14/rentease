import React, { useState } from 'react';
import './UserProfilePage.css'; // Add custom CSS
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import User from './User';
import Listings from './Listings';
import Wishlist from './Wishlist';
import Tenants from './Tenants';

const UserProfilePage = () => {
  const [activeSection, setActiveSection] = useState('Dashboard');

  const menuItems = [
    { text: 'Dashboard', key: 'Dashboard' },
    { text: 'User', key: 'User' },
    { text: 'Listings', key: 'Listings' },
    { text: 'Wishlist', key: 'Wishlist' },
    { text: 'Tenants', key: 'Tenants' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'Dashboard': return <Dashboard />;
      case 'User': return <User />;
      case 'Listings': return <Listings />;
      case 'Wishlist': return <Wishlist />;
      case 'Tenants': return <Tenants />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="user-profile-page">
      <Sidebar menuItems={menuItems} onSelect={setActiveSection} />
      <div className="content">
        {renderContent()}
      </div>
    </div>
  );
};

export default UserProfilePage;
