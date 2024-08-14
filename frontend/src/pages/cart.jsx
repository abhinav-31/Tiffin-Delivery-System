// import React, { useEffect, useState, useCallback } from "react";
// import { toast } from "react-toastify";
// import { useSelector, useDispatch } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import NavBar from "../components/navbar/navbar";
// import CartItem from "../components/cart/cartItem";
// import Footer from "../components/footer/footer";
// import AddCustomerAddressModal from "../components/register/AddCustomerAddressModal";
// import { placeOrder } from "../services/OrderService"; // Import the OrderService
// import { generateRandomTransactionId } from "../Utils/utility";

// function Cart() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const initialCart = useSelector((state) => state.cart.items);
//   const loginStatus = useSelector((state) => state.user.loginStatus);
//   const addresses = useSelector((state) => state.address.addresses);
//   const vendorId = useSelector((state) => state.vendor.id); // Get vendorId from Redux store
//   const [cart, setCart] = useState(initialCart);
//   const [total, setTotal] = useState(0);
//   const [subTotal, setSubTotal] = useState(0);
//   const [gst, setGst] = useState(0);
//   const [showAddAddress, setShowAddAddress] = useState(false);
//   const [selectedAddress, setSelectedAddress] = useState(null);
//   const [showAddresses, setShowAddresses] = useState(false);
//   const [paymentMethod, setPaymentMethod] = useState("GOOGLE_PAY"); // Default payment method
//   const [selectedAddressIndex, setSelectedAddressIndex] = useState(null); // Track selected address index

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
//       toast.error("Please sign in to view your cart.");
//       navigate("/"); // Redirect to home or login page
//     } else {
//       calculateBill();
//       console.log("Cart contents:", cart);
//     }
//   }, [loginStatus, calculateBill, navigate, cart]);

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
//     if (addresses.length === 0) {
//       setShowAddAddress(true); // Show AddCustomerAddressModal if no addresses are found
//     } else {
//       setShowAddresses(true); // Show address cards if addresses are found
//     }
//   };

//   const handleCloseAddAddress = () => {
//     setShowAddAddress(false); // Close AddCustomerAddressModal
//   };

//   const handleSelectAddress = (address, index) => {
//     setSelectedAddress(address);
//     setSelectedAddressIndex(index); // Set the selected address index
//   };

//   const handleAddNewAddress = () => {
//     setShowAddAddress(true); // Show AddCustomerAddressModal when the button is clicked
//   };

//   const handlePlaceOrder = async () => {
//     if (!selectedAddress) {
//       toast.error("Please select a delivery address.");
//       return;
//     }

//     const orderRequest = {
//       menuItems: Object.entries(cart).flatMap(([vendorItems]) =>
//         Object.entries(vendorItems).map(([menuId, item]) => ({
//           menuId: parseInt(menuId),
//           quantity: item.quantity,
//         }))
//       ),
//       address: selectedAddress,
//       payment: {
//         paymentMethod: paymentMethod,
//         amount: total,
//         transactionId: generateRandomTransactionId(),
//       },
//     };

//     // Retrieve customerId and token from session storage
//     const customerId = sessionStorage.getItem("id");
//     const token = sessionStorage.getItem("token");

//     if (!customerId || !token) {
//       toast.error("User information is missing. Please log in again.");
//       return;
//     }

//     try {
//       console.log("Order Request:- " + orderRequest);
//       console.log("vendor id2 " + vendorId);
//       await placeOrder(customerId, vendorId, token, orderRequest);
//       toast.success("Order placed successfully!");
//       // Handle successful order placement, e.g., navigate to confirmation page
//       navigate("/order-confirmation"); // Navigate to order confirmation page
//     } catch (error) {
//       toast.error(error.message);
//       console.error("Error placing order:", error);
//     }
//   };

//   return (
//     <div>
//       <NavBar />
//       <div className="content-container">
//         <div className="row container-fluid">
//           <div className="col-xl-1"></div>
//           <div className="col-xl-8">
//             <div className="row my-4">
//               <div className="col-12 mb-3 d-flex justify-content-between">
//                 <button
//                   className="btn btn-primary"
//                   onClick={handleChooseAddress}
//                 >
//                   Choose Delivery Address
//                 </button>
//                 {showAddresses && (
//                   <button
//                     className="btn btn-primary"
//                     onClick={handleAddNewAddress}
//                   >
//                     <i className="mdi mdi-plus"></i> Add New Address
//                   </button>
//                 )}
//               </div>

