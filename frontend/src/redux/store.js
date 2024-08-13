import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counter/counterSlice';
import vendorReducer from './vendorSlice';
import cartReducer from './cartSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    vendor : vendorReducer,
    cart : cartReducer,
  },
});

export default store;
