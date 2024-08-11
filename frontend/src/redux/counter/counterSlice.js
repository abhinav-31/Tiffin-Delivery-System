import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  vendorsCount: 0,
  customersCount: 0,
  deliveryBoysCount: 0,
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

    setVendorsCount: (state, action) => {
        state.vendorsCount = action.payload;
      },
      setCustomersCount: (state, action) => {
        state.customersCount = action.payload;
      },
      setDeliveryBoysCount: (state, action) => {
        state.deliveryBoysCount = action.payload;
      },
      incrementCustomersCount: (state) => {
        state.customersCount += 1;
      },

  },
})

// Action creators are generated for each case reducer function
export const { setVendorsCount, setCustomersCount, setDeliveryBoysCount, incrementCustomersCount } = counterSlice.actions

export default counterSlice.reducer