// import axios from 'axios';

// const axiosInstance = axios.create({
//   baseURL: 'http://localhost:7073', // Update this to match your backend URL
// });

// export const fetchVendors = async () => {
//   try {
//     const response = await axiosInstance.get('/admin/vendors');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching vendors:', error);
//     throw error;
//   }
// };

// export const fetchDeliveryboys = async () => {
//   try {
//     const response = await axiosInstance.get('/admin/deliveryBoys');
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching deliveryboys:', error);
//     throw error;
//   }

// };

// export const fetchCustomers = async () =>
//   {
//     try{
//       const response = await axiosInstance.get('/admin/customers');
//       return response.data;
//     }
//     catch(error)
//     {
//       console.error('Error fetching customers:',error);
//       throw error;
//     }
//   }

import axios from 'axios';

// Create an axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:7073', // Update this to match your backend URL
});

// Admin Sign-In Function
export const adminSignIn = async (credentials) => {
  try {
    const response = await axiosInstance.post('/users/customerSignIn', credentials);
    const token = response.data.token; // Assuming the token is returned in the response data
    if (token) {
      localStorage.setItem('jwtToken', token); // Store the JWT token in localStorage
    }
    return response.data;
  } catch (error) {
    console.error('Error during sign-in:', error);
    throw error;
  }
};

// Fetch Vendors Function
export const fetchVendors = async () => {
  try {
    const token = localStorage.getItem('jwtToken'); // Retrieve the JWT token from localStorage
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
    const token = localStorage.getItem('jwtToken'); // Retrieve the JWT token from localStorage
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
    const token = localStorage.getItem('jwtToken'); // Retrieve the JWT token from localStorage
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
