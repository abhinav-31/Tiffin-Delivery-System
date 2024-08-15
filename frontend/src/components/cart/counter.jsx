
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
    console.log("afdasf:- "+newQuantity);
    if (newQuantity === 0) {
      onQuantityChange(newQuantity);
      // Remove item from cart when quantity reaches zero
      dispatch(removeItem({ vendorEmail, menuId }));
      console.log("menu id asdfa: "+menuId)
     
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
