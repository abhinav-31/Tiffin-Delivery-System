// import React from "react";
// import { Link } from "react-router-dom";
// import "./VendorHomePage.css"; // Import the updated CSS file

// const VendorHomePage = () => {
//   return (
//     <div className="vendor-homepage">
//       <h1>Welcome to Your Vendor Dashboard</h1>
//       <div className="vendor-homepage-content">
//         <div className="vendor-card">
//           <h2>Manage Menus</h2>
//           <p>
//             Update your lunch, dinner, and breakfast menus to keep your
//             offerings fresh and exciting.
//           </p>
//           <Link to="/addmenu" className="vendor-btn-primary">
//             Add Menu Items
//           </Link>
//         </div>
//         <div className="vendor-card">
//           <h2>View Menus</h2>
//           <p>Added Menu Items and manage them effectively.</p>
//           <Link to="/menulist" className="vendor-btn-primary">
//             View Menu List
//           </Link>
//         </div>
//         <div className="vendor-card">
//           <h2>Placed Orders</h2>
//           <p>
//             Review past placed orders and analyze trends to improve your
//             service.
//           </p>
//           <Link to="/PlacedOrderHistory" className="vendor-btn-primary">
//             Placed Orders
//           </Link>
//         </div>
//         <div className="vendor-card">
//           <h2>Delivered Order History</h2>
//           <p>
//             Check the history of delivered orders and analyze your delivery
//             efficiency.
//           </p>
//           <Link to="/DeliveredOrderHistory" className="vendor-btn-primary">
//             Delivered Order History
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorHomePage;

// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import { Stomp } from "@stomp/stompjs";
// import SockJS from "sockjs-client";
// import "./VendorHomePage.css"; // Import the updated CSS file

// const VendorHomePage = () => {
//   const [stompClient, setStompClient] = useState(null);
//   const [notifications, setNotifications] = useState([]);

//   useEffect(() => {
//     const connectWebSocket = () => {
//       const socket = new SockJS("http://localhost:8081/ws"); // Adjust the URL
//       const client = Stomp.over(socket);

//       client.connect({}, (frame) => {
//         console.log("Connected: " + frame);
//         const vendorId = sessionStorage.getItem("id"); // Replace with actual vendor ID logic

//         // Subscribe to the vendor-specific topic
//         client.subscribe(`/topic/vendor/${vendorId}`, (message) => {
//           const orderMessage = message.body;
//           setNotifications((prev) => [...prev, orderMessage]);
//           alert(`New order notification: ${orderMessage}`); // Alert for demonstration
//         });
//       });

//       setStompClient(client);
//     };

//     connectWebSocket();

//     // Clean up the connection on component unmount
//     return () => {
//       if (stompClient) {
//         stompClient.disconnect();
//       }
//     };
//   },[]);

//   return (
//     <div className="vendor-homepage">
//       <h1>Welcome to Your Vendor Dashboard</h1>
//       <div className="vendor-homepage-content">
//         <div className="vendor-card">
//           <h2>Manage Menus</h2>
//           <p>
//             Update your lunch, dinner, and breakfast menus to keep your
//             offerings fresh and exciting.
//           </p>
//           <Link to="/addmenu" className="vendor-btn-primary">
//             Add Menu Items
//           </Link>
//         </div>
//         <div className="vendor-card">
//           <h2>View Menus</h2>
//           <p>Added Menu Items and manage them effectively.</p>
//           <Link to="/menulist" className="vendor-btn-primary">
//             View Menu List
//           </Link>
//         </div>
//         <div className="vendor-card">
//           <h2>Placed Orders</h2>
//           <p>
//             Review past placed orders and analyze trends to improve your
//             service.
//           </p>
//           <Link to="/PlacedOrderHistory" className="vendor-btn-primary">
//             Placed Orders
//           </Link>
//         </div>
//         <div className="vendor-card">
//           <h2>Delivered Order History</h2>
//           <p>
//             Check the history of delivered orders and analyze your delivery
//             efficiency.
//           </p>
//           <Link to="/DeliveredOrderHistory" className="vendor-btn-primary">
//             Delivered Order History
//           </Link>
//         </div>
//       </div>

//       {/* Display notifications */}
//       <div className="notification-area">
//         <h2>Notifications</h2>
//         <ul>
//           {notifications.map((notification, index) => (
//             <li key={index}>{notification}</li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// };

// export default VendorHomePage;

import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import "./VendorHomePage.css"; // Import the updated CSS file
import { toast } from "react-toastify";

const VendorHomePage = () => {
  const [notifications, setNotifications] = useState([]);
  const clientRef = useRef(null); // Create a ref for the Stomp client

  useEffect(() => {
    const socket = new SockJS("http://localhost:8081/ws"); // Adjust the URL
    const client = Stomp.over(socket);
    clientRef.current = client; // Store the client in the ref

    const connectWebSocket = () => {
      client.connect({}, (frame) => {
        console.log("Connected: " + frame);
        const vendorId = sessionStorage.getItem("id"); // Replace with actual vendor ID logic

        // Subscribe to the vendor-specific topic only once
        client.subscribe(`/topic/vendor/${vendorId}`, (message) => {
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
  }, []); // Empty dependency array ensures this runs once on mount

  return (
    <div className="vendor-homepage">
      <h1>Welcome to Your Vendor Dashboard</h1>
      <div className="vendor-homepage-content">
        <div className="vendor-card">
          <h2>Manage Menus</h2>
          <p>
            Update your lunch, dinner, and breakfast menus to keep your
            offerings fresh and exciting.
          </p>
          <Link to="/addmenu" className="vendor-btn-primary">
            Add Menu Items
          </Link>
        </div>
        <div className="vendor-card">
          <h2>View Menus</h2>
          <p>Added Menu Items and manage them effectively.</p>
          <Link to="/menulist" className="vendor-btn-primary">
            View Menu List
          </Link>
        </div>
        <div className="vendor-card">
          <h2>Placed Orders</h2>
          <p>
            Review past placed orders and analyze trends to improve your
            service.
          </p>
          <Link to="/PlacedOrderHistory" className="vendor-btn-primary">
            Placed Orders
          </Link>
        </div>
        <div className="vendor-card">
          <h2>Delivered Order History</h2>
          <p>
            Check the history of delivered orders and analyze your delivery
            efficiency.
          </p>
          <Link to="/DeliveredOrderHistory" className="vendor-btn-primary">
            Delivered Order History
          </Link>
        </div>
      </div>

      {/* Display notifications */}
      <div className="notification-area">
        <h2>Notifications</h2>
        <ul>
          {notifications.map((notification, index) => (
            <li key={index}>{notification}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default VendorHomePage;
