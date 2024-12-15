'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { CalendarIcon, MapPinIcon } from 'lucide-react'
import { cn } from "@/lib/utils"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { useReservation } from '../context/ReservationContext'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

export default function Reserve() {
  const [step, setStep] = useState(1)
  const [reservationType, setReservationType] = useState('general')
  const [selectedDate, setSelectedDate] = useState(null)
  const [areas, setAreas] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const router = useRouter()

  const {
    selectedArea,
    setSelectedArea,
    setEventDetails,
    setSelectedDate: setContextSelectedDate,
    setReservationType: setContextReservationType,
    setAttendees,
  } = useReservation()

  useEffect(() => {
    // API
    import('../data/dataevent.json').then((data) => {
      setAreas(data.areas)
    })
  }, [])

  const handleNext = () => {
    if (step < (reservationType === 'general' ? 3 : 2)) {
      setStep(step + 1)
    } else {
      setContextSelectedDate(selectedDate)
      setContextReservationType(reservationType)
      if (reservationType === 'general') {
        // Save form data to context or local storage here
        localStorage.setItem('reservationFormData', JSON.stringify({ name, email, phone, specialRequests, selectedArea, selectedDate }))
        router.push('/Dulcinea/checkout')
      } else {
        router.push('/Dulcinea/map')
      }
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const isNextDisabled = () => {
    if (step === 1) return false
    if (step === 2) return !selectedDate
    if (step === 3 && reservationType === 'general') return !name || !email || !phone
    return false
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl">
        <div>
          <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-400">Reserva tu experiencia</h2>
          <div className="flex justify-center space-x-2">
            {[1, 2, 3].map((stepNumber) => (
              <div
                key={stepNumber}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= stepNumber ? 'bg-blue-500' : 'bg-gray-600'
                } ${stepNumber === 3 && reservationType !== 'general' ? 'hidden' : ''}`}
              >
                {stepNumber}
              </div>
            ))}
          </div>
        </div>
        
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-center text-blue-300">Selecciona el tipo de reserva</h3>
            <div className="flex flex-col space-y-4">
              <Button
                variant={reservationType === 'general' ? 'default' : 'outline'}
                onClick={() => setReservationType('general')}
                className={`py-6 text-lg ${
                  reservationType === 'general' 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                <MapPinIcon className="mr-2 h-5 w-5" />
                General
              </Button>
              <Button
                variant={reservationType === 'specific' ? 'default' : 'outline'}
                onClick={() => setReservationType('specific')}
                className={`py-6 text-lg ${
                  reservationType === 'specific' 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                <CalendarIcon className="mr-2 h-5 w-5" />
                Específica
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-center text-blue-300">
              Selecciona una fecha
            </h3>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !selectedDate && "text-muted-foreground",
                    "bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {selectedDate ? format(selectedDate, "PPP") : <span>Selecciona una fecha</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 bg-gray-700 border-gray-600" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  initialFocus
                  className="bg-gray-700 text-white"
                />
              </PopoverContent>
            </Popover>
          </div>
        )}

        {step === 3 && reservationType === 'general' && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-center text-blue-300">
              Selecciona un área
            </h3>
            <Select value={selectedArea} onValueChange={setSelectedArea}>
              <SelectTrigger className="w-full bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500">
                <SelectValue placeholder="Selecciona un área" />
              </SelectTrigger>
              <SelectContent className="bg-gray-700 text-white border-gray-600">
                {areas.map((area) => (
                  <SelectItem key={area.id} value={area.name} className="focus:bg-blue-600">
                    {area.name} - ${area.price}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}

        {step === 3 && reservationType === 'general' && (
          <div className="space-y-4">
            <h3 className="text-xl font-medium text-center text-blue-300">
              Información de contacto
            </h3>
            <div>
              <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre</label>
              <Input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-gray-700 text-white border-gray-600"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-gray-700 text-white border-gray-600"
                required
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium mb-1">Teléfono</label>
              <Input
                id="phone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-gray-700 text-white border-gray-600"
                required
              />
            </div>
            <div>
              <label htmlFor="specialRequests" className="block text-sm font-medium mb-1">Solicitudes Especiales</label>
              <Textarea
                id="specialRequests"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                className="bg-gray-700 text-white border-gray-600"
              />
            </div>
          </div>
        )}

        {/* Navigation buttons */}
        <div className="mt-8 flex justify-between">
          <Button 
            variant="outline" 
            onClick={handleBack} 
            disabled={step === 1}
            className="bg-gray-700 text-white border-gray-600 hover:bg-gray-600"
          >
            Atrás
          </Button>
          <Button 
            onClick={handleNext} 
            disabled={isNextDisabled()}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            {step === (reservationType === 'general' ? 3 : 2) ? 'Confirmar' : 'Siguiente'}
          </Button>
        </div>
      </div>
    </div>
  )
}
