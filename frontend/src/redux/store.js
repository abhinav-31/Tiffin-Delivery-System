import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import vendorReducer from "./vendorSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    vendor: vendorReducer,
    cart: cartReducer,
    user: userReducer,
  },
});

export default store;
