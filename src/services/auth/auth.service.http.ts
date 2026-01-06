/** @format */

import apiClient from "../../lib/axios";
import { ServiceAuth } from "./auth.service";
import { LoginForm, SignupForm, AuthResponse } from "../../models/user";

export class ServiceAuthHttp implements ServiceAuth {
  public async login(form: LoginForm): Promise<AuthResponse> {
    try {
      const { data } = await apiClient.post<AuthResponse>(`login`, form);
      // Stocker le token dans localStorage
      if (data.session?.access_token) {
        localStorage.setItem("auth_token", data.session.access_token);
      }
      return data;
    } catch (erreur) {
      throw new Error("Error logging in");
    }
  }

  public async signup(form: SignupForm): Promise<AuthResponse> {
    try {
      const { data } = await apiClient.post<AuthResponse>(`signup`, form);
      // Stocker le token dans localStorage
      if (data.session?.access_token) {
        localStorage.setItem("auth_token", data.session.access_token);
      }
      return data;
    } catch (erreur) {
      throw new Error("Error signing up");
    }
  }

  public async getSocialAuthUrl(
    provider: "google" | "github" | "facebook"
  ): Promise<{ url: string }> {
    try {
      const { data } = await apiClient.get<{ url: string }>(
        `auth/social/${provider}`
      );
      return data;
    } catch (erreur) {
      throw new Error(`Error getting ${provider} auth URL`);
    }
  }

  public async logout(): Promise<void> {
    try {
      await apiClient.post<void>(`logout`);
      // Supprimer le token du localStorage
      localStorage.removeItem("auth_token");
    } catch (erreur) {
      // Même en cas d'erreur, supprimer le token localement
      localStorage.removeItem("auth_token");
      throw new Error("Error logging out");
    }
  }
}
