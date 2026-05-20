import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Zap, Play, Target, Award, ArrowUpRight, TrendingUp } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function DashboardPage() {
  const learningImg = PlaceHolderImages.find(img => img.id === 'module-budgeting');

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-background to-background p-8 border border-white/5">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <h1 className="font-headline font-bold text-3xl md:text-4xl tracking-tight leading-none">
              Welcome back, <span className="text-primary">Alex</span>
            </h1>
            <p className="text-muted-foreground max-w-md">
              You're currently in the top 15% of users this week. Complete your next simulation to maintain your streak!
            </p>
            <div className="flex gap-4 pt-4">
              <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
                <Link href="/simulations">Continue Simulation</Link>
              </Button>
              <Button variant="outline" className="glass">View Progress</Button>
            </div>
          </div>
          <div className="flex gap-4 md:gap-8">
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-2 mx-auto">
                <Zap className="w-8 h-8 text-primary" />
              </div>
              <p className="text-xs font-bold uppercase text-muted-foreground">Daily Streak</p>
              <p className="text-2xl font-bold font-headline">7 Days</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-2xl glass flex items-center justify-center mb-2 mx-auto">
                <Award className="w-8 h-8 text-secondary" />
              </div>
              <p className="text-xs font-bold uppercase text-muted-foreground">Global Rank</p>
              <p className="text-2xl font-bold font-headline">#1,240</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Core Stats & Activity */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="glass border-white/5 overflow-hidden">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-muted-foreground uppercase flex items-center justify-between">
                  Learning Progress
                  <TrendingUp className="w-4 h-4 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold font-headline">72%</span>
                  <span className="text-xs text-muted-foreground">+5% from last week</span>
                </div>
                <Progress value={72} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>8 / 12 Modules</span>
                  <span>4 lessons left</span>
                </div>
              </CardContent>
            </Card>

            <Card className="glass border-white/5">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-bold text-muted-foreground uppercase flex items-center justify-between">
                  Financial Score
                  <Target className="w-4 h-4 text-secondary" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-end justify-between">
                  <span className="text-3xl font-bold font-headline">840</span>
                  <span className="text-xs text-primary font-bold">Excellent</span>
                </div>
                <div className="flex gap-1 h-2">
                  <div className="flex-1 bg-red-500/20 rounded-full" />
                  <div className="flex-1 bg-orange-500/20 rounded-full" />
                  <div className="flex-1 bg-yellow-500/20 rounded-full" />
                  <div className="flex-1 bg-primary rounded-full" />
                  <div className="flex-1 bg-primary/20 rounded-full" />
                </div>
                <p className="text-[10px] text-muted-foreground leading-tight">
                  Your behavioral score shows high risk awareness in budgeting simulations.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-headline font-bold text-2xl">Recommended Next</h2>
              <Button variant="link" asChild className="text-primary hover:text-primary/80 px-0">
                <Link href="/learning">View All Modules</Link>
              </Button>
            </div>
            
            <Card className="group glass border-white/5 overflow-hidden cursor-pointer">
              <div className="flex flex-col md:flex-row h-full">
                <div className="relative w-full md:w-64 h-40 md:h-auto overflow-hidden">
                  <Image 
                    src={learningImg?.imageUrl || "https://picsum.photos/seed/learn/400/300"}
                    alt="Lesson"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    data-ai-hint="learning education"
                  />
                  <div className="absolute top-3 left-3 px-2 py-1 rounded bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
                    Intermediate
                  </div>
                </div>
                <div className="flex-1 p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Investing Basics</span>
                    <span className="text-xs text-muted-foreground">15 mins</span>
                  </div>
                  <h3 className="font-headline font-bold text-xl group-hover:text-primary transition-colors">Diversification & Asset Allocation</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Learn how to spread risk across different asset classes to protect your long-term wealth.
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <Button size="sm" className="bg-primary shadow-md shadow-primary/20">
                      <Play className="w-3 h-3 mr-2 fill-current" />
                      Start Lesson
                    </Button>
                    <span className="text-xs text-muted-foreground font-medium">+150 XP Reward</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column - Secondary Widgets */}
        <div className="space-y-8">
          <Card className="glass border-white/5">
            <CardHeader>
              <CardTitle className="text-lg">AI Behavioral Insights</CardTitle>
              <CardDescription>Based on your last simulation</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                <p className="text-sm italic text-foreground leading-relaxed">
                  "You showed strong resilience in the 'Emergency Fund' scenario, but your impulsive reaction to the stock market dip cost you 12% in potential gains. Focus on long-term holding."
                </p>
              </div>
              <Button variant="outline" size="sm" className="w-full glass" asChild>
                <Link href="/ai-coach">Talk to AI Coach</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="glass border-white/5">
            <CardHeader>
              <CardTitle className="text-lg">Recent Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {[
                { name: "Penny Pincher", desc: "Saved 30% of income in Budgeting Sim", icon: Target },
                { name: "Risk Aware", desc: "Identified all high-risk debt sources", icon: Shield },
                { name: "Streak Starter", desc: "Maintained a 7-day learning streak", icon: Zap },
              ].map((ach, i) => (
                <div key={i} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                    <ach.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{ach.name}</p>
                    <p className="text-[10px] text-muted-foreground">{ach.desc}</p>
                  </div>
                  <ArrowUpRight className="ml-auto w-4 h-4 text-muted-foreground/30" />
                </div>
              ))}
              <Button variant="ghost" size="sm" className="w-full text-xs text-muted-foreground hover:text-white">
                View All 24 Achievements
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
