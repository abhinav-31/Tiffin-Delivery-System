import React from "react";
import "./MenuCard.css"; // Import your CSS file
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, updateItemQuantity } from "../redux/cartSlice"; // Update with your actual slice path

const MenuCard = ({ menu }) => {
  const dispatch = useDispatch();
  const vendorEmail = useSelector((state) => state.vendor.email); // Get vendor email from Redux
  const cartItems = useSelector((state) => state.cart.items); // Get cart items from Redux

  const menuItem = cartItems[vendorEmail]?.[menu.id] || { quantity: 0 };
  const quantity = menuItem.quantity;
  const isAdded = quantity > 0;

  const handleAddClick = () => {
    if (isAdded) {
      dispatch(removeItem({ vendorEmail, menuId: menu.id }));
    } else {
      dispatch(
        addItem({
          vendorEmail,
          menuId: menu.id,
          menuName: menu.name,
          menuPrice: menu.price,
          menuImage: menu.menuImage,
          quantity: 1,
        })
      );
    }
  };

  const handleQuantityChange = (change) => {
    const newQuantity = quantity + change;
    if (newQuantity > 0) {
      dispatch(
        updateItemQuantity({
          vendorEmail,
          menuId: menu.id,
          quantity: newQuantity,
        })
      );
    } else {
      handleAddClick(); // If quantity becomes 0, remove item
    }
  };

  return (
    <div className="menu-card">
      <img
        src={`data:image/jpeg;base64,${menu.menuImage}`}
        alt="Menu"
        className="menu-card-image"
      />
      <div className="menu-card-content">
        <h3 className="menu-name">{menu.name}</h3>
        <div className="description">{menu.description}</div>
        <p className="price">${menu.price.toFixed(2)}</p>
        <div className="button-container">
          {isAdded ? (
            <div className="quantity-controls">
              <button
                className="quantity-button"
                onClick={() => handleQuantityChange(-1)}
                disabled={quantity === 1}
              >
                -
              </button>
              <span className="quantity">{quantity}</span>
              <button
                className="quantity-button"
                onClick={() => handleQuantityChange(1)}
              >
                +
              </button>
            </div>
          ) : (
            <button className="add-button" onClick={handleAddClick}>
              Add
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuCard;
