import { useAuthStore } from "@/stores/user";

export type ApiResponse<T> = {
  ok: boolean;
  status: number;
  data?: T;
  error?: string;
};

const BASE_URL = import.meta.env.VITE_API_URL;

export async function apiRequest<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  const token = useAuthStore.getState().token;
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "Accept-Language": "en",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
        ...(options?.headers || {}),
      },
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      return {
        ok: false,
        status: response.status,
        error: data?.message || "Something went wrong",
      };
    }

    return {
      ok: true,
      status: response.status,
      data,
    };
  } catch (error) {
    return {
      ok: false,
      status: 500,
      error: "Network error" ,
    };
  }
}

