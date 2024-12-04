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
import Image from 'next/image'
import { Imagen, Videos } from '@/app/components/mostrarmedios'


const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 990

export const CalendarioEventos = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedEvents, setSelectedEvents] = useState([])  // Cambiado para manejar varios eventos
  const [upcomingEvents, setUpcomingEvents] = useState([])
  const router = useRouter()
  const [deviceType, setDeviceType] = useState('desktop')
  const [sizeHorizontal, setSizeHorizontal] = useState(0); 

  useEffect(() => {
    updateUpcomingEvents()
    const checkDeviceType = () => {
      setSizeHorizontal(window.innerWidth);
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        setDeviceType('mobile');
      } else if (window.innerWidth <= TABLET_BREAKPOINT) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, [currentDate]);

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
      const eventsForDay = eventData.events.filter(e => e.date === formattedDate)  // Mostrar todos los eventos para el día
      setSelectedEvents(eventsForDay)
    }
  }

  const changeMonth = (increment) => {
    const newDate = new Date(currentDate)
    newDate.setMonth(newDate.getMonth() + increment)
    setCurrentDate(newDate)
  }

  const handleReservation = (event) => {
    if (event) {
      router.push(`/reservations?eventTitle=${encodeURIComponent(event.title)}&eventDate=${encodeURIComponent(event.date)}&eventTime=${encodeURIComponent(event.time)}`)
    }
  }

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';
  const size = sizeHorizontal >= 960 && sizeHorizontal <= 1199; 


  // Función para contar cuántos eventos hay en un día específico
  const countEventsForDay = (date) => {
    const formattedDate = date.toISOString().split('T')[0]
    return eventData.events.filter(event => event.date === formattedDate).length
  }

  return (
    <div className={`container mx-auto p-4 bg-gradient-to-b from-purple-100 to-blue-100 min-h-screen`}>
      <h1 className="my-[100px] text-4xl font-bold mb-8 text-center text-purple-800">Calendario de Eventos</h1>

      {/* Card with Calendars */}
      <Card className="mb-8 bg-white/80 backdrop-blur-sm shadow-lg">
        <div className={`mx-[20px] ${isMobile ? 'mx-0' : isTablet? 'mx-[120px]' :'mx-[260px]'}}`}>
          <CardHeader className="flex flex-row items-center justify-between pb-2 mx-16">
            <Button variant="ghost" onClick={() => changeMonth(-1)} className="text-2xl sm:text-3xl">
              <ChevronLeft />
            </Button>
            <CardTitle className="text-xl sm:text-2xl font-semibold text-purple-700">
              {currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })}
            </CardTitle>
            <Button variant="ghost" onClick={() => changeMonth(1)} className="text-2xl sm:text-3xl">
              <ChevronRight />
            </Button>
          </CardHeader>
          <CardContent className="pt-0">
            <div className={`flex gap-y-4 flex-row flex-wrap justify-center rounded-md border shadow-md ${isMobile? '' : isTablet? size? 'mx-[100px]':'' : size? 'mx-[100px]' : 'mx-[250px]' }`}>
              {/* Calendarios: Ajustes para dispositivos móviles y tabletas */}
              <div className={`mb-2 `}>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleSelect}
                  month={currentDate}
                  modifiers={{
                    event: (date) => eventData.events.some(e => e.date === date.toISOString().split('T')[0])
                  }}
                  modifiersStyles={{
                    event: { fontWeight: 'bold', color: 'white', backgroundColor: 'rgba(124, 58, 237, 0.8)' },
                    selected: { backgroundColor: 'rgba(124, 58, 237, 1)', color: 'white' }
                  }}
                  renderDay={(date) => {
                    const eventCount = countEventsForDay(date);  // Obtener la cantidad de eventos para este día
                    return (
                      <div className="relative">
                        {date.getDate()}
                        {eventCount > 0 && (
                          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                            {eventCount}
                          </span>
                        )}
                      </div>
                    );
                  }}
                />
              </div>

              <div className={``}>
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={handleSelect}
                  month={new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)} // Mes siguiente
                  modifiers={{
                    event: (date) => eventData.events.some(e => e.date === date.toISOString().split('T')[0])
                  }}
                  modifiersStyles={{
                    event: { fontWeight: 'bold', color: 'white', backgroundColor: 'rgba(124, 58, 237, 0.8)' },
                    selected: { backgroundColor: 'rgba(124, 58, 237, 1)', color: 'white' }
                  }}
                  renderDay={(date) => {
                    const eventCount = countEventsForDay(date);  // Obtener la cantidad de eventos para este día
                    return (
                      <div className="relative">
                        {date.getDate()}
                        {eventCount > 0 && (
                          <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                            {eventCount}
                          </span>
                        )}
                      </div>
                    );
                  }}
                />
              </div>
            </div>
          </CardContent>
        </div>
      </Card>


      {/* Upcoming Events */}
      <Card className="mb-8 bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-purple-700">Próximos Eventos</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[300px]">
            <div className={`grid grid-cols-1 shadow-md ${isTablet ? 'sm:grid-cols-2' : 'sm:grid-cols-2 lg:grid-cols-3'} gap-4`}>
              {upcomingEvents.map((event, index) => (
                <Card key={index} className="bg-white shadow-md p-2 hover:shadow-lg transition-shadow">
                  <CardContent className="p-4">
                    <h3 className="text-lg font-semibold mb-2 text-purple-600">{event.title}</h3>
                    <p className="text-sm text-gray-600 mb-2">{new Date(event.date).toLocaleDateString()} - {event.time}</p>
                    {/* Imagen de vista previa */}
                    <Imagen 
                      src={event.image} 
                      alt={event.title} 
                      width={100} 
                      height={200} 
                      className="w-full h-40 object-cover rounded-lg mb-2"
                    />
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => {
                        setSelectedDate(new Date(event.date))
                        setSelectedEvents(eventData.events.filter(e => e.date === event.date)) // Mostrar todos los eventos para esa fecha
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

      {/* Selected Event Details */}
      {selectedEvents.length > 0 && (
        <Card className="bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-purple-700">Eventos seleccionados para el día {new Date(selectedDate).toLocaleDateString()}</CardTitle>
          </CardHeader>
          <CardContent>
            {selectedEvents.map((event, index) => (
              <div key={index} className="mb-4">
                <h3 className="text-lg font-semibold mb-2 text-purple-600">{event.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{new Date(event.date).toLocaleDateString()} - {event.time}</p>
                <Imagen
                  src={event.image} 
                  alt={event.title} 
                  width={200} 
                  height={400} 
                  className="w-full h-[400px] object-cover rounded-lg mb-2"
                />
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => handleReservation(event)}
                  className="w-full bg-purple-100 text-purple-700 hover:bg-purple-200"
                >
                  Reservar para este evento
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
