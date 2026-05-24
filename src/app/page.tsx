import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Zap, Shield, TrendingUp, Cpu, ArrowRight, Play, Trophy, Star, Layout, Gamepad2 } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { ModeToggle } from '@/components/mode-toggle';

export default function LandingPage() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <div className="flex flex-col min-h-screen scroll-smooth">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass border-b border-black/5 bg-background/80">
        <div className="container mx-auto px-6 h-24 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-110 transition-transform">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-headline font-bold text-2xl tracking-tighter text-secondary">
              Fino<span className="text-primary">Rise</span>
            </span>
          </Link>
          
          <nav className="hidden lg:flex items-center gap-8 text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#simulations" className="hover:text-primary transition-colors">Simulations</Link>
            <Link href="#learning" className="hover:text-primary transition-colors">Learning Hub</Link>
            <Link href="#rewards" className="hover:text-primary transition-colors">Rewards</Link>
          </nav>

          <div className="flex items-center gap-6">
            <ModeToggle />
            <Link 
              href="/login" 
              className="text-sm font-bold uppercase tracking-widest hover:text-primary transition-colors text-secondary"
            >
              Log in
            </Link>
            <Button asChild className="bg-primary hover:bg-secondary text-white h-14 px-8 font-bold text-[10px] uppercase tracking-widest rounded-2xl">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-48 pb-24 overflow-hidden text-center">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/10 blur-[120px] rounded-full opacity-30 -z-10" />
          
          <div className="container mx-auto px-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10 mb-10">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
              <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Powered by Gemini AI</span>
            </div>
            
            <h1 className="font-headline font-bold text-5xl md:text-8xl mb-8 tracking-tight leading-tight text-secondary">
              Elevate Your <br />
              <span className="text-primary">Financial Future</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-12 leading-relaxed">
              FinoRise is the AI-driven ecosystem where gaming meets mastery. Immersive simulations, curated learning, and behavioral coaching designed for the next generation.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Button size="lg" className="h-16 w-full sm:w-64 text-sm uppercase tracking-widest bg-primary hover:bg-secondary text-white group shadow-xl shadow-primary/20 font-bold rounded-2xl" asChild>
                <Link href="/dashboard">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-16 w-full sm:w-64 text-sm uppercase tracking-widest glass group border-black/10 hover:bg-secondary hover:text-white font-bold rounded-2xl" asChild>
                <Link href="#simulations">
                  Try Simulation
                  <Play className="ml-2 w-4 h-4 fill-current" />
                </Link>
              </Button>
            </div>

            <div className="mt-24 relative rounded-[2rem] overflow-hidden glass p-4 max-w-5xl mx-auto border border-black/5 shadow-2xl">
              <div className="aspect-[21/9] relative rounded-[1.5rem] overflow-hidden">
                <Image 
                  src={heroImg?.imageUrl || "https://picsum.photos/seed/hero/1200/800"} 
                  alt="Hero"
                  fill
                  className="object-cover"
                  priority
                  data-ai-hint="finance technology"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Master Every Domain Section */}
        <section id="features" className="py-32 bg-primary/5">
          <div className="container mx-auto px-6 text-center">
            <div className="mb-20">
              <h2 className="font-headline font-bold text-4xl md:text-5xl mb-6 text-secondary tracking-tight">Master Every Domain</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">Our intelligent system bridges the gap between theory and real-world behavior with curated learning and AI coaching.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "AI Behavioral Coach", desc: "Personalized feedback on every decision you make in simulations.", icon: Cpu },
                { title: "Immersive Scenarios", desc: "Navigate branching narratives of debt recovery and growth.", icon: Zap },
                { title: "Gamified Progress", desc: "Earn XP, unlock rare badges, and compete for real rewards.", icon: Shield },
                { title: "Dynamic Analytics", desc: "Visualize your growth score and behavioral trends with clarity.", icon: TrendingUp },
                { title: "Curated Content", desc: "Micro-learning modules designed for high retention and impact.", icon: Layout },
                { title: "Gold Rewards", desc: "Redeem performance for tangible benefits from fintech partners.", icon: Trophy }
              ].map((feature, i) => (
                <div key={i} className="p-10 white-card rounded-3xl group text-left flex flex-col items-start h-full hover:bg-secondary hover:text-white transition-all duration-300 cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="font-headline font-bold text-2xl mb-4 group-hover:text-white transition-colors">{feature.title}</h3>
                  <p className="text-muted-foreground group-hover:text-white/80 leading-relaxed flex-1 transition-colors">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Hyper-Realistic Simulations Section */}
        <section id="simulations" className="py-32 bg-background">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/5 border border-primary/10">
                  <Gamepad2 className="w-4 h-4 text-primary" />
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">Active Narratives</span>
                </div>
                <h2 className="font-headline font-bold text-4xl md:text-6xl text-secondary tracking-tight">Hyper-Realistic <br /> Simulations</h2>
                <p className="text-muted-foreground text-lg leading-relaxed max-w-xl">
                  Learn by doing. Step into the simulator and make high-stakes decisions with zero risk to your real wallet. Your decisions have real consequences in our hyper-realistic narratives.
                </p>
                <div className="space-y-4">
                  {[
                    "Branching storylines",
                    "Real-time market data",
                    "Behavioral feedback loop",
                    "Dynamic outcomes"
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                      <span className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">{item}</span>
                    </div>
                  ))}
                </div>
                <Button size="lg" className="h-16 px-10 text-sm uppercase tracking-widest bg-primary hover:bg-secondary text-white font-bold rounded-2xl" asChild>
                  <Link href="/simulations">Enter Simulator</Link>
                </Button>
              </div>
              <div className="relative">
                <div className="aspect-square relative rounded-[3rem] overflow-hidden glass p-4 bg-primary/5 border-primary/10">
                   <div className="h-full w-full rounded-[2.5rem] bg-white flex items-center justify-center shadow-inner">
                      <Gamepad2 className="w-32 h-32 text-primary opacity-20" />
                   </div>
                   <div className="absolute bottom-12 left-12 p-6 glass rounded-2xl border-white/20 shadow-xl max-w-[200px]">
                      <p className="text-xs font-bold uppercase tracking-widest text-primary mb-2">Scenario Active</p>
                      <p className="text-sm font-semibold text-secondary">The Bull Run</p>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Micro-Learning Hub Section */}
        <section id="learning" className="py-32 bg-primary/5">
          <div className="container mx-auto px-6 text-center">
            <div className="mb-20">
              <h2 className="font-headline font-bold text-4xl md:text-5xl mb-6 text-secondary tracking-tight">Micro-Learning Hub</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">Courses designed for high retention and immediate real-world application.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              {[
                { title: "Foundational Knowledge", desc: "Perfect for beginners. Master budgeting, basic saving, and credit health basics.", icon: Star },
                { title: "Advanced Strategy", desc: "Deep dives into tax optimization, asset allocation, and complex market structures.", icon: TrendingUp }
              ].map((card, i) => (
                <div key={i} className="white-card p-12 rounded-[2.5rem] text-left group hover:bg-secondary hover:text-white transition-all duration-300 cursor-pointer">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-10 group-hover:scale-110 transition-transform">
                    <card.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-headline font-bold text-2xl mb-4 group-hover:text-white transition-colors">{card.title}</h3>
                  <p className="text-muted-foreground group-hover:text-white/80 leading-relaxed mb-10 transition-colors">{card.desc}</p>
                  <Button variant="link" className="text-primary font-bold uppercase tracking-widest p-0 flex items-center gap-2 group/btn h-auto group-hover:text-white transition-colors">
                    Learn More <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Real-World Gold Section */}
        <section id="rewards" className="py-32 bg-background border-t border-black/5">
          <div className="container mx-auto px-6 text-center">
             <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FFBF00]/5 border border-[#FFBF00]/10 mb-8">
              <Trophy className="w-4 h-4 text-[#FFBF00]" />
              <span className="text-[10px] font-bold text-[#FFBF00] uppercase tracking-widest">Premium Rewards</span>
            </div>
            <h2 className="font-headline font-bold text-4xl md:text-6xl mb-8 text-secondary tracking-tight">Real-World <span className="text-[#FFBF00]">Gold</span></h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-20 leading-relaxed">
              Your excellence in simulations pays off. Redeem your hard-earned XP for digital perks and real-world financial benefits.
            </p>
            
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mb-20">
               {[
                 { icon: Zap, label: "Power Ups" },
                 { icon: Star, label: "Premium" },
                 { icon: Trophy, label: "Collectibles" }
               ].map((item, i) => (
                 <div key={i} className="flex flex-col items-center gap-4">
                   <div className="w-16 h-16 rounded-2xl bg-[#FFBF00]/10 flex items-center justify-center">
                     <item.icon className="w-8 h-8 text-[#FFBF00]" />
                   </div>
                   <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{item.label}</span>
                 </div>
               ))}
            </div>

            <Button size="lg" className="h-16 px-12 text-sm uppercase tracking-widest bg-[#FFBF00] hover:bg-secondary hover:text-white text-black font-bold shadow-xl shadow-[#FFBF00]/20 rounded-2xl transition-all" asChild>
              <Link href="/rewards">Claim Your Gold <ArrowRight className="ml-2 w-4 h-4" /></Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-black/5 bg-background">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left">
            <div className="space-y-6 md:col-span-1">
              <Link href="/" className="flex items-center justify-center md:justify-start gap-2">
                <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <span className="font-headline font-bold text-2xl tracking-tighter text-secondary">FinoRise</span>
              </Link>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Democratizing financial intelligence through immersive AI experiences.
              </p>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-secondary mb-6">Product</h4>
              <nav className="flex flex-col gap-4 text-sm font-medium text-muted-foreground">
                <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
                <Link href="#simulations" className="hover:text-primary transition-colors">Simulations</Link>
                <Link href="#learning" className="hover:text-primary transition-colors">Learning Hub</Link>
                <Link href="#rewards" className="hover:text-primary transition-colors">Rewards</Link>
              </nav>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-secondary mb-6">Company</h4>
              <nav className="flex flex-col gap-4 text-sm font-medium text-muted-foreground">
                <Link href="#" className="hover:text-primary transition-colors">About Us</Link>
                <Link href="#" className="hover:text-primary transition-colors">Contact</Link>
                <Link href="#" className="hover:text-primary transition-colors">Careers</Link>
                <Link href="#" className="hover:text-primary transition-colors">Legal</Link>
              </nav>
            </div>
            <div>
              <h4 className="font-bold text-xs uppercase tracking-widest text-secondary mb-6">Stay Connected</h4>
              <p className="text-sm text-muted-foreground mb-4">Join 20k+ users elevating their future.</p>
              <Button size="sm" className="w-full h-11 uppercase text-[10px] tracking-widest font-bold">Subscribe</Button>
            </div>
          </div>
          <div className="pt-20 border-t border-black/5 mt-20 text-center">
            <p className="text-[10px] text-muted-foreground/50 font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} FinoRise Ecosystem. Designed for Impact.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
