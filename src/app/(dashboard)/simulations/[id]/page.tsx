
"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  ArrowRight, 
  BrainCircuit, 
  Zap, 
  TrendingUp, 
  TrendingDown, 
  ShieldCheck, 
  RotateCcw,
  CheckCircle2,
  ChevronLeft
} from "lucide-react"
import Link from "next/link"
import { aiSimulationFeedback, type SimulationFeedbackOutput } from "@/ai/flows/ai-simulation-feedback"

const SIM_DATA: Record<string, any> = {
  "the-rent-trap": {
    title: "The Rent Trap",
    description: "Your landlord just raised rent by 20%. You need to find $400 extra this month.",
    initialState: { cash: 2000, debt: 0, savings: 1000, investments: 500 },
    xp: 250,
    steps: [
      {
        question: "How do you handle the immediate shock to your monthly budget?",
        options: [
          { 
            text: "Cut all discretionary spending (dining, hobbies)", 
            outcome: "Saved $300, but stress levels increased.",
            impact: { cash: -100 } 
          },
          { 
            text: "Take a high-interest payday loan for the difference", 
            outcome: "Covered rent, but debt is growing fast.",
            impact: { cash: 0, debt: 450 } 
          },
          { 
            text: "Sell some of your stock portfolio", 
            outcome: "Instant cash, but lost out on potential growth.",
            impact: { cash: 0, investments: -400 } 
          }
        ]
      },
      {
        question: "Your car needs an urgent repair costing $200. What's the plan?",
        options: [
          { 
            text: "Use your emergency savings", 
            outcome: "Fixed the car, but savings are depleted.",
            impact: { savings: -200 } 
          },
          { 
            text: "Put it on a credit card", 
            outcome: "Delayed the pain, but interest will bite.",
            impact: { debt: 200 } 
          }
        ]
      }
    ]
  },
  "the-bull-run": {
    title: "The Bull Run",
    description: "The market is up 15% this month. FOMO is setting in.",
    initialState: { cash: 5000, debt: 0, savings: 2000, investments: 10000 },
    xp: 500,
    steps: [
      {
        question: "Your friends are talking about a hot new tech stock. Do you jump in?",
        options: [
          { 
            text: "Invest $2,000 from your cash reserve", 
            outcome: "The stock pumped another 10%! You're up.",
            impact: { cash: -2000, investments: 2200 } 
          },
          { 
            text: "Stick to your diversified ETF strategy", 
            outcome: "Stable growth, but you missed the 10% pump.",
            impact: { investments: 200 } 
          }
        ]
      }
    ]
  }
}

