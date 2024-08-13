import "./cart.css";
import NavBar from "../components/navbar/navbar";
import React, { useEffect, useState, useCallback } from "react";
import CartItem from "../components/cart/cartItem";
import { useSelector } from "react-redux";
import Footer from "../components/footer/footer";

function Cart() {
  const initialCart = useSelector((state) => state.cart.items); // Access cart state from Redux
  const [cart, setCart] = useState(initialCart);
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [gst, setGst] = useState(0);

  const calculateBill = useCallback(() => {
    let subTotal = 0;
    Object.values(cart).forEach((vendorItems) => {
      Object.values(vendorItems).forEach((item) => {
        subTotal += item.menuPrice * item.quantity;
      });
    });

    const calculatedGst = 0.18 * subTotal;
    const calculatedTotal = subTotal + calculatedGst + 25;

    setSubTotal(subTotal);
    setGst(calculatedGst);
    setTotal(calculatedTotal);
  }, [cart]);

  useEffect(() => {
    calculateBill();
    console.log("Cart contents:", cart);
  }, [cart, calculateBill]); // Update bill whenever cart items change

  const updateBill = useCallback((vendorEmail, menuId, newQuantity) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[vendorEmail] && updatedCart[vendorEmail][menuId]) {
        updatedCart[vendorEmail][menuId].quantity = newQuantity;
      }
      return updatedCart;
    });
  }, []);

  return (
    <div>
      <NavBar />
      <div className="content-container">
        <div className="row container-fluid">
          <div className="col-xl-1"></div>
          <div className="col-xl-8">
            <div className="row my-4">
              <div>
                {Object.keys(cart).length > 0 ? (
                  Object.entries(cart).map(([vendorEmail, vendorItems]) =>
                    Object.entries(vendorItems).map(([menuId, item]) => (
                      <CartItem
                        key={menuId}
                        cartItem={item}
                        vendorEmail={vendorEmail}
                        updateBill={updateBill}
                      />
                    ))
                  )
                ) : (
                  <h4 className="page-title">
                    There are no menu items added to the cart
                  </h4>
                )}
              </div>
              {Object.keys(cart).length !== 0 && (
                <div>
                  <div className="col-sm-6">
                    <a
                      href="ecommerce-products.html"
                      className="btn btn-link text-muted"
                    >
                      <i className="mdi mdi-arrow-left me-1"></i> Continue
                      Shopping
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="col-xl-3">
            <div className="mt-5 mt-lg-0">
              <div className="card rounded-5">
                <div className="card-header border-bottom py-3 px-4 rounded-5">
                  <img
                    src="https://img.freepik.com/free-vector/isometric-bento-box-illustration_52683-56499.jpg?t=st=1719145384~exp=1719148984~hmac=cc6282626b8e649114356810a7e83fbb3fc5fde6bb26185ca8db2550d52937ca&w=740"
                    alt=""
                    width="100%"
                    className="mt-1 rounded-5"
                  />
                  <h5 className="font-size-24 mt-3 mb-0">
                    Order Summary <span className="float-end"></span>
                  </h5>
                </div>
                <div className="card-body p-4 pt-2 rounded-bottom">
                  <div className="table-responsive">
                    <table className="table mb-0 table">
                      <tbody>
                        <tr>
                          <td>Sub Total :</td>
                          <td className="text-end">₹ {subTotal.toFixed(2)}</td>
                        </tr>
                        <tr>
                          <td>Service Charge :</td>
                          <td className="text-end">₹ 25.00</td>
                        </tr>
                        <tr>
                          <td>GST :</td>
                          <td className="text-end">₹ {gst.toFixed(2)}</td>
                        </tr>
                        <tr className="bg-secondary">
                          <th>Total :</th>
                          <td className="text-end">
                            <span className="fw-bold">
                              ₹ {total.toFixed(2)}
                            </span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            <div className="m-3 mt-sm-0">
              <a href="ecommerce-checkout.html" className="btn btn-success">
                <i className="mdi mdi-cart-outline me-1"></i> Checkout
              </a>
            </div>
          </div>
        </div>
      </div>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Cart;
