import { apiClient, TOKEN_KEY } from '../client';
import type { User, AuthTokenResponse } from '../types';

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
    const res = await apiClient.get<User>('/api/auth/profile');
    return res.data;
  },

  async updateProfile(data: { full_name?: string; phone?: string }): Promise<User> {
    const res = await apiClient.put<User>('/api/auth/profile', data);
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
