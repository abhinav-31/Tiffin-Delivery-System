import React, { useEffect, useState } from "react";
import "./DeliveredOrderHistory.css";
import {
  fetchDeliveredOrdersHistory,
  getVendorIdFromSessionStorage,
} from "../../../services/vendor_api";
import { toast } from "react-toastify";
import { currency } from "../../assets/assets";

const DeliveredOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const vendorId = getVendorIdFromSessionStorage();
  const fetchOrders = async () => {
    try {
      const response = await fetchDeliveredOrdersHistory(vendorId);
      if (response) {
        setOrders(response);
      } else {
        toast.error("Error fetching delivered order history");
      }
    } catch (error) {
      toast.error("Error fetching delivered order history");
      console.error(error);
    }
  };

  useEffect(() => {
    if (vendorId) {
      fetchOrders();
    }
  }, [vendorId]);

  return (
    <div className="order-history">
      <h2>Delivered Order History</h2>
      <div className="order-history-table">
        <div className="order-history-header">
          <b>Order ID</b>
          <b>Customer ID</b>
          <b>Amount</b>
          <b>Status</b>
          <b>Payment Method</b>
        </div>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className="order-history-row">
              <p>{order.id}</p>
              <p>{order.customerId}</p>
              <p>
                {currency}
                {order.amount}
              </p>
              <p>{order.status}</p>
              <p>{order.paymentMethod}</p>
            </div>
          ))
        ) : (
          <p>No delivered orders found</p>
        )}
      </div>
    </div>
  );
};

export default DeliveredOrderHistory;
