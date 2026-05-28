
"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Trophy, Zap, Star, Gift, ExternalLink, ShieldCheck } from "lucide-react"
import Link from "next/link"

const rewards = [
  {
    id: 1,
    title: "1-Month Free Premium",
    desc: "Unlock advanced AI coaching and unlimited simulation sandbox for a full month.",
    cost: 5000,
    type: "Perk",
    icon: Star,
    color: "text-[#FFBF00]"
  },
  {
    id: 2,
    title: "Risk Analyst Badge",
    desc: "A verified digital badge for your profile demonstrating mastery in risk assessment.",
    cost: 1500,
    type: "Badge",
    icon: ShieldCheck,
    color: "text-primary"
  },
  {
    id: 3,
    title: "Fintech Partner Discount",
    desc: "20% off trading fees with our partner broker for your first $10k in trades.",
    cost: 3000,
    type: "Partner",
    icon: ExternalLink,
    color: "text-primary"
  },
  {
    id: 4,
    title: "Survivalist Trophy",
    desc: "Limited edition achievement for completing 'The Rent Trap' with 100% efficiency.",
    cost: 2500,
    type: "Trophy",
    icon: Trophy,
    color: "text-[#FFBF00]"
  }
]

export default function RewardsPage() {
  const currentXP = 2450;

  return (
    <div className="space-y-12 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-[3rem] bg-black p-12 text-white shadow-2xl">
        <div className="absolute top-0 right-0 w-[500px] h-[300px] bg-[#FFBF00]/10 blur-[100px] rounded-full" />
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
          <div className="space-y-6">
            <h1 className="font-headline font-bold text-5xl md:text-6xl">Your Rewards</h1>
            <p className="text-muted-foreground text-xl max-w-lg leading-relaxed">
              Redeem your XP for exclusive perks, digital collectibles, and real-world financial benefits.
            </p>
            <div className="flex gap-4">
              <Badge className="bg-[#FFBF00] text-black px-6 py-2 text-sm font-bold uppercase tracking-widest shadow-xl shadow-[#FFBF00]/20">
                Level 12
              </Badge>
              <Badge variant="outline" className="glass px-6 py-2 text-sm font-bold uppercase tracking-widest border-white/20">
                Gold Member
              </Badge>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl p-10 rounded-[2rem] flex flex-col items-center justify-center min-w-[240px] border border-white/10 shadow-2xl">
            <Zap className="w-12 h-12 text-[#FFBF00] mb-4" />
            <span className="text-5xl font-bold font-headline mb-1">{currentXP.toLocaleString()}</span>
            <span className="text-sm uppercase font-bold text-muted-foreground tracking-widest">Available XP</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {rewards.map((reward) => (
          <Card key={reward.id} className="white-card rounded-[2.5rem] flex flex-col group relative overflow-hidden p-2">
            <CardHeader className="p-6">
              <div className="w-16 h-16 rounded-2xl bg-black/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform border border-black/5">
                <reward.icon className={`w-8 h-8 ${reward.color}`} />
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{reward.type}</span>
                <span className="text-sm font-bold text-primary">{reward.cost} XP</span>
              </div>
              <CardTitle className="text-2xl font-headline text-secondary">{reward.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-6 p-6">
              <CardDescription className="text-base leading-relaxed font-medium">
                {reward.desc}
              </CardDescription>
              <Button 
                asChild
                className="w-full h-14 font-bold bg-primary hover:bg-primary/90 shadow-xl shadow-primary/20"
                disabled={currentXP < reward.cost}
              >
                <Link href={`/rewards/${reward.id}`}>
                  {currentXP < reward.cost ? 'Insufficient XP' : 'Redeem Reward'}
                </Link>
              </Button>
            </CardContent>
            {/* Decorative BG Icon */}
            <reward.icon className="absolute -right-8 -bottom-8 w-32 h-32 opacity-[0.03] rotate-12 group-hover:opacity-[0.06] transition-opacity" />
          </Card>
        ))}
      </div>

      <div className="pt-16">
        <h2 className="font-headline font-bold text-3xl mb-10 text-secondary">Recent Redemptions</h2>
        <Card className="white-card rounded-3xl overflow-hidden p-2">
          <CardContent className="p-0">
            {[
              { name: "Investment Master Badge", date: "2 days ago", cost: "2,000 XP", icon: ShieldCheck, color: "text-primary" },
              { name: "Coffee Reward - Starbucks", date: "1 week ago", cost: "1,500 XP", icon: Gift, color: "text-[#FFBF00]" }
            ].map((item, i) => (
              <div key={i} className={`flex items-center justify-between p-8 ${i !== 0 ? 'border-t border-black/5' : ''} hover:bg-black/[0.01] transition-colors`}>
                <div className="flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-black/5 flex items-center justify-center border border-black/5">
                    <item.icon className={`w-7 h-7 ${item.color}`} />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-secondary">{item.name}</p>
                    <p className="text-sm font-bold text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <span className="text-lg font-bold text-secondary">-{item.cost}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
