/** @format */

import { User, USERS_MOCKS, SignupForm } from "../../models/user";
import { ServiceAuth } from "./auth.service";

export class ServiceAuthMock implements ServiceAuth {
  public constructor(
    private user: User | null = USERS_MOCKS[0],
    private latence = 1000
  ) {}

  public async login(): Promise<User> {
    return new Promise((resolve) =>
      setTimeout(() => resolve(this.user as User), this.latence)
    );
  }

  public async signup(form: SignupForm): Promise<User> {
    return new Promise((resolve) =>
      setTimeout(() => {
        const newUser: User = {
          id: Date.now(),
          name: form.name || form.email.split("@")[0],
          email: form.email,
          password: form.password,
          role: "user",
          language: "fr",
        };
        this.user = newUser;
        resolve(newUser);
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
        resolve();
      }, this.latence)
    );
  }
}
