/** @format */

import { LoginForm, SignupForm, User } from "../../models/user";

export interface ServiceAuth {
  login: (form: LoginForm) => Promise<User>;
  signup: (form: SignupForm) => Promise<User>;
  getSocialAuthUrl: (
    provider: "google" | "github" | "facebook"
  ) => Promise<{ url: string }>;
  logout: () => Promise<void>;
}
