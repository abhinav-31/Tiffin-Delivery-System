import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./OrderHistory.css"; // Import your CSS file for this component

const orderHistory = [
  {
    id: 1,
    customer: "Abhijeet Yesare",
    order: "2 Chapatis, 1 Rice, 1 Dal",
    status: "Accepted",
  },
  {
    id: 2,
    customer: "Riya joshi",
    order: "1 Rice, 1 Subji",
    status: "Rejected",
  },
  {
    id: 3,
    customer: "Maya Thakur",
    order: "3 Chapatis, 1 Dal, 1 Sweet",
    status: "Accepted",
  },
  {
    id: 4,
    customer: "Mahesh Yesare",
    order: "1 Chapati, 1 Rice",
    status: "Rejected",
  },
  {
    id: 5,
    customer: "Kavita Birjanje",
    order: "2 Chapatis, 1 Rice, 1 Dal",
    status: "Accepted",
  },
  {
    id: 6,
    customer: "Kartik kambale",
    order: "1 Rice, 1 Subji",
    status: "Rejected",
  },
  {
    id: 7,
    customer: "Adity Bhosale",
    order: "3 Chapatis, 1 Dal, 1 Sweet",
    status: "Accepted",
  },
  {
    id: 8,
    customer: "Sanket Dongare",
    order: "1 Chapati, 1 Rice",
    status: "Rejected",
  },
];

const DbOrderHistoryPage = () => {
  const renderOrderHistory = () => {
    return orderHistory.map((order, index) => (
      <div className="order-item" key={index}>
        <div className="order-details">
          <h3 className="customer-name">{order.customer}</h3>
          <p className="order-text">Ordered: {order.order}</p>
        </div>
        <div className={`status ${order.status.toLowerCase()}`}>
          {order.status}
        </div>
      </div>
    ));
  };

  return (
    <div className="container order-history-container">
      <h1 className="text-center mb-4">Order History</h1>
      <div className="row">
        <div className="col-md-12">
          <div className="order-history-wrapper">{renderOrderHistory()}</div>
        </div>
      </div>
    </div>
  );
};

export default DbOrderHistoryPage;
