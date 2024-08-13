import axios from "axios";
import config from "../config";

export async function register(firstName, lastName, email, password, role) {
  // body parameters
  const body = {
    firstName,
    lastName,
    email,
    password,
    role,
  };

  // make API call
  const response = await axios.post(`${config.url}/users/signup`, body);

  // read JSON data (response)
  return response.data;
}
export async function registerDeliveryBoy(data) {
  try {
    const response = await axios.post(
      `${config.url}/users/deliveryBoySignup`,
      data
    );
    return response.data;
  } catch (error) {
    console.error("Error registering delivery boy:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}
export async function registerVendor(data) {
  try {
    const formData = new FormData();

    // Append JSON data as strings
    formData.append("userSignup", JSON.stringify(data.userSignUpReqDTO));
    formData.append("address", JSON.stringify(data.addressReqDTO));

    // Append the image file if provided
    if (data.imageFile) {
      formData.append("image", data.imageFile);
    }

    const response = await axios.post(
      `${config.url}/users/vendorSignup`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error registering vendor:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
}

export async function login(email, password) {
  // body parameters
  const body = {
    email,
    password,
  };

  // make API call
  const response = await axios.post(`${config.url}/users/signin`, body);
  // read JSON data (response)
  return response.data;
}
