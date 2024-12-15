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
  }, [])

  useEffect(() => {
    const reservationInfo = {
      eventDetails,
      selectedArea,
      guestCount,
      selectedDate,
      reservationType,
      attendees
    }
    localStorage.setItem('reservationInfo', JSON.stringify(reservationInfo))
  }, [eventDetails, selectedArea, guestCount, selectedDate, reservationType, attendees])

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
        clearReservation,
      }}
    >
      {children}
    </ReservationContext.Provider>
  )
}
