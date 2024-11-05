import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ProfilePage.css";
import NavBar from "../navbar/navbar";
import {
  updateProfile,
  fetchOrdersHistory,
  fetchAddresses,
} from "../../services/user";
import ReviewModal from "./ReviewModal";
import { addReview } from "../../services/OrderService";
function ProfilePage() {
  const [activeTab, setActiveTab] = useState(""); // All tabs inactive initially
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editMode, setEditMode] = useState(false); // For toggling edit mode
  const [orders, setOrders] = useState([]); // To store orders
  const [ordersError, setOrdersError] = useState(""); // Error state for orders
  const [addresses, setAddresses] = useState([]); // To store addresses
  const [addressesError, setAddressesError] = useState(""); // Error state for addresses
  const navigate = useNavigate();
  const [reviewModal, setReviewModal] = useState(false);
  const [submittedReviews, setSubmittedReviews] = useState({});

  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");
  const loginStatus = sessionStorage.getItem("loginStatus");
  const [orderId, setOrderId] = useState();

  useEffect(() => {
    if (loginStatus !== "true") {
      toast.info("Please Sign In to View Profile");
      navigate("/login"); // Redirect to login if not signed in
    }
  }, [loginStatus, navigate]);

  useEffect(() => {
    if (activeTab === "orders") {
      const fetchOrders = async () => {
        try {
          const result = await fetchOrdersHistory();
          console.log("Fetched orders:", result);
          setOrders(result);
          toast.success("Orders fetched successfully!");
        } catch (error) {
          setOrdersError("Failed to fetch orders");
          toast.error("Failed to fetch orders");
        }
      };
      fetchOrders();
    } else if (activeTab === "address") {
      const fetchAddressesData = async () => {
        try {
          const addressesData = await fetchAddresses();
          console.log("Fetched addresses:", addressesData);

          if (addressesData.length === 0) {
            toast.info("No addresses found. Please add your address.");
          } else {
            setAddresses(addressesData);
            console.log("Addresses state after update:", addressesData);
            toast.success("Addresses fetched successfully");
          }
        } catch (error) {
          setAddressesError("Failed to fetch addresses. Please try again.");
          toast.error("Failed to fetch addresses. Please try again.");
        }
      };
      fetchAddressesData();
    }
  }, [activeTab]);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    if (tab === "profile") {
      setEditName(name || "");
      setEditEmail(email || "");
    }
  };

  const handleSaveClick = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const result = await updateProfile(editName, editEmail, token);
      if (result.message === "Profile updated successfully") {
        toast.success("Profile updated successfully!");
        sessionStorage.setItem("name", editName);
        sessionStorage.setItem("email", editEmail);
        setEditMode(false);
      } else {
        toast.error("Failed to update profile");
      }
    } catch (error) {
      toast.error("An error occurred while updating your profile");
    }
  };

  const handleReviewClick = (orderId) => {
    console.log("in review handle");
    setOrderId(orderId);
    setReviewModal(true);
  };

  const handleReviewSubmit = async (reviewData) => {
    try {
      const response = await addReview(orderId, reviewData);
      if (response["message"] === "Review Added Successfully") {
        toast.success("Review submitted successfully!");
        setReviewModal(false);
        setSubmittedReviews((prev) => ({ ...prev, [orderId]: true }));
      }
    } catch (error) {
      toast.error("Failed to submit review");
    }
  };

  const handleReviewClose = () => {
    setReviewModal(false);
    setOrderId(null);
  };

  return (
    <div>
      <NavBar />
      <div className="profile-container">
        <div className="row">
          <div className="sidebar">
            <div className="sidebar-options">
              <div
                className={`sidebar-option ${
                  activeTab === "profile" ? "active" : ""
                }`}
                onClick={() => handleTabClick("profile")}
              >
                <p>View Profile</p>
              </div>
              <div
                className={`sidebar-option ${
                  activeTab === "orders" ? "active" : ""
                }`}
                onClick={() => handleTabClick("orders")}
              >
                <p>Your Orders</p>
              </div>
              <div
                className={`sidebar-option ${
                  activeTab === "address" ? "active" : ""
                }`}
                onClick={() => handleTabClick("address")}
              >
                <p>Address Book</p>
              </div>
            </div>
          </div>
          <div className="col">
            <h1 className="name">Welcome {name} to Tiffinity</h1>
            <div className="profile-section">
              {activeTab === "profile" && (
                <div className="profile-table">
                  <table>
                    <tbody>
                      <tr>
                        <td className="label">Name:</td>
                        <td>
                          {editMode ? (
                            <input
                              type="text"
                              className="profile-input"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                            />
                          ) : (
                            <span>{name}</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td className="label">Email:</td>
                        <td>
                          {editMode ? (
                            <input
                              type="email"
                              className="profile-input"
                              value={editEmail}
                              onChange={(e) => setEditEmail(e.target.value)}
                            />
                          ) : (
                            <span>{email}</span>
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td></td>
                        <td>
                          {!editMode ? (
                            <button
                              className="update-button yellow"
                              onClick={() => setEditMode(true)}
                            >
                              Update
                            </button>
                          ) : (
                            <div className="action-buttons">
                              <button
                                className="update-button green"
                                onClick={handleSaveClick}
                              >
                                Save
                              </button>
                              <button
                                className="update-button red"
                                onClick={() => setEditMode(false)}
                              >
                                Cancel
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === "orders" && (
                <div>
                  <h2>Your Orders</h2>
                  {ordersError ? (
                    <p>{ordersError}</p>
                  ) : orders.length === 0 ? (
                    <p>No orders found</p>
                  ) : (
                    <table className="orders-table">
                      <thead>
                        <tr>
                          <th>#</th> {/* Index Column */}
                          <th>Order ID</th>
                          <th>Vendor</th>
                          <th>Menu Item</th>
                          <th>Quantity</th>
                          <th>Total Amount</th>
                          <th>Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((order, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td> {/* Display Index */}
                            <td>{order.id}</td>
                            <td>{order.vendorBusinessName}</td>
                            <td>{order.menuName}</td>
                            <td>{order.quantity}</td>
                            <td>${order.totalAmount.toFixed(2)}</td>
                            <td>
                              <button
                                className="review-button"
                                onClick={() => handleReviewClick(order.id)}
                                disabled={submittedReviews[order.id]} // Disable button if review is submitted
                              >
                                {submittedReviews[order.id]
                                  ? "Submitted"
                                  : "Review"}
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
              {activeTab === "address" && (
                <div>
                  <h2>Your Addresses</h2>
                  {addressesError ? (
                    <p>{addressesError}</p>
                  ) : addresses.length === 0 ? (
                    <p>No addresses found</p>
                  ) : (
                    <table className="addresses-table">
                      <thead>
                        <tr>
                          <th>#</th> {/* Index Column */}
                          <th>Address Line 1</th>
                          <th>Address Line 2</th>
                          <th>City</th>
                          <th>State</th>
                          <th>Country</th>
                          <th>Zip Code</th>
                          <th>Phone Number</th>
                        </tr>
                      </thead>
                      <tbody>
                        {addresses.map((address, index) => (
                          <tr key={address.id}>
                            <td>{index + 1}</td> {/* Display Index */}
                            <td>{address.adrLine1}</td>
                            <td>{address.adrLine2}</td>
                            <td>{address.city}</td>
                            <td>{address.state}</td>
                            <td>{address.country}</td>
                            <td>{address.zipcode}</td>
                            <td>{address.phoneNo}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {reviewModal && (
        <ReviewModal
          isOpen={reviewModal}
          orderId={orderId}
          onClose={handleReviewClose}
          onSubmit={handleReviewSubmit}
        />
      )}
    </div>
  );
}

export default ProfilePage;
