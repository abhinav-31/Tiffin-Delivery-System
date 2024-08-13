import React from "react";
import { Link } from "react-router-dom";
import "./VendorHomePage.css"; // Import the updated CSS file

const VendorHomePage = () => {
  return (
    <div className="vendor-homepage">
      <h1>Welcome to Your Vendor Dashboard</h1>
      <div className="vendor-homepage-content">
        <div className="vendor-card">
          <h2>Manage Menus</h2>
          <p>
            Update your lunch, dinner, and breakfast menus to keep your
            offerings fresh and exciting.
          </p>
          <Link to="/addmenu" className="vendor-btn-primary">
            Add Menu Items
          </Link>
        </div>
        <div className="vendor-card">
          <h2>View Orders</h2>
          <p>Keep track of your current orders and manage them effectively.</p>
          <Link to="/menulist" className="vendor-btn-primary">
            View Orders
          </Link>
        </div>
        <div className="vendor-card">
          <h2>Placed Orders</h2>
          <p>
            Review past placed orders and analyze trends to improve your
            service.
          </p>
          <Link to="/PlacedOrderHistory" className="vendor-btn-primary">
            Placed Orders
          </Link>
        </div>
        <div className="vendor-card">
          <h2>Delivered Order History</h2>
          <p>
            Check the history of delivered orders and analyze your delivery
            efficiency.
          </p>
          <Link to="/DeliveredOrderHistory" className="vendor-btn-primary">
            Delivered Order History
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VendorHomePage;
