import React, { useState } from 'react';

const Sidebar = ({ onMenuItemClick }) => {
  const [activeItem, setActiveItem] = useState('dashboard');

  const handleMenuItemClick = (menuItem) => {
    setActiveItem(menuItem);
    onMenuItemClick(menuItem);
  };

  return (
    <div className="flex flex-col w-64 h-screen bg-gradient-to-b from-indigo-800 to-purple-900 text-white">
      <div className="flex items-center justify-center h-20 border-b border-indigo-700">
        <h1 className="text-3xl font-bold">Reports</h1>
      </div>
      <nav className="flex-grow p-4">
        <ul>
          <li
            className={`p-4 rounded-lg cursor-pointer ${
              activeItem === 'sales' ? 'bg-indigo-600' : 'hover:bg-indigo-700'
            }`}
            onClick={() => handleMenuItemClick('sales')}
          >
            Sales Overview
          </li>
          <li
            className={`p-4 rounded-lg cursor-pointer ${
              activeItem === 'newCustomers' ? 'bg-indigo-600' : 'hover:bg-indigo-700'
            }`}
            onClick={() => handleMenuItemClick('newCustomers')}
          >
            New Customers
          </li>
          <li
            className={`p-4 rounded-lg cursor-pointer ${
              activeItem === 'growth' ? 'bg-indigo-600' : 'hover:bg-indigo-700'
            }`}
            onClick={() => handleMenuItemClick('growth')}
          >
            Customer Growth
          </li>
          <li
            className={`p-4 rounded-lg cursor-pointer ${
              activeItem === 'geography' ? 'bg-indigo-600' : 'hover:bg-indigo-700'
            }`}
            onClick={() => handleMenuItemClick('geography')}
          >
            Geographical Distribution
          </li>
          {/* <li
            className={`p-4 rounded-lg cursor-pointer ${
              activeItem === 'cohort' ? 'bg-indigo-600' : 'hover:bg-indigo-700'
            }`}
            onClick={() => handleMenuItemClick('cohort')}
          >
            Cohort Analysis
          </li> */}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
