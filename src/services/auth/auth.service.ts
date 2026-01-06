/** @format */

import { LoginForm, SignupForm, AuthResponse } from "../../models/user";

export interface ServiceAuth {
  login: (form: LoginForm) => Promise<AuthResponse>;
  signup: (form: SignupForm) => Promise<AuthResponse>;
  getSocialAuthUrl: (
    provider: "google" | "github" | "facebook"
  ) => Promise<{ url: string }>;
  logout: () => Promise<void>;
}
