import React, { useEffect, useState } from "react";
import "./MenuList.css";
import { toast } from "react-toastify";
import {
  fetchMenus,
  deleteMenu,
  updateMenu,
} from "../../../../services/vendor_api";
import { getVendorIdFromSessionStorage } from "../../../../services/vendor_api";

const MenuList = () => {
  const [menulist, setList] = useState([]);
  const [editMenuId, setEditMenuId] = useState(null);
  const [updatedPrice, setUpdatedPrice] = useState("");
  const [updatedQuantity, setUpdatedQuantity] = useState("");
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

  const handleDelete = async (menuId) => {
    try {
      await deleteMenu({
        id: menuId,
      });
      setList((prevList) => prevList.filter((menu) => menu.id !== menuId));
      toast.success("Menu item deleted successfully.");
    } catch (error) {
      console.error("Error deleting menu:", error);
      toast.error("Failed to delete menu. Please try again later.");
    }
  };

  const handleUpdate = async (menuId) => {
    try {
      await updateMenu({
        id: menuId,
        price: updatedPrice,
        quantity: updatedQuantity,
      });
      setList((prevList) =>
        prevList.map((menu) =>
          menu.id === menuId
            ? { ...menu, price: updatedPrice, quantity: updatedQuantity }
            : menu
        )
      );
      setEditMenuId(null); // Exit edit mode
      toast.success("Menu item updated successfully.");
    } catch (error) {
      console.error("Error updating menu:", error);
      toast.error("Failed to update menu. Please try again later.");
    }
  };

  return (
    <div className="menu-list-container container">
      <div className="menu-list-table">
        <h3>All Menus List</h3>
      </div>
      <div className="row menu-list-table">
        <div className="col-12 menu-list-table-format title d-flex justify-content-around">
          <div className="col-1">
            <b>Sr No.</b>
          </div>
          <div className="col-2">
            <b>Image</b>
          </div>
          <div className="col-2">
            <b>Name</b>
          </div>
          <div className="col-2">
            <b>Category</b>
          </div>
          <div className="col-1">
            <b>Price</b>
          </div>
          <div className="col-1">
            <b>Quantity</b>
          </div>
          <div className="col-3">
            <b>Action</b>
          </div>
        </div>
        {menulist.length > 0 ? (
          menulist.map((menu, index) => (
            <div
              key={menu.id || index}
              className="row menu-list-table-format align-items-center"
            >
              <div className="col-1">{index + 1}</div>
              <div className="col-2">
                <img
                  src={
                    menu.menuImage
                      ? `data:image/jpeg;base64,${menu.menuImage}`
                      : "path/to/default-image.jpg" // Replace with your default image path
                  }
                  alt={menu.name || "No Image Available"}
                  className="img-fluid"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "path/to/default-image.jpg"; // Fallback if the image fails to load
                  }}
                />
              </div>
              <div className="col-2">{menu.name}</div>
              <div className="col-2">{menu.category}</div>
              {editMenuId === menu.id ? (
                <div className="col-1 menu-list-action-btn">
                  <input
                    type="number"
                    value={updatedPrice}
                    placeholder="New Price"
                    onChange={(e) => setUpdatedPrice(e.target.value)}
                    className="form-control mb-2"
                  />
                  <input
                    type="number"
                    value={updatedQuantity}
                    placeholder="New Quantity"
                    onChange={(e) => setUpdatedQuantity(e.target.value)}
                    className="form-control mb-2"
                  />
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => handleUpdate(menu.id)}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    className="btn btn-warning ms-2"
                    onClick={() => setEditMenuId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <div className="col-1">{menu.price}</div>
                  <div className="col-1">{menu.quantity}</div>
                  <div className="col-3 menu-list-action-btn">
                    <button
                      type="button"
                      className="btn btn-warning"
                      onClick={() => {
                        setEditMenuId(menu.id);
                        setUpdatedPrice(menu.price);
                        setUpdatedQuantity(menu.quantity);
                      }}
                    >
                      Update
                    </button>
                    <button
                      type="button"
                      className="btn btn-danger ms-2"
                      onClick={() => handleDelete(menu.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))
        ) : (
          <p className="text-center col-12">No menus available.</p>
        )}
      </div>
    </div>
  );
};

export default MenuList;
