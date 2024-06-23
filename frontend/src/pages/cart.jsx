import "./cart.css";
import NavBar from "../components/navbar/navbar";
import React from "react";
import CartItem from "../components/cartItem";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

function Cart() {
  const cart = useSelector((state) => state.cart);
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [gst, setGst] = useState(0);

  useEffect(() => {
    // get the total amount
    let subTotal = 0;
    for (const item of cart.items) {
      subTotal += item.itemPrice;
    }
    setGst(1.18 * subTotal);
    setSubTotal(subTotal);
    setTotal(gst + subTotal + 25);
  }, []);
  return (
    <div className="container">
      <NavBar />
      <div className="content">
        <div className="row">
          <div className="col-xl-8">
            <div className="row my-4">
              <div>
                {/* <CartItem /> */}
                {cart.items.length > 0 &&
                  cart.items.map((item) => {
                    return <CartItem menuItems={item} />;
                  })}

                {cart.items.length == 0 && (
                  <h4 className="page-title">
                    There no menuItems added to cart
                  </h4>
                )}
              </div>
              {cart.items.length != 0 && (
                <div>
                  <div className="col-sm-6">
                    <a
                      href="ecommerce-products.html"
                      className="btn btn-link text-muted"
                    >
                      <i className="mdi mdi-arrow-left me-1"></i> Continue
                      Shopping{" "}
                    </a>
                  </div>
                  <div className="col-sm-6">
                    <div className="text-sm-end mt-2 mt-sm-0">
                      <a
                        href="ecommerce-checkout.html"
                        className="btn btn-success"
                      >
                        <i className="mdi mdi-cart-outline me-1"></i> Checkout{" "}
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-xl-4">
            <div className="mt-5 mt-lg-0">
              <div className="card border shadow-none">
                <div className="card-header bg-transparent border-bottom py-3 px-4">
                  <h5 className="font-size-16 mb-0">
                    Order Summary <span className="float-end">#MN0124</span>
                  </h5>
                </div>
                <div className="card-body p-4 pt-2">
                  <div className="table-responsive">
                    <table className="table mb-0">
                      <tbody>
                        <tr>
                          <td>Sub Total :</td>
                          <td className="text-end">₹ {subTotal}</td>
                        </tr>
                        <tr>
                          <td>Service Charge :</td>
                          <td className="text-end">₹ 25</td>
                        </tr>
                        <tr>
                          <td>GST : </td>
                          <td className="text-end">₹ {gst}</td>
                        </tr>
                        <tr className="bg-light">
                          <th>Total :</th>
                          <td className="text-end">
                            <span className="fw-bold">₹ {total}</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
