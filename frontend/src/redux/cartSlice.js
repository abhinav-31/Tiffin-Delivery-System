
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: {}, // Structure: { vendorEmail: { menuId: { quantity, ... } } }
  },
  reducers: {
    addItem: (state, action) => {
      const { vendorEmail, menuId, menuName, menuPrice, menuImage, quantity } = action.payload;

      if (!state.items[vendorEmail]) {
        state.items[vendorEmail] = {};
      }
      if (!state.items[vendorEmail][menuId]) {
        state.items[vendorEmail][menuId] = {
          menuName,
          menuPrice,
          menuImage,
          quantity,
        };
      } else {
        state.items[vendorEmail][menuId].quantity += quantity;
      }
    },
    removeItem: (state, action) => {
      const { vendorEmail, menuId } = action.payload;
      if (state.items[vendorEmail]) {
        delete state.items[vendorEmail][menuId];
        // Remove the vendor entry if there are no items left for the vendor
        if (Object.keys(state.items[vendorEmail]).length === 0) {
          delete state.items[vendorEmail];
        }
      }
    },
    updateItemQuantity: (state, action) => {
      const { vendorEmail, menuId, quantity } = action.payload;
      if (state.items[vendorEmail] && state.items[vendorEmail][menuId]) {
        state.items[vendorEmail][menuId].quantity = quantity;
      }
    },
    clearCart: (state) => {
      state.items = {};
    },
  },
});

export const { addItem, removeItem, updateItemQuantity, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
