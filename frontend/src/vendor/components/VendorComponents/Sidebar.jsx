import React from "react";
import "./Sidebar.css";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <NavLink to="/vendorhomepage" className="sidebar-option">
          <img src={assets.home_icon} alt="" />
          <p>Home</p>
        </NavLink>
        <NavLink to="/addmenu" className="sidebar-option">
          <img src={assets.add_icon} alt="" />
          <p>Add Menu</p>
        </NavLink>
        {/* <NavLink to='/review' className="sidebar-option">
            <img src={assets.review_icon} alt="" />
            <p>Reviews</p>
        </NavLink> */}
        <NavLink to="/PlacedOrderHistory" className="sidebar-option">
          <img src={assets.history_icon} alt="" />
          <p>Placed Orders</p>
        </NavLink>
        <NavLink to="/DeliveredOrderHistory" className="sidebar-option">
          <img src={assets.history_icon} alt="" />
          <p>Delivered Order History</p>
        </NavLink>
        <NavLink to="/menulist" className="sidebar-option">
          <img src={assets.list_icon} alt="" />
          <p>Menu List</p>
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;
