/** @format */

import {
  User,
  USERS_MOCKS,
  SignupForm,
  AuthResponse,
  LoginForm,
} from "../../models/user";
import { ServiceAuth } from "./auth.service";

export class ServiceAuthMock implements ServiceAuth {
  public constructor(
    private user: User | null = USERS_MOCKS[0],
    private latence = 1000
  ) {}

  public async login(form: LoginForm): Promise<AuthResponse> {
    return new Promise((resolve) =>
      setTimeout(() => {
        const mockToken = "mock_token_" + Date.now();
        localStorage.setItem("auth_token", mockToken);

        // Si un email est fourni (connexion sociale), créer un utilisateur avec cet email
        const user = form?.email
          ? {
              ...this.user,
              email: form.email,
              name: form.email.split("@")[0],
            }
          : (this.user as User);

        resolve({
          user: user as User,
          session: {
            access_token: mockToken,
            refresh_token: "mock_refresh_token",
            expires_in: 3600,
            token_type: "bearer",
            user: user as User,
          },
        });
      }, this.latence)
    );
  }

  public async signup(form: SignupForm): Promise<AuthResponse> {
    return new Promise((resolve) =>
      setTimeout(() => {
        const newUser: User = {
          id: String(Date.now()),
          name: form.name || form.email.split("@")[0],
          email: form.email,
        };
        this.user = newUser;
        const mockToken = "mock_token_" + Date.now();
        localStorage.setItem("auth_token", mockToken);
        resolve({
          user: newUser,
          session: {
            access_token: mockToken,
            refresh_token: "mock_refresh_token",
            expires_in: 3600,
            token_type: "bearer",
            user: newUser,
          },
        });
      }, this.latence)
    );
  }

  public async getSocialAuthUrl(
    provider: "google" | "github" | "facebook"
  ): Promise<{ url: string }> {
    return new Promise((resolve) =>
      setTimeout(() => {
        resolve({ url: `https://mock-${provider}-auth.com` });
      }, this.latence)
    );
  }

  public async logout(): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(() => {
        this.user = null;
        localStorage.removeItem("auth_token");
        resolve();
      }, this.latence)
    );
  }
}
