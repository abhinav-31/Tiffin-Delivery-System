import React, { useState } from "react";
import "./AddMenu.css";
import { assets } from "./../../assets/assets";
import {
  addMenu,
  getVendorIdFromSessionStorage,
} from "../../../services/vendor_api"; // Adjust the path as needed
import { toast } from "react-toastify";

const AddMenu = () => {
  const [image, setImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "VEG_BREAKFAST",
    quantity: "",
  });

  const vendorId = getVendorIdFromSessionStorage();

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      toast.error("Image not selected");
      return;
    }

    if (data.description.length > 255) {
      toast.error("Description is too long (max 255 characters)");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("quantity", Number(data.quantity));
    formData.append("image", image);

    try {
      const response = await addMenu(vendorId, formData);
      console.log("Response data:", response); // Log the response data

      if (response) {
        toast.success("Menu added");
        // Reset form
        setData({
          name: "",
          description: "",
          price: "",
          category: "VEG_BREAKFAST",
          quantity: "",
        });
        setImage(null);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error(
        "Error submitting form:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        `An error occurred while submitting the form: ${
          error.response ? error.response.data.message : error.message
        }`
      );
    }
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={onSubmitHandler}>
        <div className="add-img-upload flex-col">
          <p>Upload image</p>
          <input
            onChange={(e) => {
              setImage(e.target.files[0]);
              e.target.value = "";
            }}
            type="file"
            accept="image/*"
            id="image"
            hidden
          />
          <label htmlFor="image">
            <img
              src={!image ? assets.upload_area : URL.createObjectURL(image)}
              alt="Upload Area"
            />
          </label>
        </div>
        <div className="add-product-name flex-col">
          <p>Product name</p>
          <input
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            type="text"
            placeholder="Type here"
            required
          />
        </div>
        <div className="add-product-description flex-col">
          <p>Product description</p>
          <textarea
            name="description"
            onChange={onChangeHandler}
            value={data.description}
            rows={6}
            placeholder="Write content here"
            required
          />
        </div>
        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Product category</p>
            <select
              name="category"
              onChange={onChangeHandler}
              value={data.category}
            >
              <option value="VEG_BREAKFAST">VEG_BREAKFAST</option>
              <option value="VEG_LUNCH">VEG_LUNCH</option>
              <option value="VEG_DINNER">VEG_DINNER</option>
              <option value="NON_VEG_BREAKFAST">NON_VEG_BREAKFAST</option>
              <option value="NON_VEG_LUNCH">NON_VEG_LUNCH</option>
              <option value="NON_VEG_DINNER">NON_VEG_DINNER</option>
            </select>
          </div>
          <div className="add-price flex-col">
            <p>Product Price</p>
            <input
              type="number"
              name="price"
              onChange={onChangeHandler}
              value={data.price}
              placeholder="25"
            />
          </div>
          <div className="add-quantity flex-col">
            <p>Product Quantity</p>
            <input
              type="number"
              name="quantity"
              onChange={onChangeHandler}
              value={data.quantity}
              placeholder="1"
              required
            />
          </div>
        </div>
        <button type="submit" className="add-btn">
          ADD
        </button>
      </form>
    </div>
  );
};

export default AddMenu;
