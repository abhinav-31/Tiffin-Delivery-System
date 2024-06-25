import React from 'react';
import { Link } from 'react-router-dom';
import './Sidebar.css';

const Sidebar = () => {
  return (
    <div className="d-flex">
      <div className="bg-dark" id="sidebar-container">
        <div className="list-group list-group-flush">
          <Link to="/vendorhomepage" className="list-group-item list-group-item-action bg-dark text-white">Home</Link>
          <Link to="/addmenu" className="list-group-item list-group-item-action bg-dark text-white">Add Lunch/Dinner Menu</Link>
          <Link to="/addbreakfastmenu" className="list-group-item list-group-item-action bg-dark text-white">Add Breakfast Menu</Link>
          <Link to="/vieworder" className="list-group-item list-group-item-action bg-dark text-white">View Orders</Link>
          <Link to="/review" className="list-group-item list-group-item-action bg-dark text-white">Reviews/Feedback</Link>
          <Link to="/orderhistory" className="list-group-item list-group-item-action bg-dark text-white">Order History</Link>
        </div>
      </div>
      <div id="page-content-wrapper">
        {/* Your main content will go here */}
      </div>
    </div>
  );
};

export default Sidebar;