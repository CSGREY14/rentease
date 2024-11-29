import React, { useState } from 'react';
import './AdminPanel.css'; // Add custom CSS
import Sidebar from './Sidebar';

import UserManagement from './UserManagement';
import PropertiesManagement from './PropertiesManagement';
import AnalyticsAndReports from './AnalyticsAndReports';
import ModerationPanel from './ModerationPanel';
import Navbar from './navbar';

const AdminPanel = () => {
  const [activeSection, setActiveSection] = useState('UserManagement');

  const menuItems = [
    
    { text: 'User Management', key: 'UserManagement' },
    { text: 'Properties Management', key: 'PropertiesManagement' },
    { text: 'Analytics and Reports', key: 'AnalyticsAndReports' },
    { text: 'Moderation Panel', key: 'ModerationPanel' },
  ];

  const renderContent = () => {
    switch (activeSection) {
      
      case 'UserManagement': return <UserManagement />;
      case 'PropertiesManagement': return <PropertiesManagement />;
      case 'AnalyticsAndReports': return <AnalyticsAndReports />;
      case 'ModerationPanel': return <ModerationPanel />;
      default: return <UserManagement />;
    }
  };

  return (
    <div className="admin-panel">
      <Navbar/>
      <Sidebar menuItems={menuItems} onSelect={setActiveSection} />
      <div className="content">{renderContent()}</div>
    </div>
  );
};

export default AdminPanel;
