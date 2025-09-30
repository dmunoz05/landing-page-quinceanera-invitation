"use client"

import { Heart, Star, Sparkles } from "lucide-react"

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Corazones flotantes */}
      <div className="absolute top-20 left-10 animate-float animate-delay-200">
        <Heart className="w-6 h-6 text-primary/30 fill-current" />
      </div>
      <div className="absolute top-40 right-20 animate-float animate-delay-600">
        <Heart className="w-4 h-4 text-accent/40 fill-current" />
      </div>
      <div className="absolute bottom-40 left-20 animate-float animate-delay-400">
        <Heart className="w-5 h-5 text-secondary/30 fill-current" />
      </div>

      {/* Estrellas brillantes */}
      <div className="absolute top-60 left-1/4 animate-sparkle">
        <Star className="w-4 h-4 text-primary/40 fill-current" />
      </div>
      <div className="absolute top-80 right-1/3 animate-sparkle animate-delay-400">
        <Star className="w-3 h-3 text-accent/50 fill-current" />
      </div>
      <div className="absolute bottom-60 right-10 animate-sparkle animate-delay-200">
        <Star className="w-5 h-5 text-chart-4/40 fill-current" />
      </div>

      {/* Destellos */}
      <div className="absolute top-32 right-1/4 animate-sparkle animate-delay-600">
        <Sparkles className="w-6 h-6 text-primary/20" />
      </div>
      <div className="absolute bottom-32 left-1/3 animate-sparkle animate-delay-200">
        <Sparkles className="w-4 h-4 text-accent/30" />
      </div>
    </div>
  )
}
