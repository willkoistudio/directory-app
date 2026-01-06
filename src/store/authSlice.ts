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
  token: string | null;
}

// Vérifier si un token existe dans localStorage au démarrage
const getInitialToken = (): string | null => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("auth_token");
  }
  return null;
};

const initialState: AuthState = {
  loggedIn: !!getInitialToken(),
  currentUser: null,
  token: getInitialToken(),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action pour restaurer la session depuis localStorage
    restoreSession: (state) => {
      const token = localStorage.getItem("auth_token");
      if (token) {
        state.token = token;
        state.loggedIn = true;
        // Note: currentUser sera mis à jour lors de la première requête authentifiée
      }
    },
    // Action pour mettre à jour le token manuellement
    setToken: (state, action) => {
      console.log(
        "🔧 setToken action - payload:",
        action.payload ? `${action.payload.substring(0, 20)}...` : "null"
      );
      state.token = action.payload;
      state.loggedIn = !!action.payload;
      console.log("🔧 setToken - state.loggedIn:", state.loggedIn);
      console.log(
        "🔧 setToken - state.token:",
        state.token ? "présent" : "absent"
      );
      if (action.payload) {
        localStorage.setItem("auth_token", action.payload);
        console.log("🔧 setToken - Token stocké dans localStorage");
      } else {
        localStorage.removeItem("auth_token");
        console.log("🔧 setToken - Token supprimé de localStorage");
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.currentUser = action.payload.user;
        state.token = action.payload.session?.access_token || null;
      })
      .addCase(login.rejected, (state) => {
        state.loggedIn = false;
        state.currentUser = null;
        state.token = null;
        localStorage.removeItem("auth_token");
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.loggedIn = true;
        state.currentUser = action.payload.user;
        state.token = action.payload.session?.access_token || null;
      })
      .addCase(signup.rejected, (state) => {
        state.loggedIn = false;
        state.currentUser = null;
        state.token = null;
        localStorage.removeItem("auth_token");
      })
      .addCase(logout.fulfilled, (state) => {
        state.loggedIn = false;
        state.currentUser = null;
        state.token = null;
        localStorage.removeItem("auth_token");
      });
  },
});

export const { restoreSession, setToken } = authSlice.actions;
export default authSlice.reducer;
