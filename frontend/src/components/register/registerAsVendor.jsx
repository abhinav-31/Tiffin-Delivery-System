import React, { useState } from "react";
import { registerVendor } from "../../services/user";
import { toast } from "react-toastify";
import AddAddress from "./addAddress";

function RegisterAsVendor({ registered }) {
  const [businessName, setBusinessName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [image, setImage] = useState(null); // State to store the image file
  const [showAddressModal, setShowAddressModal] = useState(false);

  const isValidEmail = () => {
    return email.includes("@");
  };

  const onAddAddress = () => {
    setShowAddressModal(true);
  };

  const onSubmitUserDetails = async () => {
    // Client-side validation
    if (businessName.length === 0) {
      toast.warning("Enter your business name");
    } else if (firstName.length === 0) {
      toast.warning("Enter first name");
    } else if (lastName.length === 0) {
      toast.warning("Enter last name");
    } else if (email.length === 0) {
      toast.warning("Enter email");
    } else if (!isValidEmail()) {
      toast.warning("Email is not valid");
    } else if (password.length === 0) {
      toast.warning("Enter password");
    } else if (confirmPassword.length === 0) {
      toast.warning("Confirm password");
    } else if (password !== confirmPassword) {
      toast.warning("Passwords do not match");
    } else if (!image) {
      toast.warning("Please upload an image");
    } else {
      // Proceed to show address form
      onAddAddress();
    }
  };

  return (
    <div>
      <div className="modal-content rounded-5 shadow">
        <div className="modal-header p-5 pb-4 border-bottom-0">
          <h1 className="fw-bold mb-0 fs-2">Register as Vendor</h1>
        </div>
        <div className="modal-body p-5 pt-0">
          {/* Business Name */}
          <div className="form-floating mb-3">
            <input
              onChange={(e) => setBusinessName(e.target.value)}
              type="text"
              className="ps-3 form-control rounded-5"
              id="floatingBusinessName"
              placeholder="Business Name"
            />
            <label htmlFor="floatingBusinessName">Business Name</label>
          </div>
          {/* Name */}
          <div className="row">
            <div className="form-floating col">
              <input
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                className="ps-3 form-control rounded-5"
                id="floatingInputFirstName"
                placeholder="John"
              />
              <label className="ms-3" htmlFor="floatingInputFirstName">
                First Name
              </label>
            </div>
            <div className="form-floating mb-3 col">
              <input
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                className="ps-3 form-control rounded-5"
                id="floatingInputLastName"
                placeholder="Doe"
              />
              <label className="ms-3" htmlFor="floatingInputLastName">
                Last Name
              </label>
            </div>
          </div>
          {/* Email */}
          <div className="form-floating mb-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="ps-3 form-control rounded-5"
              id="floatingInputEmail"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInputEmail">Email</label>
          </div>
          {/* Password */}
          <div className="row">
            <div className="form-floating mb-3 col">
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                className="ps-3 form-control rounded-5"
                id="floatingPassword"
                placeholder="Password"
              />
              <label className="ms-3" htmlFor="floatingPassword">
                Password
              </label>
            </div>
            <div className="form-floating mb-3 col">
              <input
                onChange={(e) => setConfirmPassword(e.target.value)}
                type="password"
                className="ps-3 form-control rounded-5"
                id="floatingConfirmPassword"
                placeholder="Confirm Password"
              />
              <label className="ms-3" htmlFor="floatingConfirmPassword">
                Confirm Password
              </label>
            </div>
          </div>
          {/* Image Upload */}
          <div className="form-floating mb-3">
            <input
              onChange={(e) => setImage(e.target.files[0])}
              type="file"
              className="form-control"
              id="vendorImage"
            />
            <label htmlFor="vendorImage">Upload Business Image</label>
          </div>
          <div className="row">
            <div className="col">
              <button
                onClick={onSubmitUserDetails}
                className="mt-2 rounded-5 btn"
                id="action-btn"
              >
                Proceed to Add Address
              </button>
            </div>
          </div>
        </div>
      </div>

      {showAddressModal && (
        <AddAddress
          userSignupDetails={{
            business: businessName,
            firstName,
            lastName,
            email,
            password,
            role: "ROLE_VENDOR",
            image,
          }}
          addedAddress={registered}
        />
      )}
    </div>
  );
}

export default RegisterAsVendor;
