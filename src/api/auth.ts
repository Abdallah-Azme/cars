import type { LoginFormValues } from "@/components/auth/LoginForm";
import type { RegisterFormValues } from "@/components/auth/RegisterForm";
import type { ChangePasswordFormValues } from "@/components/profile/ChangePasswordForm";
import type { ChangePasswordResponse, LoginResponse, RegisterResponse, UpdateProfileResponse } from "@/types/auth";
import { apiRequest } from "./requests";


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

export const getProfileApi = () =>
  apiRequest<UpdateProfileResponse>("/profile", {
    method: "GET",
  });
export const updateProfileApi = (data: FormData) =>
  apiRequest<UpdateProfileResponse>("/profile", {
    method: "POST",
    body: data,
  });

export const changePasswordApi = (data:ChangePasswordFormValues) =>
  apiRequest<ChangePasswordResponse>("/profile/change-password", {
    method: "POST",
    body: JSON.stringify(data),
  });


