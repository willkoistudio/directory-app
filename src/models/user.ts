/** @format */

export interface User {
  id: string | number;
  email?: string;
  name?: string;
  password?: string; // Pour le mock uniquement
  role?: string; // Pour le mock uniquement
  language?: string; // Pour le mock uniquement
  [key: string]: any; // Pour les autres propriétés de l'utilisateur Supabase
}

export interface AuthResponse {
  user: User;
  session: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    expires_at?: number;
    token_type: string;
    user: User;
  };
}

export interface LoginForm {
  email: string;
  password: string;
}

export interface SignupForm {
  email: string;
  password: string;
  name?: string;
}

export const USERS_MOCKS: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "t9TtT@example.com",
    password: "password",
    role: "admin",
    language: "en",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@example",
    password: "password",
    role: "user",
    language: "fr",
  },
];
