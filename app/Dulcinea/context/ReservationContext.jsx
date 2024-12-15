'use client'

import React, { createContext, useContext, useState } from 'react'

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

  const updateReservation = (newData) => {
    setEventDetails(newData.eventDetails ?? eventDetails)
    setSelectedArea(newData.selectedArea ?? selectedArea)
    setGuestCount(newData.guestCount ?? guestCount)
    setSelectedDate(newData.selectedDate ?? selectedDate)
    setReservationType(newData.reservationType ?? reservationType)
    setAttendees(newData.attendees ?? attendees)
  }

  const clearReservation = () => {
    setEventDetails(null)
    setSelectedArea('')
    setGuestCount(1)
    setSelectedDate(null)
    setReservationType(null)
    setAttendees(null)
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

