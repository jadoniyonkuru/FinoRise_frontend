"use client"

import { useState, use } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { 
  ChevronLeft, 
  BookOpen, 
  ArrowRight, 
  Zap,
  Lightbulb
} from "lucide-react"
import Link from "next/link"

const LESSON_CONTENT: Record<string, any> = {
  "module-budgeting": {
    title: "Mastering the Flow",
    category: "Budgeting",
    lessons: [
      {
        title: "The 50/30/20 Rule",
        content: "Budgeting isn't about restriction; it's about allocation. The 50/30/20 rule suggests putting 50% of your income toward needs, 30% toward wants, and 20% toward savings and debt repayment.",
        hint: "Needs are things you can't live without, like rent and utilities."
      },
      {
        title: "Tracking Every Penny",
        content: "Awareness is the first step to change. By tracking every expense for 30 days, you'll identify 'spending leaks' that drain your wealth slowly.",
        hint: "Small subscriptions often go unnoticed but add up to hundreds a year."
      }
    ]
  },
  "module-investing": {
    title: "The Stock Engine",
    category: "Investing",
    lessons: [
      {
        title: "Compound Interest Magic",
        content: "Compound interest is the 8th wonder of the world. It is the result of reinvesting interest, rather than paying it out, so that interest in the next period is then earned on the principal sum plus previously accumulated interest.",
        hint: "Starting just 5 years earlier can result in double the final portfolio value."
      }
    ]
  }
}

export default function InteractiveLessonPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const module = LESSON_CONTENT[id] || LESSON_CONTENT["module-budgeting"]
  
  const [currentStep, setCurrentStep] = useState(0)
  const isLastStep = currentStep === module.lessons.length - 1

  const handleNext = () => {
    if (isLastStep) {
      router.push("/learning")
    } else {
      setCurrentStep(prev => prev + 1)
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8 h-[calc(100vh-160px)] flex flex-col">
      <div className="flex items-center justify-between">
        <Button variant="ghost" size="sm" asChild className="glass">
          <Link href="/learning">
            <ChevronLeft className="w-4 h-4 mr-2" /> Back to Hub
          </Link>
        </Button>
        <div className="flex items-center gap-4">
          <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
            Lesson {currentStep + 1} of {module.lessons.length}
          </span>
          <div className="w-32">
            <Progress value={((currentStep + 1) / module.lessons.length) * 100} className="h-1.5" />
          </div>
        </div>
      </div>

      <Card className="flex-1 glass border-white/5 flex flex-col overflow-hidden relative">
        <div className="absolute top-0 right-0 p-8">
           <BookOpen className="w-24 h-24 text-primary opacity-[0.03] -rotate-12" />
        </div>

        <CardHeader className="p-10 pb-6">
          <Badge variant="outline" className="w-fit mb-4 border-primary/30 text-primary">{module.category}</Badge>
          <CardTitle className="text-3xl font-headline font-bold leading-tight max-w-2xl">
            {module.lessons[currentStep].title}
          </CardTitle>
        </CardHeader>

        <CardContent className="flex-1 px-10 pt-6 space-y-8">
          <div className="prose prose-invert max-w-none">
            <p className="text-xl text-muted-foreground leading-relaxed">
              {module.lessons[currentStep].content}
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 flex gap-4">
            <Lightbulb className="w-6 h-6 text-primary shrink-0" />
            <div className="space-y-1">
              <p className="text-xs font-bold uppercase tracking-widest text-primary">Pro Tip</p>
              <p className="text-sm text-foreground/80 italic">
                {module.lessons[currentStep].hint}
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
              <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Completion Reward</p>
              <p className="text-sm font-bold">+150 XP</p>
            </div>
          </div>

          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 group"
            onClick={handleNext}
          >
            {isLastStep ? "Complete Module" : "Next Lesson"}
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>
      </Card>
    </div>
  )
}
