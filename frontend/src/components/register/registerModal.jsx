import { useState, useRef } from "react";
import "./registerModal.css";
import RegisterAsCustomer from "./registerAsCustomer";
import RegisterAsVendor from "./registerAsVendor";
import RegisterAsDB from "./registerAsDB";

function RegisterModal({ onClose, onToggleLogin }) {
  const modalRef = useRef();

  const [customerReg, setCustomerReg] = useState(false);
  const [dbReg, setDBReg] = useState(false);
  const [vendorReg, setVendorReg] = useState(false);

  const closeModal = (e) => {
    if (modalRef.current === e.target) onClose();
  };
  const regCustomer = () => {
    setCustomerReg(!customerReg);
  };
  const regDB = () => {
    setDBReg(!dbReg);
  };
  const regVendor = () => {
    setVendorReg(!vendorReg);
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="container-fluid modal-backdrop"
    >
      {customerReg && <RegisterAsCustomer registered={onClose} />}
      {dbReg && <RegisterAsDB registered={onClose} />}
      {vendorReg && <RegisterAsVendor registered={onClose} />}
      {!customerReg && !dbReg && !vendorReg && (
        <div className="modal-content rounded-5 shadow">
          <div className="modal-header p-5 pb-4 border-bottom-0">
            <h1 className="fw-bold mb-0 fs-2">Register As</h1>
          </div>
          <div className="modal-body p-5 pt-0">
            <div className="row justify-content-between">
              <div className="col-lg-3 col-sm-6">
                <div data-bs-toggle="collapse">
                  <label className="card-radio-label">
                    <input
                      type="radio"
                      name="pay-method"
                      id="pay-methodoption1"
                      className="card-radio-input"
                      onClick={regCustomer}
                    />
                    <span className="card-radio py-3 text-center text-truncate">
                      <i className="bx bx-bowl-hot d-block h2 mb-3"></i>
                      Customer
                    </span>
                  </label>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <div>
                  <label className="card-radio-label">
                    <input
                      type="radio"
                      name="pay-method"
                      id="pay-methodoption2"
                      className="card-radio-input"
                      onClick={regVendor}
                    />
                    <span className="card-radio py-3 text-center text-truncate">
                      <i className="bx bx-buildings d-block h2 mb-3"></i>
                      Vendor
                    </span>
                  </label>
                </div>
              </div>

              <div className="col-lg-3 col-sm-6">
                <div>
                  <label className="card-radio-label">
                    <input
                      type="radio"
                      name="pay-method"
                      id="pay-methodoption3"
                      className="card-radio-input"
                      onClick={regDB}
                    />

                    <span className="card-radio py-3 text-center text-truncate">
                      <i className="bx bx-cycling d-block h2 mb-3"></i>
                      <span>Delivery Boy</span>
                    </span>
                  </label>
                </div>
              </div>
            </div>
            <div className="mt-2">
              <h5>Already a user?</h5>
              <button className="btn btn-link" onClick={onToggleLogin}>
                Login
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
export default RegisterModal;
