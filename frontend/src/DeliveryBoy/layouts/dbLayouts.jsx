import React from "react";
import Sidebar from "../components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import Navbar from "../../components/navbar/navbar"
import 'bootstrap/dist/css/bootstrap.min.css';

const DbLayout = () => {
  return (
    <div className="container-fluid">
      {/* <Navbar /> */}
      <Navbar/>
      <hr />
      <div className="row">
        <div className="d-flex">
          <Sidebar />
        <div className="flex-grow-1 p-3">
          <Outlet />
        </div>
        </div>
      </div>
    </div>
  );
};

export default DbLayout;
