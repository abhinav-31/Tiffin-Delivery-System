import React, { useEffect, useState } from 'react'
import './OrderList.css'
import { url, currency } from '../../../assets/assets'
import axios from 'axios';
import { toast } from 'react-toastify';
import {fetchOrders} from '../../../../services/vendor_api'


const OrderList = () => {

  const [orderlist, setList] = useState([]);

  useEffect(() => {
    const getOrders = async () => {
      try {
        const data = await fetchOrders();
        setList(data);
      } catch (error) {
        console.error('Error fetching orders:', error);
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
          {/* <b>Action</b> */}
        </div>
        {orderlist.map((order, index) => (
          <div key={order.id||index} className='list-table-format'>
            <p>{index+1}</p>
            {/* <img src={order.image} alt={order.name} /> */}
            <img src={order.image || 'https://via.placeholder.com/100'} alt={order.name || 'No Image Available'} />

            <p>{order.name}</p>
            <p>{order.category}</p>
            <p>{order.price}</p>
            <p>{order.quantity}</p> {/* Display the Quantity */}
            {/* <p className='cursor' onClick={() => removeFood(item._id)}>x</p> */}
          </div>
        ))}
      </div>
    </div>
  )
}

export default OrderList;
