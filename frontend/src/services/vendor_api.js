// import axios from 'axios';
// import { toast } from 'react-toastify';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:8080',
//   // headers: {
//   //   'Content-Type': 'application/json',
//   // },
// });

// // Fetch orders
// export const fetchOrders = async () => {
//   try {
//     const token = sessionStorage.getItem('token');
//     const response = await axiosInstance.get('/menus', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching orders:', error);
//     toast.error('Failed to fetch orders. Please try again later.');
//     throw error;
//   }
// };

// // Add menu
// export const addMenu = async (vendorId, formData) => {
//   try {
//     const token = sessionStorage.getItem('token');
//     const response = await axiosInstance.post(`/menus/addMenu/${vendorId}`, formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error adding menu:', error);
//     toast.error('Failed to add menu. Please try again later.');
//     throw error;
//   }
// };

// // Fetch placed orders history
// export const fetchPlacedOrdersHistory = async (vendorId) => {
//   try {
//     const token = sessionStorage.getItem('token');
//     const response = await axiosInstance.get(`/orders/${vendorId}?status=PLACED`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching placed orders history:', error);
//     toast.error('Failed to fetch placed orders history. Please try again later.');
//     throw error;
//   }
// };

// // Fetch delivered orders history
// export const fetchDeliveredOrdersHistory = async (vendorId) => {
//   try {
//     const token = sessionStorage.getItem('token');
//     const response = await axiosInstance.get(`/orders/${vendorId}?status=DELIVERED`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching delivered orders history:', error);
//     toast.error('Failed to fetch delivered orders history. Please try again later.');
//     throw error;
//   }
// };

// // Fetch customer reviews
// export const fetchCustomerReviews = async () => {
//   try {
//     const token = sessionStorage.getItem('token');
//     const response = await axiosInstance.get('/api/review/list', {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching customer reviews:', error);
//     toast.error('Failed to fetch customer reviews. Please try again later.');
//     throw error;
//   }
// };

import axios from "axios";
import { toast } from "react-toastify";
import config from "../config";

const axiosInstance = axios.create({
  baseURL: config.url,
});

export const getVendorIdFromSessionStorage = () => {
  const vendorId = sessionStorage.getItem("id");
  if (!vendorId) {
    toast.error("Vendor ID not found. Please log in again.");
    return null;
  }
  return vendorId;
};

// Example usage of axiosInstance and getVendorIdFromSessionStorage
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
    const token = sessionStorage.getItem("token");
    const response = await axiosInstance.get(`/menus/vendor/${vendorId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
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

export const addCustomerReview = async (orderId, customerId, reviewData) => {
  try {
    const token = localStorage.getItem('token');
    const response = await axiosInstance.post(`/orders/addReview/${orderId}/${customerId}`, reviewData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding customer review:', error);
    throw error;
  }
};

// Fetch orders history
// export const fetchOrdersHistory = async (vendorId, status) => {
//   try {
//     const response = await axiosInstance.get(`/orders/${vendorId}?status=${status}`);
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching orders history:', error);
//     throw error;
//   }
// };

// Add menu
export const addMenu = async (formData) => {
  try {
    const response = await axiosInstance.post(`/menus/addMenu/${vendorId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
  });
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
    
    const response = await axiosInstance.get(`/orders/${vendorId}?status=PLACED`);
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
    const token = sessionStorage.getItem("token");
    if (!vendorId) throw new Error("Vendor ID not found in token.");

    const response = await axiosInstance.get(
      `/orders/${vendorId}?status=DELIVERED`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
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