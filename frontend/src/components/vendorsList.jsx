// import React from "react";
// import Vendor from "./vendor";
// import "./Vendor.css"; // Import your CSS file

// function VendorList({ vendors }) {
//   return (
//     <div className="vendor-card-container">
//       {vendors.map((vendor, index) => (
//         <Vendor key={index} property={vendor} />
//       ))}
//     </div>
//   );
// }

// export default VendorList;
import React from "react";
import { useNavigate } from "react-router-dom";
import Vendor from "./vendor";
import "./Vendor.css"; // Import your CSS file

function VendorList({ vendors }) {
  const navigate = useNavigate();
  console.log("vendors list:- " + vendors);
  const handleVendorClick = (email, businessName, id) => {
    console.log("bn= " + email);
    console.log("vendorid " + id);
    navigate("/vendor/menu", { state: { email, businessName, id} }); // Send email in state
  };

  return (
    <div className="vendor-card-container">
      {vendors.map((vendor, index) => (
        <Vendor
          key={index}
          property={vendor}
          onClick={() => handleVendorClick(vendor.email, vendor.businessName, vendor.id)}
        />
      ))}
    </div>
  );
}

export default VendorList;
