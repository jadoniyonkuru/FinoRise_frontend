
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
        <header className="h-20 flex items-center justify-between px-8 border-b border-black/5 dark:border-white/5 sticky top-0 bg-background/80 backdrop-blur-md z-40">
          <div className="flex items-center gap-6">
            <SidebarTrigger className="h-10 w-10" />
            <div className="relative hidden md:block">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input 
                placeholder="Search modules, simulations..." 
                className="w-96 pl-12 h-12 glass border-black/20 focus-visible:ring-2 focus-visible:ring-primary/50 text-base" 
              />
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden sm:flex items-center gap-3 px-4 py-2 rounded-full glass border-black/10">
              <Zap className="w-5 h-5 text-primary" />
              <span className="text-sm font-bold tracking-tight">1,240 XP</span>
            </div>
            <ModeToggle />
            
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="ghost" size="icon" className="relative glass h-12 w-12">
                  <Bell className="w-6 h-6" />
                  <span className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-0 glass border-black/5" align="end">
                <div className="p-4 border-b border-black/5 flex items-center justify-between">
                  <h4 className="font-bold text-sm font-headline">Notifications</h4>
                  <Badge variant="outline" className="text-[10px] h-5 border-primary/20 text-primary">4 New</Badge>
                </div>
                <ScrollArea className="h-[350px]">
                  <div className="flex flex-col">
                    {[
                      { title: "Achievement Unlocked!", desc: "You've earned the 'Risk Analyst' badge.", time: "2m ago", icon: Trophy, color: "text-primary" },
                      { title: "XP Bonus Active", desc: "Your +15% multiplier is now active for 24h.", time: "1h ago", icon: Zap, color: "text-primary" },
                      { title: "Market Alert", desc: "A new simulation scenario is available.", time: "3h ago", icon: TrendingUp, color: "text-[#FFBF00]" },
                      { title: "Coach Tip", desc: "Alex, your latest budget sim could be improved.", time: "5h ago", icon: MessageSquareQuote, color: "text-primary" }
                    ].map((n, i) => (
                      <button key={i} className="flex gap-4 p-4 text-left hover:bg-black/5 transition-colors border-b border-black/5 last:border-0">
                        <div className="w-10 h-10 rounded-xl bg-black/5 flex items-center justify-center shrink-0 border border-black/5">
                          <n.icon className={`w-5 h-5 ${n.color}`} />
                        </div>
                        <div className="space-y-1 flex-1">
                          <p className="text-xs font-bold leading-none">{n.title}</p>
                          <p className="text-[10px] text-muted-foreground leading-relaxed">{n.desc}</p>
                          <p className="text-[9px] text-muted-foreground/40 font-bold uppercase tracking-wider">{n.time}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </ScrollArea>
                <div className="p-3 text-center border-t border-black/5 bg-black/[0.01]">
                  <Button variant="ghost" size="sm" className="text-[10px] h-8 w-full text-muted-foreground hover:text-black uppercase tracking-widest font-bold">
                    Mark all as read
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </header>
        <main className="p-8 md:p-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
