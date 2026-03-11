import type { RegisterFormValues } from "@/components/auth/RegisterForm";
import { apiRequest } from "./requests";
import type { LoginResponse, RegisterResponse } from "@/types/auth";
import type { LoginFormValues } from "@/components/auth/LoginForm";


export const registerApi = (data: RegisterFormValues) =>
  apiRequest<RegisterResponse>("/register", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const loginApi = (data: LoginFormValues) =>
  apiRequest<LoginResponse>("/login", {
    method: "POST",
    body: JSON.stringify(data),
  });
export const logoutApi = () =>
  apiRequest<LoginResponse>("/logout", {
    method: "POST",
  });
