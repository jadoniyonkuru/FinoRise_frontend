import { apiClient } from '../client';
import type { AiLog, ApiResponse } from '../types';

interface AiReplyResponse {
  reply: string;
}

export const aiService = {
  async ask(message: string): Promise<string> {
    const res = await apiClient.post<ApiResponse<AiReplyResponse>>('/api/ai/ask', { message });
    return res.data.data.reply;
  },

  async explainSimulation(data: {
    title: string;
    category: string;
    difficulty: string;
    userChoice: string;
    correctChoice: string;
    isCorrect: boolean;
    feedback: string;
  }): Promise<string> {
    const res = await apiClient.post<ApiResponse<AiReplyResponse>>(
      '/api/ai/explain-simulation',
      data
    );
    return res.data.data.reply;
  },

  async getRecommendations(): Promise<string> {
    const res = await apiClient.get<ApiResponse<AiReplyResponse>>('/api/ai/recommendations');
    return res.data.data.reply;
  },

  async getGuidance(): Promise<string> {
    const res = await apiClient.get<ApiResponse<AiReplyResponse>>('/api/ai/guidance');
    return res.data.data.reply;
  },

  async getLogs(): Promise<AiLog[]> {
    const res = await apiClient.get<ApiResponse<AiLog[]>>('/api/ai/logs');
    return res.data.data;
  },
};
