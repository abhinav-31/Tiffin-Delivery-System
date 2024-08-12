import React from "react";
import { Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "bootstrap/dist/css/bootstrap.min.css";


import Home from "./pages/home";
import HomePage from "./pages/homepage";
import LoginModal from "./components/login/loginModal";
import RegisterModal from "./components/register/registerModal";
import Cart from "./pages/cart";
import RegisterAsDB from "./components/register/registerAsDB";
import RegisterAsVendor from "./components/register/registerAsVendor";

//Admin imports
import AdminLayout from "./Admin/layouts/AdminLayout";
import List from "./Admin/Pages/List/VendorList"
import AdminHome from "./Admin/Pages/AdminHome";
import DeliveryboyList from "./Admin/Pages/List/DeliveryboyList";
import CustomerList from "./Admin/Pages/List/CustomerList"

//Vendor imports
import VendorHomePage from "./vendor/Pages/VendorHomePage";
import AddMenu from "./vendor/components/VendorComponents/AddMenu";
import ViewOrders from "./vendor/components/VendorComponents/ViewOrders";
import PlacedOrderHistory from "./vendor/components/VendorComponents/PlacedOrderHistory";
import Review from "./vendor/components/VendorComponents/Review";
import AddBreakfastMenu from "./vendor/components/VendorComponents/AddBreakfastMenu";
import OrderList from "./vendor/components/VendorComponents/List/OrderList"; 
import VendorLayout from "./vendor/layouts/vendorLayouts";
import DeliveredOrderHistory from "./vendor/components/VendorComponents/DeliveredOrderHistory ";


import "./App.css";
import DbLayout from "./components/DeliveryBoy/layouts/dbLayouts";
import DbHomePage from "./components/DeliveryBoy/Pages/DbHomePage";
import DBReviewPage from "./components/DeliveryBoy/components/Review";
import DbOrderHistoryPage from "./components/DeliveryBoy/components/OrderHistory";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/home" element={<Home />} />
        <Route path="/register" element={<RegisterModal />} />
        <Route path="/registerAsDB" element={<RegisterAsDB />} />
        <Route path="/registerAsVendor" element={<RegisterAsVendor />} />
        <Route path="/cart" element={<Cart />} />

        {/* Vendor routes with Sidebar */}
        <Route element={<VendorLayout />}>
          <Route path="/vendorhomepage" element={<VendorHomePage />} />
          <Route path="/addmenu" element={<AddMenu />} />
          <Route path="/vieworder" element={<ViewOrders />} />
          <Route path="/PlacedOrderHistory" element={<PlacedOrderHistory />} />
          <Route path="/DeliveredOrderHistory" element={<DeliveredOrderHistory />} />
          <Route path="/review" element={<Review />} />
          <Route path="/addbreakfastmenu" element={<AddBreakfastMenu />} />
          <Route path="/list" element={<OrderList/>}/>
        </Route>

          <Route element={<DbLayout />}>
            <Route path="/dbhomepage" element={<DbHomePage />} />
            <Route path="/dbreview" element={<DBReviewPage />} />
            <Route path="/dborderhistory" element={<DbOrderHistoryPage />} />
          </Route>
        </Routes>

      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
