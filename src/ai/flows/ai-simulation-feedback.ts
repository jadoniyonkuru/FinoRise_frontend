'use server';
/**
 * @fileOverview Provides AI-powered feedback and insights on user financial simulation decisions.
 *
 * - aiSimulationFeedback - A function that processes simulation results and generates AI feedback.
 * - SimulationFeedbackInput - The input type for the aiSimulationFeedback function.
 * - SimulationFeedbackOutput - The return type for the aiSimulationFeedback function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SimulationFeedbackInputSchema = z.object({
  simulationName: z.string().describe('The name or title of the financial simulation.'),
  scenarioDescription: z.string().describe('A brief description of the simulation scenario.'),
  userDecisions: z.array(
    z.object({
      step: z.string().describe('The step or phase in the simulation.'),
      decision: z.string().describe('The specific decision made by the user.'),
      outcome: z.string().describe('The immediate outcome or consequence of the decision.'),
    })
  ).describe('A list of decisions made by the user throughout the simulation and their outcomes.'),
  initialFinancialState: z.object({
    cash: z.number().describe('The starting cash balance.'),
    debt: z.number().describe('The starting debt amount.'),
    savings: z.number().describe('The starting savings amount.'),
    investments: z.number().describe('The starting investment value.'),
  }).describe('The financial state of the user at the beginning of the simulation.'),
  finalFinancialState: z.object({
    cash: z.number().describe('The final cash balance.'),
    debt: z.number().describe('The final debt amount.'),
    savings: z.number().describe('The final savings amount.'),
    investments: z.number().describe('The final investment value.'),
  }).describe('The financial state of the user at the end of the simulation.'),
  userFinancialGoals: z.string().optional().describe('Optional: The user\u0027s stated financial goals.'),
});
export type SimulationFeedbackInput = z.infer<typeof SimulationFeedbackInputSchema>;

const SimulationFeedbackOutputSchema = z.object({
  overallFeedback: z.string().describe('A general summary of the user\u0027s performance in the simulation.'),
  behavioralInsights: z.array(z.string()).describe('Specific observations about the user\u0027s financial decision-making patterns (e.g., risk-averse, impulsive, long-term oriented).'),
  actionableAdvice: z.array(z.string()).describe('Concrete, practical advice based on the simulation results and observed behavior.'),
  explanationOfConsequences: z.string().describe('A clear explanation of how the user\u0027s decisions led to the final financial state.'),
  suggestedImprovements: z.array(z.string()).describe('Areas where the user can improve their financial literacy or decision-making skills.'),
});
export type SimulationFeedbackOutput = z.infer<typeof SimulationFeedbackOutputSchema>;

export async function aiSimulationFeedback(input: SimulationFeedbackInput): Promise<SimulationFeedbackOutput> {
  return aiSimulationFeedbackFlow(input);
}

const aiSimulationFeedbackPrompt = ai.definePrompt({
  name: 'aiSimulationFeedbackPrompt',
  input: { schema: SimulationFeedbackInputSchema },
  output: { schema: SimulationFeedbackOutputSchema },
  prompt: `You are an AI Financial Coach specializing in behavioral economics and financial literacy. Your role is to analyze a user's performance in a financial simulation, provide personalized feedback, identify behavioral patterns, and offer actionable advice.

Here is the data from the user's recent financial simulation:

Simulation Name: {{{simulationName}}}
Scenario Description: {{{scenarioDescription}}}

Initial Financial State:
Cash: $1{{initialFinancialState.cash}}
Debt: $1{{initialFinancialState.debt}}
Savings: $1{{initialFinancialState.savings}}
Investments: $1{{initialFinancialState.investments}}

Final Financial State:
Cash: $1{{finalFinancialState.cash}}
Debt: $1{{finalFinancialState.debt}}
Savings: $1{{finalFinancialState.savings}}
Investments: $1{{finalFinancialState.investments}}

User Decisions and Outcomes:
{{#each userDecisions}}
Step: {{{step}}}
Decision: {{{decision}}}
Outcome: {{{outcome}}}

{{/each}}

{{#if userFinancialGoals}}
User's stated financial goals: {{{userFinancialGoals}}}
{{/if}}

Based on this information, provide comprehensive feedback in the following structured JSON format:

1.  **Overall Feedback**: A general summary of their performance, highlighting key strengths and weaknesses.
2.  **Behavioral Insights**: Identify specific behavioral patterns demonstrated by their decisions (e.g., risk-averse, impulsive, prioritizing short-term gains, avoiding debt).
3.  **Actionable Advice**: Offer concrete, practical steps they can take to improve their financial decisions based on their simulation performance and behavioral patterns.
4.  **Explanation of Consequences**: Clearly explain how their specific decisions led to the final financial state, both positive and negative.
5.  **Suggested Improvements**: List specific areas of financial literacy or decision-making skills they should focus on improving.`,
});

const aiSimulationFeedbackFlow = ai.defineFlow(
  {
    name: 'aiSimulationFeedbackFlow',
    inputSchema: SimulationFeedbackInputSchema,
    outputSchema: SimulationFeedbackOutputSchema,
  },
  async (input) => {
    const { output } = await aiSimulationFeedbackPrompt(input);
    return output!;
  }
);
