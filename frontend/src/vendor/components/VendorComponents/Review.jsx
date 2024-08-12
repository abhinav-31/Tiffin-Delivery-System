import React, { useEffect, useState } from 'react';
import './ReviewPage.css';
import { fetchCustomerReviews } from '../../../services/vendor_api'; // Adjust the path to your vendor_api.jsx
import { toast } from 'react-toastify';

const Review = () => {
  const [reviews, setReviews] = useState([]);

  const loadReviews = async () => {
    try {
      const data = await fetchCustomerReviews();
      setReviews(data.data); // Assuming your API returns { success: true, data: [...] }
    } catch (error) {
      toast.error("An error occurred while fetching reviews");
    }
  };

  useEffect(() => {
    loadReviews();
  }, []);

  return (
    <div className="review-container">
      <h2>Customer Reviews</h2>
      <div className="review-list">
        {reviews.length === 0 ? (
          <p>No reviews available.</p>
        ) : (
          reviews.map((review, index) => (
            <div key={index} className="review-item">
              <div className="review-header">
                <strong>Rating:</strong> {review.rating} / 5
              </div>
              <div className="review-comment">
                <p>{review.comment}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Review;
