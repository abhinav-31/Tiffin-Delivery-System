import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ViewOrders.css'; // Import your CSS file

const ordersData = [
  { id: 1, customer: 'Abhijeet Yesare', items: ['Chapati', 'Dal', 'Rice'], total: 150, address: 'Kolhapur, City', time: '10:00 AM' },
  { id: 2, customer: 'Riya Joshi', items: ['Biryani', 'Salad', 'Coke'], total: 250, address: '456 Oak Ave, Town', time: '12:30 PM' },
  { id: 3, customer: 'Maya Thakur', items: ['Pasta', 'Garlic Bread', 'Ice Cream'], total: 180, address: '789 Elm Rd, Village', time: '2:00 PM' },
  { id: 4, customer: 'Adity Desai', items: ['Chapati', 'Dal', 'sweet'], total: 150, address: 'Pune, City', time: '10:00 AM' },
];

const ViewOrders = () => {
  const [orders, setOrders] = useState(ordersData);

  const handleAccept = (orderId) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: 'Accepted' };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  const handleReject = (orderId) => {
    const updatedOrders = orders.map(order => {
      if (order.id === orderId) {
        return { ...order, status: 'Rejected' };
      }
      return order;
    });
    setOrders(updatedOrders);
  };

  const renderOrders = () => {
    const rows = [];
    for (let i = 0; i < orders.length; i += 2) {
      const order1 = orders[i];
      const order2 = i + 1 < orders.length ? orders[i + 1] : null;
      rows.push(
        <div key={i} className="row mb-3">
          <div className="col-md-6">
            {order1 && renderOrderCard(order1)}
          </div>
          <div className="col-md-6">
            {order2 && renderOrderCard(order2)}
          </div>
        </div>
      );
    }
    return rows;
  };

  const renderOrderCard = (order) => (
    <div className="card mb-3 card-view-orders">
      <div className="card-body">
        <h5 className="card-title">Order #{order.id} - {order.customer}</h5>
        <p className="card-text"><strong>Items:</strong> {order.items.join(', ')}</p>
        <p className="card-text"><strong>Total:</strong> ${order.total}</p>
        <p className="card-text"><strong>Address:</strong> {order.address}</p>
        <p className="card-text"><strong>Time:</strong> {order.time}</p>
        <div className="d-flex justify-content-end">
          {!order.status ? (
            <>
              <button
                className="btn btn-success button-accept"
                onClick={() => handleAccept(order.id)}
              >
                Accept
              </button>
              <button
                className="btn btn-danger button-reject"
                onClick={() => handleReject(order.id)}
              >
                Reject
              </button>
            </>
          ) : (
            <button className={`btn ${order.status === 'Accepted' ? 'btn-success disabled' : 'btn-danger disabled'}`}>
              {order.status === 'Accepted' ? 'Accepted' : 'Rejected'}
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="container mt-5 container-view-orders">
      <h1 className="text-center mb-4">View Orders</h1>
      {renderOrders()}
    </div>
  );
};

export default ViewOrders;