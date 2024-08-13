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

  const loadPlacedOrders = async () => {
    try {
      const data = await fetchPlacedOrdersHistory(vendorId);
      setOrders(data);
    } catch (error) {
      toast.error("Error fetching placed order history");
    }
  };

  useEffect(() => {
    if (vendorId) {
      loadPlacedOrders();
    } else {
      toast.error("Vendor ID is missing");
    }
  }, [vendorId]);

  return (
    <div className="order-history">
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={assets.parcel_icon} alt="" />
            <div>
              <p className="order-item-name">
                {order.customer.firstName + " " + order.customer.lastName}
              </p>
              <p className="order-item-food">
                Delivery By:{" "}
                {order.deliveryBoy.firstName + " " + order.deliveryBoy.lastName}
              </p>
              <div className="order-item-address">
                <p>
                  {order.deliveryAddress.adrLine1 +
                    ", " +
                    order.deliveryAddress.adrLine2}
                </p>
                <p>
                  {order.deliveryAddress.city +
                    ", " +
                    order.deliveryAddress.state +
                    ", " +
                    order.deliveryAddress.country +
                    ", " +
                    order.deliveryAddress.zipcode}
                </p>
              </div>
              <p className="order-item-phone">
                {order.deliveryAddress.phoneNo}
              </p>
            </div>
            <p>
              {currency}
              {order.amount}
            </p>
            <p>
              <span>&#x25cf;</span> <b>PLACED</b>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacedOrderHistory;
