
"use client"

import { useState, use } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft, 
  Trophy, 
  Zap, 
  CheckCircle2, 
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Star,
  ExternalLink,
  Gift
} from "lucide-react"
import Link from "next/link"

const REWARDS_DATA: Record<string, any> = {
  "1": {
    title: "1-Month Free Premium",
    desc: "Unlock advanced AI coaching and unlimited simulation sandbox for a full month. This perk will be applied to your account immediately after redemption.",
    cost: 5000,
    type: "Perk",
    icon: Star,
    color: "text-yellow-400"
  },
  "2": {
    title: "Risk Analyst Badge",
    desc: "A verified digital badge for your profile demonstrating mastery in risk assessment. This badge will appear on your public profile and dashboard.",
    cost: 1500,
    type: "Badge",
    icon: ShieldCheck,
    color: "text-primary"
  },
  "3": {
    title: "Fintech Partner Discount",
    desc: "20% off trading fees with our partner broker for your first $10k in trades. You will receive a unique code via email.",
    cost: 3000,
    type: "Partner",
    icon: ExternalLink,
    color: "text-blue-400"
  },
  "4": {
    title: "Survivalist Trophy",
    desc: "Limited edition achievement for completing 'The Rent Trap' with 100% efficiency. Showcase this trophy on your profile trophy case.",
    cost: 2500,
    type: "Trophy",
    icon: Trophy,
    color: "text-secondary"
  }
}

export default function RewardRedeemPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const reward = REWARDS_DATA[id] || REWARDS_DATA["1"]
  
  const [isRedeeming, setIsRedeeming] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleRedeem = () => {
    setIsRedeeming(true)
    // Simulate API call
    setTimeout(() => {
      setIsRedeeming(false)
      setIsSuccess(true)
    }, 1500)
  }

  if (isSuccess) {
    return (
      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center min-h-[70vh] text-center space-y-8 animate-in zoom-in duration-500">
        <div className="relative">
          <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center animate-pulse">
            <CheckCircle2 className="w-16 h-16 text-primary" />
          </div>
          <Sparkles className="absolute -top-4 -right-4 w-8 h-8 text-yellow-400 animate-bounce" />
        </div>
        
        <div className="space-y-2">
          <h1 className="text-4xl font-headline font-bold">Reward Redeemed!</h1>
          <p className="text-muted-foreground text-lg max-w-md">
            Congratulations! You've successfully redeemed your <span className="text-primary font-bold">{reward.title}</span>.
          </p>
        </div>

        <div className="p-6 glass border-primary/20 rounded-2xl w-full max-w-sm space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Redemption Date</span>
            <span className="font-bold">{new Date().toLocaleDateString()}</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">XP Deducted</span>
            <span className="font-bold text-red-400">-{reward.cost} XP</span>
          </div>
        </div>

        <div className="flex gap-4">
          <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 px-8">
            <Link href="/dashboard">Back to Dashboard</Link>
          </Button>
          <Button variant="outline" asChild className="glass px-8">
            <Link href="/rewards">View More Rewards</Link>
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 h-[calc(100vh-160px)] flex flex-col">
      <div className="flex items-center">
        <Button variant="ghost" size="sm" asChild className="glass">
          <Link href="/rewards">
            <ChevronLeft className="w-4 h-4 mr-2" /> Back to Rewards
          </Link>
        </Button>
      </div>

      <Card className="flex-1 glass border-white/5 flex flex-col overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8">
           <reward.icon className={`w-32 h-32 ${reward.color} opacity-[0.05] -rotate-12`} />
        </div>

        <CardHeader className="p-10 pb-6">
          <Badge variant="outline" className="w-fit mb-4 border-primary/30 text-primary">{reward.type}</Badge>
          <CardTitle className="text-4xl font-headline font-bold leading-tight max-w-2xl">
            Confirm Redemption
          </CardTitle>
          <CardDescription className="text-lg mt-2">
            Are you sure you want to spend your XP on this reward?
          </CardDescription>
        </CardHeader>

        <CardContent className="flex-1 px-10 pt-6 space-y-8">
          <div className="flex items-start gap-8 flex-col md:flex-row">
            <div className="w-24 h-24 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/10">
              <reward.icon className={`w-12 h-12 ${reward.color}`} />
            </div>
            <div className="space-y-4 max-w-xl">
              <h3 className="text-2xl font-bold">{reward.title}</h3>
              <p className="text-muted-foreground leading-relaxed">
                {reward.desc}
              </p>
              
              <div className="flex items-center gap-6 pt-4">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Your Balance</p>
                  <p className="text-xl font-bold">2,450 XP</p>
                </div>
                <div className="w-px h-10 bg-white/10" />
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Reward Cost</p>
                  <p className="text-xl font-bold text-primary">{reward.cost} XP</p>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex gap-4 mt-auto">
            <Gift className="w-6 h-6 text-primary shrink-0" />
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Redemption Note</p>
              <p className="text-sm text-foreground/80 italic">
                Redemptions are final. XP cannot be refunded once the process is complete.
              </p>
            </div>
          </div>
        </CardContent>

        <div className="p-10 border-t border-white/5 bg-background/50 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Estimated Remaining</p>
              <p className="text-sm font-bold">-- XP</p>
            </div>
          </div>

          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 group h-14 px-8"
            onClick={handleRedeem}
            disabled={isRedeeming}
          >
            {isRedeeming ? (
              <span className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white/20 border-t-white animate-spin rounded-full" />
                Processing...
              </span>
            ) : (
              <>
                Confirm Redemption
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </Button>
        </div>
      </Card>
    </div>
  )
}
