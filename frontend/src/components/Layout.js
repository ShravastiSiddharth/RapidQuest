import React, { useState } from 'react';
import Sidebar from './Sidebar';
import SalesChart from './SalesChart';
import NewCustomersChart from './NewCustomersChart';

const Layout = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('sales');

  const renderDashboard = () => {
    switch (selectedMenuItem) {
      case 'sales':
        return <SalesChart />;
      case 'customers':
        return <NewCustomersChart />;
      default:
        return <SalesChart />;
    }
  };

  return (
    <div className="flex">
      <Sidebar onMenuItemClick={setSelectedMenuItem} />
      <div className="flex-grow bg-gray-100 min-h-screen">
        {renderDashboard()}
      </div>
    </div>
  );
};

export default Layout;
