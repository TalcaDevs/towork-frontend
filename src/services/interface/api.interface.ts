import { AuthResponse } from "../../interfaces/auth.interface";

export interface ApiResponse<T = any> {
  data?: T;
  message: string;
  success?: boolean;
  error?: string;
  status?: string;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

export interface RequestConfig {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  body?: any;
  requireAuth?: boolean;
  timeout?: number;
}

export interface ExtendedAuthResponse extends AuthResponse {
  status?: string;
}