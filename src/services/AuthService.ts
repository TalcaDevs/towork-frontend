import { SignInCredentials, AuthResponse, AuthTokens } from "../interfaces/auth.interface";

export class AuthService {
  private static readonly ACCESS_TOKEN_KEY = "access";
  private static readonly REFRESH_TOKEN_KEY = "refresh";
  private static readonly API_URL = import.meta.env.VITE_API_URL || "http://184.73.49.129:8000";

  public static async signIn(
    credentials: SignInCredentials
  ): Promise<AuthResponse> {
    try {
      console.log('AuthService.signIn called with:', credentials);
      console.log('Using API URL:', this.API_URL);
      
      const response = await fetch(`${this.API_URL}/users/signin/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data: AuthResponse = await response.json();
      console.log('API response:', data);

      if (data.access && data.refresh) {
        this.setTokens({
          access: data.access,
          refresh: data.refresh,
        });
        console.log('Tokens stored successfully');
      } else {
        console.warn('No tokens in response');
      }

      return data;
    } catch (error) {
      console.error("Authentication error:", error);
      return {
        message: "Error al conectar con el servidor",
      };
    }
  }

  public static async signUp(userData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  }): Promise<AuthResponse> {
    try {
      console.log('AuthService.signUp called with:', userData);
      
      const response = await fetch(`${this.API_URL}/users/signup/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "accept": "*/*"
        },
        body: JSON.stringify(userData),
      });

      const data: AuthResponse = await response.json();
      console.log('API signup response:', data);

      if (data.access && data.refresh) {
        this.setTokens({
          access: data.access,
          refresh: data.refresh,
        });
        console.log('Tokens stored successfully after signup');
      } else {
        console.warn('No tokens in signup response');
      }

      return data;
    } catch (error) {
      console.error("Signup error:", error);
      return {
        message: "Error al conectar con el servidor",
      };
    }
  }

  public static async saveProfile(profileData: any): Promise<any> {
    try {
      console.log('AuthService.saveProfile called with:', profileData);
      
      const tokens = this.getTokens();
      if (!tokens) {
        throw new Error('No auth tokens available');
      }
      
      const response = await fetch(`${this.API_URL}/users/save-profile/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${tokens.access}`
        },
        body: JSON.stringify(profileData),
      });

      const data = await response.json();
      console.log('API save profile response:', data);

      return data;
    } catch (error) {
      console.error("Save profile error:", error);
      throw error;
    }
  }

  public static signOut(): void {
    console.log('Signing out, removing tokens');
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
  }

  public static getTokens(): AuthTokens | null {
    const access = localStorage.getItem(this.ACCESS_TOKEN_KEY);
    const refresh = localStorage.getItem(this.REFRESH_TOKEN_KEY);

    if (!access || !refresh) {
      console.log('No tokens found in localStorage');
      return null;
    }

    console.log('Tokens retrieved from localStorage');
    return { access, refresh };
  }

  public static setTokens(tokens: AuthTokens): void {
    console.log('Setting tokens in localStorage');
    localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.access);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refresh);
  }

  public static isAuthenticated(): boolean {
    const hasTokens = !!this.getTokens();
    console.log('isAuthenticated check:', hasTokens);
    return hasTokens;
  }

  public static async refreshToken(): Promise<boolean> {
    const tokens = this.getTokens();

    if (!tokens) {
      console.log('No tokens to refresh');
      return false;
    }

    try {
      console.log('Attempting to refresh token');
      
      const response = await fetch(`${this.API_URL}/users/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: tokens.refresh }),
      });

      const data = await response.json();
      console.log('Token refresh response:', data);

      if (data.access) {
        this.setTokens({
          access: data.access,
          refresh: tokens.refresh,
        });
        console.log('Token refreshed successfully');
        return true;
      }

      console.warn('Failed to refresh token');
      return false;
    } catch (error) {
      console.error("Token refresh error:", error);
      return false;
    }
  }
}

export default AuthService;