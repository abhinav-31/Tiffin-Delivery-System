import React from "react";
import { useState } from "react";
import { register } from "../../services/user";
import { toast } from "react-toastify";
function RegisterAsCustomer({ registered }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isValidEmail = () => {
    return email.includes("@");
  };
  const onRegister = async () => {
    // client side validation
    if (firstName.length === 0) {
      toast.warning("enter first name");
    } else if (lastName.length === 0) {
      toast.warning("enter last name");
    } else if (email.length === 0) {
      toast.warning("enter email");
    } else if (!isValidEmail()) {
      toast.warning("Email is not valid");
    } else if (password.length === 0) {
      toast.warning("enter password");
    } else if (confirmPassword.length === 0) {
      toast.warning("confirm password");
    } else {
      // make the API call and receive the result
      const result = await register(
        firstName,
        lastName,
        email,
        password,
        "ROLE_CUSTOMER"
      );
      if (result["message"] === "New Customer Added!!!") {
        toast.success("successfully registered. Don't forget to Sign In");
        registered();
      } else {
        console.log(result);
        toast.error("Failed to register the user");
      }
    }
  };
  return (
    <div>
      <div className="modal-content rounded-5 shadow">
        <div className="modal-header p-5 pb-4 border-bottom-0">
          <h1 className="fw-bold mb-0 fs-2">Register</h1>
        </div>
        <div className="modal-body p-5 pt-0">
          {/* Name */}
          <div className="row">
            <div className="form-floating col">
              <input
                onChange={(e) => {
                  setFirstName(e.target.value);
                }}
                type="text"
                className="ps-3 form-control rounded-5"
                id="floatingInput"
                placeholder="John"
              />
              <label className="ms-3" htmlFor="floatingInput">
                First Name
              </label>
            </div>
            <div className="form-floating mb-3 col">
              <input
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                type="text"
                className="ps-3 form-control rounded-5"
                id="floatingInput"
                placeholder="Doe"
              />
              <label className="ms-3" htmlFor="floatingInput">
                Last Name
              </label>
            </div>
          </div>
          {/* Email */}
          <div className="form-floating mb-3">
            <input
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              type="email"
              className="ps-3 form-control rounded-5"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email</label>
          </div>
          {/* Password */}
          <div className="row">
            <div className="form-floating mb-3 col">
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
                type="password"
                className="ps-3 form-control rounded-5"
                id="floatingPassword"
                placeholder="Password"
              />
              <label className="ms-3" htmlFor="floatingPassword">
                Confirm Password
              </label>
            </div>
          </div>

          <div className="row">
            <div className="col">
              <button
                onClick={onRegister}
                className="mt-2 rounded-5 btn"
                id="action-btn"
              >
                Register as Customer
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterAsCustomer;
