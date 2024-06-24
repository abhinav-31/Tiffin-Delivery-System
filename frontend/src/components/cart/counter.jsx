import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./counter.css";
import { removeFromCartAction } from "../../features/cartSlice";
function Counter({ quantity, onQuantityChange }) {
  // const [q, setQ] = useState(quantity);
  const increaseQuant = () => {
    onQuantityChange(quantity + 1);
  };

  const decreaseQuant = () => {
    onQuantityChange(quantity - 1);
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
