import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:7073', // Update this to match your backend URL
});

export const fetchVendors = async () => {
  try {
    const response = await axiosInstance.get('/admin/vendors');
    return response.data;
  } catch (error) {
    console.error('Error fetching vendors:', error);
    throw error;
  }

};

export const fetchDeliveryboys = async () => {
  try {
    const response = await axiosInstance.get('/admin/deliveryBoys');
    return response.data;
  } catch (error) {
    console.error('Error fetching deliveryboys:', error);
    throw error;
  }

};

export const fetchCustomers = async () =>
  {
    try{
      const response = await axiosInstance.get('/admin/customers');
      return response.data;
    }
    catch(error)
    {
      console.error('Error fetching customers:',error);
      throw error;
    }
  }