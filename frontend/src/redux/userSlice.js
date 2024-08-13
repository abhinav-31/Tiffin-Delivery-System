import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    loginStatus: sessionStorage.getItem("loginStatus") === "true", // Initialize from sessionStorage
  },
  reducers: {
    loginAction: (state) => {
      state.loginStatus = true;
    },
    logoutAction: (state) => {
      state.loginStatus = false;
      sessionStorage.setItem("loginStatus", false); // Update sessionStorage on logout
    },
  },
});

export const { loginAction, logoutAction } = userSlice.actions;
export default userSlice.reducer;
