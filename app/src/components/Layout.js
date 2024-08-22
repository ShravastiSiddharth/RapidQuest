import React, { useState } from 'react';
import Sidebar from './Sidebar';
import SalesChart from './SalesChart';
import NewCustomersChart from './NewCustomersChart';
import RepeatedCustomersChart from './RepeatedCustomersChart';
import LocationWiseCustomer from './LocationWiseCustomer';
import CohortValueChart from './CohortValueChart';

const Layout = () => {
  const [selectedMenuItem, setSelectedMenuItem] = useState('sales');

  const renderDashboard = () => {
    switch (selectedMenuItem) {
      case 'sales':
        return <SalesChart />;
      case 'newCustomers':
        return <NewCustomersChart />;
      case 'growth':
        return <RepeatedCustomersChart/>
      case 'geography':
        return <LocationWiseCustomer/>
      case 'cohort':
        return <CohortValueChart/>  
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
