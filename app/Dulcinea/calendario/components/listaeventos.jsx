import React from 'react'
import { motion } from 'framer-motion'
import { Imagen } from '@/app/components/mostrarmedios'

export const ListaEventos = ({ events, onEventClick }) => {
  return (
    <div className="space-y-4 sm:space-y-6">
      {events.map((event, index) => (
        <motion.div
          key={index}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-[#3a3a3a] p-4 rounded-lg shadow-md cursor-pointer flex flex-col sm:flex-row items-center sm:items-start space-y-4 sm:space-y-0 sm:space-x-4"
          onClick={() => onEventClick(event)}
        >
          <div className="flex-shrink-0 w-20 h-20 sm:w-16 sm:h-16">
            <Imagen
              src={event.image} 
              alt={event.title}
              height={400}
              width={400}
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold text-[#e0e0e0]">{event.title}</h3>
            <p className="text-sm text-[#a3a3a3]">{new Date(event.date).toLocaleDateString()} - {event.time}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

