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
import { setAddresses } from "../redux/AddressSlice"; // Import the action
import { clearCart } from "../redux/cartSlice";

function Cart() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const initialCart = useSelector((state) => state.cart.items);
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

  const [updateQuantity, setUpdateQuantity] = useState(0);
  const calculateBill = useCallback(() => {
    let subTotal = 0;
    for (const vendorKey in cart) {
      // Loop through each vendor in the cart
      const vendorItems = cart[vendorKey]; // Access vendor's items

      for (const itemKey in vendorItems) {
        // Loop through each item for the vendor
        const item = vendorItems[itemKey]; // Access each item
        subTotal += item.menuPrice * updateQuantity; // Use the updateQuantity as provided
      }
    }
    const calculatedGst = 0.18 * subTotal;
    const deliveryCharges = Object.keys(cart).length > 0 ? 10 : 0; // Conditionally set delivery charges
    const calculatedTotal = subTotal + calculatedGst + deliveryCharges;

    setSubTotal(subTotal);
    setGst(calculatedGst);
    setTotal(calculatedTotal);
  }, [cart, updateQuantity]);

  useEffect(() => {
    calculateBill();
  }, [calculateBill, cart]);

  const updateBill = useCallback((vendorEmail, menuId, newQuantity) => {
    setUpdateQuantity(newQuantity);

    setCart((prevCart) => {
      // Create a deep copy of the previous cart state
      const updatedCart = JSON.parse(JSON.stringify(prevCart));

      if (updatedCart[vendorEmail] && updatedCart[vendorEmail][menuId]) {
        if (newQuantity <= 0) {
          // Remove item from cart if quantity is zero or less
          const { [menuId]: _, ...remainingItems } = updatedCart[vendorEmail];
          updatedCart[vendorEmail] = remainingItems;

          // Remove vendor from cart if it has no items left
          if (Object.keys(updatedCart[vendorEmail]).length === 0) {
            const { [vendorEmail]: _, ...remainingVendors } = updatedCart;
            return remainingVendors;
          }
        } else {
          // Update the quantity of the item
          updatedCart[vendorEmail][menuId] = {
            ...updatedCart[vendorEmail][menuId],
            quantity: newQuantity,
          };
        }
      }

      return updatedCart;
    });
  }, []);

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

  const handleAddAddress = (newAddress) => {
    // Update local addresses state
    dispatch(setAddresses([...addresses, newAddress])); // Add the new address to the Redux store

    setShowAddAddress(false); // Close the modal
  };

  const handlePlaceOrder = async () => {
    if (Object.keys(cart).length === 0) {
      toast.info(
        "Your cart is empty. Please add menu items before placing an order."
      );
      return;
    }
    if (!selectedAddress) {
      toast.error("Please select a delivery address.");
      return;
    }
    // Check if the cart is empty
    if (Object.keys(cart).length === 0) {
      toast.error(
        "Your cart is empty. Please add menu items before placing an order."
      );
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
    //const customerId = sessionStorage.getItem("id");
    const token = sessionStorage.getItem("token");

    // if (!customerId || !token) {
    //   toast.error("User information is missing. Please log in again.");
    //   return;
    // }
    if (!token) {
      toast.error("User information is missing. Please log in again.");
      return;
    }

    try {
      await placeOrder(vendorId, token, orderRequest);

      toast.success("Order placed successfully!");
      dispatch(clearCart()); // Clear the cart after placing the order
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
                  {addresses.map((address, index) =>
                    // Defensive check to ensure address is defined
                    address ? (
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
                              {address.adrLine1 ? address.adrLine1 : ""},{" "}
                              {address.adrLine2 ? address.adrLine2 + ", " : ""}
                              {address.city ? address.city : ""},{" "}
                              {address.state ? address.state : ""},{" "}
                              {address.country ? address.country : ""}
                            </p>
                            <p className="card-text">
                              ZipCode: {address.zipcode ? address.zipcode : ""}
                            </p>
                            <p className="card-text">
                              Phone: {address.phoneNo ? address.phoneNo : ""}
                            </p>
                            <button
                              className={`btn ${
                                selectedAddressIndex === index
                                  ? "btn-light"
                                  : "btn-primary"
                              }`}
                              onClick={() =>
                                handleSelectAddress(address, index)
                              }
                            >
                              {selectedAddressIndex === index
                                ? "Address Selected"
                                : "Select Address"}
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : null
                  )}
                </div>
              )}
              {showAddAddress && (
                <AddCustomerAddressModal addedAddress={handleAddAddress} />
              )}
              <div>
                {Object.keys(cart).length > 0 ? (
                  Object.entries(cart).map(([vendorEmail, vendorItems]) =>
                    Object.entries(vendorItems).map(([menuId, item]) => (
                      <CartItem
                        key={menuId}
                        menuId={menuId}
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
                    className="img-fluid"
                    alt="order-img"
                  />
                  <h4 className="text-center">Order Summary</h4>
                </div>
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <span>Sub Total:</span>
                    <span>{subTotal.toFixed(2)}</span>
                  </div>
                  <div className="d-flex justify-content-between">
                    <span>GST (18%):</span>
                    <span>{gst.toFixed(2)}</span>
                  </div>
                  {/* Conditionally render Delivery Charges */}
                  {Object.keys(cart).length > 0 && (
                    <div className="d-flex justify-content-between">
                      <span>Delivery Charges</span>
                      <span>25.00</span>
                    </div>
                  )}
                  <div className="d-flex justify-content-between">
                    <span>Total:</span>
                    <span>{total.toFixed(2)}</span>
                  </div>
                  <div className="d-flex flex-column">
                    <label>Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                      <option value="GOOGLE_PAY">Google Pay</option>
                      <option value="PHONE_PAY">Phone Pay</option>
                      <option value="DEBIT_CARD">Debit Card</option>
                      <option value="PAYLATER">PAYLATER</option>
                    </select>
                    <button
                      className="btn btn-primary mt-3"
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
