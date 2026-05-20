import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { FinoSidebar } from "@/components/fino-sidebar"
import { Bell, Search, Zap } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <FinoSidebar />
      <SidebarInset>
        <header className="h-16 flex items-center justify-between px-6 border-b border-white/5 sticky top-0 bg-background/80 backdrop-blur-md z-40">
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
            <Button variant="ghost" size="icon" className="relative glass">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary border-2 border-background" />
            </Button>
          </div>
        </header>
        <main className="p-6 md:p-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}
