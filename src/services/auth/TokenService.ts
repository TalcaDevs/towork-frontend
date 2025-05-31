import { AuthTokens } from '../../interfaces/auth.interface';
import { StorageUtil } from '../utils/storage.util';
import { API_CONFIG, API_ENDPOINTS } from '../config/api.config';

export class TokenService {
  private static readonly TOKENS = API_CONFIG.TOKENS;

  static getTokens(): AuthTokens | null {
    const access = StorageUtil.getItem(this.TOKENS.ACCESS);
    const refresh = StorageUtil.getItem(this.TOKENS.REFRESH);
    return (access && refresh) ? { access, refresh } : null;
  }

  static setTokens(tokens: AuthTokens): boolean {
    const accessSet = StorageUtil.setItem(this.TOKENS.ACCESS, tokens.access);
    const refreshSet = StorageUtil.setItem(this.TOKENS.REFRESH, tokens.refresh);
    return accessSet && refreshSet;
  }

  static clearTokens(): void {
    StorageUtil.removeItem(this.TOKENS.ACCESS);
    StorageUtil.removeItem(this.TOKENS.REFRESH);
  }

  static getAuthHeader(): string | null {
    const tokens = this.getTokens();
    return tokens ? `Bearer ${tokens.access}` : null;
  }

  static isAuthenticated(): boolean {
  const tokens = this.getTokens();
  
  if (!tokens) {
    return false;
  }
  
  const isValid = this.isTokenValid(tokens.access);
  return isValid;
}

  private static isTokenValid(token: string): boolean {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Date.now() / 1000;
      return payload.exp > now;
    } catch {
      return false;
    }
  }

  static async refreshTokens(): Promise<boolean> {
    const tokens = this.getTokens();
    if (!tokens) return false;

    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.REFRESH}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: tokens.refresh }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.access) {
          return this.setTokens({ access: data.access, refresh: tokens.refresh });
        }
      }
      return false;
    } catch (error) {
      this.clearTokens();
      return false;
    }
  }
}