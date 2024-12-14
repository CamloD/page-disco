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

  return (
    <ReservationContext.Provider
      value={{
        eventDetails,
        selectedArea,
        guestCount,
        setEventDetails,
        setSelectedArea,
        setGuestCount,
      }}
    >
      {children}
    </ReservationContext.Provider>
  )
}
