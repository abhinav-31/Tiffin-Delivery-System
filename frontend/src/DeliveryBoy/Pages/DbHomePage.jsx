import React, { useEffect, useState } from "react";
import "./DbHomePage.css";
import { toast } from "react-toastify";
import {
  fetchPlacedOrdersHistory,
  updateOrderStatus,
} from "../../services/deliverboy_api"; // Adjust path as needed
import { currency } from "../assets/assets";

const PlacedOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [buttonVisible, setButtonVisible] = useState(true);
  const deliveryboyId = sessionStorage.getItem("id"); // Retrieve the correct item from sessionStorage

  const loadPlacedOrders = async () => {
    try {
      const data = await fetchPlacedOrdersHistory(deliveryboyId);
      setOrders(data);
      setButtonVisible(data.length > 0);
    } catch (error) {
      toast.error("No placed orders found!");
    }
  };

  useEffect(() => {
    loadPlacedOrders();
  }, [deliveryboyId]);

  const handleMarkAsDelivered = async () => {
    try {
      const updatePromises = orders.map(async (order) => {
        await updateOrderStatus(order.orderId, "DELIVERED");
      });
      await Promise.all(updatePromises);
      toast.success("Orders updated to DELIVERED!");
      setButtonVisible(false);
      localStorage.setItem("buttonVisible", "false");
      loadPlacedOrders(); // Refresh the order list
    } catch (error) {
      toast.error("Error updating order status!");
    }
  };

  return (
    <div className="db-homepage-container">
      <h2>Delivery Home Page</h2>
      <hr />
      <div className="db-homepage-content">
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="db-homepage-card">
              <p>
                <strong>Order ID:</strong> {order.orderId}
              </p>
              <p>
                <strong>Customer Name:</strong> {order.customer?.firstName}{" "}
                {order.customer?.lastName}
              </p>
              <p>
                <strong>Vendor Name:</strong> {order.vendor?.businessName}
              </p>
              <p>
                <strong>Earned:</strong> {currency}
                {order.earnedAmount}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                <span className="status-placed">PLACED</span>
              </p>
              <p>
                <strong>Payment Method:</strong> {order.paymentMethod}
              </p>
              <div className="delivery-address">
                <p>
                  <strong>Delivery Address:</strong>
                </p>
                <p>
                  {order.deliveryAddress?.adrLine1},{" "}
                  {order.deliveryAddress?.adrLine2}
                </p>
                <p>
                  {order.deliveryAddress?.city}, {order.deliveryAddress?.state}
                </p>
                <p>
                  {order.deliveryAddress?.country},{" "}
                  {order.deliveryAddress?.zipcode}
                </p>
                <p>Phone: {order.deliveryAddress?.phoneNo}</p>
              </div>
            </div>
          ))
        ) : (
          <p className="no-orders">No placed orders found.</p>
        )}
      </div>
      {buttonVisible && (
        <button className="mark-delivered-btn" onClick={handleMarkAsDelivered}>
          Mark All as Delivered
        </button>
      )}
    </div>
  );
};

export default PlacedOrderHistory;
