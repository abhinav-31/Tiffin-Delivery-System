import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    addToCartAction: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCartAction: (state, action) => {
      const menuItem = action.payload;
      for (let index = 0; index < state.items.length; index++) {
        // search the property to be removed from the state
        if (state.items[index].id == menuItem.id) {
          state.items.splice(index, 1);
          break;
        }
      }
    },
  },
});

export const { addToCartAction, removeFromCartAction } = cartSlice.actions;
export default cartSlice.reducer;
