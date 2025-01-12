import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type AuthState = {
  user: any;
  token: string;
};

const initialState: AuthState = {
  user: undefined,
  token: "",
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    onSignInSuccess: (
      state,
      action: PayloadAction<{ user: any; jwt: string }>
    ) => {
      state.user = action.payload.user;
      state.token = action.payload.jwt;
      localStorage.setItem("jwtToken", action.payload.jwt);
    },
    onSignOutSuccess: (state) => {
      state.user = undefined;
      state.token = "";
      localStorage.removeItem("jwtToken");
    },
  },
});

export const { onSignInSuccess, onSignOutSuccess } = authSlice.actions;

export default authSlice.reducer;
