import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import './AddBreakfastMenu.css'; 

const AddBreakfastMenu = () => {
  const initialMenuState = {
    eggs: "",
    pancakes: "",
    fruit: "",
    coffee: "",
    juice: "",
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

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let formErrors = {};
    const textFields = ["pancakes", "fruit", "coffee", "juice"];
    const textRegex = /^[A-Za-z\s]+$/;

    if (!menu.eggs) {
      formErrors.eggs = "Please select the number of eggs.";
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
    console.log("Breakfast menu submitted:", menu);
    setMessage("Breakfast menu added successfully!");
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
    <div className="container container-add-breakfast">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card card-add-breakfast shadow">
            <div className="card-header card-header-add-breakfast text-center">
              <h1>Add Breakfast Menu</h1>
            </div>
            <div className="card-body">
              {showSuccessMessage && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {message}
                  <button type="button" className="btn-close" aria-label="Close" onClick={() => setShowSuccessMessage(false)}></button>
                </div>
              )}
              <form onSubmit={handleSubmit}>
                <div className="form-group form-group-add-breakfast row mb-3">
                  <label htmlFor="eggs" className="col-sm-3 col-form-label">
                    Eggs
                  </label>
                  <div className="col-sm-9">
                    <select
                      className={`form-control ${errors.eggs ? 'is-invalid' : ''}`}
                      id="eggs"
                      name="eggs"
                      value={menu.eggs}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select number of eggs</option>
                      {[...Array(10)].map((_, index) => (
                        <option key={index} value={index + 1}>
                          {index + 1}
                        </option>
                      ))}
                    </select>
                    {errors.eggs && <div className="invalid-feedback">{errors.eggs}</div>}
                  </div>
                </div>
                <div className="form-group form-group-add-breakfast row mb-3">
                  <label htmlFor="pancakes" className="col-sm-3 col-form-label">
                    Pancakes
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className={`form-control ${errors.pancakes ? 'is-invalid' : ''}`}
                      id="pancakes"
                      name="pancakes"
                      value={menu.pancakes}
                      onChange={handleChange}
                      required
                    />
                    {errors.pancakes && <div className="invalid-feedback">{errors.pancakes}</div>}
                  </div>
                </div>
                <div className="form-group form-group-add-breakfast row mb-3">
                  <label htmlFor="fruit" className="col-sm-3 col-form-label">
                    Fruit
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className={`form-control ${errors.fruit ? 'is-invalid' : ''}`}
                      id="fruit"
                      name="fruit"
                      value={menu.fruit}
                      onChange={handleChange}
                      required
                    />
                    {errors.fruit && <div className="invalid-feedback">{errors.fruit}</div>}
                  </div>
                </div>
                <div className="form-group form-group-add-breakfast row mb-3">
                  <label htmlFor="coffee" className="col-sm-3 col-form-label">
                    Coffee
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className={`form-control ${errors.coffee ? 'is-invalid' : ''}`}
                      id="coffee"
                      name="coffee"
                      value={menu.coffee}
                      onChange={handleChange}
                      required
                    />
                    {errors.coffee && <div className="invalid-feedback">{errors.coffee}</div>}
                  </div>
                </div>
                <div className="form-group form-group-add-breakfast row mb-3">
                  <label htmlFor="juice" className="col-sm-3 col-form-label">
                    Juice
                  </label>
                  <div className="col-sm-9">
                    <input
                      type="text"
                      className={`form-control ${errors.juice ? 'is-invalid' : ''}`}
                      id="juice"
                      name="juice"
                      value={menu.juice}
                      onChange={handleChange}
                      required
                    />
                    {errors.juice && <div className="invalid-feedback">{errors.juice}</div>}
                  </div>
                </div>
                <div className="form-group form-group-add-breakfast row justify-content-center mb-3">
                  <div className="col-sm-5 mb-2 mb-sm-0">
                    <button type="submit" className="btn btn-primary btn-primary-add-breakfast">
                      Add
                    </button>
                  </div>
                  <div className="col-sm-5">
                    <button
                      type="button"
                      className="btn btn-secondary btn-secondary-add-breakfast"
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

export default AddBreakfastMenu;