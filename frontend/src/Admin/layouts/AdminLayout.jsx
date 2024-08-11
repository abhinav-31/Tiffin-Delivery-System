// import React from "react";
// import { Outlet } from 'react-router-dom';
// import Sidebar from "../components/Sidebar/Sidebar";
// import Navbar from "../components/Navbar/Navbar";
// import 'bootstrap/dist/css/bootstrap.min.css';

// const AdminLayout = () => {
//   return (
//     <div className="app-layout">
//       <Navbar className="navbar" />
//       <hr />
//       <div className="app-content">
//         <Sidebar />
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;


import React from "react";
import { Outlet } from 'react-router-dom';
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminLayout = () => {
  return (
    <div className="container-fluid">
      <Navbar />
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

export default AdminLayout;
