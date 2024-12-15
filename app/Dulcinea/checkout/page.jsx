'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { useReservation } from '../context/ReservationContext'
import { format } from 'date-fns'

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
  const [reservationDetails, setReservationDetails] = useState(null)

  useEffect(() => {
    const storedData = localStorage.getItem('reservationFormData')
    if (storedData) {
      const parsedData = JSON.parse(storedData)
      setFormData(prevState => ({
        ...prevState,
        name: parsedData.name,
        email: parsedData.email,
      }))
    }
    setReservationDetails({
      selectedArea,
      selectedDate,
      reservationType,
      eventDetails,
      attendees,
      guestCount
    })
  }, [selectedArea, selectedDate, reservationType, eventDetails, attendees, guestCount])

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
    console.log('Reservation details:', reservationDetails)
    // Clear the localStorage and context after successful payment
    localStorage.removeItem('reservationFormData')
    clearReservation()
    // Redirect to a confirmation page
    router.push('/Dulcinea/confirmation')
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex items-center justify-center">
      <Card className="w-full max-w-md bg-gray-800 border-gray-700 text-white">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center text-white">Checkout</CardTitle>
        </CardHeader>
        <CardContent>
          {reservationDetails && (
            <div className="mb-6 p-4 bg-gray-700 rounded-lg">
              <h3 className="text-lg font-semibold mb-2">Detalles de la reserva:</h3>
              <p><strong>Fecha:</strong> {reservationDetails.selectedDate ? format(new Date(reservationDetails.selectedDate), 'dd/MM/yyyy') : 'No seleccionada'}</p>
              <p><strong>Área:</strong> {reservationDetails.selectedArea}</p>
              <p><strong>Tipo de reserva:</strong> {reservationDetails.reservationType === 'general' ? 'General' : 'Específica'}</p>
              {reservationDetails.eventDetails && (
                <>
                  <p><strong>Evento:</strong> {reservationDetails.eventDetails.title}</p>
                  <p><strong>Hora:</strong> {reservationDetails.eventDetails.time}</p>
                </>
              )}
              <p><strong>Número de asistentes:</strong> {reservationDetails.attendees || reservationDetails.guestCount}</p>
            </div>
          )}
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
      </Card>
    </div>
  )
}

