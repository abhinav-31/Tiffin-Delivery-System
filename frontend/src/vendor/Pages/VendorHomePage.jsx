import React from 'react';
import { Link } from 'react-router-dom';
import './VendorHomePage.css';

const VendorHomePage = () => {
  return (
    <div className='vendor-homepage'>
      <h1>Welcome to Your Vendor Dashboard</h1>
      <div className='vendor-homepage-content'>
        <div className='card'>
          <h2>Manage Menus</h2>
          <p>Update your lunch, dinner, and breakfast menus to keep your offerings fresh and exciting.</p>
          <Link to='/addmenu' className='btn btn-primary'>Add Menu Items</Link>
        </div>
        <div className='card'>
          <h2>View Orders</h2>
          <p>Keep track of your current orders and manage them effectively.</p>
          <Link to='/vieworder' className='btn btn-primary'>View Orders</Link>
        </div>
        <div className='card'>
          <h2>Order History</h2>
          <p>Review past orders and analyze trends to improve your service.</p>
          <Link to='/orderhistory' className='btn btn-primary'>Order History</Link>
        </div>
        <div className='card'>
          <h2>Reviews & Feedback</h2>
          <p>Check the reviews and feedback from your customers to enhance your offerings.</p>
          <Link to='/review' className='btn btn-primary'>View Reviews</Link>
        </div>
      </div>
    </div>
  );
};

export default VendorHomePage;
