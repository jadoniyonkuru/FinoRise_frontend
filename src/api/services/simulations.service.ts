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

  async addStep(
    simulationId: string,
    data: {
      step_number: number;
      scenario_text: string;
      subject_title?: string;
      subject_description?: string;
      choices?: { choice_text: string; outcome_text?: string; financial_impact?: number; xp_bonus?: number }[];
    }
  ): Promise<void> {
    await apiClient.post(`/api/simulations/${simulationId}/steps`, data);
  },

  async createWithSubjects(
    simulation: {
      title: string;
      description: string;
      category: string;
      difficulty: string;
      xp_reward?: number;
      is_published?: boolean;
    },
    subjects: {
      title: string;
      description: string;
      questions: { question: string; answer: string }[];
    }[]
  ): Promise<Simulation> {
    const created = await this.create(simulation);
    let stepNumber = 1;
    for (const subject of subjects) {
      for (const q of subject.questions) {
        const question = q.question.trim();
        const answer = q.answer.trim();
        if (!question || !answer) continue;
        try {
          await this.addStep(created.id, {
            step_number: stepNumber++,
            scenario_text: question,
            subject_title: subject.title.trim() || undefined,
            subject_description: subject.description.trim() || undefined,
            choices: [
              {
                choice_text: answer,
                outcome_text: `Correct: ${answer}`,
                financial_impact: 0,
                xp_bonus: 5,
              },
            ],
          });
        } catch {
          /* step endpoint may be unavailable; simulation still created */
        }
      }
    }
    return created;
  },
};
