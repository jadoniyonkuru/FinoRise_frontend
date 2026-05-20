
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { FinoSidebar } from "@/components/fino-sidebar"
import { Bell, Search, Zap, Trophy, TrendingUp, MessageSquareQuote } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ModeToggle } from "@/components/mode-toggle"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <FinoSidebar />
      <SidebarInset>
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 dark:border-white/5 sticky top-0 bg-background/80 backdrop-blur-md z-40">
          <div className="flex items-center gap-4">
            <SidebarTrigger />
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search modules, simulations..." 
                className="w-80 pl-10 h-10 glass border-none focus-visible:ring-1 focus-visible:ring-primary/50" 
              />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full glass border-white/10">
              <Zap className="w-4 h-4 text-primary" />
              <span className="text-xs font-bold tracking-tight">1,240 XP</span>
            </div>
            <ModeToggle />
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative glass">
                  <Bell className="w-5 h-5" />
                  <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary border-2 border-background" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 glass border-white/5" align="end">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                  <h4 className="font-bold text-sm font-headline">Notifications</h4>
                  <Badge variant="outline" className="text-[10px] h-5 border-primary/20 text-primary">4 New</Badge>
                </div>
                <ScrollArea className="h-[350px]">
                  <div className="flex flex-col">
                    {[
                      { title: "Achievement Unlocked!", desc: "You've earned the 'Risk Analyst' badge.", time: "2m ago", icon: Trophy, color: "text-yellow-400" },
                      { title: "XP Bonus Active", desc: "Your +15% multiplier is now active for 24h.", time: "1h ago", icon: Zap, color: "text-primary" },
                      { title: "Market Alert", desc: "A new simulation scenario is available.", time: "3h ago", icon: TrendingUp, color: "text-secondary" },
                      { title: "Coach Tip", desc: "Alex, your latest budget sim could be improved.", time: "5h ago", icon: MessageSquareQuote, color: "text-primary" }
                    ].map((n, i) => (
                      <button key={i} className="flex gap-4 p-4 text-left hover:bg-white/5 transition-colors border-b border-white/5 last:border-0">
                        <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5">
                          <n.icon className={`w-5 h-5 ${n.color}`} />
                        </div>
                        <div className="space-y-1 flex-1">
                          <p className="text-xs font-bold leading-none">{n.title}</p>
                          <p className="text-[10px] text-muted-foreground leading-relaxed">{n.desc}</p>
                          <p className="text-[9px] text-muted-foreground/40 font-medium uppercase tracking-wider">{n.time}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-3 text-center border-t border-white/5 bg-white/[0.01]">
                  <Button variant="ghost" size="sm" className="text-[10px] h-8 w-full text-muted-foreground hover:text-white uppercase tracking-widest font-bold">
                    Mark all as read
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>
        <main className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
