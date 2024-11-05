import axios from "axios";
import config from "../config";

// Create an axios instance with a base URL
const axiosInstance = axios.create({
  baseURL: config.url, // Update this to match your backend URL
});

// Fetch placed orders history
export const fetchPlacedOrdersHistory = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axiosInstance.get(
      `/orders/deliveryBoy?status=PLACED`,
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
    console.log("order status changed")
    const token = sessionStorage.getItem("token");
    await axiosInstance.put(
      `/orders/changeStatus/${orderId}?status=${status}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // Include the JWT token in the headers
        },
      }
    );
  } catch (error) {
    console.error("Error updating order status:", error);
    throw error;
  }
};

// Fetch delivered orders history
export const fetchDeliveredOrdersHistory = async () => {
  try {
    const token = sessionStorage.getItem("token");
    const response = await axiosInstance.get(
      `/orders/deliveryBoy?status=DELIVERED`,
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
