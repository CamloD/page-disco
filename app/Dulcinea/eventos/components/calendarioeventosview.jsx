import React, { useState, useEffect } from 'react'
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Imagen } from '@/app/components/mostrarmedios'

const DAYS_OF_WEEK = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']

export const CalendarioEventosView = ({ events, onEventClick, selectedDate, setSelectedDate }) => {
  const [displayedEvents, setDisplayedEvents] = useState([])

  useEffect(() => {
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const startDate = selectedDate || today
    const twoMonthsLater = new Date(startDate)
    twoMonthsLater.setMonth(twoMonthsLater.getMonth() + 2)
    
    const filteredEvents = events.filter(event => {
      const eventDate = new Date(event.date)
      return eventDate >= today && eventDate >= startDate && eventDate <= twoMonthsLater
    })
    
    setDisplayedEvents(filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date)))
  }, [selectedDate, events])

  const renderCalendar = () => {
    const calendar = []
    const startDate = selectedDate || new Date()
    let currentDate = new Date(startDate)
    currentDate.setDate(currentDate.getDate() - currentDate.getDay()) // Start from the beginning of the week

    const endDate = new Date(startDate)
    endDate.setMonth(endDate.getMonth() + 2)

    while (currentDate <= endDate) {
      const week = []
      for (let i = 0; i < 7; i++) {
        const date = new Date(currentDate)
        const dayEvents = displayedEvents.filter(event => {
          const eventDate = new Date(event.date)
          return eventDate.toDateString() === date.toDateString()
        })

        if (date >= startDate) {
          week.push(
            <div
              key={date.toISOString()}
              className="h-24 sm:h-32 md:h-48 border border-[#3a3a3a] p-1 relative overflow-hidden"
              //onClick={() => setSelectedDate(date)}  // cambia al dia seleccionado 
            >
              <div className="absolute top-1 left-1 font-bold text-[#a3a3a3] z-10 text-xs sm:text-sm">
                {date.toLocaleString('default', { month: 'short', day: 'numeric' })}
              </div>
              <div className="grid grid-cols-1 gap-1 h-full">
                {dayEvents.map((event, index) => (
                  <TooltipProvider key={index}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div
                          className="relative w-full h-full cursor-pointer"
                          onClick={(e) => {
                            e.stopPropagation()
                            onEventClick(event)
                          }}
                        >
                          <Imagen
                            src={event.image}
                            alt={event.title}
                            height={400}
                            width={400}
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-end p-1">
                            <span className="text-white text-xs truncate">{event.title}</span>
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{event.title}</p>
                        <p>{event.time}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                ))}
              </div>
            </div>
          )
        } else {
          week.push(<div key={date.toISOString()} className="h-24 sm:h-32 md:h-48 border border-[#162133]"></div>)
        }
        currentDate.setDate(currentDate.getDate() + 1)
      }
      if (week.some(day => day.props.children)) {
        calendar.push(<div key={currentDate.toISOString()} className="grid grid-cols-7">{week}</div>)
      }
    }
    return calendar
  }

  return (
    <Card className="bg-[#0C213D] p-2 sm:p-4">
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_OF_WEEK.map(day => (
          <div key={day} className="text-center font-bold text-[#a3a3a3] text-xs sm:text-sm">{day}</div>
        ))}
      </div>
      <div className="space-y-1">
        {renderCalendar()}
      </div>
    </Card>
  )
}

