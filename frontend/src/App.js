import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import LoginModal from "./components/login/loginModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/home";
import HomePage from "./pages/homepage";
import RegisterModal from "./components/register/registerModal";
import Cart from "./pages/cart";
import RegisterAsDB from "./components/register/registerAsDB";
import RegisterAsVendor from "./components/register/registerAsVendor";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage></HomePage>}></Route>
        <Route path="/login" element={<LoginModal></LoginModal>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route
          path="/register"
          element={<RegisterModal></RegisterModal>}
        ></Route>
        <Route path="/registerAsDB" element={<RegisterAsDB />}></Route>
        <Route path="/registerAsVendor" element={<RegisterAsVendor />}></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
      </Routes>

      <ToastContainer theme="colored" />
    </div>
  );
}

export default App;
