
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
    color: "text-yellow-400"
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
    color: "text-blue-400"
  },
  {
    id: 4,
    title: "Survivalist Trophy",
    desc: "Limited edition achievement for completing 'The Rent Trap' with 100% efficiency.",
    cost: 2500,
    type: "Trophy",
    icon: Trophy,
    color: "text-secondary"
  }
]

export default function RewardsPage() {
  const currentXP = 2450;

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/10 via-background to-background p-10 border border-white/5">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-4">
            <h1 className="font-headline font-bold text-4xl">Your Rewards</h1>
            <p className="text-muted-foreground max-w-md">
              Redeem your hard-earned XP for exclusive perks, digital collectibles, and real-world financial benefits.
            </p>
            <div className="flex gap-4">
              <Badge className="bg-primary px-4 py-1 text-sm font-bold shadow-lg shadow-primary/20">
                Level 12
              </Badge>
              <Badge variant="outline" className="glass px-4 py-1 text-sm font-bold border-white/10">
                Gold Member
              </Badge>
            </div>
          </div>
          <div className="glass p-8 rounded-2xl flex flex-col items-center justify-center min-w-[200px] border-white/10">
            <Zap className="w-10 h-10 text-primary mb-2" />
            <span className="text-3xl font-bold font-headline">{currentXP.toLocaleString()}</span>
            <span className="text-xs uppercase font-bold text-muted-foreground tracking-widest">Available XP</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {rewards.map((reward) => (
          <Card key={reward.id} className="glass border-white/5 flex flex-col group relative overflow-hidden">
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <reward.icon className={`w-6 h-6 ${reward.color}`} />
              </div>
              <div className="flex items-center justify-between mb-1">
                <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{reward.type}</span>
                <span className="text-xs font-bold text-primary">{reward.cost} XP</span>
              </div>
              <CardTitle className="text-lg font-headline">{reward.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1 space-y-4">
              <CardDescription className="leading-relaxed">
                {reward.desc}
              </CardDescription>
              <Button 
                asChild
                className="w-full bg-white/5 hover:bg-primary hover:text-white transition-all group-hover:border-primary/50 group-hover:text-white"
                disabled={currentXP < reward.cost}
              >
                <Link href={`/rewards/${reward.id}`}>
                  {currentXP < reward.cost ? 'Insufficient XP' : 'Redeem Reward'}
                </Link>
              </Button>
            </CardContent>
            {/* Decorative BG Icon */}
            <reward.icon className="absolute -right-6 -bottom-6 w-24 h-24 opacity-[0.03] rotate-12" />
          </Card>
        ))}
      </div>

      <div className="pt-12">
        <h2 className="font-headline font-bold text-2xl mb-6">Recent Redemptions</h2>
        <Card className="glass border-white/5">
          <CardContent className="p-0">
            {[
              { name: "Investment Master Badge", date: "2 days ago", cost: "2,000 XP" },
              { name: "Coffee Reward - Starbucks", date: "1 week ago", cost: "1,500 XP" }
            ].map((item, i) => (
              <div key={i} className={`flex items-center justify-between p-6 ${i !== 0 ? 'border-t border-white/5' : ''}`}>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-bold">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.date}</p>
                  </div>
                </div>
                <span className="text-sm font-bold text-muted-foreground">-{item.cost}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
