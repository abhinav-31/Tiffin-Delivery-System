import axios from "axios";
import config from "../config";

// Create an axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: config.url, // Update this to match your backend URL
});

// Fetch placed orders history
export const fetchPlacedOrdersHistory = async (deliveryboyId) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axiosInstance.get(
      `/orders/deliveryBoy/${deliveryboyId}?status=PLACED`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the headers
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching placed orders history:", error);
    throw error; // Re-throw the error to be handled by the calling code
  }
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
  try {
    await axiosInstance.patch(
      `/orders/changeStatus/${orderId}?status=${status}`
    );
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

// Fetch delivered orders history
export const fetchDeliveredOrdersHistory = async (deliveryboyId) => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axiosInstance.get(
      `/orders/deliveryBoy/${deliveryboyId}?status=DELIVERED`,
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the headers
        },
      }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Error fetching delivered orders history:", error);
    throw error; // Re-throw the error to be handled by the calling code
  }
};
