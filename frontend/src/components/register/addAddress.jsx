import React, { useState } from "react";
import { registerDeliveryBoy, registerVendor } from "../../services/user";
import { toast } from "react-toastify";
import Zipcode from "./zipcode";

function AddAddress({ userSignupDetails, addedAddress }) {
  // Destructure userSignupDetails
  const { firstName, lastName, email, password, role, business, image } =
    userSignupDetails;

  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("Pune");
  const [state, setState] = useState("Maharashtra");
  const [country, setCountry] = useState("India");
  const [zipcode, setZipcode] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [imageFile, setImageFile] = useState(null);

  const resetForm = () => {
    setAddressLine1("");
    setAddressLine2("");
    setZipcode("");
    setPhoneNo("");
    setImageFile(null);
  };

  const onRegister = async () => {
    // Client-side validation
    if (addressLine1.length === 0) {
      toast.warning("Enter address line 1");
    } else if (addressLine2.length === 0) {
      toast.warning("Enter address line 2");
    } else if (zipcode.length === 0) {
      toast.warning("Select zipcode");
    } else if (phoneNo.length === 0) {
      toast.warning("Enter contact number");
    } else {
      const addressData = {
        adrLine1: addressLine1,
        adrLine2: addressLine2,
        city,
        state,
        country,
        zipcode,
        phoneNo,
      };

      try {
        let result;
        if (role === "ROLE_DELIVERY_BOY") {
          result = await registerDeliveryBoy({
            userSignUpReqDTO: {
              firstName,
              lastName,
              email,
              password,
              role,
            },
            addressReqDTO: addressData,
          });
        } else if (role === "ROLE_VENDOR") {
          result = await registerVendor({
            userSignUpReqDTO: {
              firstName,
              lastName,
              email,
              password,
              role,
              businessName: business,
            },
            addressReqDTO: addressData,
            imageFile: image, // Include the image file for vendor
          });
        }

        if (
          result?.message === "New Delivery Boy Added!!!" ||
          result?.message === "New Vendor Added!!!"
        ) {
          toast.success(
            `Successfully registered the ${
              role === "ROLE_VENDOR" ? "Vendor" : "Delivery Boy"
            }`
          );
          addedAddress();
          // navigate("/login"); // Uncomment if navigation is needed
        } else if (result?.message === "Use another email") {
          toast.warning("Use another email");
          resetForm();
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while registering");
      }
    }
  };

  return (
    <div>
      <div className="modal-content rounded-5 shadow">
        <div className="modal-header p-5 pb-4 border-bottom-0">
          <h1 className="fw-bold mb-0 fs-2">Add Address and Register</h1>
        </div>
        <div className="modal-body p-5 pt-0">
          {/* Address Line 1 */}
          <div className="form-floating mb-3">
            <input
              onChange={(e) => setAddressLine1(e.target.value)}
              type="text"
              className="ps-3 form-control rounded-5"
              id="addressLine1"
              placeholder="Address Line 1"
              value={addressLine1}
            />
            <label htmlFor="addressLine1">Address Line 1</label>
          </div>
          {/* Address Line 2 */}
          <div className="form-floating mb-3">
            <input
              onChange={(e) => setAddressLine2(e.target.value)}
              type="text"
              className="ps-3 form-control rounded-5"
              id="addressLine2"
              placeholder="Address Line 2"
              value={addressLine2}
            />
            <label htmlFor="addressLine2">Address Line 2</label>
          </div>
          {/* City */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="ps-3 form-control rounded-5"
              id="city"
              placeholder="City"
              value={city}
              readOnly
            />
            <label htmlFor="city">City</label>
          </div>
          {/* State */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="ps-3 form-control rounded-5"
              id="state"
              placeholder="State"
              value={state}
              readOnly
            />
            <label htmlFor="state">State</label>
          </div>
          {/* Country */}
          <div className="form-floating mb-3">
            <input
              type="text"
              className="ps-3 form-control rounded-5"
              id="country"
              placeholder="Country"
              value={country}
              readOnly
            />
            <label htmlFor="country">Country</label>
          </div>
          {/* Zipcode */}
          <Zipcode onChange={setZipcode} />
          {/* Phone Number */}
          <div className="form-floating mb-3">
            <input
              onChange={(e) => setPhoneNo(e.target.value)}
              type="text"
              className="ps-3 form-control rounded-5"
              id="phoneNo"
              placeholder="Phone Number"
              value={phoneNo}
            />
            <label htmlFor="phoneNo">Phone Number</label>
          </div>
          <div className="row">
            <div className="col">
              <button
                onClick={onRegister}
                className="mt-2 rounded-5 btn"
                id="action-btn"
              >
                Register as {role === "ROLE_VENDOR" ? "Vendor" : "Delivery Boy"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddAddress;
