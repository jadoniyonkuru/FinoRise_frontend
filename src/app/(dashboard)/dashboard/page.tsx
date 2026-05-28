import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Zap, Play, Target, Award, ArrowUpRight, TrendingUp, Shield } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { PlaceHolderImages } from "@/lib/placeholder-images"

export default function DashboardPage() {
  const learningImg = PlaceHolderImages.find(img => img.id === 'module-budgeting');

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      {/* Welcome Banner */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-primary/5 p-10 border border-black/5">
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-10">
          <div className="space-y-4">
            <h1 className="font-headline font-bold text-4xl md:text-5xl tracking-tight leading-none text-secondary">
              Welcome back, <span className="text-primary">Alex</span>
            </h1>
            <p className="text-muted-foreground max-w-md text-lg leading-relaxed">
              You're currently in the top 15% of users this week. Complete your next simulation to maintain your streak!
            </p>
            <div className="flex gap-4 pt-4">
              <Button asChild size="lg" className="h-14 px-8 font-bold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/20 rounded-2xl">
                <Link href="/simulations">Continue Simulation</Link>
              </Button>
              <Button variant="outline" size="lg" className="h-14 px-8 font-bold border-black/10 glass hover:bg-primary hover:text-white rounded-2xl">View Progress</Button>
            </div>
          </div>
          <div className="flex gap-6 md:gap-12">
            <div className="text-center">
              <div className="w-20 h-20 rounded-[1.5rem] white-card flex items-center justify-center mb-4 mx-auto hover:bg-primary group transition-all">
                <Zap className="w-10 h-10 text-primary group-hover:text-white" />
              </div>
              <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Daily Streak</p>
              <p className="text-3xl font-bold font-headline text-secondary">7 Days</p>
            </div>
            <div className="text-center">
              <div className="w-20 h-20 rounded-[1.5rem] white-card flex items-center justify-center mb-4 mx-auto hover:bg-primary group transition-all">
                <Award className="w-10 h-10 text-[#FFBF00] group-hover:text-white" />
              </div>
              <p className="text-[10px] font-bold uppercase text-muted-foreground tracking-widest">Global Rank</p>
              <p className="text-3xl font-bold font-headline text-secondary">#1,240</p>
            </div>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="white-card rounded-3xl overflow-hidden p-2 hover:bg-primary hover:text-white group transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-between group-hover:text-white/60 transition-colors">
                  Learning Progress
                  <TrendingUp className="w-4 h-4 text-primary group-hover:text-white" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-end justify-between">
                  <span className="text-4xl font-bold font-headline group-hover:text-white transition-colors">72%</span>
                  <span className="text-xs font-bold text-muted-foreground group-hover:text-white/60 transition-colors">+5% from last week</span>
                </div>
                <Progress value={72} className="h-2.5" />
                <div className="flex justify-between text-xs font-bold text-muted-foreground group-hover:text-white/60 transition-colors">
                  <span>8 / 12 Modules</span>
                  <span>4 lessons left</span>
                </div>
              </CardContent>
            </Card>

            <Card className="white-card rounded-3xl overflow-hidden p-2 hover:bg-primary hover:text-white group transition-all duration-300">
              <CardHeader className="pb-4">
                <CardTitle className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest flex items-center justify-between group-hover:text-white/60 transition-colors">
                  Financial Score
                  <Target className="w-4 h-4 text-[#FFBF00] group-hover:text-white" />
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-end justify-between">
                  <span className="text-4xl font-bold font-headline group-hover:text-white transition-colors">840</span>
                  <span className="text-sm text-primary font-bold group-hover:text-white">Excellent</span>
                </div>
                <div className="flex gap-1.5 h-2.5">
                  <div className="flex-1 bg-red-500/10 rounded-full" />
                  <div className="flex-1 bg-orange-500/10 rounded-full" />
                  <div className="flex-1 bg-yellow-500/10 rounded-full" />
                  <div className="flex-1 bg-primary rounded-full" />
                  <div className="flex-1 bg-primary/10 rounded-full" />
                </div>
                <p className="text-xs font-medium text-muted-foreground group-hover:text-white/80 leading-relaxed transition-colors">
                  Your score shows high awareness in budgeting simulations.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-headline font-bold text-3xl text-secondary">Learning Hub</h2>
              <Button variant="link" asChild className="text-primary font-bold px-0 text-base hover:text-primary/80">
                <Link href="/learning">View All Modules</Link>
              </Button>
            </div>
            
            <Card className="white-card rounded-[2rem] overflow-hidden group hover:bg-primary hover:text-white transition-all duration-500">
              <div className="flex flex-col md:flex-row h-full">
                <div className="relative w-full md:w-80 h-48 md:h-auto overflow-hidden">
                  <Image 
                    src={learningImg?.imageUrl || "https://picsum.photos/seed/learn/400/300"}
                    alt="Lesson"
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    data-ai-hint="learning education"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-md text-[10px] font-bold uppercase tracking-widest text-white border border-white/10">
                    Intermediate
                  </div>
                </div>
                <div className="flex-1 p-10 space-y-6">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-primary uppercase tracking-widest group-hover:text-white">Investing Basics</span>
                    <span className="text-xs font-bold text-muted-foreground group-hover:text-white/60 transition-colors">15 mins</span>
                  </div>
                  <h3 className="font-headline font-bold text-2xl text-secondary group-hover:text-white transition-colors">Diversification & Allocation</h3>
                  <p className="text-base text-muted-foreground group-hover:text-white/80 leading-relaxed transition-colors">
                    Learn how to spread risk across different asset classes to protect your long-term wealth.
                  </p>
                  <div className="flex items-center gap-6 pt-2">
                    <Button size="lg" className="h-12 px-6 font-bold bg-primary hover:bg-white hover:text-primary shadow-lg shadow-primary/20 rounded-xl transition-all">
                      <Play className="w-4 h-4 mr-2 fill-current" />
                      Start Lesson
                    </Button>
                    <span className="text-sm text-[#FFBF00] font-bold uppercase tracking-wider group-hover:text-white">+150 XP Reward</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-10">
          <Card className="white-card rounded-3xl p-2 hover:bg-primary hover:text-white group transition-all duration-300">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-secondary group-hover:text-white transition-colors">AI Coach Insights</CardTitle>
              <CardDescription className="text-sm font-bold group-hover:text-white/60">Based on your last session</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 group-hover:bg-white/10 transition-colors">
                <p className="text-base italic text-secondary group-hover:text-white leading-relaxed font-medium">
                  "You showed strong resilience in the 'Emergency Fund' scenario, but your impulsive reaction cost you 12% in potential gains."
                </p>
              </div>
              <Button variant="outline" size="lg" className="w-full h-14 font-bold border-black/10 glass hover:bg-white hover:text-primary rounded-2xl transition-all" asChild>
                <Link href="/ai-coach">Talk to AI Coach</Link>
              </Button>
            </CardContent>
          </Card>

          <Card className="white-card rounded-3xl p-2">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl font-bold text-secondary">Achievements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {[
                { name: "Penny Pincher", desc: "Saved 30% of income", icon: Target, color: "text-primary" },
                { name: "Risk Aware", desc: "Identified high-risk debt", icon: Shield, color: "text-[#FFBF00]" },
                { name: "Streak Starter", desc: "7-day learning streak", icon: Zap, color: "text-primary" },
              ].map((ach, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer hover:bg-primary/5 p-2 rounded-xl transition-all">
                  <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center shrink-0 border border-black/5 group-hover:bg-primary transition-colors">
                    <ach.icon className={`w-7 h-7 ${ach.color} group-hover:text-white`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-base font-bold text-secondary">{ach.name}</p>
                    <p className="text-xs font-medium text-muted-foreground">{ach.desc}</p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground/30 group-hover:text-primary transition-colors" />
                </div>
              ))}
              <Button variant="ghost" className="w-full h-12 text-sm font-bold text-muted-foreground hover:text-primary uppercase tracking-widest">
                View All 24
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
