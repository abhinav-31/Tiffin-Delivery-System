import React, { useEffect, useState } from "react";
import "./DeliveredOrderHistory";
import { toast } from "react-toastify";
import { fetchDeliveredOrdersHistory } from "../../services/deliverboy_api"; // Adjust path as needed
import { currency } from "../assets/assets";

const DeliveredOrderHistory = () => {
  const [orders, setOrders] = useState([]);

  const loadPlacedOrders = async () => {
    try {
      const data = await fetchDeliveredOrdersHistory();
      setOrders(data);
    } catch (error) {
      toast.error("No delivered orders found!");
    }
  };

  useEffect(() => {
    loadPlacedOrders();
  }, []);

  return (
    <div className="db-homepage-container">
      <div className="db-homepage-header">
        <h2>Delivered Order History</h2>
      </div>
      <div className="db-homepage-content">
        {orders.length > 0 ? (
          <table className="db-homepage-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>Vendor Name</th>
                <th>Earned</th>
                <th>Status</th>
                <th>Payment Method</th>
                <th>Delivery Address</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order.orderId}</td>
                  <td>
                    {order.customer.firstName} {order.customer.lastName}
                  </td>
                  <td>{order.vendor.businessName}</td>
                  <td>
                    {currency}
                    {order.earnedAmount.toFixed(2)}
                  </td>
                  <td className="status-delivered">DELIVERED</td>
                  <td>{order.paymentMethod}</td>
                  <td>
                    {order.deliveryAddress.adrLine1},{" "}
                    {order.deliveryAddress.adrLine2}
                    <br />
                    {order.deliveryAddress.city}, {order.deliveryAddress.state}
                    <br />
                    {order.deliveryAddress.country},{" "}
                    {order.deliveryAddress.zipcode}
                    <br />
                    Phone: {order.deliveryAddress.phoneNo}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="no-orders">No delivered orders found.</p>
        )}
      </div>
    </div>
  );
};

export default DeliveredOrderHistory;
