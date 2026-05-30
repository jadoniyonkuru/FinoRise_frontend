"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Zap, Send, Sparkles, BrainCircuit, RotateCcw, ThumbsUp } from "lucide-react"

export default function AICoachPage() {
  const [messages, setMessages] = useState([
    {
      role: "ai",
      content: "Hello Alex! I've been reviewing your latest simulation results. You managed to save $400 in 'The Rent Trap' scenario, which is excellent. Would you like to analyze your decision patterns or dive into a new topic like tax-efficient investing?",
      time: "10:30 AM"
    }
  ])
  const [input, setInput] = useState("")

  const handleSend = () => {
    if (!input.trim()) return
    const newMessages = [
      ...messages,
      { role: "user", content: input, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ]
    setMessages(newMessages)
    setInput("")

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [
        ...prev,
        {
          role: "ai",
          content: "That's a great question. When dealing with high-interest debt versus investing, the rule of thumb is to pay down anything above a 7% interest rate first. Based on your current profile, focusing on your credit card balance is the optimal move. Would you like me to generate a 3-month payoff plan?",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ])
    }, 1500)
  }

  return (
    <div className="max-w-6xl mx-auto h-[calc(100vh-160px)] flex flex-col">
      <div className="flex flex-col md:flex-row gap-6 h-full">
        {/* Chat Main Area */}
        <div className="flex-1 flex flex-col min-w-0">
          <Card className="flex-1 glass border-white/5 flex flex-col overflow-hidden relative">
            <CardHeader className="border-b border-white/5 flex flex-row items-center justify-between py-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <BrainCircuit className="w-6 h-6 text-white" />
                </div>
                <div>
                  <CardTitle className="text-lg">FinoRise AI Coach</CardTitle>
                  <CardDescription className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                    Online & Analyzing your data
                  </CardDescription>
                </div>
              </div>
              <Button variant="ghost" size="icon" className="glass">
                <RotateCcw className="w-4 h-4" />
              </Button>
            </CardHeader>
            
            <CardContent className="flex-1 p-0 relative">
              <ScrollArea className="h-full px-6 py-4">
                <div className="space-y-6 pb-4">
                  {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-4 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                      <Avatar className="w-8 h-8 flex-shrink-0 border border-white/10">
                        {msg.role === 'ai' ? (
                          <>
                            <AvatarImage src="" />
                            <AvatarFallback className="bg-primary text-white"><Sparkles className="w-4 h-4" /></AvatarFallback>
                          </>
                        ) : (
                          <AvatarImage src="https://picsum.photos/seed/user123/100" />
                        )}
                      </Avatar>
                      <div className={`space-y-1.5 max-w-[80%] ${msg.role === 'user' ? 'items-end' : ''}`}>
                        <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                          msg.role === 'ai' 
                            ? 'glass bg-white/[0.03] rounded-tl-none' 
                            : 'bg-primary text-white rounded-tr-none'
                        }`}>
                          {msg.content}
                        </div>
                        <p className={`text-[10px] text-muted-foreground px-2 ${msg.role === 'user' ? 'text-right' : ''}`}>
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>

            <div className="p-6 border-t border-white/5 bg-background/50">
              <div className="relative">
                <Input 
                  placeholder="Ask your coach anything about your finances..." 
                  className="h-14 pl-4 pr-16 glass border-white/10 focus-visible:ring-1 focus-visible:ring-primary"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button 
                  size="icon" 
                  className="absolute right-2 top-2 h-10 w-10 bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20"
                  onClick={handleSend}
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex gap-2 mt-4 overflow-x-auto pb-2 scrollbar-hide">
                {[
                  "Explain diversification",
                  "Analyze my last sim",
                  "Payoff plan for debt",
                  "Stock vs ETF"
                ].map((suggestion, i) => (
                  <Button 
                    key={i} 
                    variant="outline" 
                    size="sm" 
                    className="glass whitespace-nowrap text-[10px] uppercase font-bold tracking-wider"
                    onClick={() => setInput(suggestion)}
                  >
                    {suggestion}
                  </Button>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar - Quick Insights */}
        <div className="w-full md:w-80 space-y-6">
          <Card className="glass border-white/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground font-bold">Contextual Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Cognitive Bias</span>
                  <span className="text-primary font-bold">Anchoring</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-primary w-[65%]" />
                </div>
              </div>
              <div className="space-y-1">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Decision Accuracy</span>
                  <span className="text-secondary font-bold">88%</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className="h-full bg-secondary w-[88%]" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/5">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm uppercase tracking-wider text-muted-foreground font-bold">Smart Reminders</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-3 rounded-lg border border-yellow-500/20 bg-yellow-500/5 text-xs flex gap-3">
                <Zap className="w-4 h-4 text-yellow-500 shrink-0" />
                <p className="leading-relaxed">
                  You haven't checked your simulated portfolio in 48 hours. Market volatility has increased.
                </p>
              </div>
              <div className="p-3 rounded-lg border border-primary/20 bg-primary/5 text-xs flex gap-3">
                <ThumbsUp className="w-4 h-4 text-primary shrink-0" />
                <p className="leading-relaxed">
                  Mastered 'Compound Interest' quiz! You earned a +15% XP multiplier for the next 24h.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
