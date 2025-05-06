import {
  SignInCredentials,
  AuthResponse,
  AuthTokens,
} from "../interfaces/auth.interface";

export class AuthService {
  private static readonly ACCESS_TOKEN_KEY = "access";
  private static readonly REFRESH_TOKEN_KEY = "refresh";
  private static readonly API_URL =
    import.meta.env.VITE_API_URL || "http://184.73.49.129:8000";

  // === Generic Fetch Helper ===
  private static async request<T>(
    endpoint: string,
    method: "POST" | "GET" = "POST",
    body?: any,
    auth?: boolean
  ): Promise<T> {
    const headers: HeadersInit = {
      "Content-Type": "application/json",
    };

    if (auth) {
      const tokens = this.getTokens();
      if (!tokens) throw new Error("No auth tokens available");
      headers["Authorization"] = `Bearer ${tokens.access}`;
    }

    const response = await fetch(`${this.API_URL}${endpoint}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });

    return response.json();
  }

  // === Auth Functions ===

  public static async signIn(
    credentials: SignInCredentials
  ): Promise<AuthResponse> {
    try {
      const data = await this.request<AuthResponse>("/users/signin/", "POST", credentials);

      if (data.access && data.refresh) {
        this.setTokens({ access: data.access, refresh: data.refresh });
      }

      return data;
    } catch (error) {
      return { message: "Error al conectar con el servidor" };
    }
  }

  public static async signUp(userData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    try {
      const data = await this.request<AuthResponse>("/users/signup/", "POST", userData);

      if (data.access && data.refresh) {
        this.setTokens({ access: data.access, refresh: data.refresh });
      }

      return data;
    } catch (error) {
      return { message: "Error al conectar con el servidor" };
    }
  }

  public static async saveProfile(profileData: any): Promise<any> {
    try {
      return await this.request("/users/save-profile/", "POST", profileData, true);
    } catch (error) {
      throw new Error("Error al guardar el perfil");
    }
  }

  public static async refreshToken(): Promise<boolean> {
    const tokens = this.getTokens();

    if (!tokens) return false;

    try {
      const data = await this.request<AuthResponse>("/users/token/refresh/", "POST", {
        refresh: tokens.refresh,
      });

      if (data.access) {
        this.setTokens({ access: data.access, refresh: tokens.refresh });
        return true;
      }

      return false;
    } catch (error) {
      return false;
    }
  }

  // === Token Management ===

  public static signOut(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  public static getTokens(): AuthTokens | null {
    const access = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    const refresh = localStorage.getItem(this.REFRESH_TOKEN_KEY);
    return access && refresh ? { access, refresh } : null;
  }

  public static setTokens(tokens: AuthTokens): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refresh);
  }

  public static isAuthenticated(): boolean {
    return !!this.getTokens();
  }
}

export default AuthService;