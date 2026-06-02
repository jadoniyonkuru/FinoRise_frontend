import { apiClient } from '../client';
import type {
  Module, ApiResponse,
  Lesson, QuizData, QuizResult,
  ModuleProgress, CompleteModuleResult,
} from '../types';

export const modulesService = {
  // ── Module CRUD ──────────────────────────────────────────────────────────
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
    is_published?: boolean;
  }): Promise<Module> {
    const res = await apiClient.post<ApiResponse<Module>>('/api/modules', data);
    return res.data.data;
  },

  async update(id: string, data: {
    title?: string;
    description?: string;
    category?: string;
    difficulty?: string;
    xp_reward?: number;
    is_published?: boolean;
  }): Promise<Module> {
    const res = await apiClient.put<ApiResponse<Module>>(`/api/modules/${id}`, data);
    return res.data.data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/api/modules/${id}`);
  },

  // ── Progress ─────────────────────────────────────────────────────────────
  async getMyProgress(): Promise<ModuleProgress[]> {
    const res = await apiClient.get<ApiResponse<ModuleProgress[]>>('/api/modules/my-progress');
    return res.data.data;
  },

  async complete(id: string): Promise<CompleteModuleResult> {
    const res = await apiClient.post<ApiResponse<CompleteModuleResult>>(`/api/modules/${id}/complete`);
    return res.data.data;
  },

  // ── Lessons ──────────────────────────────────────────────────────────────
  async getLessons(moduleId: string): Promise<Lesson[]> {
    const res = await apiClient.get<ApiResponse<Lesson[]>>(`/api/modules/${moduleId}/lessons`);
    return res.data.data;
  },

  async getLessonById(moduleId: string, lessonId: string): Promise<Lesson> {
    const res = await apiClient.get<ApiResponse<Lesson>>(`/api/modules/${moduleId}/lessons/${lessonId}`);
    return res.data.data;
  },

  async createLesson(moduleId: string, data: { title: string; content: string; duration_minutes?: number }): Promise<Lesson> {
    const res = await apiClient.post<ApiResponse<Lesson>>(`/api/modules/${moduleId}/lessons`, data);
    return res.data.data;
  },

  async updateLesson(moduleId: string, lessonId: string, data: { title?: string; content?: string; duration_minutes?: number }): Promise<Lesson> {
    const res = await apiClient.put<ApiResponse<Lesson>>(`/api/modules/${moduleId}/lessons/${lessonId}`, data);
    return res.data.data;
  },

  async deleteLesson(moduleId: string, lessonId: string): Promise<void> {
    await apiClient.delete(`/api/modules/${moduleId}/lessons/${lessonId}`);
  },

  // ── Quiz ─────────────────────────────────────────────────────────────────
  async getQuiz(moduleId: string): Promise<QuizData> {
    const res = await apiClient.get<ApiResponse<QuizData>>(`/api/modules/${moduleId}/quiz`);
    return res.data.data;
  },

  async submitQuiz(moduleId: string, answers: { question_id: string; answer: string }[]): Promise<QuizResult> {
    const res = await apiClient.post<ApiResponse<QuizResult>>(`/api/modules/${moduleId}/quiz/submit`, { answers });
    return res.data.data;
  },

  async addQuizQuestion(moduleId: string, data: { question: string; options: string[]; correct_answer: string; xp_reward?: number }): Promise<void> {
    await apiClient.post(`/api/modules/${moduleId}/quiz/questions`, data);
  },

  async deleteQuizQuestion(moduleId: string, questionId: string): Promise<void> {
    await apiClient.delete(`/api/modules/${moduleId}/quiz/questions/${questionId}`);
  },
};
