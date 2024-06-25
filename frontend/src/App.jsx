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

import VendorHomePage from "./vendor/Pages/VendorHomePage";
import AddMenu from "./vendor/components/VendorComponents/AddMenu";
import ViewOrders from "./vendor/components/VendorComponents/ViewOrders";
import OrderHistory from "./vendor/components/VendorComponents/OrderHistory";
import Review from "./vendor/components/VendorComponents/Review";
import AddBreakfastMenu from "./vendor/components/VendorComponents/AddBreakfastMenu";

import VendorLayout from "./vendor/layouts/vendorLayouts";
import "./App.css";
import DbLayout from "./components/DeliveryBoy/layouts/dbLayouts";
import DbHomePage from "./components/DeliveryBoy/Pages/DbHomePage";
import DBReviewPage from "./components/DeliveryBoy/components/Review";

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
          <Route path="/orderhistory" element={<OrderHistory />} />
          <Route path="/review" element={<Review />} />
          <Route path="/addbreakfastmenu" element={<AddBreakfastMenu />} />
        </Route>

        <Route element={<DbLayout />}>
          <Route path="/dbhomepage" element={<DbHomePage />} />
          <Route path="/dbreview" element={<DBReviewPage />} />
        </Route>
      </Routes>

      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
