// import React, { useState } from "react";
// import { useDispatch } from "react-redux";
// import "./counter.css";
// import { removeItem } from "../../redux/cartSlice";
// function Counter({ quantity, onQuantityChange }) {
//   // const [q, setQ] = useState(quantity);
//   const increaseQuant = () => {
//     onQuantityChange(quantity + 1);
//   };

//   const decreaseQuant = () => {
//     onQuantityChange(quantity - 1);
//   };
//   return (
//     <div className="qty mt-5">
//       <span className="minus bg-dark" onClick={decreaseQuant}>
//         -
//       </span>
//       <input
//         type="number"
//         disabled
//         className="count"
//         name="qty"
//         value={quantity}
//       />
//       <span className="plus bg-dark" onClick={increaseQuant}>
//         +
//       </span>
//     </div>
//   );
// }

// export default Counter;
import React from "react";
import { useDispatch } from "react-redux";
import { removeItem } from "../../redux/cartSlice";
import "./counter.css";

function Counter({ quantity, onQuantityChange, vendorEmail, menuId }) {
  const dispatch = useDispatch();

  const increaseQuant = () => {
    onQuantityChange(quantity + 1);
  };

  const decreaseQuant = () => {
    const newQuantity = quantity - 1;
    if (newQuantity <= 0) {
      // Remove item from cart when quantity reaches zero
      dispatch(removeItem({ vendorEmail, menuId }));
    } else {
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="qty mt-5">
      <span className="minus bg-dark" onClick={decreaseQuant}>
        -
      </span>
      <input
        type="number"
        disabled
        className="count"
        name="qty"
        value={quantity}
      />
      <span className="plus bg-dark" onClick={increaseQuant}>
        +
      </span>
    </div>
  );
}

export default Counter;
