// src/vendor/layouts/VendorLayout.js
import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DbLayout = () => {
  return (
    <div className="vendor-layout ">
      <Sidebar />
      <div className="vendor-content">
        <Outlet />
      </div>
    </div>
  );
};

export default DbLayout;
