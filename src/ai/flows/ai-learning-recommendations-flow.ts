'use server';
/**
 * @fileOverview An AI agent that provides personalized learning recommendations.
 *
 * - aiLearningRecommendations - A function that handles the AI learning recommendation process.
 * - AiLearningRecommendationsInput - The input type for the aiLearningRecommendations function.
 * - AiLearningRecommendationsOutput - The return type for the aiLearningRecommendations function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const AiLearningRecommendationsInputSchema = z.object({
  quizScores: z.array(
    z.object({
      moduleName: z.string().describe('The name of the learning module.'),
      lessonName: z.string().describe('The name of the lesson within the module.'),
      score: z.number().describe('The user\'s score on the quiz (e.g., 80).'),
      totalQuestions: z.number().describe('The total number of questions in the quiz (e.g., 100).'),
    })
  ).describe('A list of the user\'s quiz performance, including scores and module/lesson details.'),
  simulationOutcomes: z.array(
    z.object({
      simulationName: z.string().describe('The name of the financial simulation.'),
      scenario: z.string().describe('A brief description of the scenario played in the simulation.'),
      resultSummary: z.string().describe('A summary of the outcome of the simulation.'),
      behavioralInsights: z.string().describe('AI-generated insights into the user\'s financial behavior during the simulation.'),
    })
  ).describe('A list of the user\'s simulation outcomes, including summaries and behavioral insights.'),
  financialGoals: z.array(z.string()).describe('A list of the user\'s stated financial goals (e.g., "save for a down payment", "invest for retirement").'),
});
export type AiLearningRecommendationsInput = z.infer<typeof AiLearningRecommendationsInputSchema>;

const AiLearningRecommendationsOutputSchema = z.object({
  recommendations: z.array(
    z.object({
      type: z.enum(['module', 'lesson', 'simulation']).describe('The type of recommendation (e.g., "module", "lesson", "simulation").'),
      name: z.string().describe('The name of the recommended module, lesson, or simulation.'),
      reason: z.string().describe('A concise explanation for why this recommendation is relevant.'),
    })
  ).describe('A list of personalized learning and simulation recommendations for the user.'),
});
export type AiLearningRecommendationsOutput = z.infer<typeof AiLearningRecommendationsOutputSchema>;

export async function aiLearningRecommendations(input: AiLearningRecommendationsInput): Promise<AiLearningRecommendationsOutput> {
  return aiLearningRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'aiLearningRecommendationsPrompt',
  input: { schema: AiLearningRecommendationsInputSchema },
  output: { schema: AiLearningRecommendationsOutputSchema },
  prompt: `You are an AI financial coach specializing in recommending personalized learning paths and simulations.
Your goal is to analyze a user's financial performance data and goals to suggest relevant learning modules, specific lessons, or new simulations.
The recommendations should help the user address knowledge gaps, improve their financial understanding, and progress towards their financial objectives.

Here is the user's data:

User's Financial Goals:
{{#if financialGoals}}
{{#each financialGoals}}
- {{{this}}}
{{/each}}
{{else}}
No specific financial goals provided.
{{/if}}

Quiz Performance:
{{#if quizScores}}
{{#each quizScores}}
- Module: {{{moduleName}}}, Lesson: {{{lessonName}}}, Score: {{{score}}}/{{{totalQuestions}}}
{{/each}}
{{else}}
No recent quiz scores available.
{{/if}}

Simulation Outcomes:
{{#if simulationOutcomes}}
{{#each simulationOutcomes}}
- Simulation: {{{simulationName}}}, Scenario: {{{scenario}}}
  Summary: {{{resultSummary}}}
  Behavioral Insights: {{{behavioralInsights}}}
{{/each}}
{{else}}
No recent simulation outcomes available.
{{/if}}

Based on the information above, provide up to 5 specific recommendations. For each recommendation, specify its 'type' (either 'module', 'lesson', or 'simulation'), its 'name', and a concise 'reason' explaining why it's being recommended. Prioritize recommendations that directly address identified weaknesses or align with stated financial goals.`,
});

const aiLearningRecommendationsFlow = ai.defineFlow(
  {
    name: 'aiLearningRecommendationsFlow',
    inputSchema: AiLearningRecommendationsInputSchema,
    outputSchema: AiLearningRecommendationsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
