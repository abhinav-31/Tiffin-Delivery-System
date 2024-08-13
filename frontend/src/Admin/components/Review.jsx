import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Review = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/orderreviewlist');
  };

  return (
    <div onClick={handleClick}>
       <Link to="/orderreviewlist"></Link>
      <h6>Reviews</h6>
    </div>
  );
};

export default Review;