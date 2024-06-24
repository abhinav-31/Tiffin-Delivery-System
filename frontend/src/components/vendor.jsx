import React from "react";

function Vendor({ property }) {
  return (
    <div className="col-xl-3 col-sm-6 m-2" style={{ display: "inline-block" }}>
      <div className="card text-center">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-center mb-3">
            <div className="avatar-md rounded-circle overflow-hidden">
              <img
                src="https://logowik.com/content/uploads/images/674_kfc.jpg"
                alt=""
                className="img-fluid"
                style={{ maxWidth: "100%", height: "auto" }}
              />
            </div>
          </div>
          <div className="ms-3">
            <h5 className="font-size-16 mb-1">{property.businessName}</h5>
            <span className="badge badge-soft-success mb-2">Open</span>
          </div>
          <div className="mt-3 pt-1">
            <p className="text-muted mb-1">
              <i className="mdi mdi-phone font-size-15 align-middle pe-2 text-primary"></i>{" "}
              {property.phoneNumber}
            </p>
            <p className="text-muted mb-1">
              <i className="mdi mdi-email font-size-15 align-middle pe-2 text-primary"></i>{" "}
              {property.email}
            </p>
            <p className="text-muted mb-0">
              <i className="mdi mdi-google-maps font-size-15 align-middle pe-2 text-primary"></i>{" "}
              {property.businessAddress}
            </p>
          </div>
          <div className="d-flex justify-content-center mt-4">
            <button
              type="button"
              className="btn btn-outline-primary btn-sm w-50 me-2 rounded-5"
            >
              <i className="bx bx-user me-1"></i> Profile
            </button>
            <button
              type="button"
              className="btn btn-primary btn-sm w-50 rounded-5"
              style={{ backgroundColor: "#f56e6e", borderColor: "#f56e6e" }}
            >
              <i className="bx bx-message-square-dots me-1"></i> Contact
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Vendor;
