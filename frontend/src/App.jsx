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
import VendorList from "./Admin/Pages/List/VendorList";
import AdminHome from "./Admin/Pages/AdminHome";
import DeliveryboyList from "./Admin/Pages/List/DeliveryboyList";
import CustomerList from "./Admin/Pages/List/CustomerList";
import OrderReviewList from "./Admin/Pages/List/OrderReviewList";

//Vendor imports
import VendorHomePage from "./vendor/Pages/VendorHomePage";
import AddMenu from "./vendor/components/VendorComponents/AddMenu";
import ViewOrders from "./vendor/components/VendorComponents/ViewOrders";
import PlacedOrderHistory from "./vendor/components/VendorComponents/PlacedOrderHistory";
// import Review from "./vendor/components/VendorComponents/Review";
import AddBreakfastMenu from "./vendor/components/VendorComponents/AddBreakfastMenu";
import VendorLayout from "./vendor/layouts/vendorLayouts";
import DeliveredOrderHistory from "./vendor/components/VendorComponents/DeliveredOrderHistory ";
import CustomerFeedback from "./CustomerFeedback";

// deliveryboy imports
import "./App.css";
import DbLayout from "./DeliveryBoy/layouts/dbLayouts";
import DbHomePage from "./DeliveryBoy/Pages/DbHomePage";
import DeliveredOrderedList from "./DeliveryBoy/components/DeliveredOrderHistory"

import VendorDetail from "./components/VendorDetail";
import NavBar from "./components/navbar/navbar";
import MenuList from "./vendor/components/VendorComponents/List/MenuList";
import ProfilePage from "./components/login/ProilePage";

function App() {
  return (
    <div className="App">
      <NavBar />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/customerfeedback" element={<CustomerFeedback />} />
        <Route path="/login" element={<LoginModal />} />
        <Route path="/ProfilePage" element={<ProfilePage/>} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/register" element={<RegisterModal />} />
        <Route path="/registerAsDB" element={<RegisterAsDB />} />
        <Route path="/registerAsVendor" element={<RegisterAsVendor />} />
        <Route path="/vendor/menu" element={<VendorDetail />} />
        <Route path="/cart" element={<Cart />} />

        {/* Admin routes with sidebar and Navbar*/}
        <Route element={<AdminLayout />}>
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/vendorlist" element={<VendorList />} />
          <Route path="/deliveryboylist" element={<DeliveryboyList />} />
          <Route path="/customerlist" element={<CustomerList />} />
          <Route path="/orderreviewlist" element={<OrderReviewList />} />
        </Route>

        {/* Vendor routes with Sidebar */}
        <Route element={<VendorLayout />}>
          <Route path="/vendorhomepage" element={<VendorHomePage />} />
          <Route path="/addmenu" element={<AddMenu />} />
          <Route path="/PlacedOrderHistory" element={<PlacedOrderHistory />} />
          <Route
            path="/DeliveredOrderHistory"
            element={<DeliveredOrderHistory />}
          />
          {/* <Route path="/review" element={<Review />} /> */}
          <Route path="/addbreakfastmenu" element={<AddBreakfastMenu />} />
          <Route path="/menulist" element={<MenuList />} />
        </Route>

        <Route element={<DbLayout />}>
          <Route path="/deliveryhome" element={<DbHomePage />} />
          <Route path="/deliveredorderlist" element={<DeliveredOrderedList/>}/>
        </Route>
      </Routes>

      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
