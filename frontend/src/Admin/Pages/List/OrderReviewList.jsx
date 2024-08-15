import React, { useEffect, useState } from "react";
import "./OrderReviewList.css";
import { fetchOrderreviews } from "../../../services/admin_api";

const renderStars = (rating) => {
  const maxRating = 5;
  let stars = "";

  for (let i = 1; i <= maxRating; i++) {
    stars += i <= rating ? "★" : "☆";
  }

  return stars;
};

const OrderReviewList = () => {
  const [orderreviewList, setOrderreviews] = useState([]);

  useEffect(() => {
    const getOrderReviews = async () => {
      try {
        const data = await fetchOrderreviews();
        console.log(data);
        setOrderreviews(data);
      } catch (error) {
        console.error("Error fetching order reviews:", error);
      }
    };
    getOrderReviews();
  }, []);

  return (
    <div className="list add flex-col">
      <h4>All Order Reviews</h4>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Sr. No.</b>
          <b>Created Time</b>
          <b>Updated Time</b>
          <b>Comments</b>
          <b>Ratings</b>
        </div>
        {orderreviewList.map((orderreview, index) => {
          return (
            <div key={orderreview.id || index} className="list-table-format">
              <p>{index + 1}</p>
              <p>{orderreview.customerName}</p>
              <p>{orderreview.orderId}</p>
              <p>{orderreview.reviewMessage}</p>
              {/* <p>{orderreview.rating}</p> */}
              <p>{renderStars(orderreview.rating)}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default OrderReviewList;
