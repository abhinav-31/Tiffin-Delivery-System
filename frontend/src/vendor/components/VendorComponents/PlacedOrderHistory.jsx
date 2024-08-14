import React, { useEffect, useState } from "react";
import "./PlacedOrderHistory.css";
import { toast } from "react-toastify";
import {
  fetchPlacedOrdersHistory,
  getVendorIdFromSessionStorage,
} from "../../../services/vendor_api";
import { currency, assets } from "../../assets/assets";

const PlacedOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const vendorId = getVendorIdFromSessionStorage();

  const fetchOrders = async () => {
    try {
      const data = await fetchPlacedOrdersHistory(vendorId);
      setOrders(data);
    } catch (error) {
      toast.error("Error fetching placed order history");
    }
  };

  useEffect(() => {
    if (vendorId) {
      fetchOrders();
    } else {
      toast.error("Vendor ID is missing");
    }
  }, [vendorId]);

  return (
    <div className="list add flex-col">
      <h2>Current Orders</h2>
      {orders.length > 0 ? (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <div>
                <img src={assets.open_box} alt="Order Icon" />
                <p className="order-item-name">
                  {order.menuItems.map((menuItem, index) => (
                    <span key={index}>
                      {menuItem.quantity} x {menuItem.menuItemName}
                      {index < order.menuItems.length - 1 && ", "}
                      <br />
                    </span>
                  ))}
                  <br />
                </p>
              </div>
              <div>
                <p className="order-item-name">
                  {order.customerAndDeliveryDetails.customer.firstName +
                    " " +
                    order.customerAndDeliveryDetails.customer.lastName}
                </p>
                <p className="order-item-name">
                  Delivery By:{" "}
                  {order.customerAndDeliveryDetails.deliveryBoy.firstName +
                    " " +
                    order.customerAndDeliveryDetails.deliveryBoy.lastName}
                </p>
                <div className="order-item-address">
                  <p>
                    {order.customerAndDeliveryDetails.deliveryAddress.adrLine1 +
                      ", " +
                      order.customerAndDeliveryDetails.deliveryAddress.adrLine2}
                  </p>
                  <p>
                    {order.customerAndDeliveryDetails.deliveryAddress.city +
                      ", " +
                      order.customerAndDeliveryDetails.deliveryAddress.state +
                      ", " +
                      order.customerAndDeliveryDetails.deliveryAddress.country +
                      ", " +
                      order.customerAndDeliveryDetails.deliveryAddress.zipcode}
                  </p>
                </div>
                <p className="order-item-phone">
                  {order.customerAndDeliveryDetails.deliveryAddress.phoneNo}
                </p>
              </div>
              <p>
                {currency}
                {order.totalAmount}
              </p>
              <p className="order-status-placed">
                <span>&#x25cf;</span> <b>PLACED</b>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No current orders available.</p>
      )}
    </div>
  );
};

export default PlacedOrderHistory;
