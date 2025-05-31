export interface AuthTokens {
  access: string;
  refresh: string;
  isAllowed?: boolean;
}

export interface SignInCredentials {
  email: string;
  password: string;
}

export interface AuthResponse {
  access?: string;
  refresh?: string;
  isAllowed?: boolean;
  message: string;
}
