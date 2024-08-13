import React, { useEffect, useState } from 'react';
import './OrderList.css';
import { toast } from 'react-toastify';
import { fetchOrders } from '../../../../services/vendor_api';

const OrderList = () => {
  const [orderlist, setList] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrders();
        setList(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        toast.error('Failed to fetch orders. Please try again later.');
      }
    };
    getOrders();
  }, []);

  return (
    <div className='list add flex-col'>
      <p>All Menus List</p>
      <div className='list-table'>
        <div className="list-table-format title">
          <b>Sr No.</b>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Quantity</b> {/* Add Quantity Column */}
        </div>
        {orderlist.length > 0 ? (
          orderlist.map((order, index) => (
            <div key={order.id || index} className='list-table-format'>
              <p>{index + 1}</p>
              <img
                src={order.image || 'https://via.placeholder.com/100'}
                alt={order.name || 'No Image Available'}
              />
              <p>{order.name}</p>
              <p>{order.category}</p>
              <p>{order.price}</p>
              <p>{order.quantity}</p> {/* Display the Quantity */}
            </div>
          ))
        ) : (
          <p>No orders available.</p>
        )}
      </div>
    </div>
  );
};

export default OrderList;