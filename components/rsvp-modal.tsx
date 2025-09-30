"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, X, Send } from "lucide-react"

interface RSVPModalProps {
  isOpen: boolean
  onClose: () => void
}

export function RSVPModal({ isOpen, onClose }: RSVPModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    guests: "1",
    message: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Construir mensaje
    const mensaje = `👋 Hola, soy ${formData.name}.
    📧 Email: ${formData.email || "No proporcionado"}
    📱 Teléfono: ${formData.phone || "No proporcionado"}
    👥 Invitados: ${formData.guests}
    💬 Mensaje: ${formData.message || "Ninguno"}`

    // Número destino (pon el tuyo en formato internacional sin + ni espacios)
    const numeroDestino = "573224836927"

    // Crear link de WhatsApp
    const url = `https://wa.me/${numeroDestino}?text=${encodeURIComponent(mensaje)}`

    // Abrir WhatsApp
    window.open(url, "_blank")

    setIsSubmitted(true)

    // Resetear y cerrar
    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
      setFormData({
        name: "",
        email: "",
        phone: "",
        guests: "1",
        message: "",
      })
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-card/95 backdrop-blur-sm border-border/50">
        <CardHeader className="text-center relative">
          <button
            onClick={onClose}
            className="absolute right-4 top-4 text-muted-foreground hover:text-foreground transition-colors"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
          <CardTitle className="font-playfair text-2xl text-card-foreground flex items-center justify-center gap-2">
            <Heart className="w-6 h-6 text-primary fill-current" />
            Confirmar Asistencia
          </CardTitle>
        </CardHeader>

        <CardContent>
          {isSubmitted ? (
            <div className="text-center py-8">
              <Heart className="w-16 h-16 text-primary fill-current mx-auto mb-4 animate-pulse" />
              <h3 className="font-playfair text-xl font-semibold mb-2 text-card-foreground">¡Gracias por confirmar!</h3>
              <p className="text-muted-foreground">Tu confirmación ha sido enviada. ¡Te esperamos!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="name" className="text-card-foreground">
                  Nombre completo *
                </Label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="mt-1"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <Label htmlFor="email" className="text-card-foreground">
                  Email
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <Label htmlFor="phone" className="text-card-foreground">
                  Teléfono
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Tu número de teléfono"
                />
              </div>

              <div>
                <Label htmlFor="guests" className="text-card-foreground">
                  Número de invitados
                </Label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="mt-1 w-full px-3 py-2 bg-background border border-input rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="1">1 persona</option>
                  <option value="2">2 personas</option>
                  <option value="3">3 personas</option>
                  <option value="4">4 personas</option>
                </select>
              </div>

              <div>
                <Label htmlFor="message" className="text-card-foreground">
                  Mensaje especial (opcional)
                </Label>
                <Textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-1"
                  placeholder="Deja un mensaje especial..."
                  rows={3}
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                <Send className="w-4 h-4 mr-2" />
                Enviar Confirmación
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
