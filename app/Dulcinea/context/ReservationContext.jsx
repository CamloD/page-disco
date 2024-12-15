'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

const ReservationContext = createContext(undefined)

export const useReservation = () => {
  const context = useContext(ReservationContext)
  if (context === undefined) {
    throw new Error('useReservation must be used within a ReservationProvider')
  }
  return context
}

export const ReservationProvider = ({ children }) => {
  const [eventDetails, setEventDetails] = useState(null)
  const [selectedArea, setSelectedArea] = useState('')
  const [guestCount, setGuestCount] = useState(1)
  const [selectedDate, setSelectedDate] = useState(null)
  const [reservationType, setReservationType] = useState(null)
  const [attendees, setAttendees] = useState(null)

  // Bandera para controlar cuando los datos se cargan inicialmente
  const [isLoaded, setIsLoaded] = useState(false)

  // Cargar datos de localStorage solo cuando el componente se monta por primera vez
  useEffect(() => {
    const storedInfo = localStorage.getItem('reservationInfo')
    if (storedInfo) {
      const parsedInfo = JSON.parse(storedInfo)
      setEventDetails(parsedInfo.eventDetails)
      setSelectedArea(parsedInfo.selectedArea)
      setGuestCount(parsedInfo.guestCount)
      setSelectedDate(parsedInfo.selectedDate ? new Date(parsedInfo.selectedDate) : null)
      setReservationType(parsedInfo.reservationType)
      setAttendees(parsedInfo.attendees)
    }
    setIsLoaded(true) // Esto se asegura de que los efectos de guardado no se ejecuten hasta que los datos estén cargados.
  }, []) // Este efecto se ejecuta solo una vez

  // Guardar datos en localStorage solo cuando los datos se han cargado completamente
  useEffect(() => {
    if (isLoaded) { // Solo ejecuta este efecto cuando los datos se hayan cargado
      const reservationInfo = {
        eventDetails,
        selectedArea,
        guestCount,
        selectedDate,
        reservationType,
        attendees
      }
      // Solo actualiza localStorage cuando los datos cambian, evitando actualizaciones infinitas
      localStorage.setItem('reservationInfo', JSON.stringify(reservationInfo))
    }
  }, [isLoaded, eventDetails, selectedArea, guestCount, selectedDate, reservationType, attendees])  // Dependencias bien controladas

  const updateReservation = (newData) => {
    // Actualiza solo si hay un cambio en el estado
    if (newData.eventDetails !== eventDetails) {
      setEventDetails(newData.eventDetails)
    }
    if (newData.selectedArea !== selectedArea) {
      setSelectedArea(newData.selectedArea)
    }
    if (newData.guestCount !== guestCount) {
      setGuestCount(newData.guestCount)
    }
    if (newData.selectedDate !== selectedDate) {
      setSelectedDate(newData.selectedDate)
    }
    if (newData.reservationType !== reservationType) {
      setReservationType(newData.reservationType)
    }
    if (newData.attendees !== attendees) {
      setAttendees(newData.attendees)
    }
  }

  const clearReservation = () => {
    setEventDetails(null)
    setSelectedArea('')
    setGuestCount(1)
    setSelectedDate(null)
    setReservationType(null)
    setAttendees(null)
    localStorage.removeItem('reservationInfo')
  }

  return (
    <ReservationContext.Provider
      value={{
        eventDetails,
        selectedArea,
        guestCount,
        selectedDate,
        reservationType,
        attendees,
        setEventDetails,
        setSelectedArea,
        setGuestCount,
        setSelectedDate,
        setReservationType,
        setAttendees,
        updateReservation,
        clearReservation,
      }}
    >
      {children}
    </ReservationContext.Provider>
  )
}
