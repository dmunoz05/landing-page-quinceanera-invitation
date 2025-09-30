"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"

interface CountdownTimerProps {
  targetDate: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime()
      const target = new Date(targetDate).getTime()
      const difference = target - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        })
      }
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <div className="flex flex-wrap justify-center gap-4">
      <Card className="bg-primary/10 border-primary/20">
        <CardContent className="p-4 text-center min-w-[80px]">
          <div className="text-2xl md:text-3xl font-bold text-primary font-playfair">{timeLeft.days}</div>
          <div className="text-sm text-muted-foreground">Días</div>
        </CardContent>
      </Card>

      <Card className="bg-accent/10 border-accent/20">
        <CardContent className="p-4 text-center min-w-[80px]">
          <div className="text-2xl md:text-3xl font-bold text-accent font-playfair">{timeLeft.hours}</div>
          <div className="text-sm text-muted-foreground">Horas</div>
        </CardContent>
      </Card>

      <Card className="bg-secondary/10 border-secondary/20">
        <CardContent className="p-4 text-center min-w-[80px]">
          <div className="text-2xl md:text-3xl font-bold text-secondary font-playfair">{timeLeft.minutes}</div>
          <div className="text-sm text-muted-foreground">Minutos</div>
        </CardContent>
      </Card>

      <Card className="bg-chart-4/10 border-chart-4/20">
        <CardContent className="p-4 text-center min-w-[80px]">
          <div className="text-2xl md:text-3xl font-bold text-chart-4 font-playfair">{timeLeft.seconds}</div>
          <div className="text-sm text-muted-foreground">Segundos</div>
        </CardContent>
      </Card>
    </div>
  )
}
