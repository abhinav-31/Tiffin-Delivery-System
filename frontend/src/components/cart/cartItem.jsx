import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { removeFromCartAction } from "../../redux/cartSlice";
import React from "react";
import Counter from "./counter";

function CartItem({ cartItem, updateBill }) {
  const [quantity, setQuantity] = useState(cartItem.quantity);
  const [shouldRender, setShouldRender] = useState(true);
  const [itemTotal, setItemTotal] = useState(
    cartItem.quantity * cartItem.itemPrice
  );

  useEffect(() => {
    setShouldRender(quantity >= 1);
    setItemTotal(quantity * cartItem.itemPrice);
    // Call updateBill only when necessary changes happen
    if (quantity !== cartItem.quantity) {
      updateBill(cartItem.id, quantity);
    }
  }, [
    quantity,
    cartItem.itemPrice,
    cartItem.id,
    cartItem.quantity,
    updateBill,
  ]);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };
  return (
    <div>
      {shouldRender && (
        <div className="card border shadow-none">
          <div className="card-body">
            <div className="d-flex align-items-start border-bottom pb-3">
              <div className="me-4">
                <img
                  src="https://templatebundle.net/wp/moto/netw11/tiffin-service/wp-content/uploads/sites/21/2019/07/tiffin-center7.jpg"
                  alt=""
                  className="avatar-lg rounded"
                />
              </div>
              <div className="flex-grow-1 align-self-center overflow-hidden">
                <div>
                  <h5 className="text-truncate font-size-20 fw-bold">
                    {cartItem.title}
                  </h5>
                  <p className="text-muted mb-0">
                    {Array.from({ length: cartItem.rating }, (_, index) => (
                      <i key={index} className="bx bxs-star text-warning"></i>
                    ))}
                  </p>
                </div>
              </div>
              <div className="flex-shrink-0 ms-2">
                <ul className="list-inline mb-0 font-size-16">
                  {/* <li className="list-inline-item">
                    <button
                      // onClick={cancelBooking}
                      style={{ position: "absolute", right: 15, bottom: 15 }}
                      className="btn btn-danger"
                    >
                      Remove
                    </button>
                  </li> */}
                  <li className="list-inline-item">
                    <a href="#" className="text-muted px-1">
                      <i className="mdi mdi-heart-outline"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            <div>
              <div className="row">
                <div className="col-md-4">
                  <div className="mt-3">
                    <p className="text-muted mb-2 font-size-16">Price</p>
                    <h5 className="mb-0 mt-2">
                      <span className="text-muted me-2">
                        <del className="font-size-16 fw-normal">
                          ₹ {cartItem.itemPrice + 10}
                        </del>
                      </span>
                      ₹ {cartItem.itemPrice}
                    </h5>
                  </div>
                </div>
                <div className="col-md-5">
                  <div className="mt-3">
                    <p className="text-muted mb-2 font-size-16">Quantity</p>
                    <div className="d-inline-flex">
                      <Counter
                        quantity={quantity}
                        onQuantityChange={handleQuantityChange}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-md-3">
                  <div className="mt-3">
                    <p className="text-muted mb-2"></p>
                    <h5>₹ {itemTotal}</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartItem;
