import React, { useEffect, useState } from "react";
import "./VendorList.css";
import { fetchVendors } from "../../../services/admin_api";

const VendorList = () => {
  const [vendorList, setVendors] = useState([]);

  useEffect(() => {
    const getVendors = async () => {
      try {
        const data = await fetchVendors();
        setVendors(data);
      } catch (error) {
        console.error("Error fetching vendors:", error);
      }
    };
    getVendors();
  }, []);

  return (
    <div className="list add flex-col">
      <h4>All Vendors List</h4>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Sr. No.</b>
          <b>First Name</b>
          <b>Last Name</b>
          <b>Email</b>
          <b>Business Name</b>
          <b>Contact No.</b>
        </div>
        {vendorList.map((vendor, index) => {
          return (
            <div key={vendor.email || index} className="list-table-format">
              <p>{index + 1}</p>
              <p>{vendor.firstName}</p>
              <p>{vendor.lastName}</p>
              <p>{vendor.email}</p>
              <p>{vendor.businessName}</p>
              <p>{vendor.contactNo}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VendorList;
