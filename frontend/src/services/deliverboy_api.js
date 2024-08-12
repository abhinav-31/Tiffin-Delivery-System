import axios from 'axios';

// Create an axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: 'http://localhost:7073', // Update this to match your backend URL
});


// Fetch placed orders history
export const fetchPlacedOrdersHistory = async (deliveryboyId) => {
    try {
      const response = await axiosInstance.get(`/orders/${deliveryboyId}?status=PLACED`);
      return response.data;
    } catch (error) {
      console.error('Error fetching placed orders history:', error);
      throw error;
    }
  };
  
  // Fetch delivered orders history
  export const fetchDeliveredOrdersHistory = async (deliveryboyId) => {
    try {
      const response = await axiosInstance.get(`/orders/${deliveryboyId}?status=DELIVERED`);
      return response.data;
    } catch (error) {
      console.error('Error fetching delivered orders history:', error);
      throw error;
    }
  };