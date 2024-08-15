// src/services/OrderService.js

import axios from 'axios';
import { createError, createUrl } from './Utils';

// Function to place an order
export const placeOrder = async (customerId, vendorId, token, orderRequest) => {
    try {
        const BASE_URL = createUrl('orders');
        const response = await axios.post(
            `${BASE_URL}/${customerId}/${vendorId}`,
            orderRequest,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                },
            }
        );
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Failed to place the order.');
    }
};

export const addReview = async(orderId, reviewData) =>{
    try{
        
        const BASE_URL = createUrl('orders');
        const token = sessionStorage.getItem("token");
        const response = await axios.post(
            `${BASE_URL}/addReview/${orderId}`,
            reviewData,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                },
            }
        );
        return response.data;
    }catch(error){

    }
}
