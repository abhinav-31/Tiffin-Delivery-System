import React, { useEffect, useState } from "react";
import "./MenuList.css";
import { toast } from "react-toastify";
import { fetchMenus } from "../../../../services/vendor_api";
import { getVendorIdFromSessionStorage } from "../../../../services/vendor_api";

const MenuList = () => {
  const [menulist, setList] = useState([]);
  const vendorId = getVendorIdFromSessionStorage();

  useEffect(() => {
    const getMenus = async () => {
      try {
        const data = await fetchMenus(vendorId);
        setList(data);
      } catch (error) {
        console.error("Error fetching menus:", error);
        toast.error("Failed to fetch menus. Please try again later.");
      }
    };
    getMenus();
  }, [vendorId]);

  return (
    <div className="list add flex-col">
      <p>All menus List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Sr No.</b>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Quantity</b>
        </div>
        {menulist.length > 0 ? (
          menulist.map((menu, index) => (
            <div key={menu.id || index} className="list-table-format">
              <p>{index + 1}</p>
              <img
                src={
                  menu.menuImage
                    ? `data:image/jpeg;base64,${menu.menuImage}`
                    : "path/to/default-image.jpg" // Replace with your default image path
                }
                alt={menu.name || "No Image Available"}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "path/to/default-image.jpg"; // Fallback if the image fails to load
                }}
              />
              <p>{menu.name}</p>
              <p>{menu.category}</p>
              <p>{menu.price}</p>
              <p>{menu.quantity}</p>
            </div>
          ))
        ) : (
          <p>No menus available.</p>
        )}
      </div>
    </div>
  );
};

export default MenuList;
