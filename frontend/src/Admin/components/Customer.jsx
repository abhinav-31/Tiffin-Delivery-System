import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Customers = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/customerlist');
  };

  return (
    <div onClick={handleClick}>
       <Link to="/customerlist"></Link>
      <h6>Customers</h6>
    </div>
  );
};

export default Customers;
