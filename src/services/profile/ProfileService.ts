import { HttpClient } from '../core/HttpClient';
import { ApiResponse } from '../interface/api.interface';
import { API_ENDPOINTS } from '../config/api.config';
import { ProfileServiceResponse, PublicProfileInfo } from '../interface/profile.interface';
import { errorMessages } from '../../data/errorMessages';

export class ProfileService {
  
  static async saveProfile(profileData: any): Promise<ApiResponse> {
    try {
      return await HttpClient.post<ApiResponse>(API_ENDPOINTS.PROFILE.SAVE, profileData, true);
    } catch (error) {
      throw new Error(errorMessages.errorSaveProfile);
    }
  }

  static async getCurrentUser(): Promise<any | null> {
    try {
      return await HttpClient.get<ProfileServiceResponse>(API_ENDPOINTS.PROFILE.GET, true);
    } catch (error) {
      return null;
    }
  }

  static async getPublicProfile(userId: string): Promise<PublicProfileInfo | null> {
    try {
      const response = await HttpClient.getPublic<ProfileServiceResponse>(`${API_ENDPOINTS.PROFILE.PUBLIC}${userId}`, true);
      return response;
    } catch (error) {
      return null;
    }
  }
}