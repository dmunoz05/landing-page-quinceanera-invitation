"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, Calendar, Clock, MapPin, Shirt, Gift, Music, Volume2, VolumeX } from "lucide-react"
import { CountdownTimer } from "@/components/countdown-timer"
import { FloatingElements } from "@/components/floating-elements"
import { RSVPModal } from "@/components/rsvp-modal"

export default function QuinceAnosPage() {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false)
  const [isMusicPlaying, setIsMusicPlaying] = useState(false)
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null)

  useEffect(() => {
    const audioElement = new Audio("/cancion.mp3")
    audioElement.loop = true
    audioElement.volume = 0.3
    setAudio(audioElement)

    // Intentar reproducir de inmediato
    audioElement.play()
      .then(() => {
        setIsMusicPlaying(true)
      })
      .catch(err => {
        console.warn("Autoplay bloqueado, el usuario debe dar play:", err)
      })

    return () => {
      if (audioElement) {
        audioElement.pause()
        audioElement.src = ""
      }
    }
  }, [])

  const toggleMusic = () => {
    if (audio) {
      if (isMusicPlaying) {
        audio.pause()
      } else {
        audio.play().catch(console.error)
      }
      setIsMusicPlaying(!isMusicPlaying)
    }
  }

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      <FloatingElements />

      {/* Botón de música */}
      <button
        onClick={toggleMusic}
        className="fixed top-6 right-6 z-50 bg-primary/20 backdrop-blur-sm rounded-full p-3 hover:bg-primary/30 transition-all duration-300"
        aria-label={isMusicPlaying ? "Pausar música" : "Reproducir música"}
      >
        {isMusicPlaying ? <Volume2 className="w-5 h-5 text-primary" /> : <VolumeX className="w-5 h-5 text-primary" />}
      </button>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-4xl mx-auto">
          {/* Foto de la quinceañera */}
          <div className="mb-8 opacity-0 animate-fade-in-up">
            <div className="relative inline-block">
              <div className="w-80 h-80 md:w-96 md:h-96 mx-auto rounded-full overflow-hidden border-8 border-primary/20 shadow-2xl">
                <img src="/image-quinceanera.png" alt="Quinceañera" className="w-full h-full object-cover" />
              </div>
              <div className="absolute -top-4 -right-4 animate-sparkle">
                <Heart className="w-8 h-8 text-primary fill-current" />
              </div>
              <div className="absolute -bottom-4 -left-4 animate-sparkle animate-delay-400">
                <Heart className="w-6 h-6 text-accent fill-current" />
              </div>
            </div>
          </div>

          {/* Título principal */}
          <div className="opacity-0 animate-fade-in-up animate-delay-200">
            <h1 className="font-playfair text-5xl md:text-7xl font-bold text-foreground mb-4 text-balance">
              Mis Quince Años
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
              Te invito a celebrar conmigo esta noche mágica e inolvidable
            </p>
          </div>

          {/* Contador regresivo */}
          <div className="opacity-0 animate-fade-in-up animate-delay-400 mb-12">
            <CountdownTimer targetDate="2025-10-25T20:00:00" />
          </div>

          {/* Botón RSVP principal */}
          <div className="opacity-0 animate-fade-in-up animate-delay-600">
            <Button
              onClick={() => setIsRSVPOpen(true)}
              size="lg"
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-medium rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Heart className="w-5 h-5 mr-2" />
              Confirmar Asistencia
            </Button>
          </div>
        </div>
      </section>

      {/* Información del evento */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-center mb-16 text-foreground">
            Detalles del Evento
          </h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Fecha */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="mb-4 group-hover:animate-float">
                  <Calendar className="w-12 h-12 text-primary mx-auto" />
                </div>
                <h3 className="font-playfair text-2xl font-semibold mb-2 text-card-foreground">Fecha</h3>
                <p className="text-muted-foreground text-lg">25 de Octubre 2025</p>
              </CardContent>
            </Card>

            {/* Hora */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="mb-4 group-hover:animate-float">
                  <Clock className="w-12 h-12 text-accent mx-auto" />
                </div>
                <h3 className="font-playfair text-2xl font-semibold mb-2 text-card-foreground">Hora</h3>
                <p className="text-muted-foreground text-lg">7:30 PM</p>
              </CardContent>
            </Card>

            {/* Dirección */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="mb-4 group-hover:animate-float">
                  <MapPin className="w-12 h-12 text-secondary mx-auto" />
                </div>
                <h3 className="font-playfair text-2xl font-semibold mb-2 text-card-foreground">Lugar</h3>
                <p className="text-muted-foreground text-lg">Calle 44 # 71 - 103 (Salon Magenta)</p>
              </CardContent>
            </Card>

            {/* Vestimenta */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="mb-4 group-hover:animate-float">
                  <Shirt className="w-12 h-12 text-chart-4 mx-auto" />
                </div>
                <h3 className="font-playfair text-2xl font-semibold mb-2 text-card-foreground">Vestimenta</h3>
                <p className="text-muted-foreground text-lg">Formal</p>
              </CardContent>
            </Card>

            {/* Lluvia de sobres */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="mb-4 group-hover:animate-float">
                  <Gift className="w-12 h-12 text-chart-5 mx-auto" />
                </div>
                <h3 className="font-playfair text-2xl font-semibold mb-2 text-card-foreground">Lluvia de Sobres</h3>
                <p className="text-muted-foreground text-lg">Si</p>
              </CardContent>
            </Card>

            {/* Música */}
            <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300 group">
              <CardContent className="p-8 text-center">
                <div className="mb-4 group-hover:animate-float">
                  <Music className="w-12 h-12 text-primary mx-auto" />
                </div>
                <h3 className="font-playfair text-2xl font-semibold mb-2 text-card-foreground">Música</h3>
                <p className="text-muted-foreground text-lg">Música y pista de baile</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Sección de invitación especial */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-playfair text-4xl md:text-5xl font-bold mb-8 text-foreground text-balance">
            Una Noche para Recordar
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground mb-12 leading-relaxed text-pretty">
            Acompáñame en esta celebración tan especial donde daré el paso de niña a mujer. Será una noche llena de
            alegría, música, baile y momentos inolvidables que quedarán grabados en nuestros corazones para siempre.
          </p>

          <Button
            onClick={() => setIsRSVPOpen(true)}
            size="lg"
            variant="outline"
            className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-medium rounded-full transition-all duration-300 transform hover:scale-105"
          >
            <Heart className="w-5 h-5 mr-2" />
            Confirma tu Asistencia
          </Button>
        </div>
      </section>

      {/* Modal RSVP */}
      <RSVPModal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)} />
    </div>
  )
}