//               {showAddresses && addresses.length > 0 && (
//                 <div className="row">
//                   {addresses.map((address, index) => (
//                     <div className="col-md-6 mb-3" key={index}>
//                       <div className={`card ${selectedAddressIndex === index ? 'bg-success text-white' : ''}`}>
//                         <div className="card-body">
//                           <h5 className="card-title">
//                             {selectedAddressIndex === index ? "Address Selected" : `Address ${index + 1}`}
//                           </h5>
//                           <p className="card-text">
//                             {address.adrLine1},{" "}
//                             {address.adrLine2 ? address.adrLine2 + ", " : ""}
//                             {address.city}, {address.state}, {address.country}
//                           </p>
//                           <p className="card-text">
//                             ZipCode: {address.zipcode}
//                           </p>
//                           <p className="card-text">Phone: {address.phoneNo}</p>
//                           <button
//                             className={`btn ${selectedAddressIndex === index ? 'btn-light' : 'btn-primary'}`}
//                             onClick={() => handleSelectAddress(address, index)}
//                           >
//                             {selectedAddressIndex === index ? "Address Selected" : "Select Address"}
//                           </button>
//                         </div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {showAddAddress && (
//                 <AddCustomerAddressModal addedAddress={handleCloseAddAddress} />
//               )}

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
//                   <h5 className="font-size-16 mb-0 mt-3">Order Summary</h5>
//                 </div>
//                 <div className="card-body p-4">
//                   <div className="d-flex justify-content-between">
//                     <span>Subtotal:</span>
//                     <span>${subTotal.toFixed(2)}</span>
//                   </div>
//                   <div className="d-flex justify-content-between mt-1">
//                     <span>GST:</span>
//                     <span>${gst.toFixed(2)}</span>
//                   </div>
//                   <div className="d-flex justify-content-between mt-2">
//                     <span>Delivery Charges:</span>
//                     <span>$25.00</span>
//                   </div>
//                   <div className="d-flex justify-content-between mt-2">
//                     <span className="font-size-16">Total:</span>
//                     <span className="font-size-16">${total.toFixed(2)}</span>
//                   </div>
//                 </div>
//                 <div className="card-footer border-top py-3 px-4 rounded-5">
//                   <button
//                     className="btn btn-primary w-100"
//                     onClick={handlePlaceOrder}
//                     disabled={!selectedAddress}
//                   >
//                     Place Order
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </div>
//   );
// }

