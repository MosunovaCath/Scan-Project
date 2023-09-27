import { createSlice } from "@reduxjs/toolkit";
import { getTokenObj } from "../../utils/token";

const authSlice = createSlice({
  name: "auth",
  initialState: getTokenObj(),
  reducers: {
    login: (state, action) => {
      state.isAuthenticated = true;
      state.token = action.payload.accessToken;
      state.expirationDate = action.payload.expire;
      localStorage.setItem("accessToken", JSON.stringify(state));
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.expirationDate = null;
      localStorage.clear();
    },
  },
});
export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
