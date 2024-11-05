import React, { useEffect, useRef, useState } from "react";
import "./DbHomePage.css";
import { toast } from "react-toastify";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import {
  fetchPlacedOrdersHistory,
  updateOrderStatus,
} from "../../services/deliverboy_api"; // Adjust path as needed
import { currency } from "../assets/assets";

const PlacedOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [buttonVisible, setButtonVisible] = useState(true);
  // const deliveryboyId = sessionStorage.getItem("id"); // Retrieve the correct item from sessionStorage

  const [notifications, setNotifications] = useState([]);
  const clientRef = useRef(null); // Create a ref for the Stomp client
  const loadPlacedOrders = async () => {
    try {
      const data = await fetchPlacedOrdersHistory();
      setOrders(data);
      setButtonVisible(data.length > 0);
    } catch (error) {
      toast.error("No placed orders found!");
    }
  };
useEffect(()=>{
  const socket = new SockJS("http://localhost:8081/ws"); // Adjust the URL
    const client = Stomp.over(socket);
    clientRef.current = client; // Store the client in the ref

    const connectWebSocket = () => {
      client.connect({}, (frame) => {
        console.log("Connected: " + frame);
        const deliveryboyId = sessionStorage.getItem("id"); // Replace with actual vendor ID logic

        // Subscribe to the vendor-specific topic only once
        client.subscribe(`/topic/deliveryBoy/${deliveryboyId}`, (message) => {
          const orderMessage = message.body;
          setNotifications((prev) => [...prev, orderMessage]);
          // alert(`New order notification: ${orderMessage}`); // Alert for demonstration
          toast.success(`New order notification: ${orderMessage}`);
        });
      });
    };

    connectWebSocket();

    // Clean up the connection on component unmount
    return () => {
      client.disconnect();
      clientRef.current = null; // Clear the ref
    };
},[])
  useEffect(() => {
    loadPlacedOrders();
  }, []);

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
