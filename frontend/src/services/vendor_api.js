import axios from "axios";
import { toast } from "react-toastify";
import config from "../config";

const axiosInstance = axios.create({
  baseURL: config.url,
});
const getToken = () => {
  return sessionStorage.getItem("token");
};
export const getVendorIdFromSessionStorage = () => {
  const vendorId = sessionStorage.getItem("id");
  if (!vendorId) {
    toast.error("Vendor ID not found. Please log in again.");
    return null;
  }
  return vendorId;
};

axiosInstance.interceptors.request.use((config) => {
  const vendorId = getVendorIdFromSessionStorage();
  if (vendorId) {
    config.headers["Vendor-ID"] = vendorId; // Include vendor ID in the request headers if needed
  }
  return config;
});

// Fetch orders
export const fetchMenus = async (vendorId) => {
  try {
    // const token = sessionStorage.getItem("token");
    const response = await axiosInstance.get(`/menus/vendor/${vendorId}`, {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching orders:", error);
    toast.error("Failed to fetch orders. Please try again later.");
    throw error;
  }
};



// Add menu
export const addMenu = async (vendorId, formData) => {
  try {
    console.log(formData);
    const response = await axiosInstance.post(
      `/menus/addMenu/${vendorId}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error adding menu:", error);
    toast.error("Failed to add menu. Please try again later.");
    throw error;
  }
};

// Fetch placed orders history
export const fetchPlacedOrdersHistory = async (vendorId) => {
  try {
    const response = await axiosInstance.get(
      `/orders/${vendorId}?status=PLACED`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching placed orders history:", error);
    toast.error(
      "Failed to fetch placed orders history. Please try again later."
    );
    throw error;
  }
};

// Fetch delivered orders history
export const fetchDeliveredOrdersHistory = async (vendorId) => {
  try {
    if (!vendorId) throw new Error("Vendor ID not found in token.");

    const response = await axiosInstance.get(
      `/orders/${vendorId}?status=DELIVERED`,
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching delivered orders history:", error);
    toast.error(
      "Failed to fetch delivered orders history. Please try again later."
    );
    throw error;
  }
};

export const deleteMenu = async ({ id }) => {
  try {
    const response = await axiosInstance.post(
      `/menus`,
      { id },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error deleting menu:", error);
    toast.error("Failed to delete menu. Please try again later.");
    throw error;
  }
};
export const updateMenu = async ({ id, price, quantity }) => {
  try {
    const response = await axiosInstance.post(
      `/menus/updateQuantity`, // Assuming your endpoint follows this pattern
      { id, price, quantity },
      {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error updating menu:", error);
    toast.error("Failed to update menu. Please try again later.");
    throw error;
  }
};

// Fetch customer reviews
// export const fetchCustomerReviews = async () => {
//   try {
//     const response = await axiosInstance.get('/api/review/list'); // Adjust endpoint as needed
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching customer reviews:', error);
//     throw error;
//   }
// };
