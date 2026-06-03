import { apiClient } from '../client';
import type { User, AdminAnalytics } from '../types';

export const adminService = {
  async getUsers(): Promise<User[]> {
    const res = await apiClient.get<{ users: User[] }>('/api/admin/users');
    return res.data.users;
  },

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/api/admin/users/${id}`);
  },

  async getAnalytics(): Promise<AdminAnalytics> {
    const res = await apiClient.get<AdminAnalytics>('/api/admin/analytics');
    return res.data;
  },
};
