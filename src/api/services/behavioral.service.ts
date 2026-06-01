import { apiClient } from '../client';
import type { BehaviorEvent, Insight, ApiResponse } from '../types';

export const behavioralService = {
  async getEvents(): Promise<BehaviorEvent[]> {
    const res = await apiClient.get<ApiResponse<BehaviorEvent[]>>('/api/behavioral/events');
    return res.data.data;
  },

  async analyze(): Promise<Insight[]> {
    const res = await apiClient.post<ApiResponse<Insight[]>>('/api/behavioral/analyze');
    return res.data.data;
  },

  async getInsights(): Promise<Insight[]> {
    const res = await apiClient.get<ApiResponse<Insight[]>>('/api/behavioral/insights');
    return res.data.data;
  },

  async markInsightRead(id: string): Promise<void> {
    await apiClient.patch(`/api/behavioral/insights/${id}/read`);
  },
};
