import { useDispatch } from "react-redux";
import { removeFromCartAction } from "../features/cartSlice";
import React from "react";

function CartItem({ menuItems }) {
  const dispatch = useDispatch();

  const cancelBooking = () => {
    dispatch(removeFromCartAction(menuItems));
  };
  return (
    <div>
      <div className="card border shadow-none">
        <div className="card-body">
          <div className="d-flex align-items-start border-bottom pb-3">
            <div className="me-4">
              <img
                src="https://www.bootdey.com/image/380x380/008B8B/000000"
                alt=""
                className="avatar-lg rounded"
              />
            </div>
            <div className="flex-grow-1 align-self-center overflow-hidden">
              <div>
                <h5 className="text-truncate font-size-18">
                  {menuItems.title}
                </h5>
                <p className="text-muted mb-0">
                  <i className="bx bxs-star text-warning"></i>
                  <i className="bx bxs-star text-warning"></i>
                  <i className="bx bxs-star text-warning"></i>
                  <i className="bx bxs-star text-warning"></i>
                  <i className="bx bxs-star-half text-warning"></i>
                </p>
                <p className="mb-0 mt-1">
                  Color : <span className="fw-medium">Gray</span>
                </p>
              </div>
            </div>
            <div className="flex-shrink-0 ms-2">
              <ul className="list-inline mb-0 font-size-16">
                <li className="list-inline-item">
                  <button
                    onClick={cancelBooking}
                    style={{ position: "absolute", right: 15, bottom: 15 }}
                    className="btn btn-danger"
                  >
                    Remove
                  </button>
                </li>
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
                  <p className="text-muted mb-2">Price</p>
                  <h5 className="mb-0 mt-2">
                    <span className="text-muted me-2">
                      <del className="font-size-16 fw-normal">$500</del>
                    </span>
                    $450
                  </h5>
                </div>
              </div>
              <div className="col-md-5">
                <div className="mt-3">
                  <p className="text-muted mb-2">Quantity</p>
                  <div className="d-inline-flex">
                    <select className="form-select form-select-sm w-xl">
                      <option value="1">1</option>
                      <option value="2" selected="">
                        2
                      </option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                      <option value="6">6</option>
                      <option value="7">7</option>
                      <option value="8">8</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="mt-3">
                  <p className="text-muted mb-2">Total</p>
                  <h5>$900</h5>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
