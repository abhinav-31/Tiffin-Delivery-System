import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./homepage.css";
import NavBar from "../components/navbar/navbar";
import VendorsList from "../components/vendorsList";
import Footer from "../components/footer/footer";
import { fetchVendors } from "../services/VendorService";

function HomePage() {
  const [vendors, setVendors] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getVendors = async () => {
      const result = await fetchVendors();

      if (result.status === "error") {
        setError(result.error);
      } else {
        setVendors(result);
      }
    };

    getVendors();
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="homepage-container">
      {/* <NavBar /> */}

      <div className="content-container">
        <div className="container">
          <div className="row">
            <div className="col-md-1"></div>

            <div className="col-md-10">
              <div className="tiffin-container my-5">
                <div className="tiffin-image">
                  <img
                    src="/rider.png"
                    alt="Tiffin Delivery"
                    className="img-fluid"
                  />
                </div>
                <div className="tiffin-content mt-4">
                  <h2 className="content-heading">
                    Welcome to <span className="highlight">Tiffinity</span>
                  </h2>
                  <p className="content-text">
                    Discover a world of homemade goodness delivered right to
                    your doorstep. Our tiffin service brings you freshly
                    prepared meals daily, crafted with{" "}
                    <span className="italic">love</span> and the finest
                    ingredients. From comforting classics to adventurous
                    flavors, each tiffin is a culinary journey you don't want to
                    miss. Whether you're at home or the office, enjoy
                    hassle-free meals that are nutritious and delicious. Join
                    our community of food enthusiasts and experience the joy of
                    a well-prepared tiffin—because great food should be easy,
                    enjoyable, and always just a click away!
                  </p>
                </div>
              </div>

              <section className="services-section ">
                <div className="motov4_fancy_heading text-center border-bottom mb-5">
                  <h1>Our Services</h1>
                </div>

                <div className="row">
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="motov4_features_box text-center motov4_no_shadow">
                      <div className="motov4_icon_box motov4_featured_red">
                        <img
                          src="https://templatebundle.net/wp/moto/netw11/tiffin-service/wp-content/uploads/sites/21/revslider/indian-restaurant/Indian-Restaurant-bannermenu3.png"
                          alt="Home Delivery"
                          className="img-fluid"
                        />
                      </div>
                      <div className="motov4_feature_data mt-3">
                        <h3>Home Delivery</h3>
                        <p>
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="motov4_features_box text-center motov4_no_shadow">
                      <div className="motov4_icon_box motov4_featured_red">
                        <img
                          src="https://templatebundle.net/wp/moto/netw11/tiffin-service/wp-content/uploads/sites/21/revslider/indian-restaurant/Indian-Restaurant-bannermenu1.png"
                          alt="Fast Delivery"
                          className="img-fluid"
                        />
                      </div>
                      <div className="motov4_feature_data mt-3">
                        <h3>Fast Delivery</h3>
                        <p>
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat.
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="motov4_features_box text-center motov4_no_shadow">
                      <div className="motov4_icon_box motov4_featured_red">
                        <img
                          src="https://templatebundle.net/wp/moto/netw11/tiffin-service/wp-content/uploads/sites/21/revslider/indian-restaurant/Indian-Restaurant-bannermenu2.png"
                          alt="Hot Food"
                          className="img-fluid"
                        />
                      </div>
                      <div className="motov4_feature_data mt-3">
                        <h3>Hot Food</h3>
                        <p>
                          Ut enim ad minim veniam, quis nostrud exercitation
                          ullamco laboris nisi ut aliquip ex ea commodo
                          consequat.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <div className="tiffin-container my-5">
                <div className="tiffin-content mt-4">
                  <h2 className="content-heading">
                    with <span className="italic">love</span> for you
                  </h2>
                  <p className="content-text">
                    Explore restaurants that deliver near you. With a place for
                    every taste, it’s easy to find food you crave, Find great
                    meals fast with lots of local menus. Enjoy eating the
                    convenient way with places that deliver to your door.
                  </p>
                </div>
                <div className="tiffin-image">
                  <img src="/love.png" alt="Delivery" className="img-fluid" />
                </div>
              </div>
              <div>
                <div className="motov4_feature_data mt-5 highlight">
                  <h3>Order from your favourite vendors</h3>
                </div>
                <VendorsList vendors={vendors} />
              </div>
              <section className="services-section ">
                <div className="row">
                  <div className="col-lg-4 col-md-6 mb-4">
                    <div className="motov4_features_box text-center motov4_no_shadow">
                      <div className="motov4_icon_box motov4_featured_red">
                        <img
                          src="/banner.png"
                          alt="Hot Food"
                          className="img-fluid"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-8 col-md-6 mb-4 motov4_feature_data mt-3">
                    <h3>Become part of our team</h3>
                    <p>
                      Discover the joy of serving delicious meals. Whether
                      you're delivering smiles or crafting culinary delights, be
                      part of our team dedicated to quality and customer
                      satisfaction. Join us in spreading happiness, one meal at
                      a time!
                    </p>
                    <div className="d-flex justify-content-center mt-4">
                      <button
                        type="button"
                        className="btn  btn-m w-40 me-2 rounded-5"
                        style={{
                          backgroundColor: "#f56e6e",
                          borderColor: "#f56e6e",
                        }}
                      >
                        <Link
                          to="/registerAsVendor"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          Become a Vendor
                        </Link>
                      </button>
                      <button
                        type="button"
                        className="btn btn-m w-40 rounded-5"
                        style={{
                          backgroundColor: "#f56e6e",
                          borderColor: "#f56e6e",
                        }}
                      >
                        <Link
                          to="/registerAsDB"
                          style={{ textDecoration: "none", color: "inherit" }}
                        >
                          Become a deliveryBoy
                        </Link>
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            <div className="col-md-1"></div>
          </div>
        </div>
      </div>

      <footer className="mt-5">
        <Footer />
      </footer>
    </div>
  );
}

export default HomePage;
