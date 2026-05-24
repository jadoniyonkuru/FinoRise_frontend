
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Zap, Shield, TrendingUp, Cpu, ArrowRight, Play, Trophy, Star, Gift } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LandingPage() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass border-b border-white/5 bg-background/80">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-headline font-bold text-2xl tracking-tighter">
              Fino<span className="text-primary">Rise</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#simulations" className="hover:text-primary transition-colors">Simulations</Link>
            <Link href="#learning" className="hover:text-primary transition-colors">Learning Hub</Link>
            <Link href="#rewards" className="hover:text-primary transition-colors">Rewards</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild className="hidden sm:inline-flex font-bold">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 h-12 px-6 font-bold">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-48 pb-24 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-30 -z-10" />
          
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-10">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Powered by Gemini AI</span>
            </div>
            
            <h1 className="font-headline font-bold text-6xl md:text-8xl mb-8 tracking-tight leading-[1] text-secondary">
              Elevate Your <br />
              <span className="text-primary">Intelligence</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-xl text-muted-foreground mb-12 leading-relaxed">
              FinoRise is the AI-driven ecosystem where gaming meets mastery. Immersive simulations, curated learning, and behavioral coaching.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="h-16 w-full sm:w-64 text-lg bg-primary hover:bg-primary/90 group shadow-xl shadow-primary/20 font-bold" asChild>
                <Link href="/dashboard">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-16 w-full sm:w-64 text-lg glass group border-black/10 font-bold" asChild>
                <Link href="#simulations">
                  Try Simulation
                  <Play className="ml-2 w-5 h-5 fill-current" />
                </Link>
              </Button>
            </div>

            <div className="mt-24 relative rounded-[3rem] overflow-hidden glass p-4 max-w-6xl mx-auto border border-black/5 shadow-2xl">
              <div className="aspect-video relative rounded-[2rem] overflow-hidden">
                <Image 
                  src={heroImg?.imageUrl || "https://picsum.photos/seed/hero/1200/800"} 
                  alt="Hero"
                  fill
                  className="object-cover"
                  priority
                  data-ai-hint="finance technology"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Master Every Domain - Refined Feature Section */}
        <section id="features" className="py-24 bg-primary/5">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="font-headline font-bold text-4xl md:text-5xl mb-6 text-secondary">Master Every Domain</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Our intelligent system bridges the gap between theory and real-world behavior.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "AI Behavioral Coach", desc: "Personalized feedback on every decision you make in simulations.", icon: Cpu, color: "text-primary" },
                { title: "Immersive Scenarios", desc: "Navigate branching narratives of debt recovery and growth.", icon: Zap, color: "text-primary" },
                { title: "Gamified Progress", desc: "Earn XP, unlock rare badges, and compete for real rewards.", icon: Shield, color: "text-primary" },
                { title: "Dynamic Analytics", desc: "Visualize your growth score and behavioral trends with clarity.", icon: TrendingUp, color: "text-primary" },
                { title: "Curated Content", desc: "Micro-learning modules designed for high retention.", icon: Zap, color: "text-primary" },
                { title: "Partner Benefits", desc: "Redeem performance for tangible benefits from fintech partners.", icon: Shield, color: "text-primary" }
              ].map((feature, i) => (
                <div key={i} className="p-10 white-card rounded-3xl group">
                  <div className={`w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-7 h-7 ${feature.color}`} />
                  </div>
                  <h3 className="font-headline font-bold text-2xl mb-4 text-secondary">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Simulations Section */}
        <section id="simulations" className="py-24 bg-background">
          <div className="container mx-auto px-6 text-center">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/5 border border-secondary/10 mb-8">
              <span className="text-xs font-bold text-secondary uppercase tracking-widest">Active Narratives</span>
            </div>
            <h2 className="font-headline font-bold text-4xl md:text-5xl mb-6 text-secondary">Learn by Doing</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-16">Step into the simulator and make high-stakes decisions with zero risk to your real wallet.</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              <div className="white-card rounded-3xl overflow-hidden text-left group">
                <div className="aspect-[16/10] relative">
                  <Image src="https://picsum.photos/seed/sim1/800/500" alt="Sim" fill className="object-cover" data-ai-hint="city budget" />
                </div>
                <div className="p-8">
                  <h3 className="font-headline font-bold text-2xl mb-2 text-secondary">The Rent Trap</h3>
                  <p className="text-muted-foreground mb-6">Manage a 20% rent hike while maintaining your long-term goals.</p>
                  <Button className="w-full h-14 font-bold bg-primary" asChild>
                    <Link href="/simulations/the-rent-trap">Play Scenario</Link>
                  </Button>
                </div>
              </div>
              <div className="white-card rounded-3xl overflow-hidden text-left group">
                <div className="aspect-[16/10] relative">
                  <Image src="https://picsum.photos/seed/sim2/800/500" alt="Sim" fill className="object-cover" data-ai-hint="stock market" />
                </div>
                <div className="p-8">
                  <h3 className="font-headline font-bold text-2xl mb-2 text-secondary">The Bull Run</h3>
                  <p className="text-muted-foreground mb-6">Master market FOMO and learn when to take profits during a rally.</p>
                  <Button className="w-full h-14 font-bold bg-primary" asChild>
                    <Link href="/simulations/the-bull-run">Play Scenario</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Learning Hub Section */}
        <section id="learning" className="py-24 bg-primary/5">
          <div className="container mx-auto px-6">
            <div className="flex flex-col md:flex-row items-end justify-between mb-16 gap-8">
              <div className="max-w-2xl">
                <h2 className="font-headline font-bold text-4xl md:text-5xl mb-6 text-secondary">Curated Knowledge</h2>
                <p className="text-muted-foreground text-lg">Master foundational and advanced strategies through interactive micro-modules.</p>
              </div>
              <Button variant="outline" className="h-14 px-8 border-black/10 font-bold" asChild>
                <Link href="/learning">Browse All Modules</Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               <div className="p-10 white-card rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-center">
                 <div className="w-24 h-24 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                   <Star className="w-10 h-10 text-primary" />
                 </div>
                 <div className="space-y-2">
                   <h3 className="font-headline font-bold text-2xl text-secondary">Foundational Knowledge</h3>
                   <p className="text-muted-foreground leading-relaxed">Perfect for beginners. Master budgeting, basic saving, and credit health basics.</p>
                 </div>
               </div>
               <div className="p-10 white-card rounded-[2.5rem] flex flex-col md:flex-row gap-8 items-center">
                 <div className="w-24 h-24 rounded-2xl bg-secondary/10 flex items-center justify-center shrink-0">
                   <TrendingUp className="w-10 h-10 text-secondary" />
                 </div>
                 <div className="space-y-2">
                   <h3 className="font-headline font-bold text-2xl text-secondary">Advanced Strategy</h3>
                   <p className="text-muted-foreground leading-relaxed">Deep dives into tax optimization, asset allocation, and complex market structures.</p>
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Rewards Section - Gold Theme */}
        <section id="rewards" className="py-24 bg-secondary">
          <div className="container mx-auto px-6 text-center text-white">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFBF00]/10 border border-[#FFBF00]/20 mb-8">
              <Trophy className="w-4 h-4 text-[#FFBF00]" />
              <span className="text-xs font-bold text-[#FFBF00] uppercase tracking-widest">Premium Rewards</span>
            </div>
            <h2 className="font-headline font-bold text-4xl md:text-5xl mb-8">Redeem Your Excellence</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-16 leading-relaxed">
              Your performance generates real value. Accumulate XP and unlock exclusive benefits from our ecosystem partners.
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {[
                { title: "Pro Subscription", cost: "5k XP", icon: Star },
                { title: "Analyst Badge", cost: "1.5k XP", icon: Shield },
                { title: "Partner Credits", cost: "3k XP", icon: Gift },
                { title: "Survivalist Trophy", cost: "2.5k XP", icon: Trophy }
              ].map((reward, i) => (
                <div key={i} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:border-[#FFBF00]/50 transition-all group flex flex-col items-center">
                   <div className="w-16 h-16 rounded-2xl bg-[#FFBF00]/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                     <reward.icon className="w-8 h-8 text-[#FFBF00]" />
                   </div>
                   <h4 className="font-headline font-bold text-xl mb-2">{reward.title}</h4>
                   <p className="text-[#FFBF00] font-bold text-sm uppercase tracking-widest">{reward.cost}</p>
                </div>
              ))}
            </div>

            <Button size="lg" className="mt-16 h-16 px-12 text-lg bg-[#FFBF00] hover:bg-[#FFBF00]/90 text-black font-bold shadow-xl shadow-[#FFBF00]/20" asChild>
              <Link href="/rewards">Claim Your Rewards</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-16 border-t border-black/5 bg-background">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-8">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-headline font-bold text-2xl tracking-tighter text-secondary">FinoRise</span>
          </div>
          <p className="text-muted-foreground text-base mb-10 max-w-md mx-auto leading-relaxed">
            Democratizing intelligence through technology and artificial intelligence.
          </p>
          <div className="flex flex-wrap justify-center gap-10 mb-10 text-sm font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="#" className="hover:text-primary transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-primary transition-colors">Terms</Link>
            <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
            <Link href="#" className="hover:text-primary transition-colors">API</Link>
          </div>
          <p className="text-xs text-muted-foreground/50 font-medium">
            © {new Date().getFullYear()} FinoRise Ecosystem. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
