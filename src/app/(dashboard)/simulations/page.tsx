
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Gamepad2, AlertTriangle, Wallet, LineChart, Briefcase } from "lucide-react"
import Link from "next/link"

const scenarios = [
  {
    id: "the-rent-trap",
    title: "The Rent Trap",
    category: "Budgeting",
    desc: "Your landlord just raised rent by 20%. How will you adjust your spending to survive the month?",
    icon: Wallet,
    difficulty: "Beginner",
    xp: "250 XP",
    status: "available",
    color: "text-blue-400"
  },
  {
    id: "the-bull-run",
    title: "The Bull Run",
    category: "Investments",
    desc: "The market is euphoric. Do you ride the wave or pull out before the crash? Time is ticking.",
    icon: LineChart,
    difficulty: "Intermediate",
    xp: "500 XP",
    status: "available",
    color: "text-purple-400"
  },
  {
    id: "debt-spiral",
    title: "Debt Spiral",
    category: "Debt Management",
    desc: "Credit card debt is compounding. Strategize your way out using Avalanche vs Snowball methods.",
    icon: AlertTriangle,
    difficulty: "Intermediate",
    xp: "450 XP",
    status: "completed",
    color: "text-red-400"
  },
  {
    id: "startup-hustle",
    title: "Startup Hustle",
    category: "Career",
    desc: "You've been offered stock options or a higher salary. Which choice fuels your future wealth?",
    icon: Briefcase,
    difficulty: "Advanced",
    xp: "1000 XP",
    status: "locked",
    color: "text-yellow-400"
  }
]

export default function SimulationsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-headline font-bold text-3xl">Simulation Center</h1>
          <p className="text-muted-foreground">Learn by doing. Your decisions have real consequences in our hyper-realistic narratives.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="glass py-1.5 px-3 border-white/10 text-xs font-bold uppercase tracking-wider">
            Total Completed: 12
          </Badge>
          <Badge variant="outline" className="glass py-1.5 px-3 border-primary/20 text-xs font-bold uppercase tracking-wider text-primary">
            Avg. Score: 8.4/10
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {scenarios.map((scenario, i) => (
          <Card key={i} className={`glass border-white/5 group relative overflow-hidden transition-all duration-300 ${scenario.status === 'locked' ? 'opacity-60 grayscale' : 'hover:border-primary/50'}`}>
            <CardHeader>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="secondary" className="bg-white/5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground border-white/10">
                  {scenario.category}
                </Badge>
                {scenario.status === 'completed' && (
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-[10px] font-bold uppercase">Completed</Badge>
                )}
                {scenario.status === 'locked' && (
                  <Badge variant="outline" className="text-[10px] font-bold uppercase border-white/10">Locked</Badge>
                )}
              </div>
              <CardTitle className="text-xl font-headline flex items-center gap-3">
                <scenario.icon className={`w-6 h-6 ${scenario.color}`} />
                {scenario.title}
              </CardTitle>
              <CardDescription className="line-clamp-2 mt-2 leading-relaxed">
                {scenario.desc}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between pt-4 border-t border-white/5">
                <div className="space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Difficulty</p>
                  <p className="text-sm font-semibold">{scenario.difficulty}</p>
                </div>
                <div className="text-right space-y-1">
                  <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Potential</p>
                  <p className="text-sm font-bold text-primary">{scenario.xp}</p>
                </div>
              </div>
              
              <div className="mt-6">
                <Button 
                  asChild
                  className={`w-full ${scenario.status === 'locked' ? 'bg-muted pointer-events-none' : 'bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20'}`}
                  disabled={scenario.status === 'locked'}
                >
                  <Link href={`/simulations/${scenario.id}`}>
                    {scenario.status === 'completed' ? 'Replay Scenario' : 'Start Simulation'}
                  </Link>
                </Button>
              </div>
            </CardContent>

            <scenario.icon className="absolute -right-8 -bottom-8 w-32 h-32 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity rotate-12" />
          </Card>
        ))}

        <Card className="glass border-dashed border-white/10 flex flex-col items-center justify-center p-8 text-center bg-white/[0.02] hover:bg-white/[0.04] transition-colors cursor-pointer group">
          <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <Gamepad2 className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="font-headline font-bold text-xl mb-2">Custom Sandbox</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-6 max-w-[200px]">
            Define your own starting capital and goals for an AI-narrated session.
          </p>
          <Button 
            variant="outline" 
            className="glass border-white/20 group-hover:border-primary/50 group-hover:bg-primary group-hover:text-white hover:bg-primary hover:text-white transition-all"
          >
            Unlock at Level 15
          </Button>
        </Card>
      </div>
    </div>
  )
}
