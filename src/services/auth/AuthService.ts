import { HttpClient } from '../core/HttpClient';
import { TokenService } from './TokenService';
import { SignInCredentials, AuthResponse } from '../../interfaces/auth.interface';
import { ExtendedAuthResponse } from '../interface/api.interface';
import { API_CONFIG, API_ENDPOINTS } from '../config/api.config';
import { errorMessages } from '../../data/errorMessages';
import { successMessages } from '../../data/successMessages';

export class AuthService {
  
  static async signIn(credentials: SignInCredentials): Promise<ExtendedAuthResponse> {
    try {
      const response = await fetch(`${API_CONFIG.BASE_URL}${API_ENDPOINTS.AUTH.SIGN_IN}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      const responseHandlers: Record<number, () => ExtendedAuthResponse> = {
        200: () => this.handleSuccessfulSignIn(data),
        401: () => ({ message: data.message || errorMessages.verifyCredentials }),
        403: () => ({ 
          message: data.message || successMessages.profileReviews,
          status: data.status || "pending"
        })
      };

      return (responseHandlers[response.status] || (() => ({ 
        message: data.message || errorMessages.serverError
      })))();
    } catch (error) {
      return { message: errorMessages.serverError };
    }
  }

  private static handleSuccessfulSignIn(data: any): ExtendedAuthResponse {
    if (data.access && data.refresh) {
      const tokensSet = TokenService.setTokens({ access: data.access, refresh: data.refresh });
      if (tokensSet) {
        return { message: successMessages.loginSuccess, access: data.access, refresh: data.refresh };
      }
    }
    return { message: errorMessages.errorAuthentication };
  }

  static async signUp(userData: {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    terms_accepted?: boolean;
  }): Promise<AuthResponse> {
    try {
      const response = await HttpClient.post<AuthResponse>(API_ENDPOINTS.AUTH.SIGN_UP, userData);
      
      if (response.access && response.refresh) {
        TokenService.setTokens({ access: response.access, refresh: response.refresh });
      }
      
      return response;
    } catch (error) {
      return { message: errorMessages.serverError };
    }
  }

  static async signOut(): Promise<void> {
    try {
      if (TokenService.isAuthenticated()) {
        await HttpClient.post(API_ENDPOINTS.AUTH.LOGOUT, {}, true);
      }
    } catch (error) {
    } finally {
      TokenService.clearTokens();
    }
  }

  static isAuthenticated(): boolean {
    return TokenService.isAuthenticated();
  }
}