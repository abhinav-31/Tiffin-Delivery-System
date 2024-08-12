import React from "react";
import "./Vendor.css"; // Import your CSS file

function Vendor({ property, onClick }) {
  // Function to generate star rating
  const getStars = (rating) => {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

    return (
      <>
        {"★".repeat(fullStars)}
        {hasHalfStar && <span className="star-half">★</span>}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className="card text-center vendor-card" onClick={onClick}>
      <div className="card-body">
        <div className="d-flex align-items-center justify-content-center mb-3">
          {/* Optional: include avatar or other elements */}
        </div>
        <div className="ms-3">
          {property.vendorBusinessImage && (
            <img
              src={`data:image/jpeg;base64,${property.vendorBusinessImage}`}
              alt="Vendor"
              className="vendor-image"
            />
          )}
          <h5 className="font-size-16 mb-1">{property.businessName}</h5>
        </div>
        <div className="mt-3 pt-1">
          <div className="rating-container">
            <span className="rating-stars">{getStars(property.rating)}</span>
            <span className="rating-number">{property.rating.toFixed(1)}</span>
          </div>
          {/* Optionally include more details */}
        </div>
        {/* Optionally include buttons or other elements */}
      </div>
    </div>
  );
}

export default Vendor;
