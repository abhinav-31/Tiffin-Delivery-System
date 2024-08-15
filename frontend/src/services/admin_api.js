import axios from 'axios';
import config from '../config';

// Create an axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: config.url, // Update this to match your backend URL
});

// Fetch Vendors Function
export const fetchVendors = async () => {
  try {
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from sessionStorage
    const response = await axiosInstance.get('/admin/vendors', {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the headers
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching vendors:', error);
    throw error;
  }
};

// Fetch Delivery Boys Function
export const fetchDeliveryboys = async () => {
  try {
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from sessionStorage
    const response = await axiosInstance.get('/admin/deliveryBoys', {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the headers
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching delivery boys:', error);
    throw error;
  }
};

// Fetch Customers Function
export const fetchCustomers = async () => {
  try {
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from sessionStorage
    const response = await axiosInstance.get('/admin/customers', {
      headers: {
        Authorization: `Bearer ${token}`, // Include the JWT token in the headers
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching customers:', error);
    throw error;
  }
};

export const fetchOrderreviews = async () => {
  try {
    const token = sessionStorage.getItem('token'); // Retrieve the JWT token from sessionStorage
    const response = await axiosInstance.get('/admin/allReviews', {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`, // Include the JWT token in the headers
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching delivery boys:', error);
    throw error;
  }
};