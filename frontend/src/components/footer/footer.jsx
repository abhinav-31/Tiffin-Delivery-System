import React from "react";
import "./css/style.css";

function Footer() {
  return (
    <div>
      <div className="footer-14398 fw-bold">
        <div className="container">
          <div className="row mb-5">
            <div className="col-md-3">
              <a href="#" className="footer-site-logo">
                Tiffinity
              </a>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit
                officiis corporis optio natus.{" "}
              </p>
            </div>
            <div className="col-md-2 ml-auto">
              <h3>Shop</h3>
              <ul className="list-unstyled links">
                <li>
                  <a href="#">Sell online</a>
                </li>
                <li>
                  <a href="#">Features</a>
                </li>
              </ul>
            </div>
            <div className="col-md-2 ml-auto">
              <h3>Press</h3>
              <ul className="list-unstyled links">
                <li>
                  <a href="#">Events</a>
                </li>
                <li>
                  <a href="#">News</a>
                </li>
              </ul>
            </div>
            <div className="col-md-2 ml-auto">
              <h3>About</h3>
              <ul className="list-unstyled links">
                <li>
                  <a href="#">Contact</a>
                </li>
                <li>
                  <a href="#">Services</a>
                </li>
              </ul>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-12 pb-4">
              <div className="line"></div>
            </div>
            <div className="col-md-6 text-md-left">
              {/* <ul className="list-unstyled link-menu nav-left">
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms &amp; Conditions</a>
                </li>
                <li>
                  <a href="#">Code of Conduct</a>
                </li>
              </ul> */}
            </div>
            <div className="col-md-6 text-md-right">
              <ul className="list-unstyled social nav-right">
                <li>
                  <a href="#">
                    <span className="icon-twitter"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon-instagram"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon-facebook"></span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <span className="icon-pinterest"></span>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="row">
            <div className="col-md-7">
              <p>
                <small>©Tiffinity2024</small>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
