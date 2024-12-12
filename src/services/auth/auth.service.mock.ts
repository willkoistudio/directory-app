import { User, USERS_MOCKS } from "../../models/user";
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

  public async logout(): Promise<void> {
    return new Promise((resolve) =>
      setTimeout(() => {
        this.user = null;
        resolve();
      }, this.latence)
    );
  }
}
