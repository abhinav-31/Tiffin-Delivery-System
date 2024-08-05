import React from "react";
import { Link } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <div className="d-flex">
      <div className="bg-dark" id="sidebar-container">
        <div className="list-group list-group-flush">
          <Link
            to="/dbhomepage"
            className="list-group-item list-group-item-action bg-dark text-white"
          >
            Home
          </Link>

          {/* <Link
            to="/viewdborder"
            className="list-group-item list-group-item-action bg-dark text-white"
          >
            View Orders
          </Link> */}
          <Link
            to="/dbreview"
            className="list-group-item list-group-item-action bg-dark text-white"
          >
            Reviews/Feedback
          </Link>
          <Link
            to="/dborderhistory"
            className="list-group-item list-group-item-action bg-dark text-white"
          >
            Order History
          </Link>
        </div>
      </div>
      <div id="page-content-wrapper">
        {/* Your main content will go here */}
      </div>
    </div>
  );
};

export default Sidebar;
