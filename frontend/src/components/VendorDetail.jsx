// import React, { useEffect, useState } from "react";
// import { useLocation } from "react-router-dom"; // Use useLocation to get the email from state
// import { fetchVendorMenu } from "../services/VendorService";
// import MenuCard from "../components/MenuCard"; // Component to display menu items
// // import "./VendorDetail.css"; // Import your CSS for styling

// const VendorDetail = () => {
//   const location = useLocation(); // Get location state
//   const { email } = location.state || {}; // Get email from state
//   const [menuItems, setMenuItems] = useState([]);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getVendorMenu = async () => {
//       if (email) {
//         const result = await fetchVendorMenu(email);
//         if (result.status === "error") {
//           setError(result.error);
//         } else {
//           setMenuItems(result);
//         }
//       } else {
//         setError({ message: "No vendor email provided" });
//       }
//     };

//     getVendorMenu();
//   }, [email]);

//   if (error) {
//     return <div>Error: {error.message}</div>;
//   }

//   return (
//     <div className="vendor-detail">
//       <div className="menu-list">
//         <h2>Menu Items</h2>
//         <div className="menu-items">
//           {menuItems.map((menu) => (
//             <MenuCard key={menu.name} menu={menu} />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default VendorDetail;
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom"; // Use useLocation to get the email from state
import { fetchVendorMenu } from "../services/VendorService";
import MenuCard from "../components/MenuCard"; // Component to display menu items
import "./VendorDetails.css"; // Import your CSS for styling

const VendorDetail = () => {
  const location = useLocation(); // Get location state
  console.log("location:- " + location);
  const { email, businessName } = location.state || {}; // Get email and businessName from state
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVendorMenu = async () => {
      if (email) {
        console.log(email);
        console.log(businessName);
        const result = await fetchVendorMenu(email);
        if (result.status === "error") {
          setError(result.error);
        } else {
          setMenuItems(result);
        }
      } else {
        setError({ message: "No vendor email provided" });
      }
    };

    getVendorMenu();
  }, [email]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="vendor-detail">
      {/* <h2 className="vendor-business-name">{businessName}</h2> */}
      <div className="menu-list">
        <h2>{businessName}</h2>
        <div className="menu-items">
          {menuItems.map((menu) => (
            <MenuCard key={menu.name} menu={menu} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default VendorDetail;
