import React from 'react'
import { motion } from 'framer-motion'
import { Card } from "@/components/ui/card"
import { Imagen } from '@/app/components/mostrarmedios'

export const AgendaEventos = ({ events, onEventClick }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
      {events.map((event, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Card 
            className="bg-[#3a3a3a] shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            onClick={() => onEventClick(event)}
          >
            <div className="relative pt-[56.25%] h-[300px]">
              <Imagen
                src={event.image} 
                alt={event.title} 
                height={400}
                width={400}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex flex-col bg-black bg-opacity-40 justify-end">
                <div className='flex flex-col bg-gradient-to-b from-black/0 to-black/100 w-full px-4 py-6'>
                
                <h3 className="translate-y-4 mt-6 text-lg font-semibold text-[#e0e0e0]">{event.title}</h3>
                <p className="translate-y-3 text-sm text-[#a3a3a3]">{new Date(event.date).toLocaleDateString()} - {event.time}</p>
                </div>
            </div>
          </div>  
          </Card>
        </motion.div>
      ))}
    </div>
  )
}

