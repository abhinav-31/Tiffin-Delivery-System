// src/vendor/layouts/VendorLayout.js
import React from 'react';
import Sidebar from '../components/VendorComponents/Sidebar';
import { Outlet } from 'react-router-dom';
import Navbar from '../../components/navbar/navbar'

const VendorLayout = () => {
  return (
    <div className="container-fluid">
      {/* <Navbar/> */}
      <div className='row'>
        <div className='d-flex'>
            <Sidebar/>
          <div className='flex-grow-1 p-3'>
            <Outlet/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorLayout;
