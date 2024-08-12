import React, { useEffect, useState } from 'react';
import './PlacedOrderHistory.css';
import { toast } from 'react-toastify';
import { fetchPlacedOrdersHistory } from '../../../services/vendor_api'; // Adjust path as needed
import { currency } from '../../assets/assets'; // Assuming you have a currency constant

const PlacedOrderHistory = ({ vendorId }) => {
  const [orders, setOrders] = useState([]);
  console.log(vendorId);
  const loadPlacedOrders = async () => {
    try {
      // if (vendorId) {
        const data = await fetchPlacedOrdersHistory(vendorId);
        setOrders(data);

      // } else {
      //   toast.error("Vendor ID is missing");
      // }
    } catch (error) {
      toast.error("Error fetching placed order history");
    }
  };

  useEffect(() => {
    loadPlacedOrders();
  }, [vendorId]);

  return (
    <div className='order-history'>
      <h2>Placed Order History</h2>
      <div className='order-history-table'>
        <div className='order-history-header'>
          <b>Order ID</b>
          <b>Customer ID</b>
          <b>Amount</b>
          <b>Status</b>
          <b>Payment Method</b>
        </div>
        {orders.length > 0 ? (
          orders.map((order) => (
            <div key={order.id} className='order-history-row'>
              <p>{order.id}</p>
              <p>{order.customerId}</p>
              <p>{currency}{order.amount}</p>
              <p>{order.status}</p>
              <p>{order.paymentMethod}</p>
            </div>
          ))
        ) : (
          <p>No orders found</p>
        )}
      </div>
    </div>
  );
};

export default PlacedOrderHistory;
