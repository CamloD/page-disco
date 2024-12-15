/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { format } from 'date-fns'
import SVG_Piso1, { getAreaInfo_SVG1 } from "./components/SVG_Piso1"
import SVG_Piso2, { getAreaInfo_SVG2 } from "./components/SVG_Piso2"
import { useReservation } from '../context/ReservationContext'
import { useRouter } from 'next/navigation'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Loader2 } from 'lucide-react'

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 990

const BackgroundFigure = ({isMobile, isTablet}) => {
  const width = isMobile ? '1500vw' : (isTablet ? '900vw' : '600vw')
  const height = isMobile ? '1000vh' : (isTablet ? '1200vh' : '800vh')
  const translateX = isMobile ? '11%' : (isTablet ? '-5%' : '-5%')
  const translateY = isMobile ? '-29%' : (isTablet ? '-24%' : '-24%')

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gray-900 flex">
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: `rotate(-46.60deg) scale(2) translate(${translateX}, ${translateY})`,
          width: width,
          height: height,
          left: '50%',
          top: '50%',
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='6 6 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='12' height='12' fill='%230a5770' fill-opacity='0.4'/%3E%3C/svg%3E")`,
          backgroundSize: '3px 3px',
          backgroundPosition: 'center',
          backgroundRepeat: 'repeat',
          transition: 'opacity 0.5s ease-in-out',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-gray-700/60 to-gray-800/60" />
      </div> 
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950/50 to-gray-950/50" />
    </div>
  )
}

