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


// import React from "react";
// import { Outlet } from 'react-router-dom';
// import Sidebar from "../components/Sidebar/Sidebar";
// import Navbar from "../components/Navbar/Navbar";
// import 'bootstrap/dist/css/bootstrap.min.css';

// const AdminLayout = () => {
//   return (
//     <div className="container-fluid">
//       <Navbar />
//       <hr />
//       <div className="row">
//         <div className="d-flex">
//           <Sidebar />
//         <div className="flex-grow-1 p-3">
//           <Outlet />
//         </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdminLayout;


import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from "../components/Sidebar/Sidebar";
import Navbar from "../components/Navbar/Navbar";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';

const AdminLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (!token) {
      navigate('/adminsignin'); // Redirect to sign-in if no token is found
    }
  }, [navigate]);

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

