import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchVendorMenu } from "../services/VendorService";
import MenuCard from "../components/MenuCard";
import {
  setVendorEmail,
  setVendorId,
  setVendorZipcode,
} from "../redux/vendorSlice";
import "./VendorDetails.css";

const VendorDetail = () => {
  const location = useLocation();
  const dispatch = useDispatch();
  const { email, businessName, id } = location.state || {};
  const [menuItems, setMenuItems] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVendorMenu = async () => {
      if (email) {
        dispatch(setVendorEmail(email)); // Store vendor email and it id in Redux
        dispatch(setVendorId(id));
        console.log("id of vndor:- " + id);
        const result = await fetchVendorMenu(email);
        if (result.status === "error") {
          setError(result.error);
        } else {
          setMenuItems(result);
          console.log("hamara menu items" + result);
        }
      } else {
        setError({ message: "No vendor email provided" });
      }
    };

    getVendorMenu();
  }, [email, dispatch]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="vendor-detail">
      <div>
        <h2>{businessName}</h2>
      </div>
      <div></div>
      <div className="menu-list">
        {menuItems.map(
          (menu) => (
            console.log(menu), (<MenuCard key={menu.name} menu={menu} />)
          )
        )}
      </div>
      <div></div>
    </div>
  );
};

export default VendorDetail;
