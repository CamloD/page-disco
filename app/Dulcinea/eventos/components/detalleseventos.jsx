import React, { useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Imagen } from '@/app/components/mostrarmedios'

export const DetallesEvento = ({ event, onClose }) => {
  const router = useRouter()
  const modalRef = useRef(null)

  const handleReservation = () => {
    if (event) {
      const eventDate = event.date.replace(/-/g, '')
      const eventCode = `evento${eventDate}${event.id.toString().padStart(4, '0')}`
      router.push(`/Dulcinea/reservation?event=${eventCode}`)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [onClose])

  if (!event) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
      >
        <motion.div
          ref={modalRef}
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 300 }}
        >
          <Card className="bg-[#0C213D] text-[#e0e0e0] w-full max-w-2xl overflow-hidden">
            <CardHeader className="relative">
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-2 top-2 text-[#a3a3a3] hover:text-[#e0e0e0]"
                onClick={onClose}
              >
                <X size={24} />
              </Button>
              <CardTitle className="text-3xl font-bold text-white">{event.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Imagen
                src={event.image}
                alt={event.title}
                height={400}
                width={400}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <div className="space-y-4">
                <p className="text-lg text-white">
                  <span className="font-semibold">Fecha:</span> {new Date(event.date).toLocaleDateString()}
                </p>
                <p className="text-lg text-white">
                  <span className="font-semibold">Hora:</span> {event.time}
                </p>
                <p className="text-white">{event.description}</p>
                <Button 
                  onClick={handleReservation}
                  className="w-full bg-[#263A54] hover:bg-[#345177] text-white font-bold py-2 px-4 rounded"
                >
                  Reservar para este evento
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}