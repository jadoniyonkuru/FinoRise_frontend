"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Play, CheckCircle2, Clock, Award, BookOpen } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { PlaceHolderImages } from "@/lib/placeholder-images"

const modules = [
  {
    id: "module-budgeting",
    title: "Mastering the Flow",
    category: "Budgeting",
    lessons: 5,
    duration: "45m",
    difficulty: "Beginner",
    xp: 500,
    progress: 100,
    image: "module-budgeting"
  },
  {
    id: "module-investing",
    title: "The Stock Engine",
    category: "Investing",
    lessons: 8,
    duration: "1h 20m",
    difficulty: "Intermediate",
    xp: 1200,
    progress: 40,
    image: "module-investing"
  },
  {
    id: "module-credit",
    title: "Credit Foundations",
    category: "Debt",
    lessons: 4,
    duration: "30m",
    difficulty: "Beginner",
    xp: 400,
    progress: 0,
    image: "module-credit"
  },
  {
    id: "module-taxes",
    title: "Tax Optimization",
    category: "Advanced Finance",
    lessons: 6,
    duration: "2h",
    difficulty: "Advanced",
    xp: 2000,
    progress: 0,
    image: "hero-bg"
  }
]

export default function LearningHubPage() {
  const fallbackUrl = "https://picsum.photos/seed/placeholder/400/250";

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h1 className="font-headline font-bold text-3xl">Learning Hub</h1>
          <p className="text-muted-foreground">Micro-learning modules designed for high retention and behavioral change.</p>
        </div>
        <div className="flex gap-4">
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Modules Finished</p>
            <p className="text-xl font-bold font-headline">8 / 24</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-widest">Total XP Earned</p>
            <p className="text-xl font-bold font-headline text-primary">12,450</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {modules.map((mod) => {
          const modImg = PlaceHolderImages.find(img => img.id === mod.id);
          const imageUrl = modImg?.imageUrl || fallbackUrl;
          const imageHint = modImg?.imageHint || "learning finance";

          return (
            <Card key={mod.id} className="glass border-white/5 group overflow-hidden flex flex-col">
              <div className="relative aspect-video overflow-hidden">
                <Image 
                  src={imageUrl}
                  alt={mod.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  data-ai-hint={imageHint}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <Badge className="absolute top-4 left-4 bg-black/60 backdrop-blur-md border-white/10 uppercase tracking-widest text-[10px]">
                  {mod.difficulty}
                </Badge>
                {mod.progress === 100 && (
                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-green-500 flex items-center justify-center shadow-lg">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
              <CardHeader className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[10px] font-bold text-primary uppercase tracking-widest">{mod.category}</span>
                </div>
                <CardTitle className="font-headline text-xl">{mod.title}</CardTitle>
                <CardDescription className="flex items-center gap-4 pt-2">
                  <span className="flex items-center gap-1 text-xs">
                    <BookOpen className="w-3 h-3" /> {mod.lessons} Lessons
                  </span>
                  <span className="flex items-center gap-1 text-xs">
                    <Clock className="w-3 h-3" /> {mod.duration}
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold text-muted-foreground">+{mod.xp} XP</span>
                  <span className="text-xs font-medium">{mod.progress}% Complete</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden mb-6">
                  <div 
                    className="h-full bg-primary transition-all duration-500" 
                    style={{ width: `${mod.progress}%` }} 
                  />
                </div>
                <Button 
                  asChild
                  className={`w-full ${mod.progress === 100 ? 'bg-white/5 text-white hover:bg-white/10' : 'bg-primary hover:bg-primary/90'}`}
                >
                  <Link href={`/learning/${mod.id}`}>
                    {mod.progress === 100 ? 'Review Module' : mod.progress > 0 ? 'Continue' : 'Start Now'}
                  </Link>
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
