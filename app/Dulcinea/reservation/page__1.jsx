'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Imagen } from '@/app/components/mostrarmedios'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import eventsData from '@/app/Dulcinea/data/dataevent.json'

export default function Page({ params }) {
  const [showCheckout, setShowCheckout] = useState(false)
  const [selectedArea, setSelectedArea] = useState('')
  const [guestCount, setGuestCount] = useState(1)
  const [selectionMethod, setSelectionMethod] = useState('list')
  const router = useRouter()

  const [event, setEvent] = useState(null)

  useEffect(() => {
    if (params.slug && params.slug.length > 0) {
      const eventCode = params.slug[0]
      if (eventCode && eventCode.startsWith('evento')) {
        const eventInfo = eventCode.substring(6)
        const [year, month, day, id] = [
          eventInfo.substr(0, 4),
          eventInfo.substr(4, 2),
          eventInfo.substr(6, 2),
          eventInfo.substr(8)
        ]
        const matchedEvent = eventsData.events.find(e => 
          e.id.toString() === id &&
          e.date === `${year}-${month}-${day}`
        )
        if (matchedEvent) {
          setEvent(matchedEvent)
        } else {
          router.push('/calendario')
        }
      } else {
        router.push('/calendario')
      }
    }
  }, [params.slug, router])

  const handleReserve = () => {
    setShowCheckout(true)
  }

  const handleCancel = () => {
    setShowCheckout(false)
    setSelectedArea('')
    setGuestCount(1)
  }

  const handleCheckout = () => {
    if (event) {
      const reservationDetails = {
        eventTitle: event.title,
        eventDate: event.date,
        eventTime: event.time,
        selectedArea,
        guestCount
      }
      router.push(`/checkout?${new URLSearchParams(reservationDetails).toString()}`)
    }
  }

  const handleGoToMap = () => {
    if (event) {
      router.push(`/map?eventTitle=${encodeURIComponent(event.title)}&eventDate=${encodeURIComponent(event.date)}&eventTime=${encodeURIComponent(event.time)}`)
    }
  }

  if (!event) {
    return <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Cargando detalles del evento...</div>
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="relative">
        <Imagen
          src={event.image}
          alt={event.title}
          width={1920}
          height={1080}
          className="w-full h-[50vh] object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-white">{event.title}</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-xl mb-4"><strong>Fecha:</strong> {new Date(event.date).toLocaleDateString()}</p>
            <p className="text-xl mb-4"><strong>Hora:</strong> {event.time}</p>
            <p className="text-xl mb-6"><strong>Precio:</strong> ${event.price ? event.price.toFixed(2) : 'N/A'}</p>
          </div>
          <div>
            <p className="text-lg">{event.description}</p>
          </div>
        </div>

        <Accordion type="single" collapsible className="mb-8">
          <AccordionItem value="reservation">
            <AccordionTrigger>Hacer una reserva</AccordionTrigger>
            <AccordionContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <Tabs value={selectionMethod} onValueChange={setSelectionMethod} className="mb-8">
                    <TabsList className="grid w-full grid-cols-2">
                      <TabsTrigger value="list">Lista</TabsTrigger>
                      <TabsTrigger value="map">Mapa</TabsTrigger>
                    </TabsList>
                    <TabsContent value="list">
                      <Select value={selectedArea} onValueChange={setSelectedArea}>
                        <SelectTrigger className="w-full mb-4 bg-gray-800 text-white border-gray-700">
                          <SelectValue placeholder="Selecciona un área" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pista">Pista de baile</SelectItem>
                          <SelectItem value="balcon">Balcón</SelectItem>
                          <SelectItem value="vip">Área VIP</SelectItem>
                        </SelectContent>
                      </Select>
                    </TabsContent>
                    <TabsContent value="map">
                      <Button onClick={handleGoToMap} className="w-full mb-4 bg-blue-600 hover:bg-blue-700">
                        Ir al mapa interactivo
                      </Button>
                    </TabsContent>
                  </Tabs>
                </div>
                <div>
                  <Input
                    type="number"
                    min="1"
                    value={guestCount}
                    onChange={(e) => setGuestCount(parseInt(e.target.value))}
                    className="w-full mb-8 bg-gray-800 text-white border-gray-700"
                    placeholder="Número de invitados"
                  />
                  <Button onClick={handleReserve} className="w-full bg-blue-600 hover:bg-blue-700 text-xl py-3">
                    Reservar
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        {showCheckout && (
          <Card className="mt-12 bg-gray-800 border-gray-700">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-white">Resumen de la Reserva</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <p><strong>Evento:</strong> {event.title}</p>
                <p><strong>Área seleccionada:</strong> {selectedArea}</p>
                <p><strong>Número de invitados:</strong> {guestCount}</p>
                <p><strong>Total:</strong> ${event.price ? (event.price * guestCount).toFixed(2) : 'N/A'}</p>
              </div>

              <div className="flex justify-end space-x-4">
                <Button variant="outline" onClick={handleCancel} className="border-gray-600 text-gray-300 hover:bg-gray-700">
                  Cancelar
                </Button>
                <Button onClick={handleCheckout} className="bg-blue-600 hover:bg-blue-700">
                  Proceder al Checkout
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
