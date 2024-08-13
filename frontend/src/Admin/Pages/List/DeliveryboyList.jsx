import React, { useEffect, useState } from "react";
import "./DeliveryboyList.css";
import { fetchDeliveryboys } from "../../../services/admin_api";

const DeliveryboyList = () => {
  const [deliveryboyList, setDeliveryboys] = useState([]);

  useEffect(() => {
    const getDeliveryboys = async () => {
      try {
        const data = await fetchDeliveryboys();
        setDeliveryboys(data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };
    getDeliveryboys();
  }, []);

  return (
    <div className="list add flex-col">
      <h4>All Deliveryboys List</h4>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Sr. No.</b>
          <b>First Name</b>
          <b>Last Name</b>
          <b>Email</b>
          <b>Contact No.</b>
        </div>
        {deliveryboyList.map((deliveryboy, index) => {
          return (
            <div key={deliveryboy.email || index} className="list-table-format">
              <p>{index + 1}</p>
              <p>{deliveryboy.firstName}</p>
              <p>{deliveryboy.lastName}</p>
              <p>{deliveryboy.email}</p>
              <p>{deliveryboy.contactNo}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryboyList;
