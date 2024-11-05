
import React from "react";
import { useNavigate } from "react-router-dom";
import Vendor from "./vendor";
import "./Vendor.css"; // Import your CSS file

function VendorList({ vendors }) {
  const navigate = useNavigate();
  
  const handleVendorClick = (email, businessName, id) => {
    
    navigate("/vendor/menu", {
      state: { email, businessName, id },
    }); // Send email in state
  };

  return (
    <div className="vendor-card-container">
      {vendors.map((vendor, index) => (
        <Vendor
          key={index}
          property={vendor}
          onClick={() =>
            handleVendorClick(
              vendor.email,
              vendor.businessName,
              vendor.id,
              vendor.vendorZipcode
            )
          }
        />
      ))}
    </div>
  );
}

export default VendorList;
