import { apiClient } from '../client';
import type { User, PartnerDashboard, PartnerPrograms, PartnerImpact, ApiResponse } from '../types';

export const partnerService = {
  async getDashboard(): Promise<PartnerDashboard> {
    const res = await apiClient.get<ApiResponse<PartnerDashboard>>('/api/partner/dashboard');
    return res.data.data;
  },

  async getPrograms(): Promise<PartnerPrograms> {
    const res = await apiClient.get<ApiResponse<PartnerPrograms>>('/api/partner/programs');
    return res.data.data;
  },

  async getProfile(): Promise<User> {
    const res = await apiClient.get<ApiResponse<User>>('/api/partner/profile');
    return res.data.data;
  },

  async updateProfile(data: {
    full_name?: string;
    first_name?: string;
    middle_name?: string;
    last_name?: string;
    phone?: string;
    gender?: string | null;
    avatar_url?: string | null;
  }): Promise<User> {
    const res = await apiClient.put<ApiResponse<User>>('/api/partner/profile', data);
    return res.data.data;
  },

  async uploadAvatar(file: File): Promise<User> {
    const form = new FormData();
    form.append('avatar', file);
    const res = await apiClient.post<ApiResponse<User>>('/api/partner/profile/avatar', form, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.data;
  },

  async getImpact(): Promise<PartnerImpact> {
    const res = await apiClient.get<ApiResponse<PartnerImpact>>('/api/partner/impact');
    return res.data.data;
  },
};
