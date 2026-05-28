
"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { 
  LayoutDashboard, 
  GraduationCap, 
  Gamepad2, 
  MessageSquareQuote, 
  Trophy, 
  BarChart3, 
  Zap,
  ChevronRight
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
} from "@/components/ui/sidebar"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const navItems = [
  { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { name: "Learning Hub", href: "/learning", icon: GraduationCap },
  { name: "Simulation Center", href: "/simulations", icon: Gamepad2 },
  { name: "AI Coach", href: "/ai-coach", icon: MessageSquareQuote },
  { name: "Rewards", href: "/rewards", icon: Trophy },
  { name: "Analytics", href: "/analytics", icon: BarChart3 },
]

export function FinoSidebar() {
  const pathname = usePathname()
  
  // Mock user data for stable navigation
  const profile = {
    displayName: "Alex Johnson",
    email: "alex@finorise.com",
    avatarUrl: "https://picsum.photos/seed/user123/100",
    level: 12,
    xp: 12450
  }

  const xp = profile.xp
  const level = profile.level
  const progress = (xp % 1000) / 10

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarHeader className="h-16 flex items-center px-4 border-b border-white/5">
        <Link href="/dashboard" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <Zap className="w-5 h-5 text-white" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight group-data-[collapsible=icon]:hidden">
            Fino<span className="text-primary">Rise</span>
          </span>
        </Link>
      </SidebarHeader>
      
      <SidebarContent className="pt-4">
        <SidebarGroup>
          <SidebarGroupLabel className="px-4 font-semibold text-xs uppercase tracking-wider text-muted-foreground group-data-[collapsible=icon]:hidden">
            Main Menu
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton 
                    asChild 
                    isActive={pathname === item.href}
                    tooltip={item.name}
                    className="h-11 px-4"
                  >
                    <Link href={item.href} className="flex items-center gap-3">
                      <item.icon className={`w-5 h-5 ${pathname === item.href ? 'text-primary' : ''}`} />
                      <span className="font-medium">{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup className="mt-auto group-data-[collapsible=icon]:hidden">
          <div className="mx-4 p-4 rounded-xl glass bg-primary/5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-primary uppercase">Level {level}</span>
              <span className="text-xs text-muted-foreground">{xp.toLocaleString()} XP</span>
            </div>
            <Progress value={progress} className="h-1.5" />
            <p className="text-[10px] mt-2 text-muted-foreground leading-tight">
              Earn XP in simulations to level up!
            </p>
          </div>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-white/5 p-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild className="h-12 w-full p-2 hover:bg-white/5">
              <Link href="/profile" className="flex items-center gap-3">
                <Avatar className="w-8 h-8 ring-2 ring-primary/20">
                  <AvatarImage src={profile.avatarUrl} />
                  <AvatarFallback>{profile.displayName?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col flex-1 min-w-0 group-data-[collapsible=icon]:hidden">
                  <span className="text-sm font-semibold truncate">{profile.displayName}</span>
                  <span className="text-[10px] text-muted-foreground truncate">{profile.email}</span>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground ml-auto group-data-[collapsible=icon]:hidden" />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
