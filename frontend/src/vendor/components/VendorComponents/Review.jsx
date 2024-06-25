import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ReviewPage.css'; // Import your CSS file for this component

const reviews = [
  { menu: "Chapati", rating: 4 },
  { menu: "Rice", rating: 5 },
  { menu: "Dal", rating: 3 },
  { menu: "Subji", rating: 2 },
  { menu: "Sweet", rating: 1 },
];

const ReviewPage = () => {
  const renderReviews = () => {
    return reviews.map((review, index) => (
      <div className="review-item" key={index}>
        <div className="menu-name">{review.menu}</div>
        <div className="stars">
          {renderStars(review.rating)}
        </div>
      </div>
    ));
  };

  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<span key={i} className="star filled">&#9733;</span>);
      } else {
        stars.push(<span key={i} className="star">&#9734;</span>);
      }
    }
    return stars;
  };

  return (
    <div className="container review-container">
      <h1 className="text-center mb-4">Customer Reviews</h1>
      <div className="row">
        <div className="col-md-12">
          <div className="reviews-wrapper">
            {renderReviews()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
