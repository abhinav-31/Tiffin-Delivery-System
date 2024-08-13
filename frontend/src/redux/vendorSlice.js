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
  },
});

export const { setVendorEmail } = vendorSlice.actions;
export default vendorSlice.reducer;
