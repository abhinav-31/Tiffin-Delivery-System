import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {},
  reducers: {
    addItem: (state, action) => {
      const { vendorEmail, menuId, quantity } = action.payload;
      if (!state[vendorEmail]) state[vendorEmail] = {};
      state[vendorEmail][menuId] = quantity;
    },
    removeItem: (state, action) => {
      const { vendorEmail, menuId } = action.payload;
      if (state[vendorEmail]) {
        delete state[vendorEmail][menuId];
        if (Object.keys(state[vendorEmail]).length === 0) {
          delete state[vendorEmail];
        }
      }
    },
    updateItemQuantity: (state, action) => {
      const { vendorEmail, menuId, quantity } = action.payload;
      if (state[vendorEmail]) {
        if (quantity > 0) {
          state[vendorEmail][menuId] = quantity;
        } else {
          delete state[vendorEmail][menuId];
          if (Object.keys(state[vendorEmail]).length === 0) {
            delete state[vendorEmail];
          }
        }
      }
    }
  }
});

export const { addItem, removeItem, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
