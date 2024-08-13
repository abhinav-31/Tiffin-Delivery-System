import React from "react";

const Zipcode = ({ onChange }) => {
  const zipcodes = [
    "411057",
    "411157",
    "411058",
    "411059",
    "411060",
    "411061",
    "411557",
    "411082",
    "411997",
    "411050",
  ];

  return (
    <div className="form-floating mb-3">
      <select
        onChange={(e) => onChange(e.target.value)}
        className="ps-3 form-control rounded-5"
        id="zipcode"
      >
        <option value="">Select Zipcode</option>
        {zipcodes.map((zipcode) => (
          <option key={zipcode} value={zipcode}>
            {zipcode}
          </option>
        ))}
      </select>
      <label htmlFor="zipcode">Zipcode</label>
    </div>
  );
};

export default Zipcode;
