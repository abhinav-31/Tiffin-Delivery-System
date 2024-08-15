import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./ProfilePage.css";
import NavBar from "../navbar/navbar";
import { updateProfile, fetchOrdersHistory } from "../../services/user"; // Ensure this import matches your file structure

function ProfilePage() {
  const [activeTab, setActiveTab] = useState(""); // All tabs inactive initially
  const [editName, setEditName] = useState("");
  const [editEmail, setEditEmail] = useState("");
  const [editMode, setEditMode] = useState(false); // For toggling edit mode
  const [orders, setOrders] = useState([]); // To store orders
  const [loadingOrders, setLoadingOrders] = useState(false); // Loading state for orders
  const [ordersError, setOrdersError] = useState(""); // Error state for orders
  const navigate = useNavigate();

  const name = sessionStorage.getItem("name");
  const email = sessionStorage.getItem("email");

  const addresses = useSelector((state) => state.address);

  const loginStatus = sessionStorage.getItem("loginStatus");
  useEffect(() => {
    if (loginStatus !== "true") {
      toast.info("Please Sign In to View Profile");
      navigate('/login'); // Redirect to login if not signed in
    }
  }, [loginStatus, navigate]);

  useEffect(() => {
    if (activeTab === "orders") {
      const fetchOrders = async () => {
        setLoadingOrders(true);
        try {
          const result = await fetchOrdersHistory();
          setOrders(result.orders || []);
          toast.success("Orders fetched successfully!");
        } catch (error) {
          setOrdersError("Failed to fetch orders");
          toast.error("Failed to fetch orders");
        } finally {
          setLoadingOrders(false);
        }
      };
      fetchOrders();
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
    // Redirect to review page or show a modal
    navigate(`/orders/review/${orderId}`);
  };

  return (
    <div>
      <NavBar /> {/* Ensure the NavBar is included */}
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
            <h1 className="name">Welcome {name} to Tiffinity</h1> {/* Always shown */}
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
                              <button className="update-button green" onClick={handleSaveClick}>
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
                        <td></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {activeTab === "orders" && (
                <div>
                  <h2>Your Orders</h2>
                  {loadingOrders ? (
                    <p>Loading...</p>
                  ) : ordersError ? (
                    <p>{ordersError}</p>
                  ) : orders.length === 0 ? (
                    <p>No orders found</p>
                  ) : (
                    <table className="orders-table">
                      <thead>
                        <tr>
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
                            <td>{order.id}</td>
                            <td>{order.vendorBusinessName}</td>
                            <td>{order.menuName}</td>
                            <td>{order.quantity}</td>
                            <td>${order.totalAmount.toFixed(2)}</td>
                            <td>
                              <button
                                className="review-button primary"
                                onClick={() => handleReviewClick(order.id)}
                              >
                                Review
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
                  <h2>Address Book</h2>
                  {addresses.length === 0 ? (
                    <p>No addresses found</p>
                  ) : (
                    <ul>
                      {addresses.map((address, index) => (
                        <li key={index}>
                          {address.street}, {address.city}, {address.state},{" "}
                          {address.zip}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
