
import { Link, useNavigate } from 'react-router-dom';
import './Vendor.css';
import React from 'react';

const Vendor = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/vendorlist');
  };

  return (
    <div onClick={handleClick}>
      <Link to="/vendorlist"></Link>
      <h6>Vendors</h6> 
    </div>
  );
};

export default Vendor;