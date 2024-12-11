export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: string;
  language: string;
}

export interface LoginForm {
  email: string;
  password: string;
}
