
import { Link, useNavigate } from 'react-router-dom';
import './Vendor.css';
import React from 'react';

const Vendor = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
    navigate('/list');
  };

  return (
    <div onClick={handleClick}>
      <Link to="/list"></Link>
      <h6>Vendors</h6> 
    </div>
  );
};

export default Vendor;