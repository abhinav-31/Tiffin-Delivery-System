import React, { useEffect, useState } from "react";
import "./DeliveryboyList.css";
import { fetchCustomers } from "../../../services/admin_api";

const DeliveryboyList = () => {
  const [customerList, setCustomer] = useState([]);

  useEffect(() => {
    const getVendors = async () => {
      try {
        const data = await fetchCustomers();
        setCustomer(data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };
    getVendors();
  }, []);

  return (
    <div className="list add flex-col">
      <h4>All Customers List</h4>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Sr. No.</b>
          <b>First Name</b>
          <b>Last Name</b>
          <b>Email</b>
          <b>Contact No.</b>
        </div>
        {customerList.map((customer, index) => {
          console.log(customer);
          return (
            <div key={customer.email || index} className="list-table-format">
              <p>{index + 1}</p>
              <p>{customer.firstName}</p>
              <p>{customer.lastName}</p>
              <p>{customer.email}</p>
              <p>{customer.contactNo}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryboyList;
