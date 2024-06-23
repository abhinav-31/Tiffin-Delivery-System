import { useNavigate } from "react-router-dom";
import "./homepage.css";
import NavBar from "../components/navbar/navbar";
import VendorsList from "../components/vendorsList";

function HomePage() {
  const navigate = useNavigate();
  return (
    <div className="">
      <NavBar />
      <div className="content">
        <div className="row">
          <div className="col-1"></div>
          <div className="col-10">
            <h1>welcome</h1>
            <VendorsList />
          </div>
          <div className="col-1"></div>
        </div>
      </div>
    </div>
  );
}
export default HomePage;
