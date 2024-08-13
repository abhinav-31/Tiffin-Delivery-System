import "../login/loginModal.css";
import "./navbar.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginModal from "../login/loginModal";
import RegisterModal from "../register/registerModal";
import { Link, useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/userSlice"; // Import the logout action
import { toast } from "react-toastify";


function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Use dispatch to update the Redux state
  const cart = useSelector((state) => state.cart || { items: [] });
  const loginStatus = useSelector((state) => state.user.loginStatus);
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  const communicateModal = () => {
    setLoginModal(!loginModal); // Close login modal
    setRegisterModal(!registerModal); // Open register modal
  };
  const toggleLoginModal = () => {
    setLoginModal(!loginModal);
    setRegisterModal(false);
  };
  const toggleRegisterModal = () => {
    setRegisterModal(!registerModal);
    setLoginModal(false);
  };

  const handleLogout = () => {
    // Clear session storage
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("id");
    sessionStorage.setItem("loginStatus", false);
    // Update the Redux state to log out the user
    dispatch(logoutAction());

    // Navigate to the homepage or login page
    navigate("/");
  };
const handleCartClick = () => {
  if (!loginStatus) {
    toast.error("Please Sign In!");
  } else {
    navigate("/cart");
  }
};
  return (
    <div className="">
      <div
        className="navbar navbar-expand-md fixed-top navbar-dark bg-dark"
        style={{ color: "red" }}
      >
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            Tiffinity
          </Link>
          <button
            className="navbar-toggler rounded-5"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
            aria-controls="navbarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarCollapse">
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              <li className="nav-item nav-link active">
                Tiffin and beyond....
              </li>
            </ul>
            <div className="d-flex">
              <div>

                  <button
                    type="button"
                     onClick={handleCartClick}
                    className="btn btn-secondary position-relative rounded-5 me-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fillRule="currentColor"
                      className="bi bi-cart"
                      viewBox="0 0 16 16"
                    >
                      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"></path>
                    </svg>
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cart.items.length}
                    </span>
                  </button>
               
                <div className="btn-group">
                  <button
                    type="button"
                    className="btn btn-secondary rounded-start-pill"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fillRule="currentColor"
                      className="bi bi-person-circle"
                      viewBox="0 0 16 16"
                    >
                      <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
                      <path
                        fillRule="evenodd"
                        d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                      ></path>
                    </svg>
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary dropdown-toggle rounded-end-pill"
                    data-bs-toggle="dropdown"
                    data-bs-display="static"
                    aria-expanded="false"
                  ></button>
                  <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-end">
                    {!loginStatus ? (
                      <>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={toggleLoginModal}
                          >
                            Login
                          </button>
                        </li>
                        <li>
                          <button
                            className="dropdown-item"
                            onClick={toggleRegisterModal}
                          >
                            Sign up
                          </button>
                        </li>
                      </>
                    ) : (
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={handleLogout} // Handle logout on click
                        >
                          Logout
                        </button>
                      </li>
                    )}
                    <li>
                      <Link className="dropdown-item" to="/about-us">
                        About us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        {loginModal && (
          <LoginModal
            onClose={toggleLoginModal}
            onToggleRegister={communicateModal}
          />
        )}
      </div>
      <div>
        {registerModal && (
          <RegisterModal
            onClose={toggleRegisterModal}
            onToggleLogin={communicateModal}
          />
        )}
      </div>
      
    </div>
  );
}

export default NavBar;
