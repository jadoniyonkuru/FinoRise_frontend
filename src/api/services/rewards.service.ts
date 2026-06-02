import { apiClient } from '../client';
import type { Reward, Redemption, RewardType, RedeemResult, ApiResponse } from '../types';

export const rewardsService = {
  async getAll(): Promise<Reward[]> {
    const res = await apiClient.get<ApiResponse<Reward[]>>('/api/rewards');
    return res.data.data;
  },

  async getById(id: string): Promise<Reward> {
    const res = await apiClient.get<ApiResponse<Reward>>(`/api/rewards/${id}`);
    return res.data.data;
  },

  async create(data: {
    title: string;
    reward_type: RewardType;
    xp_cost: number;
    description?: string;
    quantity?: number;
    valid_until?: string;
  }): Promise<Reward> {
    const res = await apiClient.post<ApiResponse<Reward>>('/api/rewards', data);
    return res.data.data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/api/rewards/${id}`);
  },

  async redeem(id: string): Promise<RedeemResult> {
    const res = await apiClient.post<ApiResponse<RedeemResult>>(`/api/rewards/${id}/redeem`);
    return res.data.data;
  },

  async getMyRedemptions(): Promise<Redemption[]> {
    const res = await apiClient.get<ApiResponse<Redemption[]>>('/api/rewards/my-redemptions');
    return res.data.data;
  },
};
