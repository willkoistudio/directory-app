import { LoginForm, User } from "../../models/user";

export interface ServiceAuth {
  login: (form: LoginForm) => Promise<User>;
  logout: () => Promise<void>;
}
