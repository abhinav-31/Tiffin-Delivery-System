// import React, { useState, useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { addItem, removeItem, updateItemQuantity } from "../redux/cartSlice";
// import "./MenuCard.css";
// import { assets } from "../Admin/assets/assets";

// const MenuCard = ({ menu }) => {
//   const dispatch = useDispatch();
//   const vendorEmail = useSelector((state) => state.vendor.email);
//   const cartItems = useSelector((state) => state.cart.items);
//   const menuItem = cartItems[vendorEmail]?.[menu.id] || { quantity: 0 };
//   const [isAdded, setIsAdded] = useState(menuItem.quantity > 0);
//   const [quantity, setQuantity] = useState(menuItem.quantity);

//   useEffect(() => {
//     setQuantity(menuItem.quantity);
//     setIsAdded(menuItem.quantity > 0);
//   }, [menuItem.quantity]);

//   const handleAddClick = () => {
//     if (isAdded) {
//       dispatch(removeItem({ vendorEmail, menuId: menu.id }));
//     } else {
//       dispatch(
//         addItem({
//           vendorEmail,
//           menuId: menu.id,
//           menuName: menu.name,
//           menuPrice: menu.price,
//           menuImage: menu.menuImage,
//           quantity: 1,
//         })
//       );
//     }
//     setIsAdded(!isAdded);
//   };

//   const handleQuantityChange = (change) => {
//     const newQuantity = quantity + change;
//     if (newQuantity > 0) {
//       dispatch(
//         updateItemQuantity({
//           vendorEmail,
//           menuId: menu.id,
//           quantity: newQuantity,
//         })
//       );
//       setQuantity(newQuantity);
//     } else {
//       handleAddClick(); // Remove item if quantity becomes 0
//     }
//   };

//   return (
//     <div className="menu-card">
//       <img
//         src={`data:image/jpeg;base64,${menu.menuImage}`}
//         alt="Menu"
//         className="menu-card-image"
//       />
//       <div className="menu-card-content">
//         <h3 className="menu-name">{menu.name}</h3>
//         <div className="description">{menu.description}</div>
//         <p className="price">
//           {assets.currency}
//           {menu.price.toFixed(2)}
//         </p>
//         <div className="button-container">
//           {isAdded ? (
//             <div className="quantity-controls">
//               <button
//                 className="quantity-button"
//                 onClick={() => handleQuantityChange(-1)}
//               >
//                 -
//               </button>
//               <span className="quantity">{quantity}</span>
//               <button
//                 className="quantity-button"
//                 onClick={() => handleQuantityChange(1)}
//               >
//                 +
//               </button>
//             </div>
//           ) : (
//             <button className="add-button" onClick={handleAddClick}>
//               Add
//             </button>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default MenuCard;
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, updateItemQuantity } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import "./MenuCard.css";
import { assets } from "../Admin/assets/assets";
import { toast } from "react-toastify";

const MenuCard = ({ menu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const vendorEmail = useSelector((state) => state.vendor.email);
  const cartItems = useSelector((state) => state.cart.items);
  const menuItem = cartItems[vendorEmail]?.[menu.id] || { quantity: 0 };
  const [isAdded, setIsAdded] = useState(menuItem.quantity > 0);
  const [quantity, setQuantity] = useState(menuItem.quantity);
  const [showGoToCart, setShowGoToCart] = useState(false);

  useEffect(() => {
    setQuantity(menuItem.quantity);
    setIsAdded(menuItem.quantity > 0);
    // Check if any item is added to the cart
    setShowGoToCart(
      Object.values(cartItems[vendorEmail] || {}).some(
        (item) => item.quantity > 0
      )
    );
  }, [menuItem.quantity, cartItems, vendorEmail]);

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
    setIsAdded(!isAdded);
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
      setQuantity(newQuantity);
    } else {
      handleAddClick(); // Remove item if quantity becomes 0
    }
  };

  const handleGoToCartClick = () => {
    const loginStatus = sessionStorage.getItem("loginStatus");
    if (!loginStatus) {
      toast.error("Please Sign in First");
    } else {
      navigate("/cart");
    }
  };

  return (
    <>
      <div className="menu-card">
        <img
          src={`data:image/jpeg;base64,${menu.menuImage}`}
          alt="Menu"
          className="menu-card-image"
        />
        <div className="menu-card-content">
          <h3 className="menu-name">{menu.name}</h3>
          <div className="description">{menu.description}</div>
          <p className="price">
            {assets.currency}
            {menu.price.toFixed(2)}
          </p>
          <div className="button-container">
            {isAdded ? (
              <div className="quantity-controls">
                <button
                  className="quantity-button"
                  onClick={() => handleQuantityChange(-1)}
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
      {showGoToCart && (
        <div className="go-to-cart">
          <button onClick={handleGoToCartClick}>Go to the Cart</button>
        </div>
      )}
    </>
  );
};

export default MenuCard;
