import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const AllDeliveryPersons = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/deliveryboylist');
  };

  return (
    <div onClick={handleClick}>
      <Link to="/deliveryboylist"></Link>
      <h6>Delivery Boys</h6>
    </div>
  );
};

export default AllDeliveryPersons;
