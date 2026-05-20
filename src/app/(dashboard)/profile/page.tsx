
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  Settings, 
  Mail, 
  Shield, 
  Trophy, 
  Zap, 
  Calendar, 
  Edit2, 
  LogOut,
  Target
} from "lucide-react"

export default function ProfilePage() {
  const user = {
    name: "Alex Johnson",
    email: "alex.j@example.com",
    role: "Power User",
    xp: 2450,
    level: 12,
    streak: 7,
    joined: "January 2024",
    avatar: "https://picsum.photos/seed/user123/200"
  }

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Profile Sidebar */}
        <div className="w-full md:w-80 space-y-6">
          <Card className="glass border-white/5 text-center overflow-hidden">
            <div className="h-24 bg-gradient-to-r from-primary/30 to-secondary/30" />
            <div className="px-6 pb-8 -mt-12">
              <Avatar className="w-24 h-24 mx-auto border-4 border-background ring-2 ring-primary/20">
                <AvatarImage src={user.avatar} />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              <div className="mt-4 space-y-1">
                <h2 className="font-headline font-bold text-xl">{user.name}</h2>
                <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                  <Mail className="w-3 h-3" /> {user.email}
                </p>
              </div>
              <div className="mt-6 flex justify-center gap-2">
                <Badge variant="secondary" className="glass border-white/10 uppercase tracking-widest text-[10px]">{user.role}</Badge>
                <Badge className="bg-primary text-[10px] uppercase font-bold tracking-widest">PRO</Badge>
              </div>
              <div className="mt-8 flex flex-col gap-2">
                <Button className="w-full glass border-white/10 flex items-center gap-2">
                  <Edit2 className="w-4 h-4" /> Edit Profile
                </Button>
                <Button variant="ghost" className="w-full text-red-400 hover:text-red-300 hover:bg-red-400/10 flex items-center gap-2">
                  <LogOut className="w-4 h-4" /> Sign Out
                </Button>
              </div>
            </div>
          </Card>

          <Card className="glass border-white/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground font-bold">Account Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="w-4 h-4" /> Joined
                </span>
                <span className="font-medium">{user.joined}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Shield className="w-4 h-4" /> Security
                </span>
                <span className="text-green-400 font-medium">Verified</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2 text-muted-foreground">
                  <Target className="w-4 h-4" /> Subscription
                </span>
                <span className="font-medium">Free Plan</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Profile Area */}
        <div className="flex-1 space-y-8">
          <Card className="glass border-white/5 p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-2">
                  <Zap className="w-3 h-3 text-primary" /> Total XP
                </p>
                <p className="text-3xl font-bold font-headline">{user.xp.toLocaleString()}</p>
                <div className="space-y-1">
                  <Progress value={81} className="h-1.5" />
                  <p className="text-[10px] text-muted-foreground">550 XP to Level 13</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-2">
                  <Trophy className="w-3 h-3 text-secondary" /> Global Rank
                </p>
                <p className="text-3xl font-bold font-headline">#1,240</p>
                <p className="text-[10px] text-green-400 font-bold flex items-center gap-1">
                  Top 15% this month
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-2">
                  <Zap className="w-3 h-3 text-primary fill-current" /> Daily Streak
                </p>
                <p className="text-3xl font-bold font-headline">{user.streak} Days</p>
                <p className="text-[10px] text-muted-foreground">Keep it up, Alex!</p>
              </div>
            </div>
          </Card>

          <section className="space-y-4">
            <h3 className="font-headline font-bold text-2xl">Achievements</h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { name: "First Steps", icon: Target, date: "Jan 12", color: "text-blue-400" },
                { name: "Budget King", icon: Trophy, date: "Jan 24", color: "text-yellow-400" },
                { name: "Risk Aware", icon: Shield, date: "Feb 02", color: "text-green-400" },
                { name: "Fast Learner", icon: Zap, date: "Feb 10", color: "text-primary" },
              ].map((ach, i) => (
                <Card key={i} className="glass border-white/5 p-4 text-center group cursor-pointer hover:border-primary/50 transition-colors">
                  <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform">
                    <ach.icon className={`w-5 h-5 ${ach.color}`} />
                  </div>
                  <p className="text-sm font-bold truncate">{ach.name}</p>
                  <p className="text-[10px] text-muted-foreground mt-1">{ach.date}</p>
                </Card>
              ))}
            </div>
            <Button variant="ghost" className="w-full text-xs text-muted-foreground">Show all 24 achievements</Button>
          </section>

          <section className="space-y-4">
            <h3 className="font-headline font-bold text-2xl">Recent Activity</h3>
            <Card className="glass border-white/5">
              <CardContent className="p-0">
                {[
                  { action: "Completed Lesson", title: "Diversification 101", xp: "+150 XP", time: "2h ago" },
                  { action: "Simulation Finish", title: "The Rent Trap", xp: "+400 XP", time: "Yesterday" },
                  { action: "Earned Badge", title: "Risk Analyst", xp: "+500 XP", time: "2 days ago" }
                ].map((act, i) => (
                  <div key={i} className={`flex items-center justify-between p-6 ${i !== 0 ? 'border-t border-white/5' : ''}`}>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-primary tracking-widest">{act.action}</p>
                      <p className="font-bold">{act.title}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-bold text-green-400">{act.xp}</p>
                      <p className="text-[10px] text-muted-foreground">{act.time}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  )
}
