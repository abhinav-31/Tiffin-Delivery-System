
// import "./cart.css";
// import NavBar from "../components/navbar/navbar";
// import React, { useEffect, useState, useCallback } from "react";
// import CartItem from "../components/cart/cartItem";
// import { useSelector } from "react-redux";
// import Footer from "../components/footer/footer";
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { useNavigate } from 'react-router-dom';

// function Cart() {
//   const navigate = useNavigate();
//   const initialCart = useSelector((state) => state.cart.items); // Access cart state from Redux
//   const loginStatus = useSelector((state) => state.user.loginStatus); // Access login status from Redux
//   const [cart, setCart] = useState(initialCart);
//   const [total, setTotal] = useState(0);
//   const [subTotal, setSubTotal] = useState(0);
//   const [gst, setGst] = useState(0);

//   const calculateBill = useCallback(() => {
//     let subTotal = 0;
//     Object.values(cart).forEach((vendorItems) => {
//       Object.values(vendorItems).forEach((item) => {
//         subTotal += item.menuPrice * item.quantity;
//       });
//     });

//     const calculatedGst = 0.18 * subTotal;
//     const calculatedTotal = subTotal + calculatedGst + 25;

//     setSubTotal(subTotal);
//     setGst(calculatedGst);
//     setTotal(calculatedTotal);
//   }, [cart]);

//   useEffect(() => {
//     if (!loginStatus) {
//       toast.error('Please sign in to view your cart.');
//       navigate('/'); // Redirect to home or login page
//     } else {
//       calculateBill();
//       console.log("Cart contents:", cart);
//     }
//   }, [loginStatus, calculateBill, navigate, cart]); // Update bill whenever cart items or loginStatus change

//   const updateBill = useCallback((vendorEmail, menuId, newQuantity) => {
//     setCart((prevCart) => {
//       const updatedCart = { ...prevCart };
//       if (updatedCart[vendorEmail] && updatedCart[vendorEmail][menuId]) {
//         updatedCart[vendorEmail][menuId].quantity = newQuantity;
//       }
//       return updatedCart;
//     });
//   }, []);

//   const handleChooseAddress = () => {
//     // Handle address selection logic, e.g., open a modal or navigate to another page
//     console.log("Choose delivery address clicked");
//   };

//   return (
//     <div>
//       <NavBar />
//       <div className="content-container">
//         <div className="row container-fluid">
//           <div className="col-xl-1"></div>
//           <div className="col-xl-8">
//             <div className="row my-4">
//               {/* Add the Choose Delivery Address Button */}
//               <div className="col-12 mb-3">
//                 <button
//                   className="btn btn-primary"
//                   onClick={handleChooseAddress}
//                 >
//                   Choose Delivery Address
//                 </button>
//               </div>
//               <div>
//                 {Object.keys(cart).length > 0 ? (
//                   Object.entries(cart).map(([vendorEmail, vendorItems]) =>
//                     Object.entries(vendorItems).map(([menuId, item]) => (
//                       <CartItem
//                         key={menuId}
//                         cartItem={item}
//                         vendorEmail={vendorEmail}
//                         updateBill={updateBill}
//                       />
//                     ))
//                   )
//                 ) : (
//                   <h4 className="page-title">
//                     There are no menu items added to the cart
//                   </h4>
//                 )}
//               </div>
//               {Object.keys(cart).length !== 0 && (
//                 <div>
//                   <div className="col-sm-6">
//                     <a
//                       href="ecommerce-products.html"
//                       className="btn btn-link text-muted"
//                     >
//                       <i className="mdi mdi-arrow-left me-1"></i> Continue
//                       Shopping
//                     </a>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//           <div className="col-xl-3">
//             <div className="mt-5 mt-lg-0">
//               <div className="card rounded-5">
//                 <div className="card-header border-bottom py-3 px-4 rounded-5">
//                   <img
//                     src="https://img.freepik.com/free-vector/isometric-bento-box-illustration_52683-56499.jpg?t=st=1719145384~exp=1719148984~hmac=cc6282626b8e649114356810a7e83fbb3fc5fde6bb26185ca8db2550d52937ca&w=740"
//                     alt=""
//                     width="100%"
//                     className="mt-1 rounded-5"
//                   />
//                   <h5 className="font-size-24 mt-3 mb-0">
//                     Order Summary <span className="float-end"></span>
//                   </h5>
//                 </div>
//                 <div className="card-body p-4 pt-2 rounded-bottom">
//                   <div className="table-responsive">
//                     <table className="table mb-0 table">
//                       <tbody>
//                         <tr>
//                           <td>Sub Total :</td>
//                           <td className="text-end">₹ {subTotal.toFixed(2)}</td>
//                         </tr>
//                         <tr>
//                           <td>Service Charge :</td>
//                           <td className="text-end">₹ 25.00</td>
//                         </tr>
//                         <tr>
//                           <td>GST :</td>
//                           <td className="text-end">₹ {gst.toFixed(2)}</td>
//                         </tr>
//                         <tr className="bg-secondary">
//                           <th>Total :</th>
//                           <td className="text-end">
//                             <span className="fw-bold">
//                               ₹ {total.toFixed(2)}
//                             </span>
//                           </td>
//                         </tr>
//                       </tbody>
//                     </table>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="m-3 mt-sm-0">
//               <a href="ecommerce-checkout.html" className="btn btn-success">
//                 <i className="mdi mdi-cart-outline me-1"></i> Checkout
//               </a>
//             </div>
//           </div>
//         </div>
//       </div>
//       <footer>
//         <Footer />
//       </footer>
//       <ToastContainer />
//     </div>
//   );
// }

