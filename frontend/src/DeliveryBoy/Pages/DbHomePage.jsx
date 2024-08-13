// import React, { useEffect, useState } from 'react';
// import './DbHomePage.css';
// import { toast } from 'react-toastify';
// import { fetchPlacedOrdersHistory,updateOrderStatus } from '../../services/deliverboy_api'; // Adjust path as needed
// import { currency } from '../assets/assets';

// const PlacedOrderHistory = () => {
//   const [orders, setOrders] = useState([]);
//   const deliveryboyId = sessionStorage.getItem('id'); // Retrieve the correct item from sessionStorage

//   const loadPlacedOrders = async () => {
//     try {
//       const data = await fetchPlacedOrdersHistory(deliveryboyId);
//       setOrders(data);
//     } catch (error) {
//       toast.error("No placed orders found!");
//     }
//   };

//   useEffect(() => {
//     loadPlacedOrders();
//   }, [deliveryboyId]);

//   return (
//     <div className='order-history'>
//       <h2>Delivery Home Page</h2>
//       <div className='order-history-table'>
//         <div className='order-history-header'>
//           <b>Order ID</b>
//           <b>Customer Name</b>
//           <b>Vendor Name</b>
//           <b>Amount</b>
//           <b>Status</b>
//           <b>Payment Method</b>
//           <b>Delivery Address</b>
//         </div>
//         {orders.length > 0 ? (
//           orders.map((order, index) => (
//             <div key={index} className='order-history-row'>
//               <p>{order.id}</p>
//               <p>{order.customer?.firstName} {order.customer?.lastName}</p>
//               <p>{order.vendor?.businessName}</p>
//               <p>{currency}{order.amount}</p>
//               <p>{order.status}</p>
//               <p>{order.paymentMethod}</p>
//               <div className='delivery-address'>
//                 <p>{order.deliveryAddress?.adrLine1}, {order.deliveryAddress?.adrLine2}</p>
//                 <p>{order.deliveryAddress?.city}, {order.deliveryAddress?.state}</p>
//                 <p>{order.deliveryAddress?.country}, {order.deliveryAddress?.zipcode}</p>
//                 <p>Phone: {order.deliveryAddress?.phoneNo}</p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <div className="no-orders">No orders found</div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PlacedOrderHistory;



import React, { useEffect, useState } from 'react';
import './DbHomePage.css';
import { toast } from 'react-toastify';
import { fetchPlacedOrdersHistory, updateOrderStatus } from '../../services/deliverboy_api'; // Adjust path as needed
import { currency } from '../assets/assets';

const PlacedOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [buttonVisible, setButtonVisible] = useState(true);
  const deliveryboyId = sessionStorage.getItem('id'); // Retrieve the correct item from sessionStorage

  console.log('Delivery Boy ID:', deliveryboyId); // Log deliveryboyId

  const loadPlacedOrders = async () => {
    try {
      const data = await fetchPlacedOrdersHistory(deliveryboyId);
      setOrders(data);
    } catch (error) {
      toast.error("No placed orders found!");
    }
  };

  useEffect(() => {
    loadPlacedOrders();
  }, [deliveryboyId]);

  useEffect(() => {
    const savedButtonVisible = localStorage.getItem('buttonVisible');
    if (savedButtonVisible === 'false') {
      setButtonVisible(false);
    }
  }, []);

  const handleMarkAsDelivered = async () => {
    try {
      await Promise.all(
        orders.map(async (order) => {
          if (order.status === 'PLACED') {
            await updateOrderStatus(order.id, 'DELIVERED');
          }
        })
      );
      toast.success("Orders updated to DELIVERED!");
      setButtonVisible(false);
      loadPlacedOrders(); // Refresh the order list
    } catch (error) {
      toast.error("Error updating order status!");
    }
  };

  return (
    <div className='order-history'>
      <h2>Delivery Home Page</h2>
      <hr />
      <div className='order-history-table'>
        <div className='order-history-header'>
          <b>Order ID</b>
          <b>Customer Name</b>
          <b>Vendor Name</b>
          <b>Amount</b>
          <b>Status</b>
          <b>Payment Method</b>
          <b>Delivery Address</b>
        </div>
        {orders.length > 0 ? (
          orders.map((order, index) => (
            <div key={index} className='order-history-row'>
              <p>{order.id}</p>
              <p>{order.customer?.firstName} {order.customer?.lastName}</p>
              <p>{order.vendor?.businessName}</p>
              <p>{currency}{order.amount}</p>
              <p className='status-placed'>PLACED</p>
              <p>{order.paymentMethod}</p>
              <div className='delivery-address'>
                <p>{order.deliveryAddress?.adrLine1}, {order.deliveryAddress?.adrLine2}</p>
                <p>{order.deliveryAddress?.city}, {order.deliveryAddress?.state}</p>
                <p>{order.deliveryAddress?.country}, {order.deliveryAddress?.zipcode}</p>
                <p>Phone: {order.deliveryAddress?.phoneNo}</p>
              </div>
            </div>
          ))
        ) : (
        //   <div className="no-orders">No orders found</div>
            <p></p>
        )}
      </div>
      {buttonVisible && (
        <div className="button-container">
          <button className="mark-delivered-btn" onClick={handleMarkAsDelivered}>
            Mark All as Delivered
          </button>
        </div>
      )}
    </div>
  );
};

export default PlacedOrderHistory;
