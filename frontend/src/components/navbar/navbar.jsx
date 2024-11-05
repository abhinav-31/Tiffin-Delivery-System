// import "../login/loginModal.css";
// import "./navbar.css";
// import { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import LoginModal from "../login/loginModal";
// import RegisterModal from "../register/registerModal";
// import { useNavigate } from "react-router-dom"; // Removed Link import
// import { logoutAction } from "../../redux/userSlice";
// import { toast } from "react-toastify";

// function NavBar() {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const cart = useSelector((state) => state.cart || { items: [] });
//   const loginStatus = useSelector((state) => state.user.loginStatus);
//   const [loginModal, setLoginModal] = useState(false);
//   const [registerModal, setRegisterModal] = useState(false);

//   const role = sessionStorage.getItem("role");

//   const communicateModal = () => {
//     setLoginModal(!loginModal);
//     setRegisterModal(!registerModal);
//   };

//   const toggleLoginModal = () => {
//     setLoginModal(!loginModal);
//     setRegisterModal(false);
//   };

//   const toggleRegisterModal = () => {
//     setRegisterModal(!registerModal);
//     setLoginModal(false);
//   };

//   const handleLogout = () => {
//     sessionStorage.removeItem("token");
//     sessionStorage.removeItem("email");
//     sessionStorage.removeItem("role");
//     sessionStorage.removeItem("id");
//     sessionStorage.removeItem("name");
//     sessionStorage.setItem("loginStatus", false);
//     dispatch(logoutAction());
//     navigate("/");
//   };

//   const handleCartClick = () => {
//     if (!loginStatus && role !== "ROLE_CUSTOMER") {
//       toast.error("Please Sign In As a Customer!");
//     } else {
//       navigate("/cart");
//     }
//   };

//   const handleProfileClick = () => {
//     // const profileLink = getProfileLink();
//     // navigate(profileLink);
//     if (!loginStatus) {
//       toast.error("Please Sign to View Profile!");
//     } else {
//       if (role === "ROLE_ADMIN") {
//         navigate("/adminhome");
//       } else if (role === "ROLE_VENDOR") {
//         navigate("/vendorhomepage");
//       } else if (role === "ROLE_DELIVERY_BOY") {
//         navigate("/deliveryhome");
//       } else {
//         navigate("/ProfilePage");
//       }
//     }
//   };

//   // const getProfileLink = () => {
//   //   switch (role) {
//   //     case "ROLE_ADMIN":
//   //       return "/adminhome";
//   //     case "ROLE_VENDOR":
//   //       return "/vendorhomepage";
//   //     case "ROLE_DELIVERY_BOY":
//   //       return "/deliveryhome";
//   //     default:
//   //       return "/ProfilePage";
//   //   }
//   // };

//   const handleAboutUsClick = () => {
//     navigate("/about-us");
//   };

//   return (
//     <div>
//       <div
//         className="navbar navbar-expand-md fixed-top navbar-dark bg-dark"
//         style={{ color: "red" }}
//       >
//         <div className="container-fluid">
//           <button
//             className="navbar-brand btn btn-link"
//             onClick={() => navigate("/")}
//             style={{ color: "tomato", textDecoration: "none" }}
//           >
//             Tiffinity
//           </button>
//           <button
//             className="navbar-toggler rounded-5"
//             type="button"
//             data-bs-toggle="collapse"
//             data-bs-target="#navbarCollapse"
//             aria-controls="navbarCollapse"
//             aria-expanded="false"
//             aria-label="Toggle navigation"
//           >
//             <span className="navbar-toggler-icon"></span>
//           </button>
//           <div className="collapse navbar-collapse" id="navbarCollapse">
//             <ul className="navbar-nav me-auto mb-2 mb-md-0">
//               <li className="nav-item nav-link active">
//                 Tiffin and beyond....
//               </li>
//             </ul>
//             <div className="d-flex">
//               <button
//                 type="button"
//                 onClick={handleCartClick}
//                 className="btn btn-secondary position-relative rounded-5 me-3"
//               >
//                 <svg
//                   xmlns="http://www.w3.org/2000/svg"
//                   width="16"
//                   height="16"
//                   fillRule="currentColor"
//                   className="bi bi-cart"
//                   viewBox="0 0 16 16"
//                 >
//                   <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2"></path>
//                 </svg>
//                 <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
//                   {cart.items.length}
//                 </span>
//               </button>

