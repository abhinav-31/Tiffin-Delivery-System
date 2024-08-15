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

export const fetchOrdersHistory = async () => {
  const token = sessionStorage.getItem('token');
  console.log(token)
  if (!token) {
    throw new Error('Missing token');
  }
  try {
    const response = await axios.get(`${config.url}/orders/customerOrderHistory`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    })
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
export const fetchAddresses = async () => {
  const token = sessionStorage.getItem('token'); // Get the token from session storage
  console.log("token:- " + token)
  if (!token) {
    throw new Error('No token found');
  }

  try {
    const response = await axios.get(`${config.url}/users/getCustomerAddresses`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });
    console.log(response);
    // Handle non-201 responses
    if (response.status !== 201) {
      throw new Error('Failed to fetch addresses');
    }

    return response.data;
  } catch (error) {
    // Handle errors thrown by axios
    console.error('Error fetching addresses:', error.message);
    throw error;
  }
};

export const registerCustomerAddress = async (addressData, token) => {
  try {
    console.log("Token:- " + token)
    const response = await axios.post(
      `${config.url}/users/addCustomerAddresses`,
      addressData,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      }
    );
    return response.data; // Assuming the response data contains a 'message' field
  } catch (error) {
    console.error('Error adding customer address:', error);
    throw error; // Re-throw error to be handled in the component
  }
};





export async function login(email, password) {
  const body = {
    email,
    password,
  };

  try {
    const response = await axios.post(`${config.url}/users/signin`, body);
    console.log(response.data);
    return response.data;
  } catch (error) {
    handleError(error, 'Error during login');
  }
}

// General error handling function
function handleError(error, defaultMessage) {
  if (!error.response) {
    // Network error
    console.error('Network error:', error.message);
    throw new Error('Network error: Please check your internet connection.');
  } else if (error.response.status === 401) {
    // Unauthorized error
    console.error('Unauthorized: Incorrect email or password.');
    throw new Error('Unauthorized: Incorrect email or password.');
  } else {
    // Other API errors
    console.error(`${defaultMessage}:`, error.response.status, error.response.data);
    throw new Error(error.response.data.message || defaultMessage);
  }
}


// Function to update the profile
export const updateProfile = async (name, email, token) => {
  try {
    const response = await axios.put(
      `${config.url}/users/updateProfile`, // Endpoint for updating the profile
      {
        name,
        email,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`, // Adding token to the Authorization header
        },
      }
    );
    return response.data; // Return the response data
  } catch (error) {
    // Handle the error by throwing it to be caught in the component
    throw error.response?.data || "An error occurred while updating the profile.";
  }
};

