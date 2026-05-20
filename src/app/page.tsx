import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Zap, Shield, TrendingUp, Cpu, ArrowRight, Play } from 'lucide-react';
import { PlaceHolderImages } from '@/lib/placeholder-images';

export default function LandingPage() {
  const heroImg = PlaceHolderImages.find(img => img.id === 'hero-bg');

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="fixed top-0 w-full z-50 glass border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/30">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <span className="font-headline font-bold text-2xl tracking-tighter">
              Fino<span className="text-primary">Rise</span>
            </span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-muted-foreground">
            <Link href="#features" className="hover:text-primary transition-colors">Features</Link>
            <Link href="#how-it-works" className="hover:text-primary transition-colors">Simulations</Link>
            <Link href="#learning" className="hover:text-primary transition-colors">Learning Hub</Link>
            <Link href="#pricing" className="hover:text-primary transition-colors">Rewards</Link>
          </nav>

          <div className="flex items-center gap-4">
            <Button variant="ghost" asChild className="hidden sm:inline-flex">
              <Link href="/login">Log in</Link>
            </Button>
            <Button asChild className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20">
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative pt-40 pb-20 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-primary/20 blur-[120px] rounded-full opacity-30 -z-10" />
          
          <div className="container mx-auto px-6 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-8 animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              <span className="text-xs font-bold text-primary uppercase tracking-widest">Powered by Gemini AI</span>
            </div>
            
            <h1 className="font-headline font-bold text-5xl md:text-7xl mb-6 tracking-tight leading-[1.1]">
              Elevate Your <br />
              <span className="gradient-text">Financial Intelligence</span>
            </h1>
            
            <p className="max-w-2xl mx-auto text-lg text-muted-foreground mb-10 leading-relaxed">
              FinoRise is the AI-driven ecosystem where gaming meets financial mastery. Experience immersive simulations, curated learning, and behavioral coaching.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button size="lg" className="h-14 px-8 text-base bg-primary hover:bg-primary/90 group" asChild>
                <Link href="/dashboard">
                  Start Your Journey
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" className="h-14 px-8 text-base glass group">
                <Play className="mr-2 w-4 h-4 fill-current" />
                Watch Trailer
              </Button>
            </div>

            <div className="mt-20 relative rounded-3xl overflow-hidden glass p-4 max-w-5xl mx-auto border border-white/10">
              <div className="aspect-video relative rounded-2xl overflow-hidden">
                <Image 
                  src={heroImg?.imageUrl || "https://picsum.photos/seed/hero/1200/800"} 
                  alt="Hero"
                  fill
                  className="object-cover"
                  priority
                  data-ai-hint="finance technology"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 bg-black/40">
          <div className="container mx-auto px-6">
            <div className="text-center mb-16">
              <h2 className="font-headline font-bold text-3xl md:text-4xl mb-4">Master Every Financial Domain</h2>
              <p className="text-muted-foreground">Our intelligent system bridges the gap between theory and real-world behavior.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: "AI Behavioral Coach",
                  desc: "Get personalized feedback on every decision you make in our high-stakes simulations.",
                  icon: Cpu,
                  color: "text-primary"
                },
                {
                  title: "Immersive Simulations",
                  desc: "Navigate branching narratives of budgeting, debt recovery, and investment growth.",
                  icon: Zap,
                  color: "text-secondary"
                },
                {
                  title: "Gamified Progression",
                  desc: "Earn XP, unlock rare badges, and compete for partner-sponsored real-world rewards.",
                  icon: Shield,
                  color: "text-primary"
                },
                {
                  title: "Dynamic Analytics",
                  desc: "Visualize your financial growth score and behavioral trends with crystal clear data.",
                  icon: TrendingUp,
                  color: "text-secondary"
                },
                {
                  title: "Curated Hub",
                  desc: "Micro-learning modules designed for high retention and immediate application.",
                  icon: Zap,
                  color: "text-primary"
                },
                {
                  title: "Partner Rewards",
                  desc: "Redeem your learning performance for tangible benefits from our fintech partners.",
                  icon: Shield,
                  color: "text-secondary"
                }
              ].map((feature, i) => (
                <div key={i} className="p-8 rounded-2xl glass glass-hover group border-white/5">
                  <div className={`w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="font-headline font-bold text-xl mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="py-12 border-t border-white/5 bg-background">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <Zap className="w-5 h-5 text-white" />
            </div>
            <span className="font-headline font-bold text-xl tracking-tight">FinoRise</span>
          </div>
          <p className="text-muted-foreground text-sm mb-8 max-w-md mx-auto">
            Democratizing financial intelligence through immersive technology and artificial intelligence.
          </p>
          <div className="flex justify-center gap-8 mb-8 text-sm text-muted-foreground font-medium">
            <Link href="#" className="hover:text-white transition-colors">Privacy</Link>
            <Link href="#" className="hover:text-white transition-colors">Terms</Link>
            <Link href="#" className="hover:text-white transition-colors">Contact</Link>
            <Link href="#" className="hover:text-white transition-colors">API</Link>
          </div>
          <p className="text-xs text-muted-foreground/50">
            © {new Date().getFullYear()} FinoRise Ecosystem. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
