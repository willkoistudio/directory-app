/** @format */

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
