// src/vendor/layouts/VendorLayout.js
import React from 'react';
import Sidebar from '../components/VendorComponents/Sidebar';
import { Outlet } from 'react-router-dom';

const VendorLayout = () => {
  return (
    <div className="vendor-layout">
      <Sidebar />
      <div className="vendor-content">
        <Outlet />
      </div>
    </div>
  );
};

export default VendorLayout;
