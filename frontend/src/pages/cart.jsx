import "./cart.css";
import NavBar from "../components/navbar/navbar";
import React from "react";
import CartItem from "../components/cart/cartItem";
import { useSelector } from "react-redux";
import { useEffect, useState, useCallback } from "react";
import Footer from "../components/footer/footer";

function Cart() {
  // const cart = useSelector((state) => state.cart);
  const initialCart = {
    items: [
      { id: 1, title: "Chicken thali", itemPrice: 20, quantity: 1, rating: 5 },
      {
        id: 2,
        title: "Maharashtrian thali",
        itemPrice: 30,
        quantity: 2,
        rating: 2,
      },
      {
        id: 3,
        title: "Chicken legpiece",
        itemPrice: 40,
        quantity: 3,
        rating: 3,
      },
      { id: 4, title: "idli sambhar", itemPrice: 50, quantity: 4, rating: 1 },
    ],
  };

  const [cart, setCart] = useState(initialCart);
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [gst, setGst] = useState(0);

  useEffect(() => {
    calculateBill();
  }, [cart.items]); // Update bill whenever cart items change

  const calculateBill = useCallback(() => {
    let subTotal = 0;
    cart.items.forEach((item) => {
      subTotal += item.itemPrice * item.quantity;
    });

    const calculatedGst = 0.18 * subTotal;
    const calculatedTotal = subTotal + calculatedGst + 25;

    setSubTotal(subTotal);
    setGst(calculatedGst);
    setTotal(calculatedTotal);
  }, [cart.items]);

  const updateBill = useCallback(
    (itemId, newQuantity) => {
      const updatedItems = cart.items.map((item) =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      );

      setCart((prevCart) => ({
        ...prevCart,
        items: updatedItems,
      }));
    },
    [cart.items]
  );
  return (
    <div>
      <NavBar />
      <div className="content-container">
        <div className="row container-fluid">
          <div className="col-xl-1"></div>
          <div className="col-xl-8">
            <div className="row my-4">
              <div>
                {/* <CartItem /> */}
                {cart.items.map((item) => {
                  return (
                    <CartItem
                      key={item.id}
                      cartItem={item}
                      updateBill={updateBill}
                    />
                  );
                })}

                {cart.items.length == 0 && (
                  <h4 className="page-title">
                    There no menuItems added to cart
                  </h4>
                )}
              </div>
              {cart.length != 0 && (
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
                          <td className="text-end ">₹ {subTotal}</td>
                        </tr>
                        <tr>
                          <td>Service Charge :</td>
                          <td className="text-end">₹ 25</td>
                        </tr>
                        <tr>
                          <td>GST :</td>
                          <td className="text-end">₹ {gst}</td>
                        </tr>
                        <tr className="bg-secondary">
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
            <div className=" m-3 mt-sm-0 ">
              <a href="ecommerce-checkout.html" className="btn btn-success ">
                <i className="mdi mdi-cart-outline me-1"></i> Checkout{" "}
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
