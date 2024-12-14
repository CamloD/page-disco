'use client'

import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { format } from 'date-fns'
import SVG_Piso1, { getAreaInfo_SVG1 } from "./components/SVG_Piso1"
import SVG_Piso2, { getAreaInfo_SVG2 } from "./components/SVG_Piso2"
import { useReservation } from '../context/ReservationContext'
import Link from 'next/link'

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 990

const BackgroundFigure = ({isMobile, isTablet}) => {
  const width = isMobile ? '1500vw' : (isTablet ? '900vw' : '600vw')
  const height = isMobile ? '1000vh' : (isTablet ? '1200vh' : '800vh')
  const trnansX = isMobile ? '11%' : (isTablet ? '-5%' : '-5%')
  const trnansY = isMobile ? '-29%' : (isTablet ? '-24%' : '-24%')

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden bg-gray-900 flex">
      <div 
        className="absolute inset-0 flex items-center justify-center"
        style={{
          transform: 'rotate(-46.60deg) scale(2)',
          width: width,
          height: height,
          left: '50%',
          top: '50%',
          transform: `rotate(-46.60deg) scale(2) translate(${trnansX}, ${trnansY})`,
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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)

  useEffect(() => {
    if (!isOpen) {
      setName('')
      setEmail('')
      setPhone('')
      setSpecialRequests('')
      setIsSubmitted(false)
    }
  }, [isOpen])

  const handleSubmit = (e) => {
    e.preventDefault()
    setIsSubmitted(true)
    if (isFormValid()) {
      console.log('Reservación enviada:', { name, email, phone, selectedArea, specialRequests, selectedEvent, selectedDate, selectedTime })
      onClose()
    }
  }

  const handleCancel = () => {
    setIsSubmitted(false)
    onClose()
    onclickbutton()
  }

  const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return emailRegex.test(email)
  }

  const formatPhone = (phone) => {
    return phone.replace(/[^0-9]/g, "").slice(0, 10)
  }

  const handlePhoneChange = (e) => {
    setPhone(formatPhone(e.target.value))
  }

  const isFormValid = () => {
    return name && validateEmail(email) && phone.length === 10
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-gray-900 p-8 rounded-lg max-w-2xl w-full mx-4">
        <h2 className="text-3xl font-bold mb-6 text-white">{selectedArea}</h2>
        <div className="grid grid-cols-1 gap-6 mb-2">
          <div className='flex flex-col md:flex-row md:space-x-20'>
            <p className="text-lg text-white"><strong>Precio:</strong> {areaInfo.precio}</p>
            <p className="text-lg text-white"><strong>Capacidad máxima:</strong> {areaInfo.capacidad}</p>
          </div>
          {selectedEvent ? (
            <div>
              <p className="text-lg text-white"><strong>Evento:</strong> {selectedEvent.title}</p>
              <p className="text-lg text-white"><strong>Fecha:</strong> {format(new Date(selectedEvent.date), 'dd/MM/yyyy')}</p>
              <p className="text-lg text-white"><strong>Hora:</strong> {selectedEvent.time}</p>
            </div>
          ) : (
            <div>
              <p className="text-lg text-white"><strong>Fecha:</strong> {format(selectedDate, 'dd/MM/yyyy')}</p>
              <p className="text-lg text-white"><strong>Hora:</strong> {selectedTime}</p>
            </div>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label htmlFor="name" className="text-white">Nombre</label>
            <Input
              id="name"
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-gray-800 text-white border-gray-700"
              required
            />
            {isSubmitted && !name && <p className="text-red-500 text-sm">Por favor, ingresa tu nombre.</p>}
          </div>
          <div>
            <label htmlFor="email" className="text-white">Email</label>
            <Input
              id="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-800 text-white border-gray-700"
              required
            />
            {isSubmitted && (!validateEmail(email) && email) && <p className="text-red-500 text-sm">Por favor, ingresa un email válido.</p>}
          </div>
          <div>
            <label htmlFor="phone" className="text-white">Teléfono</label>
            <Input
              id="phone"
              type="tel"
              placeholder="Teléfono"
              value={phone}
              onChange={handlePhoneChange}
              className="bg-gray-800 text-white border-gray-700"
              required
              maxLength="10"
            />
            {isSubmitted && (phone.length < 10 && phone.length > 0) && <p className="text-red-500 text-sm">El número de teléfono debe tener 10 dígitos.</p>}
          </div>
          {/*<div>
            <label htmlFor="area" className="text-white">Área seleccionada</label>
            <Input
              id="area"
              type="text"
              placeholder="Área seleccionada"
              value={selectedArea}
              readOnly
              className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
            />
          </div>
          <div>
            <label htmlFor="specialRequests" className="text-white">Solicitudes Especiales</label>
            <Textarea
              id="specialRequests"
              placeholder="Solicitudes Especiales"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="w-full bg-gray-800 text-white border-gray-700 rounded-md p-2"
            />
          </div>*/}
          <div className="flex justify-end space-x-4">
            <Button onClick={handleCancel} className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2">
              Cancelar
            </Button>
            <Button 
              type="submit" 
              onClick={onclickbutton} 
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
              disabled={!isFormValid()}
            >
              Reservar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

const MemoizedReservationModal = React.memo(ReservationModal);

export default function ReservationPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedArea, setSelectedArea] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [currentFloor, setCurrentFloor] = useState(1)
  const [localGuestCount, setLocalGuestCount] = useState(0); // Added state for guest count
  const selectedPositionsRef = useRef({
    1: { x: 0, y: 0, area: "", color: "" },
    2: { x: 0, y: 0, area: "", color: "" },
  })
  const [isMobile, setIsMobile] = useState(false)
  const [resetSelection, setResetSelection] = useState(false)
  const [deviceType, setDeviceType] = useState('desktop')
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedAreaInfo, setSelectedAreaInfo] = useState({})
  const [viewMode, setViewMode] = useState('map')
  const { eventDetails, selectedArea: contextSelectedArea, guestCount } = useReservation()

  const mapRef = useRef(null)

  useEffect(() => {
    const checkDeviceType = () => {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        setDeviceType('mobile')
        setViewMode('list')
      } else if (window.innerWidth <= TABLET_BREAKPOINT) {
        setDeviceType('tablet')
        setViewMode('map')
      } else {
        setDeviceType('desktop')
        setViewMode('map')
      }
    }

    checkDeviceType()
    window.addEventListener('resize', checkDeviceType)
    return () => window.removeEventListener('resize', checkDeviceType)
  }, [])

  useEffect(() => {
    if (eventDetails) {
      console.log("Event details received:", eventDetails)
    }
    if (contextSelectedArea) {
      setSelectedArea(contextSelectedArea)
    }
    if (guestCount) {
      setLocalGuestCount(guestCount)
    }
  }, [eventDetails, contextSelectedArea, guestCount, setLocalGuestCount])

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
  }, [currentFloor, setSelectedArea, setSelectedAreaInfo, setIsModalOpen])

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

  const comprobeView = viewMode == 'map' ? true : false


  const renderSVG = (floor, ) => {
    const SVGComponent = floor === 1 ? SVG_Piso1 : SVG_Piso2
    return (
      <div 
        ref={mapRef}
        className={`${comprobeView? "relative flex justify-center items-center":""}`} 
        style={{ width: "100%", height: isMobile ? "auto" : "680px" }}
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

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Reservación enviada:', { 
      name, 
      email, 
      phone, 
      selectedArea, 
      specialRequests, 
      eventDetails: eventDetails ? {
        title: eventDetails.title,
        date: eventDetails.date,
        time: eventDetails.time
      } : 'No event details available'
    })
  }

  return (
    <div className='relative'>
      <BackgroundFigure isMobile={isMobile} isTablet={deviceType === 'tablet'}/>
      <title>Reservación | Disco</title>
      <section id="reservations" className="min-h-screen py-24 px-4 relative z-0">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8 flex justify-between items-center">
            <Link href="calendario">
              <Button variant="outline">Regresar al Calendario</Button>
            </Link>
            <h1 className="text-3xl font-bold text-white">Reservación</h1>
          </div>
          <div className="relative grid gap-4">
            <div className="flex justify-center items-center space-x-4 mb-8">
              <Button 
                onClick={() => handleFloorChange(1)} 
                className={`px-6 py-2 text-lg font-semibold transition-all duration-300 ${currentFloor === 1 ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
              >
                1er Piso
              </Button>
              <Button 
                onClick={() => handleFloorChange(2)} 
                className={`px-6 py-2 text-lg font-semibold transition-all duration-300 ${currentFloor === 2 ? "bg-blue-600 text-white" : "bg-gray-800 text-gray-300 hover:bg-gray-700"}`}
              >
                2do Piso
              </Button>
            </div>
            <div className={`p-6 border border-gray-800 rounded-lg bg-white/[5%] shadow-xl`}>
              <div className="mb-4 flex justify-between">
                <Button onClick={toggleViewMode} className="bg-blue-600 hover:bg-blue-700 text-white">
                  {viewMode === 'map' ? 'Ver como lista' : 'Ver como mapa'}
                </Button>
              </div>
              {renderSVG(currentFloor)}
            </div>
          </div>
          {eventDetails && (
            <div className="mb-8 p-6 border border-gray-800 rounded-lg bg-white/[5%] shadow-xl text-white">
              <h3 className="text-2xl font-bold mb-4">Detalles del Evento</h3>
              <p><strong>Título:</strong> {eventDetails.title}</p>
              <p><strong>Fecha:</strong> {new Date(eventDetails.date).toLocaleDateString()}</p>
              <p><strong>Hora:</strong> {eventDetails.time}</p>
            </div>
          )}
          {/*<div className="container px-4 md:px-6 py-12 mt-12">
            <h2 className="text-4xl font-bold mb-8 text-center text-white">Hacer una Reservación</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto grid gap-6 text-white">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Nombre</label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">Teléfono</label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Tu número de teléfono"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500 focus:border-blue-500 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label htmlFor="area" className="block text-sm font-medium text-gray-300 mb-1">Lugar</label>
                <Input
                  id="area"
                  type="text"
                  placeholder="Área seleccionada"
                  value={selectedArea}
                  readOnly
                  className="bg-gray-800 border-gray-700 text-white placeholder-gray-500"
                />
              </div>
              <div>
                <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-300 mb-1">Solicitudes Especiales</label>
                <Textarea
                  id="specialRequests"
                  placeholder="Alguna solicitud especial..."
                  value={specialRequests}
                  onChange={(e) => setSpecialRequests(e.target.value)}
                  className="w-full bg-gray-800 border-gray-700 text-white placeholder-gray-500 rounded-md p-2 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white transition-colors duration-300">
                Enviar Reservación
              </Button>
            </form>
          </div>*/}
        </div>
      </section>
      <MemoizedReservationModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedArea={selectedArea}
        areaInfo={selectedAreaInfo}
        onclickbutton={handleClearSelection}
        selectedEvent={eventDetails}
        selectedDate={eventDetails ? new Date(eventDetails.date) : new Date()}
        selectedTime={eventDetails ? eventDetails.time : ''}
      />
    </div>
  )
}

