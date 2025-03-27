export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access?: string;
  refresh?: string;
  message: string;
}
