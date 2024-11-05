// import { useState, useRef } from "react";
// import { login } from "../../services/user";
// import { toast } from "react-toastify";
// import { useDispatch } from "react-redux";
// import { loginAction } from "../../redux/userSlice";
// import { useNavigate } from "react-router-dom";

// function LoginModal({ onClose, onToggleRegister }) {
//   const dispatch = useDispatch();
//   const modalRef = useRef();
//   // create state members
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   // get the navigate object
//   const navigate = useNavigate();
//   const closeModal = (e) => {
//     if (modalRef.current === e.target) onClose();
//   };
//   const onLogin = async () => {
//     // client side validation
//     if (email.length === 0) {
//       toast.warning("enter email");
//     } else if (password.length === 0) {
//       toast.warning("enter password");
//     } else {
//       const result = await login(email, password);
//       if (result["message"] === "Successful Auth!") {
//         const { jwt, email, role, id } = result; // Extract role
//         sessionStorage.setItem("token", jwt);
//         sessionStorage.setItem("email", email);
//         sessionStorage.setItem("role", role);
//         sessionStorage.setItem("id", id); // Store role
//         sessionStorage.setItem("loginStatus", true);
//         dispatch(loginAction());
//         toast.success(`Welcome, ${email}!`); // Display role-based message

//         if (role === "ROLE_ADMIN") {
//           navigate("/adminhome"); // Navigate to admin-specific page
//         } else if (role === "ROLE_VENDOR") {
//           navigate("/vendorhomepage");
//         } else if (role === "ROLE_DELIVERY_BOY") {
//           navigate("/deliveryhome");
//         } else {
//           navigate("/"); // Default home page
//         }
//         onClose();
//       } else {
//         toast.error("invalid email or password");
//       }
//     }
//   };

//   return (
//     <div
//       ref={modalRef}
//       onClick={closeModal}
//       className="container-fluid modal-backdrop"
//     >
//       <div className="modal-content rounded-5 shadow">
//         <div className="modal-header p-5 pb-4 border-bottom-0">
//           <h1 className="fw-bold mb-0 fs-2">Sign in</h1>
//         </div>
//         <div className="modal-body p-5 pt-0">
//           <div className="form-floating mb-3">
//             <input
//               onChange={(e) => {
//                 setEmail(e.target.value);
//               }}
//               type="email"
//               className="ps-3 form-control rounded-5"
//               id="floatingInput"
//               placeholder="name@example.com"
//             />
//             <label htmlFor="floatingInput">Email address</label>
//           </div>
//           <div className="form-floating mb-3">
//             <input
//               onChange={(e) => {
//                 setPassword(e.target.value);
//               }}
//               type="password"
//               className="ps-3 form-control rounded-5"
//               id="floatingPassword"
//               placeholder="Password"
//             />
//             <label htmlFor="floatingPassword">Password</label>
//           </div>
//           <div>
//             Don't have an account yet?
//             <button className="btn btn-link" onClick={onToggleRegister}>
//               Register
//             </button>
//           </div>
//           <button onClick={onLogin} className="mt-2 rounded-5 btn btn-success">
//             Login
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
// export default LoginModal;
// LoginModal.js
import React, { useState, useRef } from "react";
import { login } from "../../services/user";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginAction } from "../../redux/userSlice";
import { setAddresses } from "../../redux/AddressSlice";
import { useNavigate } from "react-router-dom";
import { fetchAddresses } from "../../services/user";

function LoginModal({ onClose, onToggleRegister }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalRef = useRef();

  // State members
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const closeModal = (e) => {
    if (modalRef.current === e.target) onClose();
  };

  const onLogin = async () => {
    // Client-side validation
    if (email.length === 0) {
      toast.warning("Enter email");
    } else if (password.length === 0) {
      toast.warning("Enter password");
    } else {
      try {
        const result = await login(email, password);
        console.log(result);
        if (result.message === "Successful Auth!") {
          const { jwt, email, role, name, id } = result;
          sessionStorage.setItem("token", jwt);
          sessionStorage.setItem("email", email);
          sessionStorage.setItem("role", role);
          sessionStorage.setItem("name", name);
          sessionStorage.setItem("loginStatus", true);
          sessionStorage.setItem("id", id);
          console.log("name " + result.name);
          dispatch(loginAction());
          toast.success(`Welcome, ${name}!`);

          // Fetch addresses after successful login
          if (role === "ROLE_CUSTOMER") {
            try {
              const addresses = await fetchAddresses();
              console.log(addresses);
              if (addresses.length === 0) {
                toast.info("No addresses found. Please add your address.");
              } else {
                dispatch(setAddresses(addresses));
              }
            } catch (error) {
              toast.error("Failed to fetch addresses. Please try again.");
            }
          }

          // Navigate based on role
          if (role === "ROLE_ADMIN") {
            navigate("/adminhome");
          } else if (role === "ROLE_VENDOR") {
            navigate("/vendorhomepage");
          } else if (role === "ROLE_DELIVERY_BOY") {
            navigate("/deliveryhome");
          } else {
            // navigate('/'); // Default home page
          }
          onClose();
        } else {
          toast.error("Invalid email or password");
        }
      } catch (error) {
        toast.error("An error occurred while logging in. Please try again.");
      }
    }
  };

  return (
    <div
      ref={modalRef}
      onClick={closeModal}
      className="container-fluid modal-backdrop"
    >
      <div className="modal-content rounded-5 shadow">
        <div className="modal-header p-5 pb-4 border-bottom-0">
          <h1 className="fw-bold mb-0 fs-2">Sign in</h1>
        </div>
        <div className="modal-body p-5 pt-0">
          <div className="form-floating mb-3">
            <input
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              className="ps-3 form-control rounded-5"
              id="floatingInput"
              placeholder="name@example.com"
            />
            <label htmlFor="floatingInput">Email address</label>
          </div>
          <div className="form-floating mb-3">
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              className="ps-3 form-control rounded-5"
              id="floatingPassword"
              placeholder="Password"
            />
            <label htmlFor="floatingPassword">Password</label>
          </div>
          <div>
            Don't have an account yet?
            <button className="btn btn-link" onClick={onToggleRegister}>
              Register
            </button>
          </div>
          <button onClick={onLogin} className="mt-2 rounded-5 btn btn-success">
            Login
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginModal;
