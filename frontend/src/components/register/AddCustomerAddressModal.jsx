import React, { useRef, useEffect } from "react";
import { toast } from "react-toastify";
import Zipcode from "./zipcode";
import { registerCustomerAddress } from "../../services/user";
import './AddCustomerAddressModal.css'; // Import CSS file

function AddCustomerAddressModal({ addedAddress }) {
  const [addressLine1, setAddressLine1] = React.useState("");
  const [addressLine2, setAddressLine2] = React.useState("");
  const [city, setCity] = React.useState("Pune");
  const [state, setState] = React.useState("Maharashtra");
  const [country, setCountry] = React.useState("India");
  const [zipcode, setZipcode] = React.useState("");
  const [phoneNo, setPhoneNo] = React.useState("");

  const modalRef = useRef(null);

  const resetForm = () => {
    setAddressLine1("");
    setAddressLine2("");
    setCity("");
    setState("");
    setCountry("");
    setZipcode("");
    setPhoneNo("");
  };

  const onSubmit = async () => {
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
        city: city,
        state: state,
        country: country,
        zipcode: zipcode,
        phoneNo: phoneNo,
      };

      try {
        const result = await registerCustomerAddress(addressData);

        if (result?.message === "Address added successfully!") {
          toast.success("Address added successfully");
          resetForm();
          addedAddress(); // Close the modal or navigate to another page
        } else if (result?.message === "Address already exists") {
          toast.warning("Address already exists");
        }
      } catch (error) {
        console.error(error);
        toast.error("An error occurred while adding the address");
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        addedAddress(); // Close the modal when clicking outside
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [addedAddress]);

  return (
    <div className="modal-overlay">
      <div className="modal-content rounded-5 shadow" ref={modalRef}>
        <div className="modal-header p-5 pb-4 border-bottom-0">
          <h1 className="fw-bold mb-0 fs-2">Add Customer Address</h1>
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
                onClick={onSubmit}
                className="mt-2 rounded-5 btn"
                id="action-btn"
              >
                Add Address
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCustomerAddressModal;
