import React from "react";
import { useDispatch } from "react-redux";
import { removeItem, updateItemQuantity } from "../../redux/cartSlice";
import "./counter.css";

function Counter({ quantity, onQuantityChange, vendorEmail, menuId }) {
  const dispatch = useDispatch();

  const increaseQuant = () => {
    onQuantityChange(quantity + 1);
  };

  const decreaseQuant = () => {
    if (quantity <= 0) return;
    const newQuantity = quantity - 1;
    onQuantityChange(newQuantity);
    if (newQuantity === 0) {
      // Remove item from cart when quantity reaches zero
      console.log("NEW QUANTITY:- ", newQuantity);
      dispatch(removeItem({ vendorEmail, menuId }));
    } else {
      dispatch(
        updateItemQuantity({ vendorEmail, menuId, quantity: newQuantity })
      );
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
