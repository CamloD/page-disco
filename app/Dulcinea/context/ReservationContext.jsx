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
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [formData, setFormData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  })
  const [reservationName, setReservationName] = useState('')
  const [reservationEmail, setReservationEmail] = useState('')
  const [reservationPhone, setReservationPhone] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')

  const updateReservation = (newData) => {
    setEventDetails(newData.eventDetails ?? eventDetails)
    setSelectedArea(newData.selectedArea ?? selectedArea)
    setGuestCount(newData.guestCount ?? guestCount)
    setSelectedDate(newData.selectedDate ?? selectedDate)
    setReservationType(newData.reservationType ?? reservationType)
    setAttendees(newData.attendees ?? attendees)
    setName(newData.name ?? name)
    setEmail(newData.email ?? email)
    setPhone(newData.phone ?? phone)
    setFormData(newData.formData ?? formData)
    setReservationName(newData.reservationName ?? reservationName)
    setReservationEmail(newData.reservationEmail ?? reservationEmail)
    setReservationPhone(newData.reservationPhone ?? reservationPhone)
    setSpecialRequests(newData.specialRequests ?? specialRequests)
  }

  const clearReservation = () => {
    setEventDetails(null)
    setSelectedArea('')
    setGuestCount(1)
    setSelectedDate(null)
    setReservationType(null)
    setAttendees(null)
    setName('')
    setEmail('')
    setPhone('')
    setFormData({
      cardNumber: '',
      expiryDate: '',
      cvv: ''
    })
    setReservationName('')
    setReservationEmail('')
    setReservationPhone('')
    setSpecialRequests('')
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
        name,
        email,
        phone,
        setEventDetails,
        setSelectedArea,
        setGuestCount,
        setSelectedDate,
        setReservationType,
        setAttendees,
        setName,
        setEmail,
        setPhone,
        updateReservation,
        clearReservation,
        formData,
        setFormData,
        reservationName,
        reservationEmail,
        reservationPhone,
        specialRequests,
        setReservationName,
        setReservationEmail,
        setReservationPhone,
        setSpecialRequests,
      }}
    >
      {children}
    </ReservationContext.Provider>
  )
}