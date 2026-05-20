"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { 
  LineChart as ReChartLine, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, ShieldCheck, Zap, ArrowDownRight, ArrowUpRight } from "lucide-react"

const performanceData = [
  { month: "Jan", score: 620 },
  { month: "Feb", score: 645 },
  { month: "Mar", score: 690 },
  { month: "Apr", score: 680 },
  { month: "May", score: 720 },
  { month: "Jun", score: 840 },
]

const behaviorData = [
  { subject: 'Risk Management', A: 85, fullMark: 100 },
  { subject: 'Goal Setting', A: 70, fullMark: 100 },
  { subject: 'Impulse Control', A: 60, fullMark: 100 },
  { subject: 'Long-term Planning', A: 90, fullMark: 100 },
  { subject: 'Market Awareness', A: 75, fullMark: 100 },
  { subject: 'Debt Repayment', A: 95, fullMark: 100 },
]

export default function AnalyticsPage() {
  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-headline font-bold text-3xl">Dynamic Analytics</h1>
          <p className="text-muted-foreground">Deep behavioral analysis of your financial performance.</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="glass h-10 px-4 border-white/10">Last 6 Months</Badge>
          <Badge className="bg-primary shadow-lg shadow-primary/20 h-10 px-4">Download Report</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Growth Chart */}
        <Card className="lg:col-span-2 glass border-white/5 p-6 h-[450px] flex flex-col">
          <CardHeader className="px-0 pt-0">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl">Financial Growth Score</CardTitle>
                <CardDescription>Composite score based on learning & simulations</CardDescription>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold font-headline text-primary">840</span>
                <p className="text-[10px] text-green-400 flex items-center justify-end font-bold">
                  <ArrowUpRight className="w-3 h-3 mr-1" />
                  +12.4%
                </p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 px-0 pb-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={performanceData}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff10" />
                <XAxis 
                  dataKey="month" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{fill: '#888', fontSize: 12}} 
                  dy={10}
                />
                <YAxis 
                  hide
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#14111A', borderColor: '#ffffff10', borderRadius: '12px' }}
                  itemStyle={{ color: '#8B5CF6' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="score" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  fillOpacity={1} 
                  fill="url(#colorScore)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Behavior Radar */}
        <Card className="glass border-white/5 p-6 flex flex-col items-center justify-center">
          <CardHeader className="px-0 pt-0 w-full">
            <CardTitle className="text-xl">Risk Profile</CardTitle>
            <CardDescription>Behavioral dimensions analysis</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={behaviorData}>
                <PolarGrid stroke="#ffffff10" />
                <PolarAngleAxis dataKey="subject" tick={{fill: '#888', fontSize: 10}} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                <Radar
                  name="Alex"
                  dataKey="A"
                  stroke="#8B5CF6"
                  fill="#8B5CF6"
                  fillOpacity={0.3}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Learning Hours", value: "24.5h", trend: "+12%", icon: Zap, color: "text-primary" },
          { label: "Avg. Quiz Score", value: "92%", trend: "+2%", icon: TrendingUp, color: "text-secondary" },
          { label: "Simulated Net Worth", value: "$45,200", trend: "+$4k", icon: ShieldCheck, color: "text-primary" },
          { label: "Decisions Made", value: "142", trend: "+18", icon: TrendingUp, color: "text-secondary" },
        ].map((stat, i) => (
          <Card key={i} className="glass border-white/5 p-5">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">{stat.label}</p>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-bold font-headline">{stat.value}</span>
                  <span className="text-[10px] font-bold text-green-400">{stat.trend}</span>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
