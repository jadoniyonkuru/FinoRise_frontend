import { apiClient } from '../client';
import type { Badge, XpInfo, StreakInfo, LeaderboardEntry } from '../types';

export const gamificationService = {
  async getXp(): Promise<XpInfo> {
    const res = await apiClient.get<XpInfo>('/api/gamification/xp');
    return res.data;
  },

  async awardXp(data: { amount: number; reason: string }): Promise<XpInfo> {
    const res = await apiClient.post<XpInfo>('/api/gamification/xp/award', data);
    return res.data;
  },

  async getBadges(): Promise<Badge[]> {
    const res = await apiClient.get<{ badges: Badge[] }>('/api/gamification/badges');
    return res.data.badges;
  },

  async getStreak(): Promise<StreakInfo> {
    const res = await apiClient.get<StreakInfo>('/api/gamification/streak');
    return res.data;
  },

  async getLeaderboard(): Promise<LeaderboardEntry[]> {
    const res = await apiClient.get<{ leaderboard: LeaderboardEntry[] }>('/api/gamification/leaderboard');
    return res.data.leaderboard;
  },
};
