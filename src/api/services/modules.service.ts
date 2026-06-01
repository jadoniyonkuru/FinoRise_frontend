import { apiClient } from '../client';
import type { Module, ApiResponse } from '../types';

export const modulesService = {
  async getAll(): Promise<Module[]> {
    const res = await apiClient.get<ApiResponse<Module[]>>('/api/modules');
    return res.data.data;
  },

  async getById(id: string): Promise<Module> {
    const res = await apiClient.get<ApiResponse<Module>>(`/api/modules/${id}`);
    return res.data.data;
  },

  async create(data: {
    title: string;
    description: string;
    category?: string;
    difficulty?: string;
    xp_reward?: number;
  }): Promise<Module> {
    const res = await apiClient.post<ApiResponse<Module>>('/api/modules', data);
    return res.data.data;
  },

  async update(
    id: string,
    data: {
      title?: string;
      description?: string;
      category?: string;
      difficulty?: string;
      xp_reward?: number;
    }
  ): Promise<Module> {
    const res = await apiClient.put<ApiResponse<Module>>(`/api/modules/${id}`, data);
    return res.data.data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/api/modules/${id}`);
  },
};
