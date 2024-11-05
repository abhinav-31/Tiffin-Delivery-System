// src/redux/vendorSlice.js

import { createSlice } from '@reduxjs/toolkit';

const vendorSlice = createSlice({
  name: 'vendor',
  initialState: {
    email: '',
  },
  reducers: {
    setVendorEmail: (state, action) => {
      state.email = action.payload;
    },
    setVendorId: (state, action) => {
      state.id = action.payload;
    }
  },
});

export const { setVendorEmail, setVendorId } = vendorSlice.actions;
export default vendorSlice.reducer;