const ReservationModal = ({ isOpen, onClose, selectedArea, areaInfo, onclickbutton, selectedEvent, selectedDate, selectedTime }) => {
  const [attendees, setAttendees] = useState('1')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const { updateReservation, reservationType } = useReservation()
  const router = useRouter()

  useEffect(() => {
    if (!isOpen) {
      setAttendees('1')
      setName('')
      setEmail('')
      setPhone('')
      setSpecialRequests('')
      setIsSubmitted(false)
    }
  }, [isOpen])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    if (attendees && name && email && phone) {
      updateReservation({
        selectedArea,
        attendees,
        guestCount: parseInt(attendees),
        selectedDate: selectedEvent ? new Date(selectedEvent.date) : selectedDate,
        reservationType: selectedEvent ? 'event' : (reservationType || 'specific'),
        eventDetails: selectedEvent
      })
      onClose()
      router.push('/Dulcinea/checkout')
    }
  }

  const handleCancel = () => {
    setIsSubmitted(false)
    onClose()
    onclickbutton()
  }

  const handleOutsideClick = (e) => {
    if (e.target === e.currentTarget) {
      handleCancel()
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 top-0 bg-black bg-opacity-50 flex justify-center items-center z-50 overflow-y-auto" onClick={handleOutsideClick}>
      <div className="bg-gray-800 p-8 rounded-lg max-w-2xl w-full mx-4 my-8 text-white mt-[240px]">
        <h2 className="text-3xl font-bold mb-6">{selectedArea}</h2>
        <div className="grid grid-cols-1 gap-6 mb-6">
          <div className='flex flex-col md:flex-row md:space-x-20'>
            <p className="text-lg"><strong>Precio:</strong> {areaInfo.precio}</p>
            <p className="text-lg"><strong>Capacidad máxima:</strong> {areaInfo.capacidad}</p>
          </div>
          {selectedEvent ? (
            <div>
              <p className="text-lg"><strong>Tipo de Reserva:</strong> Evento</p>
              <p className="text-lg"><strong>Evento:</strong> {selectedEvent.title}</p>
              <p className="text-lg"><strong>Fecha:</strong> {format(new Date(selectedEvent.date), 'dd/MM/yyyy')}</p>
              <p className="text-lg"><strong>Hora:</strong> {selectedEvent.time}</p>
            </div>
          ) : (
            <div>
              <p className="text-lg"><strong>Tipo de Reserva:</strong> {reservationType === 'general' ? 'General' : 'Específica'}</p>
              <p className="text-lg"><strong>Fecha:</strong> {format(selectedDate, 'dd/MM/yyyy')}</p>
              <p className="text-lg"><strong>Hora:</strong> {selectedTime}</p>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="attendees" className="block text-sm font-medium mb-1">Número de asistentes</Label>
            <Select value={attendees} onValueChange={setAttendees}>
              <SelectTrigger className="w-full bg-gray-700 text-white border-gray-600 focus:ring-blue-500 focus:border-blue-500">
                <SelectValue placeholder="Selecciona el número de asistentes" />
              </SelectTrigger>
              <SelectContent 
                className="bg-gray-700 text-white border-gray-600"
                style={{ position: 'absolute', top: '100%', left: 0, zIndex: 1000 }}
              >
                {[...Array(10)].map((_, i) => (
                  <SelectItem key={i + 1} value={(i + 1).toString()}>
                    {i + 1}
                  </SelectItem>
                ))}
                <SelectItem value="10+">Más de 10</SelectItem>
              </SelectContent>
            </Select>
            {isSubmitted && !attendees && <p className="text-red-500 text-sm">Por favor, selecciona el número de asistentes.</p>}
          </div>
          <div>
            <Label htmlFor="name" className="block text-sm font-medium mb-1">Nombre</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-700 text-white border-gray-600"
              required
            />
            {isSubmitted && !name && <p className="text-red-500 text-sm">Por favor, ingresa tu nombre.</p>}
          </div>
          <div>
            <Label htmlFor="email" className="block text-sm font-medium mb-1">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-700 text-white border-gray-600"
              required
            />
            {isSubmitted && !email && <p className="text-red-500 text-sm">Por favor, ingresa tu email.</p>}
          </div>
          <div>
            <Label htmlFor="phone" className="block text-sm font-medium mb-1">Teléfono</Label>
            <Input
              id="phone"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-gray-700 text-white border-gray-600"
              required
            />
            {isSubmitted && !phone && <p className="text-red-500 text-sm">Por favor, ingresa tu número de teléfono.</p>}
          </div>
          <div>
            <Label htmlFor="specialRequests" className="block text-sm font-medium mb-1">Solicitudes Especiales</Label>
            <Textarea
              id="specialRequests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="bg-gray-700 text-white border-gray-600"
            />
          </div>
          <div className="flex justify-end space-x-4">
            <Button onClick={handleCancel} variant="outline" className="bg-gray-600 text-white hover:bg-gray-700">
              Cancelar
            </Button>
            <Button 
              type="submit" 
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              Continuar al checkout
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

const MemoizedReservationModal = React.memo(ReservationModal);

export default function ReservationMap() {
  const [selectedArea, setSelectedArea] = useState('')
  const [currentFloor, setCurrentFloor] = useState(1)
  const selectedPositionsRef = useRef({
    1: { x: 0, y: 0, area: "", color: "" },
    2: { x: 0, y: 0, area: "", color: "" },
  })
  const [deviceType, setDeviceType] = useState('desktop')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAreaInfo, setSelectedAreaInfo] = useState({})
  const [viewMode, setViewMode] = useState('map')
  const [resetSelection, setResetSelection] = useState(false)
  const [loading, setLoading] = useState(true)
  const { eventDetails, selectedArea: contextSelectedArea, guestCount, selectedDate, reservationType } = useReservation()

  const mapRef = useRef(null)
  const router = useRouter()

  useEffect(() => {
    const checkDeviceType = () => {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        setDeviceType('mobile')
      } else if (window.innerWidth <= TABLET_BREAKPOINT) {
        setDeviceType('tablet')
      } else {
        setDeviceType('desktop')
      }
    }

    checkDeviceType()
    window.addEventListener('resize', checkDeviceType)

    // Reset reservation information
    setSelectedArea('')
    setSelectedAreaInfo({})
    setIsModalOpen(false)
    handleClearSelection()

    // Check if reservation info exists
    if (eventDetails || selectedDate) {
      setLoading(false)
    } else {
      setLoading(false)
    }

    return () => window.removeEventListener('resize', checkDeviceType)
  }, [eventDetails, selectedDate, reservationType])

  const handleFloorChange = (floor) => {
    setCurrentFloor(floor)
    setSelectedArea('')
    setResetSelection(true)
    setTimeout(() => setResetSelection(false), 50)
  }

  const handleAreaClick = useCallback((area, event) => {
    if (area.toLowerCase().includes("palco") || area.toLowerCase().includes("vip")) {
      const floorLabel = currentFloor === 1 ? "1er piso" : "2do piso"
      const newArea = `${area} (${floorLabel})`
      setSelectedArea(newArea)
      if (floorLabel === "1er piso")
        setSelectedAreaInfo(getAreaInfo_SVG1(area))
      else if (floorLabel === "2do piso")
        setSelectedAreaInfo(getAreaInfo_SVG2(area))
      if (event && event.target) {
        const rect = event.target.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        const selectedColor = "#FF5733"

        selectedPositionsRef.current = {
          ...selectedPositionsRef.current,
          [currentFloor]: { x, y, area: newArea, color: selectedColor },
        }
      }
      setIsModalOpen(true)
    }
  }, [currentFloor, reservationType])

  const handleClearSelection = () => {
    setResetSelection(true)
    selectedPositionsRef.current = {
      ...selectedPositionsRef.current,
      [currentFloor]: { x: 0, y: 0, area: "", color: "" },
    }
    setSelectedArea("")

    setTimeout(() => {
      setResetSelection(false)
    }, 50)
  }

  const toggleViewMode = () => {
    setViewMode(viewMode === 'map' ? 'list' : 'map')
  }

  const renderSVG = (floor) => {
    const SVGComponent = floor === 1 ? SVG_Piso1 : SVG_Piso2
    return (
      <div 
        ref={mapRef}
        className={`${viewMode === 'map' ? "relative flex justify-center items-center" : ""}`} 
        style={{ width: "100%", height: deviceType === 'mobile' ? "auto" : "680px" }}
      >
        <SVGComponent
          onClick={handleAreaClick}
          resetSelection={resetSelection}
          selectedBlock={selectedPositionsRef.current[floor]?.area}
          className="text-white w-full h-full"
          ViewMode={viewMode}
        />

        {selectedPositionsRef.current[floor]?.x !== 0 && selectedPositionsRef.current[floor]?.y !== 0 && (
          <div
            className="absolute w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: selectedPositionsRef.current[floor].x,
              top: selectedPositionsRef.current[floor].y,
              backgroundColor: selectedPositionsRef.current[floor].color,
            }}
          />
        )}
      </div>
    )
  }

  const handleBack = () => {
    if (reservationType === 'specific') {
      router.push('/Dulcinea/reserve')
    } else {
      router.back()
    }
  }

  const handleContinue = () => {
    router.push('/Dulcinea/checkout')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin" />
        <p className="mt-4">Cargando información de reserva...</p>
      </div>
    )
  }

  if (!eventDetails && !selectedDate) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold mb-4">No hay información de reserva</h1>
        <p className="mb-8">Por favor, realiza una reserva antes de acceder a esta página.</p>
        <Button onClick={() => router.push('/Dulcinea/reserve')} className="bg-blue-600 hover:bg-blue-700 text-white">
          Ir a Reservas
        </Button>
      </div>
    )
  }

  return (
    <div className='relative min-h-screen bg-gray-900 text-white'>
      <BackgroundFigure isMobile={deviceType === 'mobile'} isTablet={deviceType === 'tablet'}/>
      <section id="reservations" className="py-24 px-4 relative z-0">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <Button variant="outline" onClick={handleBack} className="bg-gray-600 text-white hover:bg-gray-700">
              Regresar
            </Button>
            <h1 className="text-3xl font-bold">Reservación</h1>
          </div>
          {(eventDetails || selectedDate) && (
            <div className="mb-8 p-6 border border-gray-700 rounded-lg bg-gray-800/50 shadow-xl">
              <h3 className="text-2xl font-bold mb-4">Detalles de la Reserva</h3>
              {eventDetails ? (
                <>
                  <p><strong>Tipo:</strong> Evento</p>
                  <p><strong>Evento:</strong> {eventDetails.title}</p>
                  <p><strong>Fecha:</strong> {format(new Date(eventDetails.date), 'dd/MM/yyyy')}</p>
                  <p><strong>Hora:</strong> {eventDetails.time}</p>
                </>
              ) : (
                <>
                  <p><strong>Tipo de Reserva:</strong> {reservationType === 'general' ? 'General' : 'Específica'}</p>
                  <p><strong>Fecha:</strong> {format(selectedDate, 'dd/MM/yyyy')}</p>
                  {reservationType === 'general' && <p><strong>Área:</strong> {contextSelectedArea}</p>}
                  {reservationType === 'specific' && selectedArea && <p><strong>Área:</strong> {selectedArea}</p>}
                </>
              )}
            </div>
          )}
          <div className="relative grid gap-4">
            <div className="flex justify-center items-center space-x-4 mb-8">
              <Button 
                onClick={() => handleFloorChange(1)} 
                className={`px-6 py-2 text-lg font-semibold transition-all duration-300 ${currentFloor === 1 ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
              >
                1er Piso
              </Button>
              <Button 
                onClick={() => handleFloorChange(2)} 
                className={`px-6 py-2 text-lg font-semibold transition-all duration-300 ${currentFloor === 2 ? "bg-blue-600 text-white" : "bg-gray-700 text-gray-300 hover:bg-gray-600"}`}
              >
                2do Piso
              </Button>
            </div>
            <div className={`p-6 border border-gray-700 rounded-lg bg-gray-800/50 shadow-xl`}>
              <div className="mb-4 flex justify-between">
                <Button onClick={toggleViewMode} className="bg-blue-600 hover:bg-blue-700 text-white">
                  {viewMode === 'map' ? 'Ver como lista' : 'Ver como mapa'}
                </Button>
              </div>
              {renderSVG(currentFloor)}
            </div>
          </div>
          <div className="mt-8 flex justify-end">
            <Button 
              onClick={handleContinue} 
              className="bg-blue-600 hover:bg-blue-700 text-white"
              disabled={!selectedArea && reservationType !== 'specific'}
            >
              Continuar
            </Button>
          </div>
        </div>
      </section>
      <MemoizedReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedArea={selectedArea}
        areaInfo={selectedAreaInfo}
        onclickbutton={handleClearSelection}
        selectedEvent={eventDetails}
        selectedDate={selectedDate || (eventDetails ? new Date(eventDetails.date) : new Date())}
        selectedTime={eventDetails ? eventDetails.time : ''}
      />
    </div>
  )
}

