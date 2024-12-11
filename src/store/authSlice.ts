import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, LoginForm } from "../models/user";

interface AuthState {
  loggedIn: boolean;
}

const initialState: AuthState = {
  loggedIn: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(state, action: PayloadAction<LoginForm>) {},
    logout(state) {},
  },
});

// Export des actions
export const { login } = authSlice.actions;

// Export du réducteur
export default authSlice.reducer;
