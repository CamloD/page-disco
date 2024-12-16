'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useReservation } from '../../context/ReservationContext'
import { format } from 'date-fns'
import { Loader2, User, Phone, Mail, Calendar, MapPin, Users, Clock, CreditCard, MessageSquare } from 'lucide-react'

export default function ConfirmationPage() {
  const router = useRouter()
  const { 
    selectedArea, 
    selectedDate, 
    reservationType, 
    eventDetails, 
    attendees, 
    guestCount, 
    clearReservation,
    reservationName,
    reservationEmail,
    reservationPhone,
    specialRequests,
    name,
    email,
    phone,
    formData
  } = useReservation()
  const [loading, setLoading] = useState(true)
  const [hasReservationInfo, setHasReservationInfo] = useState(false)

  useEffect(() => {
    const checkReservationInfo = () => {
      setLoading(true)
      if (selectedArea && selectedDate && reservationName) {
        setHasReservationInfo(true)
      } else {
        setHasReservationInfo(false)
      }
      setLoading(false)
    }

    checkReservationInfo()
  }, [selectedArea, selectedDate, reservationName])

  const handleReturnHome = () => {
    clearReservation()
    router.push('/Dulcinea')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-800 text-gray-100 flex items-center justify-center">
        <Loader2 className="h-12 w-12 animate-spin text-blue-400" />
      </div>
    )
  }

  if (!hasReservationInfo) {
    return (
      <div className="min-h-screen bg-gray-800 text-gray-100 flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">No hay información de reserva</h1>
        <p className="mb-8">No se encontró información de reserva. Por favor, realiza una reserva antes de acceder a esta página.</p>
        <Button onClick={() => router.push('/Dulcinea')} className="bg-blue-600 hover:bg-blue-700 text-white">
          Ir a Inicio
        </Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-800 text-gray-100 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl bg-gray-700 border border-gray-600 rounded-xl shadow-2xl overflow-hidden mt-24">
        <CardHeader className="bg-blue-600 text-white p-6">
          <CardTitle className="text-3xl font-bold text-center">Confirmación de Reserva</CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Detalles de la reserva</h3>
              <div className="space-y-3">
                <p className="flex items-center text-gray-200"><Calendar className="mr-2 h-5 w-5 text-blue-400" /> <strong className="mr-2">Fecha:</strong> {selectedDate ? format(new Date(selectedDate), 'dd/MM/yyyy') : 'No seleccionada'}</p>
                <p className="flex items-center text-gray-200"><MapPin className="mr-2 h-5 w-5 text-blue-400" /> <strong className="mr-2">Área:</strong> {selectedArea}</p>
                <p className="flex items-center text-gray-200"><Users className="mr-2 h-5 w-5 text-blue-400" /> <strong className="mr-2">Asistentes:</strong> {attendees || guestCount}</p>
                <p className="flex items-center text-gray-200"><Clock className="mr-2 h-5 w-5 text-blue-400" /> <strong className="mr-2">Tipo de reserva:</strong> {reservationType === 'general' ? 'General' : 'Específica'}</p>
                {eventDetails && (
                  <>
                    <p className="flex items-center text-gray-200"><Calendar className="mr-2 h-5 w-5 text-blue-400" /> <strong className="mr-2">Evento:</strong> {eventDetails.title}</p>
                    <p className="flex items-center text-gray-200"><Clock className="mr-2 h-5 w-5 text-blue-400" /> <strong className="mr-2">Hora:</strong> {eventDetails.time}</p>
                  </>
                )}
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold mb-4 text-blue-400">Información del reservante</h3>
              <div className="space-y-3">
                <p className="flex items-center text-gray-200"><User className="mr-2 h-5 w-5 text-blue-400" /> <strong className="mr-2">Nombre:</strong> {reservationName}</p>
                <p className="flex items-center text-gray-200"><Mail className="mr-2 h-5 w-5 text-blue-400" /> <strong className="mr-2">Email:</strong> {reservationEmail}</p>
                <p className="flex items-center text-gray-200"><Phone className="mr-2 h-5 w-5 text-blue-400" /> <strong className="mr-2">Teléfono:</strong> {reservationPhone}</p>
                {specialRequests && (
                  <p className="flex items-start text-gray-200">
                    <MessageSquare className="mr-2 h-5 w-5 text-blue-400 mt-1" /> 
                    <span><strong className="mr-2">Solicitudes especiales:</strong> {specialRequests}</span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-gray-600 my-6"></div>

          <div>
            <h3 className="text-2xl font-semibold mb-4 text-blue-400">Información del pago</h3>
            <div className="space-y-3">
              <p className="flex items-center text-gray-200"><User className="mr-2 h-5 w-5 text-blue-400" /> <strong className="mr-2">Nombre del pagador:</strong> {name}</p>
              <p className="flex items-center text-gray-200"><Mail className="mr-2 h-5 w-5 text-blue-400" /> <strong className="mr-2">Email del pagador:</strong> {email}</p>
              <p className="flex items-center text-gray-200"><Phone className="mr-2 h-5 w-5 text-blue-400" /> <strong className="mr-2">Teléfono del pagador:</strong> {phone}</p>
              <p className="flex items-center text-gray-200"><CreditCard className="mr-2 h-5 w-5 text-blue-400" /> <strong className="mr-2">Método de pago:</strong> Tarjeta de crédito</p>
              <p className="flex items-center text-gray-200"><CreditCard className="mr-2 h-5 w-5 text-blue-400" /> <strong className="mr-2">Últimos 4 dígitos:</strong> **** {formData.cardNumber.slice(-4)}</p>
            </div>
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-xl font-semibold mb-4 text-green-400">¡Gracias por tu reserva, {reservationName}!</p>
            <p className="mb-6 text-gray-300">Hemos enviado un correo electrónico con los detalles de tu reserva a {reservationEmail}.</p>
            <Button onClick={handleReturnHome} className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full text-lg transition-all duration-300 ease-in-out transform hover:scale-105">
              Aceptar y volver al inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