export default function SimulationPlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const sim = SIM_DATA[id] || SIM_DATA["the-rent-trap"]

  const [currentStep, setCurrentStep] = useState(0)
  const [financialState, setFinancialState] = useState(sim.initialState)
  const [decisions, setDecisions] = useState<any[]>([])
  const [isFinishing, setIsFinishing] = useState(false)
  const [feedback, setFeedback] = useState<SimulationFeedbackOutput | null>(null)

  const handleDecision = (option: any) => {
    const newDecisions = [
      ...decisions,
      {
        step: `Step ${currentStep + 1}`,
        decision: option.text,
        outcome: option.outcome
      }
    ]
    setDecisions(newDecisions)

    // Update financial state
    setFinancialState((prev: { cash: any; debt: any; savings: any; investments: any }) => ({
      ...prev,
      cash: prev.cash + (option.impact.cash || 0),
      debt: prev.debt + (option.impact.debt || 0),
      savings: prev.savings + (option.impact.savings || 0),
      investments: prev.investments + (option.impact.investments || 0),
    }))

    if (currentStep < sim.steps.length - 1) {
      setCurrentStep(prev => prev + 1)
    } else {
      handleFinish(newDecisions)
    }
  }

  const handleFinish = async (finalDecisions: any[]) => {
    setIsFinishing(true)
    try {
      const result = await aiSimulationFeedback({
        simulationName: sim.title,
        scenarioDescription: sim.description,
        userDecisions: finalDecisions,
        initialFinancialState: sim.initialState,
        finalFinancialState: financialState,
      })
      setFeedback(result)
    } catch (error) {
      console.error("AI Feedback failed", error)
    } finally {
      setIsFinishing(false)
    }
  }

  if (feedback) {
    return (
      <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-700">
        <div className="flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => router.push("/simulations")} className="glass">
            <ChevronLeft className="w-4 h-4 mr-2" /> Back to Center
          </Button>
          <Badge className="bg-green-500 shadow-lg shadow-green-500/20">Simulation Complete</Badge>
        </div>

        <Card className="glass border-primary/20 bg-primary/5 overflow-hidden">
          <CardHeader className="text-center pb-8 border-b border-white/5">
            <div className="w-16 h-16 rounded-2xl bg-primary flex items-center justify-center mx-auto mb-4 shadow-xl shadow-primary/20">
              <CheckCircle2 className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-headline font-bold">Great Effort!</CardTitle>
            <CardDescription className="text-base mt-2">You earned +{sim.xp} XP and a new behavioral insight.</CardDescription>
          </CardHeader>
          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
              {[
                { label: "Final Cash", value: `$${financialState.cash}`, icon: Zap },
                { label: "Total Debt", value: `$${financialState.debt}`, icon: TrendingDown, color: "text-red-400" },
                { label: "Savings", value: `$${financialState.savings}`, icon: ShieldCheck, color: "text-primary" },
                { label: "Investments", value: `$${financialState.investments}`, icon: TrendingUp, color: "text-secondary" },
              ].map((stat, i) => (
                <div key={i} className="text-center space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</p>
                  <p className={`text-xl font-bold font-headline ${stat.color || ""}`}>{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="space-y-8">
              <div className="space-y-4">
                <h3 className="font-headline font-bold text-xl flex items-center gap-2">
                  <BrainCircuit className="w-6 h-6 text-primary" />
                  AI Coach Feedback
                </h3>
                <div className="p-6 rounded-2xl bg-white/5 border border-white/10 leading-relaxed italic text-muted-foreground">
                  "{feedback.overallFeedback}"
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-primary">Behavioral Insights</h4>
                  <ul className="space-y-2">
                    {feedback.behavioralInsights.map((insight, i) => (
                      <li key={i} className="text-sm flex gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-bold uppercase tracking-widest text-secondary">Actionable Advice</h4>
                  <ul className="space-y-2">
                    {feedback.actionableAdvice.map((advice, i) => (
                      <li key={i} className="text-sm flex gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-secondary mt-1.5 shrink-0" />
                        {advice}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </CardContent>
          <div className="p-6 bg-white/5 flex gap-4">
            <Button className="flex-1 bg-primary" onClick={() => window.location.reload()}>
              <RotateCcw className="w-4 h-4 mr-2" /> Play Again
            </Button>
            <Button variant="outline" className="flex-1 glass" asChild>
              <Link href="/analytics">View Progress Map</Link>
            </Button>
          </div>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 h-[calc(100vh-160px)] flex flex-col">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" onClick={() => router.push("/simulations")} className="glass">
          <ChevronLeft className="w-4 h-4 mr-2" /> Quit Simulation
        </Button>
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Step {currentStep + 1} of {sim.steps.length}
          </span>
          <div className="w-32">
            <Progress value={((currentStep + 1) / sim.steps.length) * 100} className="h-1.5" />
          </div>
        </div>
      </div>

      <Card className="flex-1 glass border-white/5 flex flex-col overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8">
           <Zap className="w-24 h-24 text-primary opacity-[0.03] -rotate-12" />
        </div>

        <CardHeader className="p-10 pb-6">
          <Badge variant="outline" className="w-fit mb-4 border-primary/30 text-primary">{sim.title}</Badge>
          <CardTitle className="text-3xl font-headline font-bold leading-tight max-w-2xl">
            {sim.steps[currentStep].question}
          </CardTitle>
          <CardDescription className="text-lg mt-4 max-w-xl">
            {sim.description}
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 px-10 pt-6 flex flex-col justify-end pb-12">
          <div className="space-y-4 max-w-2xl">
            {sim.steps[currentStep].options.map((option: any, i: number) => (
              <Button
                key={i}
                variant="outline"
                className="w-full h-auto p-6 justify-between items-center group glass hover:bg-primary hover:border-primary/50 transition-all text-left"
                onClick={() => handleDecision(option)}
                disabled={isFinishing}
              >
                <div className="flex-1 pr-8">
                  <p className="font-bold text-lg group-hover:text-white transition-colors">{option.text}</p>
                </div>
                <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-white group-hover:translate-x-1 transition-all" />
              </Button>
            ))}
          </div>
        </CardContent>

        {isFinishing && (
          <div className="absolute inset-0 bg-background/80 backdrop-blur-xl z-50 flex flex-col items-center justify-center text-center p-8 space-y-6">
            <div className="relative">
              <div className="w-24 h-24 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
              <BrainCircuit className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 text-primary animate-pulse" />
            </div>
            <div className="space-y-2">
              <h3 className="text-2xl font-headline font-bold">Analyzing Your Decisions</h3>
              <p className="text-muted-foreground">Our AI Coach is evaluating your financial behavior...</p>
            </div>
          </div>
        )}
      </Card>
      
      {/* Live Financial Bar */}
      <div className="grid grid-cols-4 gap-4 px-2">
        {[
          { label: "Cash", value: financialState.cash },
          { label: "Debt", value: financialState.debt },
          { label: "Savings", value: financialState.savings },
          { label: "Investments", value: financialState.investments },
        ].map((stat, i) => (
          <div key={i} className="glass p-3 rounded-xl border-white/5">
            <p className="text-[9px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</p>
            <p className="text-sm font-bold font-headline">${stat.value}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
