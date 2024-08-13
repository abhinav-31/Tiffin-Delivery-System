import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: {}, // Use an object keyed by vendorEmail
  },
  reducers: {
    addItem: (state, action) => {
      const { vendorEmail, menuId, quantity } = action.payload;
      if (!state.items[vendorEmail]) state.items[vendorEmail] = {};
      state.items[vendorEmail][menuId] = quantity;
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
      if (state.items[vendorEmail]) {
        if (quantity > 0) {
          state.items[vendorEmail][menuId] = quantity;
        } else {
          delete state.items[vendorEmail][menuId];
          if (Object.keys(state.items[vendorEmail]).length === 0) {
            delete state.items[vendorEmail];
          }
        }
      }
    },
    addToCartAction: (state, action) => {
      // Assuming addToCartAction to append to a flat list, this is more of an example of another method of handling
      const { vendorEmail, menuId, quantity } = action.payload;
      state.items.push({ vendorEmail, menuId, quantity });
    },
    removeFromCartAction: (state, action) => {
      const { vendorEmail, menuId } = action.payload;
      state.items = state.items.filter(
        (item) => !(item.vendorEmail === vendorEmail && item.menuId === menuId)
      );
    },
  },
});

export const {
  addItem,
  removeItem,
  updateItemQuantity,
  addToCartAction,
  removeFromCartAction,
} = cartSlice.actions;
export default cartSlice.reducer;
