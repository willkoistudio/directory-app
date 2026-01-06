/** @format */

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User, LoginForm, SignupForm } from "../models/user";
import { IS_API_MOCKED } from "../const/common";
import { ServiceAuthMock } from "../services/auth/auth.service.mock";
import { ServiceAuthHttp } from "../services/auth/auth.service.http";

const serviceAuth = IS_API_MOCKED
  ? new ServiceAuthMock()
  : new ServiceAuthHttp();

export const login = createAsyncThunk(
  "auth/login",
  async (loginForm: LoginForm) => {
    return await serviceAuth.login(loginForm);
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async (signupForm: SignupForm) => {
    return await serviceAuth.signup(signupForm);
  }
);

export const logout = createAsyncThunk("auth/logout", async () => {
  return await serviceAuth.logout();
});

interface AuthState {
  loggedIn: boolean;
  currentUser: User | null;
}

const initialState: AuthState = {
  loggedIn: false,
  currentUser: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.currentUser = action.payload;
      })
      .addCase(login.rejected, (state) => {
        state.loggedIn = false;
        state.currentUser = null;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.currentUser = action.payload;
      })
      .addCase(signup.rejected, (state) => {
        state.loggedIn = false;
        state.currentUser = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loggedIn = false;
        state.currentUser = null;
      });
  },
});

export default authSlice.reducer;
