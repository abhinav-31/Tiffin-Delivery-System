import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddMenu.css'; // Import your CSS file

const AddMenu = () => {
  const initialMenuState = {
    chapati: "",
    rice: "",
    dal: "",
    subji: "",
    sweet: "",
  };

  const [menu, setMenu] = useState(initialMenuState);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [messageTimeout, setMessageTimeout] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMenu({
      ...menu,
      [name]: value,
    });

    // Clear the specific field error
    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let formErrors = {};
    const textFields = ["rice", "dal", "subji", "sweet"];
    const textRegex = /^[A-Za-z\s]+$/;

    if (!menu.chapati) {
      formErrors.chapati = "Please select the number of chapatis.";
    }

    textFields.forEach(field => {
      if (!menu[field]) {
        formErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} field is required.`;
      } else if (!textRegex.test(menu[field])) {
        formErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} must contain only letters.`;
      }
    });

    return formErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    console.log("Menu submitted:", menu);
    setMessage("Menu added successfully!");
    setShowSuccessMessage(true);

    // Clear input fields after success message shown
    setMenu(initialMenuState);

    // Hide success message after 3 seconds
    clearTimeout(messageTimeout);
    setMessageTimeout(setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000));
  };

  const handleCancel = () => {
    setMenu(initialMenuState);
    setErrors({});
    setMessage("Form has been reset.");
    setShowSuccessMessage(false);
    clearTimeout(messageTimeout);
  };

  return (
    <div className="container container-add-menu">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card card-add-menu shadow">
            <div className="card-header card-header-add-menu text-center">
              <h1>Add Menu</h1>
            </div>
            <div className="card-body">
              {showSuccessMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {message}
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowSuccessMessage(false)}></button>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group form-group-add-menu row mb-3">
                  <label htmlFor="chapati" className="col-sm-3 col-form-label">
                    Chapati
                  </label>
                  <div className="col-sm-9">
                    <select
                      className={`form-control ${errors.chapati ? 'is-invalid' : ''}`}
                      id="chapati"
                      name="chapati"
                      value={menu.chapati}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select number of chapatis</option>
                      {[...Array(20)].map((_, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                    {errors.chapati && <div className="invalid-feedback">{errors.chapati}</div>}
                  </div>
                </div>
                <div className="form-group form-group-add-menu row mb-3">
                  <label htmlFor="rice" className="col-sm-3 col-form-label">
                    Rice
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className={`form-control ${errors.rice ? 'is-invalid' : ''}`}
                      id="rice"
                      name="rice"
                      value={menu.rice}
                      onChange={handleChange}
                      required
                    />
                    {errors.rice && <div className="invalid-feedback">{errors.rice}</div>}
                  </div>
                </div>
                <div className="form-group form-group-add-menu row mb-3">
                  <label htmlFor="dal" className="col-sm-3 col-form-label">
                    Dal
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className={`form-control ${errors.dal ? 'is-invalid' : ''}`}
                      id="dal"
                      name="dal"
                      value={menu.dal}
                      onChange={handleChange}
                      required
                    />
                    {errors.dal && <div className="invalid-feedback">{errors.dal}</div>}
                  </div>
                </div>
                <div className="form-group form-group-add-menu row mb-3">
                  <label htmlFor="subji" className="col-sm-3 col-form-label">
                    Subji
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className={`form-control ${errors.subji ? 'is-invalid' : ''}`}
                      id="subji"
                      name="subji"
                      value={menu.subji}
                      onChange={handleChange}
                      required
                    />
                    {errors.subji && <div className="invalid-feedback">{errors.subji}</div>}
                  </div>
                </div>
                <div className="form-group form-group-add-menu row mb-3">
                  <label htmlFor="sweet" className="col-sm-3 col-form-label">
                    Sweet
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className={`form-control ${errors.sweet ? 'is-invalid' : ''}`}
                      id="sweet"
                      name="sweet"
                      value={menu.sweet}
                      onChange={handleChange}
                      required
                    />
                    {errors.sweet && <div className="invalid-feedback">{errors.sweet}</div>}
                  </div>
                </div>
                <div className="form-group form-group-add-menu row justify-content-center mb-3">
                  <div className="col-sm-5 mb-2 mb-sm-0">
                    <button type="submit" className="btn btn-primary btn-primary-add-menu">
                      Add
                    </button>
                  </div>
                  <div className="col-sm-5">
                    <button
                      type="button"
                      className="btn btn-secondary btn-secondary-add-menu"
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddMenu;
