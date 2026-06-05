import { apiClient, TOKEN_KEY } from '../client';
import type { User, AuthTokenResponse, UserRole } from '../types';

export const authService = {
  async register(data: {
    full_name: string;
    email: string;
    password: string;
    phone?: string;
  }): Promise<{ token: string; user: User }> {
    const res = await apiClient.post<AuthTokenResponse>('/api/auth/register', data);
    return res.data;
  },

  async login(data: { email: string; password: string }): Promise<{ token: string; user: User }> {
    const res = await apiClient.post<AuthTokenResponse>('/api/auth/login', data);
    localStorage.setItem(TOKEN_KEY, res.data.token);
    return res.data;
  },

  async getProfile(): Promise<User> {
    const res = await apiClient.get<{ user: User }>('/api/auth/profile');
    return res.data.user;
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
    const res = await apiClient.put<{ message: string; user: User }>('/api/auth/profile', data);
    return res.data.user;
  },

  async uploadAvatar(file: File): Promise<User> {
    const form = new FormData();
    form.append('avatar', file);
    const res = await apiClient.post<{ message?: string; user: User }>(
      '/api/auth/profile/avatar',
      form,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    );
    return res.data.user;
  },

  async changePassword(data: { current_password: string; new_password: string }): Promise<void> {
    await apiClient.put('/api/auth/password', data);
  },

  async validateInviteToken(token: string): Promise<{
    email: string;
    full_name: string;
    role: UserRole;
  }> {
    const res = await apiClient.get<{
      email: string;
      full_name: string;
      role: UserRole;
    }>(`/api/auth/accept-invite/validate`, { params: { token } });
    return res.data;
  },

  async acceptInvite(data: { token: string; password: string }): Promise<{ token: string; user: User }> {
    const res = await apiClient.post<AuthTokenResponse>('/api/auth/accept-invite', data);
    localStorage.setItem(TOKEN_KEY, res.data.token);
    return res.data;
  },

  logout(): void {
    localStorage.removeItem(TOKEN_KEY);
  },

  getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  },

  isAuthenticated(): boolean {
    return !!localStorage.getItem(TOKEN_KEY);
  },
};
