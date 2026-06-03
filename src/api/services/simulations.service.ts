import { apiClient } from '../client';
import type { ApiResponse, Simulation, SimulationWithSteps, SimulationStartResult, SubmitChoiceResult, SimulationAttempt } from '../types';

export const simulationsService = {
  async getAll(): Promise<Simulation[]> {
    const res = await apiClient.get<{ simulations: Simulation[] }>('/api/simulations');
    return res.data.simulations;
  },

  async getById(id: string): Promise<SimulationWithSteps> {
    const res = await apiClient.get<{ simulation: SimulationWithSteps }>(`/api/simulations/${id}`);
    return res.data.simulation;
  },

  async start(id: string): Promise<SimulationStartResult> {
    const res = await apiClient.post<SimulationStartResult>(`/api/simulations/${id}/start`);
    return res.data;
  },

  async submitChoice(attempt_id: string, choice_id: string): Promise<SubmitChoiceResult> {
    const res = await apiClient.post<SubmitChoiceResult>('/api/simulations/submit', { attempt_id, choice_id });
    return res.data;
  },

  async getHistory(): Promise<SimulationAttempt[]> {
    const res = await apiClient.get<{ history: SimulationAttempt[] }>('/api/simulations/history');
    return res.data.history;
  },

  async create(data: {
    title: string;
    description: string;
    category: string;
    difficulty: string;
    xp_reward?: number;
    is_published?: boolean;
  }): Promise<Simulation> {
    const res = await apiClient.post<ApiResponse<Simulation>>('/api/simulations', data);
    return res.data.data;
  },

  async update(id: string, data: Partial<{
    title: string;
    description: string;
    category: string;
    difficulty: string;
    xp_reward: number;
    is_published: boolean;
  }>): Promise<Simulation> {
    const res = await apiClient.put<ApiResponse<Simulation>>(`/api/simulations/${id}`, data);
    return res.data.data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/api/simulations/${id}`);
  },
};
