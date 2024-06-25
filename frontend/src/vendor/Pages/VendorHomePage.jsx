import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./VendorHomePage.css"; // Import your custom CSS for styling
import breakfastImage from "../images/breakfast.jpg"; // Importing breakfast image
import lunchImage from "../images/lunch.jpeg"; // Importing lunch image
import dinnerImage from "../images/dinner.jpg"; // Importing dinner image

const VendorHomePage = () => {
  const [breakfastOpen, setBreakfastOpen] = useState(false);
  const [lunchOpen, setLunchOpen] = useState(false);
  const [dinnerOpen, setDinnerOpen] = useState(false);

  const [showBreakfastMenu, setShowBreakfastMenu] = useState(false);
  const [showLunchMenu, setShowLunchMenu] = useState(false);
  const [showDinnerMenu, setShowDinnerMenu] = useState(false);

  const toggleBreakfast = () => {
    setBreakfastOpen(!breakfastOpen);
    setShowBreakfastMenu(!breakfastOpen);
  };

  const toggleLunch = () => {
    setLunchOpen(!lunchOpen);
    setShowLunchMenu(!lunchOpen);
  };

  const toggleDinner = () => {
    setDinnerOpen(!dinnerOpen);
    setShowDinnerMenu(!dinnerOpen);
  };

  return (
    <div className="container-fluid vendor-home">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <div className="card shadow">
            <div className="card-body">
              <h2 className="text-center mb-4">Vendor Home Page</h2>
              <div className="row">
                <div className="col-md-4 mb-4">
                  <div className="card vendor-section">
                    <img
                      src={breakfastImage}
                      className="card-img-top"
                      alt="Breakfast"
                    />
                    <div className="card-body">
                      <h4>Breakfast</h4>
                      <p>Status: {breakfastOpen ? "Open" : "Closed"}</p>
                      <button
                        className={`btn ${
                          breakfastOpen ? "btn-success" : "btn-danger"
                        }`}
                        onClick={toggleBreakfast}
                      >
                        {breakfastOpen ? "Close" : "Open"}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="card vendor-section">
                    <img
                      src={lunchImage}
                      className="card-img-top"
                      alt="Lunch"
                    />
                    <div className="card-body">
                      <h4>Lunch</h4>
                      <p>Status: {lunchOpen ? "Open" : "Closed"}</p>
                      <button
                        className={`btn ${
                          lunchOpen ? "btn-success" : "btn-danger"
                        }`}
                        onClick={toggleLunch}
                      >
                        {lunchOpen ? "Close" : "Open"}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-4">
                  <div className="card vendor-section">
                    <img
                      src={dinnerImage}
                      className="card-img-top"
                      alt="Dinner"
                    />
                    <div className="card-body">
                      <h4>Dinner</h4>
                      <p>Status: {dinnerOpen ? "Open" : "Closed"}</p>
                      <button
                        className={`btn ${
                          dinnerOpen ? "btn-success" : "btn-danger"
                        }`}
                        onClick={toggleDinner}
                      >
                        {dinnerOpen ? "Close" : "Open"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              {showBreakfastMenu && (
                <div className="menu-section">
                  <h3>Breakfast Menu</h3>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Pancakes</td>
                        <td>Fluffy pancakes served with syrup</td>
                      </tr>
                      <tr>
                        <td>Omelette</td>
                        <td>Cheese and vegetable omelette</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {showLunchMenu && (
                <div className="menu-section">
                  <h3>Lunch Menu</h3>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Grilled Chicken</td>
                        <td>Grilled chicken with vegetables</td>
                      </tr>
                      <tr>
                        <td>Pasta</td>
                        <td>Pasta in tomato sauce</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
              {showDinnerMenu && (
                <div className="menu-section">
                  <h3>Dinner Menu</h3>
                  <table className="table table-striped table-bordered">
                    <thead>
                      <tr>
                        <th>Item</th>
                        <th>Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Steak</td>
                        <td>Grilled steak with mashed potatoes</td>
                      </tr>
                      <tr>
                        <td>Salad</td>
                        <td>Fresh garden salad</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorHomePage;
