'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useReservation } from '../../context/ReservationContext'
import { format } from 'date-fns'

export default function ReservationForm() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const router = useRouter()
  const { selectedArea, selectedDate } = useReservation()

  const handleSubmit = () => {
    e.preventDefault()
    // Here you would typically send the form data to your backend
    //console.log('Form submitted:', { name, email, phone, specialRequests, selectedArea, selectedDate })
    router.push('/Dulcinea/checkout')
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 bg-gray-800 p-8 rounded-xl shadow-2xl">
        <h2 className="text-3xl font-extrabold text-center mb-6 text-blue-400">Formulario de Reserva</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">Nombre</label>
            <Input
              id="name"
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium mb-1">Teléfono</label>
            <Input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-gray-700 text-white border-gray-600"
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
          <div className="bg-gray-700 p-4 rounded-lg">
            <p><strong>Área seleccionada:</strong> {selectedArea}</p>
            <p><strong>Fecha seleccionada:</strong> {selectedDate ? format(selectedDate, "PPP") : 'No seleccionada'}</p>
          </div>
          <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
            Proceder al Checkout
          </Button>
        </form>
      </div>
    </div>
  )
}
