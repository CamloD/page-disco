/* eslint-disable react-hooks/exhaustive-deps */
"use client"

import React, { useState, useEffect } from 'react'
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { DetallesEvento } from './detalleseventos'
import { ListaEventos } from './listaeventos'
import { CalendarioEventosView } from './calendarioeventosview'
import { AgendaEventos } from './agendaeventos'
import { motion } from 'framer-motion'
import eventData from "app/Dulcinea/data/dataevent.json"
import { CalendarIcon, ListIcon, LayoutGridIcon } from 'lucide-react'

const formatDate = (date) => {
  if (!date) return '';
  const day = date.getDate();
  const month = date.toLocaleString('es', { month: 'short' });
  const year = date.getFullYear().toString().substr(-2);
  return `${day},${month},${year}`;
}

export const CalendarioEventos = () => {
  const [selectedDate, setSelectedDate] = useState(null)
  const [events, setEvents] = useState([])
  const [showCalendar, setShowCalendar] = useState(false)
  const [selectedEventDetails, setSelectedEventDetails] = useState(null)
  const [activeView, setActiveView] = useState("agenda")

  useEffect(() => {
    // Mostrar eventos desde hoy hasta 2 meses después al cargar la página
    const today = new Date();
    const twoMonthsLater = new Date(today);
    twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);
    
    const initialEvents = eventData.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= today && eventDate <= twoMonthsLater;
    });
    
    setEvents(initialEvents.sort((a, b) => new Date(a.date) - new Date(b.date)));
  }, []);

  useEffect(() => {
    if (selectedDate) {
      updateEvents()
    }
  }, [selectedDate])

  const updateEvents = () => {
    if (!selectedDate) return;
    const twoMonthsLater = new Date(selectedDate);
    twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2);
    
    const filteredEvents = eventData.events.filter(event => {
      const eventDate = new Date(event.date);
      return eventDate >= selectedDate && eventDate <= twoMonthsLater;
    });
    
    setEvents(filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date)));
  };

  const handleSelect = (date) => {
    setSelectedDate(date);
    setShowCalendar(false);
    updateEvents();
  };

  const handleEventClick = (event) => {
    setSelectedEventDetails(event)
  }

  return (
    <div className="min-h-screen bg-[#1C2638] px-2 sm:px-4 lg:px-8 py-4 sm:py-8">
      <div className="container mx-auto p-2 sm:p-4 mt-16">
        <motion.h1 
          className="text-3xl sm:text-5xl font-bold mb-6 sm:mb-12 text-center text-white"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          UPCOMING EVENTS
        </motion.h1>

        <Card className="bg-[#16283F] text-[#e0e0e0] backdrop-blur-sm border-[#162133] w-full max-w-6xl mx-auto">
          <CardContent className="p-2 sm:p-4 md:p-6">
            <Tabs value={activeView} onValueChange={setActiveView} className="w-full">
              <div className="flex flex-col sm:flex-row justify-between items-center mb-4 sm:mb-6 space-y-2 sm:space-y-0">
                <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full sm:w-[280px] justify-start text-left font-normal bg-[#16283F] border-[#263A54] hover:text-white hover:bg-[#254570] text-sm sm:text-base"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {selectedDate ? formatDate(selectedDate) : 'Seleccionar fecha'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-[#16283F] border-[#263A54]">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleSelect}
                      initialFocus
                      className="rounded-md border-[#263A54]"
                    />
                  </PopoverContent>
                </Popover>

                <TabsList className="grid w-full sm:w-auto grid-cols-3 bg-[#263A54] data-[state=active]:text-white">
                <TabsTrigger value="agenda" className="data-[state=active]:bg-[#16283F] data-[state=active]:text-white">
                    <LayoutGridIcon className="w-5 h-5" />
                  </TabsTrigger>
                  <TabsTrigger value="calendario" className="data-[state=active]:bg-[#16283F] data-[state=active]:text-white">
                    <CalendarIcon className="w-5 h-5" />
                  </TabsTrigger>
                  <TabsTrigger value="lista" className="data-[state=active]:bg-[#16283F] data-[state=active]:text-white">
                    <ListIcon className="w-5 h-5" />
                  </TabsTrigger>
                </TabsList>
              </div>

              <TabsContent value="lista">
                <ListaEventos events={events} onEventClick={handleEventClick} />
              </TabsContent>
              <TabsContent value="calendario">
                <CalendarioEventosView 
                  events={events} 
                  onEventClick={handleEventClick}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                />
              </TabsContent>
              <TabsContent value="agenda">
                <AgendaEventos events={events} onEventClick={handleEventClick} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {selectedEventDetails && (
          <DetallesEvento 
            event={selectedEventDetails} 
            onClose={() => setSelectedEventDetails(null)}
          />
        )}
      </div>
    </div>
  )
}

