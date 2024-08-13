import React from "react";
import { Link } from "react-router-dom";

const CartButton = () => {
  const role = sessionStorage.getItem("role"); // Assuming the role is stored in session storage with the key "role"
  const cart = JSON.parse(sessionStorage.getItem("cart")) || { items: [] }; // Assuming the cart is stored in session storage

  if (role !== "ROLE_CUSTOMER") {
    return null; // Don't render anything if the role is not ROLE_CUSTOMER
  }

  return (
    <Link to="/cart">
      <button
        type="button"
        className="btn btn-secondary position-relative rounded-5 me-3"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fillRule="currentColor"
          className="bi bi-cart"
          viewBox="0 0 16 16"
        >
          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"></path>
        </svg>
        <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
          {cart.items.length}
        </span>
      </button>
    </Link>
  );
};

export default CartButton;
