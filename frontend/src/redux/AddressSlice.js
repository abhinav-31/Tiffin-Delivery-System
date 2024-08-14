// redux/addressSlice.js
import { createSlice } from '@reduxjs/toolkit';

const addressSlice = createSlice({
  name: 'address',
  initialState: {
    addresses: []
  },
  reducers: {
    setAddresses: (state, action) => {
      state.addresses = action.payload;
    },   
    addAddress: (state, action) => {
        state.addresses.push(action.payload);
      },
      removeAddress: (state, action) => {
        state.addresses = state.addresses.filter(address => address.id !== action.payload);
      }
    }
  });
  
  export const { setAddresses, addAddress, removeAddress } = addressSlice.actions;
  export default addressSlice.reducer;