// export default Cart;


import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import NavBar from "../components/navbar/navbar";
import CartItem from "../components/cart/cartItem";
import Footer from "../components/footer/footer";
import AddCustomerAddressModal from '../components/register/AddCustomerAddressModal'; // Import the modal component

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialCart = useSelector((state) => state.cart.items);
  const loginStatus = useSelector((state) => state.user.loginStatus);
  const addresses = useSelector((state) => state.address.addresses);
  const [cart, setCart] = useState(initialCart);
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddresses, setShowAddresses] = useState(false);

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
    if (!loginStatus) {
      toast.error('Please sign in to view your cart.');
      navigate('/'); // Redirect to home or login page
    } else {
      calculateBill();
      console.log("Cart contents:", cart);
    }
  }, [loginStatus, calculateBill, navigate, cart]);

  const updateBill = useCallback((vendorEmail, menuId, newQuantity) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[vendorEmail] && updatedCart[vendorEmail][menuId]) {
        updatedCart[vendorEmail][menuId].quantity = newQuantity;
      }
      return updatedCart;
    });
  }, []);

  const handleChooseAddress = () => {
    if (addresses.length !=0) {
      setShowAddAddress(true); // Show AddCustomerAddressModal if no addresses are found
    } else {
      setShowAddresses(true); // Show address cards if addresses are found
    }
  };

  const handleCloseAddAddress = () => {
    setShowAddAddress(false); // Close AddCustomerAddressModal
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    // Handle address selection logic here (e.g., proceed to checkout with selected address)
  };

  return (
    <div>
      <NavBar />
      <div className="content-container">
        <div className="row container-fluid">
          <div className="col-xl-1"></div>
          <div className="col-xl-8">
            <div className="row my-4">
              <div className="col-12 mb-3">
                <button
                  className="btn btn-primary"
                  onClick={handleChooseAddress}
                >
                  Choose Delivery Address
                </button>
              </div>

              {showAddresses && addresses.length > 0 && (
                <div className="row">
                  {addresses.map((address, index) => (
                    <div className="col-md-4 mb-3" key={index}>
                      <div className="card">
                        <div className="card-body">
                          <h5 className="card-title">Address {index + 1}</h5>
                          <p className="card-text">
                            {address.adrLine1}, {address.adrLine2 ? address.adrLine2 + ', ' : ''}
                            {address.city}, {address.state}, {address.country}
                          </p>
                          <p className="card-text">
                            ZipCode: {address.zipcode}
                          </p>
                          <p className="card-text">
                            Phone: {address.phoneNo}
                          </p>
                          <button
                            className="btn btn-primary"
                            onClick={() => handleSelectAddress(address)}
                          >
                            Select Address
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showAddAddress && (
                <AddCustomerAddressModal
                  addedAddress={handleCloseAddAddress}
                />
              )}

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
                    Order Summary
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
      <Footer />
    </div>
  );
}

export default Cart;
