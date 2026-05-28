
"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { 
  Mail, 
  Shield, 
  Trophy, 
  Zap, 
  Calendar, 
  Edit2, 
  LogOut,
  Target,
  Save,
  X
} from "lucide-react"
import { useRouter } from "next/navigation"

export default function ProfilePage() {
  const router = useRouter()
  const [isEditing, setIsEditing] = useState(false)

  // Mock profile data for stable state
  const profile = {
    displayName: "Alex Johnson",
    email: "alex@finorise.com",
    avatarUrl: "https://picsum.photos/seed/user123/200",
    level: 12,
    xp: 12450,
    streak: 7,
    completedModules: ["Budgeting 101", "Investment Basics", "Credit Master"]
  }

  const handleSignOut = () => {
    router.push("/")
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
                <AvatarImage src={profile.avatarUrl} />
                <AvatarFallback>AJ</AvatarFallback>
              </Avatar>
              
              {isEditing ? (
                <div className="mt-4 space-y-4">
                  <div className="space-y-1 text-left">
                    <Label className="text-[10px] uppercase font-bold text-muted-foreground">Display Name</Label>
                    <Input defaultValue={profile.displayName} className="glass border-white/10 h-8 text-sm" />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => setIsEditing(false)} className="flex-1 bg-primary h-8 text-xs">
                      <Save className="w-3 h-3 mr-1" /> Save
                    </Button>
                    <Button onClick={() => setIsEditing(false)} variant="outline" className="flex-1 glass h-8 text-xs">
                      <X className="w-3 h-3 mr-1" /> Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="mt-4 space-y-1">
                    <h2 className="font-headline font-bold text-xl">{profile.displayName}</h2>
                    <p className="text-sm text-muted-foreground flex items-center justify-center gap-1">
                      <Mail className="w-3 h-3" /> {profile.email}
                    </p>
                  </div>
                  <div className="mt-6 flex justify-center gap-2">
                    <Badge variant="secondary" className="glass border-white/10 uppercase tracking-widest text-[10px]">Level {profile.level}</Badge>
                    <Badge className="bg-primary text-[10px] uppercase font-bold tracking-widest">MASTER</Badge>
                  </div>
                  <div className="mt-8 flex flex-col gap-2">
                    <Button onClick={() => setIsEditing(true)} className="w-full glass border-white/10 flex items-center gap-2">
                      <Edit2 className="w-4 h-4" /> Edit Profile
                    </Button>
                    <Button 
                      onClick={handleSignOut}
                      variant="ghost" 
                      className="w-full text-red-400 hover:text-red-300 hover:bg-red-400/10 flex items-center gap-2"
                    >
                      <LogOut className="w-4 h-4" /> Sign Out
                    </Button>
                  </div>
                </>
              )}
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
                <span className="font-medium">March 2024</span>
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
                <span className="font-medium">Pro Plan</span>
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
                  < Zap className="w-3 h-3 text-primary" /> Total XP
                </p>
                <p className="text-3xl font-bold font-headline">{profile.xp.toLocaleString()}</p>
                <div className="space-y-1">
                  <Progress value={75} className="h-1.5" />
                  <p className="text-[10px] text-muted-foreground">550 XP to Next Level</p>
                </div>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-2">
                  <Trophy className="w-3 h-3 text-secondary" /> Global Rank
                </p>
                <p className="text-3xl font-bold font-headline">#1,240</p>
                <p className="text-[10px] text-green-400 font-bold flex items-center gap-1">
                  Top 15% this week
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest flex items-center gap-2">
                  <Zap className="w-3 h-3 text-primary fill-current" /> Daily Streak
                </p>
                <p className="text-3xl font-bold font-headline">{profile.streak} Days</p>
                <p className="text-[10px] text-muted-foreground">Keep it up!</p>
              </div>
            </div>
          </Card>

          <section className="space-y-4">
            <h3 className="font-headline font-bold text-2xl">Recent Activity</h3>
            <Card className="glass border-white/5">
              <CardContent className="p-0">
                {profile.completedModules.map((mod, i) => (
                  <div key={i} className={`flex items-center justify-between p-6 ${i !== 0 ? 'border-t border-white/5' : ''}`}>
                    <div className="space-y-1">
                      <p className="text-[10px] uppercase font-bold text-primary tracking-widest">Module Completed</p>
                      <p className="font-bold">{mod}</p>
                    </div>
                    <div className="text-right space-y-1">
                      <p className="text-sm font-bold text-green-400">+500 XP</p>
                      <p className="text-[10px] text-muted-foreground">2 days ago</p>
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
