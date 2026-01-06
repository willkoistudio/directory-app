/** @format */

import apiClient from "../../lib/axios";
import { ServiceAuth } from "./auth.service";
import { LoginForm, SignupForm, User } from "../../models/user";

export class ServiceAuthHttp implements ServiceAuth {
  public async login(form: LoginForm): Promise<User> {
    try {
      const { data } = await apiClient.post<User>(`login`, form);
      return data;
    } catch (erreur) {
      throw new Error("Error logging in");
    }
  }

  public async signup(form: SignupForm): Promise<User> {
    try {
      const { data } = await apiClient.post<User>(`signup`, form);
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
      const { data } = await apiClient.post<void>(`logout`);
      return data;
    } catch (erreur) {
      throw new Error("Error logging out");
    }
  }
}
