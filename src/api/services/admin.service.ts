import { apiClient } from '../client';
import type { User, AdminAnalytics, UserRole, AccountStatus } from '../types';

export const adminService = {
  async getUsers(): Promise<User[]> {
    const res = await apiClient.get<{ users: User[] }>('/api/admin/users');
    return res.data.users;
  },

  async inviteUser(data: {
    full_name: string;
    email: string;
    role: UserRole;
  }): Promise<{ user: User; message: string }> {
    const res = await apiClient.post<{ user: User; message: string }>('/api/admin/users/invite', data);
    return res.data;
  },

  async updateUser(
    id: string,
    data: {
      full_name?: string;
      email?: string;
      role?: UserRole;
      account_status?: AccountStatus;
    }
  ): Promise<User> {
    const res = await apiClient.put<{ user: User }>(`/api/admin/users/${id}`, data);
    return res.data.user;
  },

  async resendInvite(id: string): Promise<void> {
    await apiClient.post(`/api/admin/users/${id}/resend-invite`);
  },

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/api/admin/users/${id}`);
  },

  async getAnalytics(): Promise<AdminAnalytics> {
    const res = await apiClient.get<AdminAnalytics>('/api/admin/analytics');
    return res.data;
  },
};
