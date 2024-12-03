/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useState, useEffect } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRouter } from 'next/navigation'
import eventData from "app/Dulcinea/data/dataevent.json"
import { Imagen } from 'app/components/mostrarmedios'

export const CalendarioEventos = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null)
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const router = useRouter()

  useEffect(() => {
    updateUpcomingEvents()
  }, [currentDate])

  const updateUpcomingEvents = () => {
    const twoMonthsLater = new Date(currentDate)
    twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2)

    const upcoming = eventData.events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate >= currentDate && eventDate < twoMonthsLater
    })
    setUpcomingEvents(upcoming)
  }

  const handleSelect = (date) => {
    if (date) {
      setSelectedDate(date)
      const formattedDate = date.toISOString().split('T')[0]
      const event = eventData.events.find(e => e.date === formattedDate)
      setSelectedEvent(event || null)
    }
  }

  const changeMonth = (increment) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + increment)
    setCurrentDate(newDate)
  }

  const handleReservation = () => {
    if (selectedEvent) {
      router.push(`/reservations?eventTitle=${encodeURIComponent(selectedEvent.title)}&eventDate=${encodeURIComponent(selectedEvent.date)}&eventTime=${encodeURIComponent(selectedEvent.time)}`)
    }
  }

  return (
    <div className="container mx-auto p-4 bg-gradient-to-b from-purple-100 to-blue-100 min-h-screen">
      <h1 className="text-4xl font-bold mb-8 text-center text-purple-800">Calendario de Eventos</h1>
      <Card className="mb-8 bg-white/80 backdrop-blur-sm">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <Button variant="ghost" onClick={() => changeMonth(-1)}><ChevronLeft className="h-4 w-4" /></Button>
          <CardTitle className="text-2xl font-semibold text-purple-700">
            {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
          </CardTitle>
          <Button variant="ghost" onClick={() => changeMonth(1)}><ChevronRight className="h-4 w-4" /></Button>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="flex justify-center space-x-4">
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleSelect}
              month={currentDate}
              className="rounded-md border shadow"
              modifiers={{
                event: (date) => eventData.events.some(e => e.date === date.toISOString().split('T')[0])
              }}
              modifiersStyles={{
                event: { fontWeight: 'bold', color: 'white', backgroundColor: 'rgba(124, 58, 237, 0.8)' }
              }}
            />
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={handleSelect}
              month={new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)}
              className="rounded-md border shadow"
              modifiers={{
                event: (date) => eventData.events.some(e => e.date === date.toISOString().split('T')[0])
              }}
              modifiersStyles={{
                event: { fontWeight: 'bold', color: 'white', backgroundColor: 'rgba(124, 58, 237, 0.8)' }
              }}
            />
          </div>
        </CardContent>
      </Card>
      
      <Card className="mb-8 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-purple-700">Próximos Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="bg-white shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-purple-600">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{new Date(event.date).toLocaleDateString()} - {event.time}</p>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedDate(new Date(event.date))
                        setSelectedEvent(event)
                      }}
                      className="w-full bg-purple-100 text-purple-700 hover:bg-purple-200"
                    >
                      Ver detalles
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
      
      {selectedEvent && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-purple-700">{selectedEvent.title}</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <Imagen src={selectedEvent.image} alt={selectedEvent.title} className="w-full h-64 object-cover rounded-lg shadow-lg" />
            </div>
            <div className="flex-1 space-y-4">
              <p className="text-lg text-purple-600">{new Date(selectedEvent.date).toLocaleDateString()} - {selectedEvent.time}</p>
              <p className="text-gray-700">{selectedEvent.description}</p>
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={selectedEvent.dj.avatar} alt={selectedEvent.dj.name} />
                  <AvatarFallback>DJ</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium text-purple-700">{selectedEvent.dj.name}</p>
                  <p className="text-gray-600 text-sm">Artista Invitado</p>
                </div>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full md:w-auto bg-purple-600 hover:bg-purple-700 text-white">Reservar</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Reservar para {selectedEvent.title}</DialogTitle>
                  </DialogHeader>
                  <p>¿Estás seguro que deseas reservar para el evento {selectedEvent.title} el día {new Date(selectedEvent.date).toLocaleDateString()}?</p>
                  <Button onClick={handleReservation} className="mt-4 w-full bg-purple-600 hover:bg-purple-700 text-white">
                    Continuar con la reservación
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

