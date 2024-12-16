'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Imagen } from '@/app/components/mostrarmedios'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChevronLeft, MapPin, Users, Calendar, Clock, Share2, CreditCard } from 'lucide-react'
import eventsData from '@/app/Dulcinea/data/dataevent.json'
import { useReservation } from '../context/ReservationContext'



export function EventDetails() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [event, setEvent] = useState(null)
  const [selectedArea, setSelectedArea] = useState(null)
  const [guestCount, setGuestCount] = useState(1)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [showCheckout, setShowCheckout] = useState(false)
  const [isLoading, setIsLoading] = useState(true) 
  const { setEventDetails, setSelectedAreas } = useReservation()
  

  useEffect(() => {
    const eventCode = searchParams.get('event')
    if (eventCode && eventCode.startsWith('evento')) {
      const eventInfo = eventCode.substring(6)
      const date = eventInfo.substr(0, 8)
      const id = parseInt(eventInfo.substr(8), 10)

      setIsLoading(true)

      const matchedEvent = eventsData.events.find(e => 
        e.id === id &&
        e.date.replace(/-/g, '') === date
      )
      
      if (matchedEvent) {
        setEvent(matchedEvent)
        setEventDetails({
          title: matchedEvent.title,
          date: matchedEvent.date,
          time: matchedEvent.time,
        })
      } else {
        console.error('Event not found:', { date, id })
        setEvent(null) 
      }

      setIsLoading(false)
    } else {
      console.error('Invalid event code:', eventCode)
      setIsLoading(false) 
    }
  }, [searchParams, setEventDetails])

  const handleAreaSelect = (area) => {
    setSelectedArea(area)
    setIsBookingModalOpen(true)
  }

  const handleBook = () => {
    setIsBookingModalOpen(false)
    setShowCheckout(true)
  }
  
  const handleReserve = () => {
    if (event) {

      router.push('/Dulcinea/map')
    }
  }

  const handleConfirmReservation = () => {
    console.log('Reservation confirmed:', { event: event.title, area: selectedArea, guests: guestCount })
    router.push('/Dulcinea/checkout')
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        <span>Cargando...</span>
      </div>
    )
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">
        Evento no encontrado
      </div>
    )
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
        <div className="absolute inset-0 bg-black bg-opacity-50 z-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-center text-white">{event.title}</h1>
        </div>
        <Button 
          onClick={() => router.push('eventos')} 
          className="absolute top-20 left-4 z-0 bg-black bg-opacity-50 hover:bg-opacity-75"
        >
          <ChevronLeft className="mr-2" />
          Volver a Eventos
        </Button>
      </div>

      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left column - Event information */}
          <div className="w-full md:w-2/3 space-y-8">
            <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
              <div className='p-2 mx-auto my-auto'>
                <Button onClick={handleReserve} className="w-full mb-4 bg-blue-600 hover:bg-blue-700">
                  Ir al mapa interactivo
                </Button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 mt-4">
                <div className="space-y-4">
                  <div className="flex items-center text-lg">
                    <Calendar className="mr-2 text-blue-400" />
                    <span><strong>Fecha:</strong> {new Date(event.date).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center text-lg">
                    <Clock className="mr-2 text-blue-400" />
                    <span><strong>Hora:</strong> {event.time}</span>
                  </div>
                </div>
                <div>
                  <p className="text-lg">{event.description}</p>
                </div>
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="area-selection" className="border-b-0 justify-center items-center">
                  <AccordionTrigger className="text-lg text-blue-400 hover:text-blue-300">
                    Elegir área
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {eventsData.areas.map((area) => (
                        <Button
                          key={area.id}
                          onClick={() => handleAreaSelect(area)}
                          className="bg-gray-700 hover:bg-gray-600 text-left justify-start h-auto py-4"
                        >
                          <div>
                            <h4 className="text-lg font-semibold">{area.name}</h4>
                            <p className="text-sm text-gray-300">Precio: ${area.price}</p>
                          </div>
                        </Button>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {showCheckout && (
              <Card className="bg-gray-800 border-gray-700 text-white">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-white">Resumen de la Reserva</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p><strong>Evento:</strong> {event.title}</p>
                  <p><strong>Área seleccionada:</strong> {selectedArea.name} - ${selectedArea.price}</p>
                  <p><strong>Número de invitados:</strong> {guestCount}</p>
                  <p><strong>Total:</strong> ${selectedArea.price * guestCount}</p>
                  <Button 
                    onClick={handleConfirmReservation}
                    className="w-full bg-green-600 hover:bg-green-700"
                  >
                    <CreditCard className="mr-2" />
                    Proceder al pago
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Right column - Additional information */}
          <div className="w-full md:w-1/3 space-y-8 ">
            <Card className="bg-gray-800 border-gray-700">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Compartir evento</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Share2 className="mr-2" />
                  Compartir en Facebook
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gray-800 border-gray-700 text-white">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-white">Información relevante</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p>DJ: {event.dj.name}</p>
                <p>Capacidad: 500 personas</p>
                <p>Edad mínima: 18 años</p>
                <p>Dress code: Casual elegante</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
        <DialogContent className="bg-gray-800 text-white">
          <DialogHeader>
            <DialogTitle>Reservar {selectedArea?.name}</DialogTitle>
            <DialogDescription>
              Ingrese el número de personas para su reserva.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="guestCount" className="text-white">Número de invitados</Label>
            <Input
              id="guestCount"
              type="number"
              min="1"
              value={guestCount}
              onChange={(e) => setGuestCount(parseInt(e.target.value))}
              className="mt-2 bg-gray-700 border-gray-600 text-white"
            />
          </div>
          <DialogFooter>
            <Button onClick={handleBook} className="bg-green-600 hover:bg-green-700">
              Reservar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
