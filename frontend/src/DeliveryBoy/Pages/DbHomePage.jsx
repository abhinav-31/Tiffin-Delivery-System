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

  console.log("Delivery Boy ID:", deliveryboyId); // Log deliveryboyId

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
    console.log("Mark as Delivered button clicked");
    try {
      const updatePromises = orders.map(async (order) => {
        console.log(`Updating order ${order.orderId} to DELIVERED`);
        await updateOrderStatus(order.orderId, "DELIVERED");
      });
      await Promise.all(updatePromises);
      toast.success("Orders updated to DELIVERED!");
      setButtonVisible(false);
      localStorage.setItem("buttonVisible", "false");
      loadPlacedOrders(); // Refresh the order list
    } catch (error) {
      console.error("Error in handleMarkAsDelivered:", error);
      toast.error("Error updating order status!");
    }
  };

  return (
    <div className="order-history">
      <h2>Delivery Home Page</h2>
      <hr />
      <div className="order-history-table">
        <div className="order-history-header">
          <b>Order ID</b>
          <b>Customer Name</b>
          <b>Vendor Name</b>
          <b>Earned</b>
          <b>Status</b>
          <b>Payment Method</b>
          <b>Delivery Address</b>
        </div>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className="order-history-row">
              <p>{order.orderId}</p>
              <p>
                {order.customer?.firstName} {order.customer?.lastName}
              </p>
              <p>{order.vendor?.businessName}</p>
              <p>
                {currency}
                {order.earnedAmount}
              </p>
              <p className="status-placed">PLACED</p>
              <p>{order.paymentMethod}</p>
              <div className="delivery-address">
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
          <div></div>
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
