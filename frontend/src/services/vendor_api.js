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



import axios from 'axios';
import { toast } from 'react-toastify';
import {jwt_decode} from 'jwt-decode';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:7073',
});

const getVendorIdFromToken = () => {
  const token = sessionStorage.getItem('token');
  if (!token) return null;

  try {
    const decodedToken = jwt_decode(token);
    return decodedToken.vendorId; // Ensure vendorId is present in the token payload
  } catch (error) {
    console.error('Error decoding token:', error);
    toast.error('Failed to decode token. Please log in again.');
    return null;
  }
};

// Fetch orders
export const fetchOrders = async () => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axiosInstance.get('/menus', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    toast.error('Failed to fetch orders. Please try again later.');
    throw error;
  }
};

// Add menu
export const addMenu = async (formData) => {
  try {
    const token = sessionStorage.getItem('token');
    const vendorId = getVendorIdFromToken();
    if (!vendorId) throw new Error('Vendor ID not found in token.');

    const response = await axiosInstance.post(`/menus/addMenu/${vendorId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error adding menu:', error);
    toast.error('Failed to add menu. Please try again later.');
    throw error;
  }
};

// Fetch placed orders history
export const fetchPlacedOrdersHistory = async () => {
  try {
    const token = sessionStorage.getItem('token');
    const vendorId = getVendorIdFromToken();
    if (!vendorId) throw new Error('Vendor ID not found in token.');

    const response = await axiosInstance.get(`/orders/${vendorId}?status=PLACED`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching placed orders history:', error);
    toast.error('Failed to fetch placed orders history. Please try again later.');
    throw error;
  }
};

// Fetch delivered orders history
export const fetchDeliveredOrdersHistory = async () => {
  try {
    const token = sessionStorage.getItem('token');
    const vendorId = getVendorIdFromToken();
    if (!vendorId) throw new Error('Vendor ID not found in token.');

    const response = await axiosInstance.get(`/orders/${vendorId}?status=DELIVERED`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching delivered orders history:', error);
    toast.error('Failed to fetch delivered orders history. Please try again later.');
    throw error;
  }
};

// Fetch customer reviews
export const fetchCustomerReviews = async () => {
  try {
    const token = sessionStorage.getItem('token');
    const response = await axiosInstance.get('/api/review/list', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching customer reviews:', error);
    toast.error('Failed to fetch customer reviews. Please try again later.');
    throw error;
  }
};
