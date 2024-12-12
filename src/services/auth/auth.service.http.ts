import axios from "axios";
import { ServiceAuth } from "./auth.service";
import { LoginForm, User } from "../../models/user";

export class ServiceAuthHttp implements ServiceAuth {
  public async login(form: LoginForm): Promise<User> {
    try {
      const { data } = await axios.post<User>(`login`, form);
      return data;
    } catch (erreur) {
      throw new Error("Error fetching companies");
    }
  }

  public async logout(): Promise<void> {
    try {
      const { data } = await axios.post<void>(`logout`);
      return data;
    } catch (erreur) {
      throw new Error("Error fetching companies");
    }
  }
}