//               <div className="btn-group">
//                 <button
//                   type="button"
//                   onClick={handleProfileClick}
//                   className="btn btn-secondary rounded-start-pill"
//                 >
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="16"
//                     height="16"
//                     fillRule="currentColor"
//                     className="bi bi-person-circle"
//                     viewBox="0 0 16 16"
//                   >
//                     <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"></path>
//                     <path
//                       fillRule="evenodd"
//                       d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
//                     ></path>
//                   </svg>
//                 </button>
//                 <button
//                   type="button"
//                   className="btn btn-secondary dropdown-toggle rounded-end-pill"
//                   data-bs-toggle="dropdown"
//                   data-bs-display="static"
//                   aria-expanded="false"
//                 ></button>
//                 <ul className="dropdown-menu dropdown-menu-end dropdown-menu-lg-end">
//                   {!loginStatus ? (
//                     <>
//                       <li>
//                         <button
//                           className="dropdown-item"
//                           onClick={toggleLoginModal}
//                         >
//                           Login
//                         </button>
//                       </li>
//                       <li>
//                         <button
//                           className="dropdown-item"
//                           onClick={toggleRegisterModal}
//                         >
//                           Sign up
//                         </button>
//                       </li>
//                     </>
//                   ) : (
//                     <li>
//                       <button className="dropdown-item" onClick={handleLogout}>
//                         Logout
//                       </button>
//                     </li>
//                   )}
//                   <li>
//                     <button
//                       className="dropdown-item"
//                       onClick={handleAboutUsClick}
//                     >
//                       About us
//                     </button>
//                   </li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div>
//         {loginModal && (
//           <LoginModal
//             onClose={toggleLoginModal}
//             onToggleRegister={communicateModal}
//           />
//         )}
//       </div>
//       <div>
//         {registerModal && (
//           <RegisterModal
//             onClose={toggleRegisterModal}
//             onToggleLogin={communicateModal}
//           />
//         )}
//       </div>
//     </div>
//   );
// }

// export default NavBar;
import "../login/loginModal.css";
import "./navbar.css";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import LoginModal from "../login/loginModal";
import RegisterModal from "../register/registerModal";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../redux/userSlice";
import { toast } from "react-toastify";

function NavBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.items || {});
  const loginStatus = useSelector((state) => state.user.loginStatus);
  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);
  console.log("Cart:_ ", cart);
  const role = sessionStorage.getItem("role");

  const communicateModal = () => {
    setLoginModal(!loginModal);
    setRegisterModal(!registerModal);
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
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("email");
    sessionStorage.removeItem("role");
    sessionStorage.removeItem("id");
    sessionStorage.removeItem("name");
    sessionStorage.setItem("loginStatus", false);
    dispatch(logoutAction());
    navigate("/");
  };

  const handleCartClick = () => {
    if (!loginStatus && role !== "ROLE_CUSTOMER") {
      toast.error("Please Sign In As a Customer!");
    } else {
      navigate("/cart");
    }
  };

  const handleProfileClick = () => {
    if (!loginStatus) {
      toast.error("Please Sign In to View Profile!");
    } else {
      switch (role) {
        case "ROLE_ADMIN":
          navigate("/adminhome");
          break;
        case "ROLE_VENDOR":
          navigate("/vendorhomepage");
          break;
        case "ROLE_DELIVERY_BOY":
          navigate("/deliveryhome");
          break;
        default:
          navigate("/ProfilePage");
      }
    }
  };

  const handleAboutUsClick = () => {
    navigate("/about-us");
  };
  const totalQuantity = Object.values(cart)
    .flatMap((vendorItems) => Object.values(vendorItems))
    .reduce((acc, item) => acc + (item.quantity || 0), 0);
  return (
    <div>
      <div className="navbar navbar-expand-md fixed-top navbar-dark bg-dark">
        <div className="container-fluid">
          <button
            className="navbar-brand btn btn-link"
            onClick={() => navigate("/")}
            style={{ color: "tomato", textDecoration: "none" }}
          >
            Tiffinity
          </button>
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
                  {totalQuantity}
                </span>
              </button>

              <div className="btn-group">
                <button
                  type="button"
                  onClick={handleProfileClick}
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
                      <button className="dropdown-item" onClick={handleLogout}>
                        Logout
                      </button>
                    </li>
                  )}
                  <li>
                    <button
                      className="dropdown-item"
                      onClick={handleAboutUsClick}
                    >
                      About us
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loginModal && (
        <LoginModal
          onClose={toggleLoginModal}
          onToggleRegister={communicateModal}
        />
      )}
      {registerModal && (
        <RegisterModal
          onClose={toggleRegisterModal}
          onToggleLogin={communicateModal}
        />
      )}
    </div>
  );
}

export default NavBar;
