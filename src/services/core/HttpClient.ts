import { ApiError, RequestConfig } from '../interface/api.interface';
import { API_CONFIG } from '../config/api.config';

export class HttpClient {
  private static readonly baseURL = API_CONFIG.BASE_URL;
  private static readonly timeout = API_CONFIG.TIMEOUT;

  static async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
    const { method = 'POST', body, requireAuth = false, timeout = this.timeout } = config;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (requireAuth) {
      const { TokenService } = await import('../auth/TokenService');
      const authHeader = TokenService.getAuthHeader();
      if (!authHeader) {
        throw new Error('Authentication required but no token available');
      }
      headers['Authorization'] = authHeader;
    }

    const requestConfig: RequestInit = {
      method,
      headers,
      ...(body && { body: JSON.stringify(body) })
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), timeout);

      const response = await fetch(
        `${this.baseURL}${endpoint}`, 
        { ...requestConfig, signal: controller.signal }
      );

      clearTimeout(timeoutId);
      const data = await response.json();

      if (!response.ok) {
        throw this.createApiError(response.status, data.message || data.error, data);
      }

      return data;
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new Error('Request timeout');
        }
        throw error;
      }
      throw new Error('Network error');
    }
  }

  private static createApiError(status: number, message: string, data?: any): ApiError {
    return { status, message, code: data?.code };
  }

  static get<T>(endpoint: string, requireAuth = false): Promise<T> {
    return this.request<T>(endpoint, { method: 'GET', requireAuth });
  }

  static post<T>(endpoint: string, body?: any, requireAuth = false): Promise<T> {
    return this.request<T>(endpoint, { method: 'POST', body, requireAuth });
  }

  static put<T>(endpoint: string, body?: any, requireAuth = false): Promise<T> {
    return this.request<T>(endpoint, { method: 'PUT', body, requireAuth });
  }

  static delete<T>(endpoint: string, requireAuth = false): Promise<T> {
    return this.request<T>(endpoint, { method: 'DELETE', requireAuth });
  }
}