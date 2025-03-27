import { SignInCredentials, AuthResponse, AuthTokens } from "../interfaces/auth.interface";

export class AuthService {
  private static readonly ACCESS_TOKEN_KEY = "access";
  private static readonly REFRESH_TOKEN_KEY = "refresh";
  private static readonly API_URL = import.meta.env.VITE_API_URL || "http://127.0.0.1:8000";

  public static async signIn(
    credentials: SignInCredentials
  ): Promise<AuthResponse> {
    try {
      const response = await fetch(`${this.API_URL}/users/signin/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data: AuthResponse = await response.json();

      if (data.access && data.refresh) {
        this.setTokens({
          access: data.access,
          refresh: data.refresh,
        });
      }

      return data;
    } catch (error) {
      console.error("Authentication error:", error);
      return {
        message: "Error al conectar con el servidor",
      };
    }
  }

  public static signOut(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  public static getTokens(): AuthTokens | null {
    const access = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    const refresh = localStorage.getItem(this.REFRESH_TOKEN_KEY);

    if (!access || !refresh) {
      return null;
    }

    return { access, refresh };
  }


  public static setTokens(tokens: AuthTokens): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refresh);
  }

  public static isAuthenticated(): boolean {
    return !!this.getTokens();
  }


  public static async refreshToken(): Promise<boolean> {
    const tokens = this.getTokens();

    if (!tokens) {
      return false;
    }

    try {
      const response = await fetch("/users/refresh-token/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: tokens.refresh }),
      });

      const data = await response.json();

      if (data.success && data.accessToken) {
        this.setTokens({
          access: data.access,
          refresh: tokens.refresh,
        });
        return true;
      }

      return false;
    } catch (error) {
      console.error("Token refresh error:", error);
      return false;
    }
  }
}

export default AuthService;
