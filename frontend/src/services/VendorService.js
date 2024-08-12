import axios from 'axios';
import { createError, createUrl } from './Utils';

const BASE_URL = createUrl('home');

export const fetchVendors = async () => {
    try {
        console.log("Fetching vendors");
        const response = await axios.get(BASE_URL);
        console.log(response.data);
        return response.data;
    } catch (error) {
        return createError(error);
    }
};


// Fetch menu items for a specific vendor, sending email in the request body
export const fetchVendorMenu = async (email) => {
    try {
        const response = await axios.post(`${BASE_URL}/vendorMenuList`, { email });
        console.log(response.data);
        return response.data;
    } catch (error) {
        return createError(error);
    }
};