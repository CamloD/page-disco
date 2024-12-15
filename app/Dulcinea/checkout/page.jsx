'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useReservation } from '../context/ReservationContext'
import { format } from 'date-fns'
import { Loader2 } from 'lucide-react'

export default function CheckoutPage() {
  const router = useRouter()
  const { selectedArea, selectedDate, reservationType, eventDetails, attendees, guestCount, clearReservation } = useReservation()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })
  const [loading, setLoading] = useState(true)
  const [hasReservationInfo, setHasReservationInfo] = useState(false)

  useEffect(() => {
    const checkReservationInfo = () => {
      setLoading(true)
      if (selectedArea || selectedDate || eventDetails) {
        setHasReservationInfo(true)
      } else {
        setHasReservationInfo(false)
      }
      setLoading(false)
    }

    checkReservationInfo()
  }, [selectedArea, selectedDate, eventDetails])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Here you would typically process the payment
    console.log('Payment processed:', formData)
    console.log('Reservation details:', { selectedArea, selectedDate, reservationType, eventDetails, attendees, guestCount })
    
    
    // Redirect to a confirmation page
    router.push('/Dulcinea/confirmation')
    clearReservation()
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (!hasReservationInfo) {
    return (
      <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">No hay información de reserva para el pago</h1>
        <p className="mb-8">Por favor, realiza una reserva antes de acceder a esta página.</p>
        <Button onClick={() => router.push('/Dulcinea')} className="bg-blue-600 hover:bg-blue-700 text-white">
          Ir a Inicio
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl bg-gray-800 border border-gray-700 rounded-xl shadow-xl overflow-hidden mt-16">
        <div className="flex flex-col md:flex-row">
          {/* Left side: Payment form */}
          <div className="w-full md:w-1/2 p-8">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-white mb-6">Checkout</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="name">Nombre completo</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div>
                  <Label htmlFor="cardNumber">Número de tarjeta</Label>
                  <Input
                    id="cardNumber"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    required
                    className="bg-gray-700 border-gray-600 text-white"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Fecha de expiración</Label>
                    <Input
                      id="expiryDate"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV</Label>
                    <Input
                      id="cvv"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      required
                      className="bg-gray-700 border-gray-600 text-white"
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-green-600 hover:bg-green-700">
                  Pagar y confirmar reserva
                </Button>
              </form>
            </CardContent>
          </div>
          
          {/* Right side: Reservation details */}
          <div className="w-full md:w-1/2 bg-gray-700 p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Detalles de la reserva</h2>
            <div className="space-y-4">
              <p><strong>Fecha:</strong> {selectedDate ? format(new Date(selectedDate), 'dd/MM/yyyy') : 'No seleccionada'}</p>
              <p><strong>Área:</strong> {selectedArea}</p>
              <p><strong>Tipo de reserva:</strong> {reservationType === 'general' ? 'General' : 'Específica'}</p>
              {eventDetails && (
                <>
                  <p><strong>Evento:</strong> {eventDetails.title}</p>
                  <p><strong>Hora:</strong> {eventDetails.time}</p>
                </>
              )}
              <p><strong>Número de asistentes:</strong> {attendees || guestCount}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

