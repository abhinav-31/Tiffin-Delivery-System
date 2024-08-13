import React, { useEffect, useState } from "react";
import "./DeliveredOrderHistory.css";
import {
  fetchDeliveredOrdersHistory,
  getVendorIdFromSessionStorage,
} from "../../../services/vendor_api";
import { toast } from "react-toastify";
import { currency, assets } from "../../assets/assets";

const DeliveredOrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const vendorId = getVendorIdFromSessionStorage();

  const fetchOrders = async () => {
    try {
      const data = await fetchDeliveredOrdersHistory(vendorId);
      setOrders(data);
    } catch (error) {
      toast.error("Error fetching delivered order history");
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
      <h2>Delivered Order History</h2>
      {orders.length > 0 ? (
        <div className="order-list">
          {orders.map((order, index) => (
            <div key={index} className="order-item">
              <img src={assets.parcel_icon} alt="Order Icon" />
              <div>
                <p className="order-item-name">
                  {order.customerAndDeliveryDetails.customer.firstName +
                    " " +
                    order.customerAndDeliveryDetails.customer.lastName}
                </p>
                <p className="order-item-food">
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
              <p>
                <span>&#x25cf;</span> <b>DELIVERED</b>
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No delivered orders available.</p>
      )}
    </div>
  );
};

export default DeliveredOrderHistory;
