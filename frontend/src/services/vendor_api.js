import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:8080',
});

// Fetch orders
export const fetchOrders = async () => {
  try {
    const response = await axiosInstance.get('/menus');
    return response.data;
  } catch (error) {
    console.error('Error fetching orders:', error);
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
export const addMenu = async (vendorId, formData) => {
  try {
    const response = await axiosInstance.post(`/menus/addMenu/${vendorId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
  });
    return response.data;
  } catch (error) {
    console.error('Error adding menu:', error);
    throw error;
  }
};

// Fetch placed orders history
export const fetchPlacedOrdersHistory = async (vendorId) => {
  try {
    
    const response = await axiosInstance.get(`/orders/${vendorId}?status=PLACED`);
    return response.data;
  } catch (error) {
    console.error('Error fetching placed orders history:', error);
    throw error;
  }
};

// Fetch delivered orders history
export const fetchDeliveredOrdersHistory = async (vendorId) => {
  try {
    const response = await axiosInstance.get(`/orders/${vendorId}?status=DELIVERED`);
    return response.data;
  } catch (error) {
    console.error('Error fetching delivered orders history:', error);
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