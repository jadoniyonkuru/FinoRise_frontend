import { apiClient } from '../client';
import type { ApiResponse, LearnerAnalytics } from '../types';

export const analyticsService = {
  async getLearnerAnalytics(): Promise<LearnerAnalytics> {
    const res = await apiClient.get<ApiResponse<LearnerAnalytics>>('/api/analytics');
    return res.data.data;
  },
};
