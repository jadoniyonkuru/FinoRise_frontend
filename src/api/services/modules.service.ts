import { apiClient } from '../client';
import type { Module } from '../types';

export const modulesService = {
  async getAll(): Promise<Module[]> {
    const res = await apiClient.get<Module[]>('/api/modules');
    return res.data;
  },

  async getById(id: string): Promise<Module> {
    const res = await apiClient.get<Module>(`/api/modules/${id}`);
    return res.data;
  },

  async create(data: {
    title: string;
    description: string;
    category?: string;
    difficulty?: string;
    xp_reward?: number;
  }): Promise<Module> {
    const res = await apiClient.post<Module>('/api/modules', data);
    return res.data;
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
    const res = await apiClient.put<Module>(`/api/modules/${id}`, data);
    return res.data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/api/modules/${id}`);
  },
};
