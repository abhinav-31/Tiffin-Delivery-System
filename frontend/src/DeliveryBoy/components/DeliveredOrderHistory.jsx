import React, { useEffect, useState } from "react";
import "./DeliveredOrderHistory.css";
import { toast } from "react-toastify";
import { fetchDeliveredOrdersHistory } from "../../services/deliverboy_api"; // Adjust path as needed
import { currency } from "../assets/assets";

const DeliveredOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const deliveryboyId = sessionStorage.getItem("id"); // Retrieve the correct item from sessionStorage

  const loadPlacedOrders = async () => {
    try {
      const data = await fetchDeliveredOrdersHistory(deliveryboyId);
      setOrders(data);
    } catch (error) {
      toast.error("No delivered orders found!");
    }
  };

  useEffect(() => {
    loadPlacedOrders();
  }, [deliveryboyId]);

  return (
    <div className="order-history">
      <h2>Delivered Order History</h2>
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
                {order.customer.firstName} {order.customer.lastName}
              </p>
              <p>{order.vendor.businessName}</p>
              <p>
                {currency}
                {order.earnedAmount.toFixed(2)}
              </p>
              <p className="status-delivered">DELIVERED</p>
              <p>{order.paymentMethod}</p>
              <div className="delivery-address">
                <p>
                  {order.deliveryAddress.adrLine1},{" "}
                  {order.deliveryAddress.adrLine2}
                </p>
                <p>
                  {order.deliveryAddress.city}, {order.deliveryAddress.state}
                </p>
                <p>
                  {order.deliveryAddress.country},{" "}
                  {order.deliveryAddress.zipcode}
                </p>
                <p>Phone: {order.deliveryAddress.phoneNo}</p>
              </div>
            </div>
          ))
        ) : (
          <div ></div>
        )}
      </div>
    </div>
  );
};

export default DeliveredOrderHistory;
