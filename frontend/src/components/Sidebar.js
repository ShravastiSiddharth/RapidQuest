import React, { useState } from 'react';

const Sidebar = ({ onMenuItemClick }) => {
  return (
    <div className="flex flex-col w-64 h-screen bg-gray-800 text-white">
      <div className="flex items-center justify-center h-20 border-b border-gray-700">
        <h1 className="text-2xl font-semibold">TaskHive</h1>
      </div>
      <nav className="flex-grow p-4">
        <ul>
          <li
            className="p-4 hover:bg-gray-700 cursor-pointer"
            onClick={() => onMenuItemClick('sales')}
          >
            Sales Report
          </li>
          <li
            className="p-4 hover:bg-gray-700 cursor-pointer"
            onClick={() => onMenuItemClick('customers')}
          >
           New Customers Report
          </li>
          <li 
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => onMenuItemClick('repeatedCustomers')}>
          Customers Growth Report
          </li>
          <li 
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => onMenuItemClick('geoDistribution')}>
          Customers Geographical Distribution
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
