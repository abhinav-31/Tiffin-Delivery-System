import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import vendorReducer from "./vendorSlice";
import cartReducer from "./cartSlice";
import userReducer from "./userSlice";
import addressReducer from "./AddressSlice"
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    vendor: vendorReducer,
    cart: cartReducer,
    user: userReducer,
    address: addressReducer
  },
});

// export default store;
