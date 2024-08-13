import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {}, // Use an object keyed by vendorEmail
  },
  reducers: {
    addItem: (state, action) => {
      const { vendorEmail, menuId, menuName, menuPrice, menuImage, quantity } =
        action.payload;
      if (!state.items[vendorEmail]) state.items[vendorEmail] = {};
      state.items[vendorEmail][menuId] = {
        menuName,
        menuPrice,
        menuImage,
        quantity,
      };
    },
    removeItem: (state, action) => {
      const { vendorEmail, menuId } = action.payload;
      if (state.items[vendorEmail]) {
        delete state.items[vendorEmail][menuId];
        if (Object.keys(state.items[vendorEmail]).length === 0) {
          delete state.items[vendorEmail];
        }
      }
    },
    updateItemQuantity: (state, action) => {
      const { vendorEmail, menuId, quantity } = action.payload;
      if (state.items[vendorEmail] && state.items[vendorEmail][menuId]) {
        if (quantity > 0) {
          state.items[vendorEmail][menuId].quantity = quantity;
        } else {
          delete state.items[vendorEmail][menuId];
          if (Object.keys(state.items[vendorEmail]).length === 0) {
            delete state.items[vendorEmail];
          }
        }
      }
    },
  },
});

export const { addItem, removeItem, updateItemQuantity } = cartSlice.actions;
export default cartSlice.reducer;