// export default Cart;
import React, { useEffect, useState, useCallback } from "react";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/navbar/navbar";
import CartItem from "../components/cart/cartItem";
import Footer from "../components/footer/footer";
import AddCustomerAddressModal from "../components/register/AddCustomerAddressModal";
import { placeOrder } from "../services/OrderService"; // Import the OrderService
import { generateRandomTransactionId } from "../Utils/utility";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialCart = useSelector((state) => state.cart.items);
  const loginStatus = useSelector((state) => state.user.loginStatus);
  const addresses = useSelector((state) => state.address.addresses);
  const vendorId = useSelector((state) => state.vendor.id); // Get vendorId from Redux store
  const [cart, setCart] = useState(initialCart);
  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [gst, setGst] = useState(0);
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [showAddresses, setShowAddresses] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("GOOGLE_PAY"); // Default payment method
  const [selectedAddressIndex, setSelectedAddressIndex] = useState(null); // Track selected address index

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
      toast.error("Please sign in to view your cart.");
      navigate("/"); // Redirect to home or login page
    } else {
      calculateBill();
    }
  }, [loginStatus, calculateBill, navigate]);

  const updateBill = useCallback((vendorEmail, menuId, newQuantity) => {
    setCart((prevCart) => {
      const updatedCart = { ...prevCart };
      if (updatedCart[vendorEmail] && updatedCart[vendorEmail][menuId]) {
        updatedCart[vendorEmail][menuId].quantity = newQuantity;
      }
      return updatedCart;
    });
  }, []);

  useEffect(() => {
    calculateBill();
  }, [cart, calculateBill]);

  const handleChooseAddress = () => {
    if (addresses.length === 0) {
      setShowAddAddress(true); // Show AddCustomerAddressModal if no addresses are found
    } else {
      setShowAddresses(true); // Show address cards if addresses are found
    }
  };

  const handleCloseAddAddress = () => {
    setShowAddAddress(false); // Close AddCustomerAddressModal
  };

  const handleSelectAddress = (address, index) => {
    setSelectedAddress(address);
    setSelectedAddressIndex(index); // Set the selected address index
  };

  const handleAddNewAddress = () => {
    setShowAddAddress(true); // Show AddCustomerAddressModal when the button is clicked
  };

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("Please select a delivery address.");
      return;
    }

    // Prepare the orderRequest object by correctly mapping the cart items
    const orderRequest = {
      menuItems: Object.entries(cart).flatMap(([vendorEmail, vendorItems]) =>
        Object.entries(vendorItems).map(([menuId, item]) => ({
          id: parseInt(menuId),
          quantity: item.quantity,
        }))
      ),
      address: selectedAddress,
      payment: {
        paymentMethod: paymentMethod,
        amount: total,
        transactionId: generateRandomTransactionId(),
      },
    };

    // Retrieve customerId and token from session storage
    const customerId = sessionStorage.getItem("id");
    const token = sessionStorage.getItem("token");

    if (!customerId || !token) {
      toast.error("User information is missing. Please log in again.");
      return;
    }

    try {
      console.log("Order Request Data:", orderRequest);
      await placeOrder(customerId, vendorId, token, orderRequest);

      toast.success("Order placed successfully!");
      dispatch({ type: "CLEAR_CART" }); // Clear the cart after placing the order
      navigate("/"); // Navigate to order confirmation page
    } catch (error) {
      toast.error(error.message);
      console.error("Error placing order:", error);
    }
  };

  return (
    <div>
      <NavBar />
      <div className="content-container">
        <div className="row container-fluid">
          <div className="col-xl-1"></div>
          <div className="col-xl-8">
            <div className="row my-4">
              <div className="col-12 mb-3 d-flex justify-content-between">
                <button
                  className="btn btn-primary"
                  onClick={handleChooseAddress}
                >
                  Choose Delivery Address
                </button>
                {showAddresses && (
                  <button
                    className="btn btn-primary"
                    onClick={handleAddNewAddress}
                  >
                    <i className="mdi mdi-plus"></i> Add New Address
                  </button>
                )}
              </div>

              {showAddresses && addresses.length > 0 && (
                <div className="row">
                  {addresses.map((address, index) => (
                    <div className="col-md-6 mb-3" key={index}>
                      <div
                        className={`card ${
                          selectedAddressIndex === index
                            ? "bg-success text-white"
                            : ""
                        }`}
                      >
                        <div className="card-body">
                          <h5 className="card-title">
                            {selectedAddressIndex === index
                              ? "Address Selected"
                              : `Address ${index + 1}`}
                          </h5>
                          <p className="card-text">
                            {address.adrLine1},{" "}
                            {address.adrLine2 ? address.adrLine2 + ", " : ""}
                            {address.city}, {address.state}, {address.country}
                          </p>
                          <p className="card-text">
                            ZipCode: {address.zipcode}
                          </p>
                          <p className="card-text">Phone: {address.phoneNo}</p>
                          <button
                            className={`btn ${
                              selectedAddressIndex === index
                                ? "btn-light"
                                : "btn-primary"
                            }`}
                            onClick={() => handleSelectAddress(address, index)}
                          >
                            {selectedAddressIndex === index
                              ? "Address Selected"
                              : "Select Address"}
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {showAddAddress && (
                <AddCustomerAddressModal addedAddress={handleCloseAddAddress} />
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
                    src="https://img.freepik.com/free-vector/isometric-bento-box-illustration_52683-56499.jpg?t=st=1719145384~exp=1719148984~hmac=cc6282626b8e649114356810a7e83fbb3fc5f6e8312f82313e0e6e00ae1c7158"
                    className="img-fluid rounded-5"
                    alt="menu-img"
                  />
                </div>
                <div className="card-body px-4">
                  <h4 className="card-title">Order Summary</h4>
                  <div className="d-flex justify-content-between">
                    <p className="mb-0">Subtotal</p>
                    <p className="mb-0">₹{subTotal.toFixed(2)}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-0">GST (18%)</p>
                    <p className="mb-0">₹{gst.toFixed(2)}</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-0">Delivery Charges</p>
                    <p className="mb-0">₹2.00</p>
                  </div>
                  <div className="d-flex justify-content-between">
                    <p className="mb-0">Total</p>
                    <p className="mb-0">₹{total.toFixed(2)}</p>
                  </div>
                  <div className="mt-3">
                    <button
                      className="btn btn-success w-100"
                      onClick={handlePlaceOrder}
                    >
                      Place Order
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Cart;
