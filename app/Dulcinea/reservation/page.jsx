/* eslint-disable @next/next/no-page-custom-font */
"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Head from "next/head"
import SVG_Piso1 from "./components/svgpiso1"
import SVG_Piso2 from "./components/svgpiso2"

export default function ReservationPage() {
  
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [selectedArea, setSelectedArea] = useState('')
  const [specialRequests, setSpecialRequests] = useState('')
  const [currentFloor, setCurrentFloor] = useState(1)
  const [selectedPositions, setSelectedPositions] = useState({
    1: { x: 0, y: 0, area: "", color: "" },
    2: { x: 0, y: 0, area: "", color: "" },
  })
  const [isMobile, setIsMobile] = useState(false)
  const [resetSelection, setResetSelection] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  const handleFloorChange = (floor) => {
    setCurrentFloor(floor)
    setSelectedArea(selectedPositions[floor]?.area || selectedArea)
  }

  const handleAreaClick = (area, event) => {
    if (area.toLowerCase().includes("palco") || area.toLowerCase().includes("vip")) {
      const floorLabel = currentFloor === 1 ? " 1er piso " : " 2do piso "
      const newArea = `${area} (${floorLabel})`
      setSelectedArea(newArea)

      if (event && event.target) {
        const rect = event.target.getBoundingClientRect()
        const x = event.clientX - rect.left
        const y = event.clientY - rect.top

        const selectedColor = "#FF5733"

        setSelectedPositions((prev) => ({
          ...prev,
          [currentFloor]: { x, y, area: newArea, color: selectedColor },
        }))
      }
    }
  }

  const handleClearSelection = () => {
    setResetSelection(true)
    setSelectedPositions((prev) => ({
      ...prev,
      [currentFloor]: { x: 0, y: 0, area: "", color: "" },
    }))
    setSelectedArea("")

    setTimeout(() => {
      setResetSelection(false)
    }, 50)
  }

  const renderSVG = (floor) => {
    const SVGComponent = floor === 1 ? SVG_Piso1 : SVG_Piso2
    return (
      <div className="relative flex justify-center items-center" style={{ width: "100%", height: isMobile ? "auto" : "680px" }}>
        <SVGComponent
          onClick={handleAreaClick}
          resetSelection={resetSelection}
          selectedBlock={selectedPositions[floor]?.area}
          className="text-white w-full h-full"
        />

        {selectedPositions[floor]?.x !== 0 && selectedPositions[floor]?.y !== 0 && (
          <div
            className="absolute w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: selectedPositions[floor].x,
              top: selectedPositions[floor].y,
              backgroundColor: selectedPositions[floor].color,
            }}
          />
        )}
      </div>
    )
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Aquí iría la lógica para enviar la reservación
    console.log('Reservación enviada:', { name, email, phone, selectedArea, specialRequests, eventTitle, eventDate, eventTime })
    // Redireccionar o mostrar un mensaje de éxito
  }

  return (
    <div>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Calistoga&display=swap" rel="stylesheet" />
      </Head>
      <title>Reservación | Disco</title>
      <section id="reservations" className="min-h-screen bg-[#1f1f1f] py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative grid gap-4">
            <div className="flex justify-center items-center space-x-4">
              <Button onClick={() => handleFloorChange(1)} className={currentFloor === 1 ? "bg-blue-800" : "bg-blue-500"}>
                1er Piso
              </Button>
              <Button onClick={() => handleFloorChange(2)} className={currentFloor === 2 ? "bg-blue-800" : "bg-blue-500"}>
                2do Piso
              </Button>
            </div>
            <div className={`grid ${isMobile ? "grid-cols-1" : "grid-flow-col"} p-4 border border-gray-300 rounded`}>
              {renderSVG(currentFloor)}
              {!isMobile && (
                <div className="grid items-center">
                  <div className="flex flex-col items-center">
                    <Input
                      type="text"
                      placeholder="Selecciona Área (solo Palcos o VIP)"
                      value={selectedArea}
                      readOnly
                      className="flex bg-gray-100 border-gray-300 mb-2"
                    />
                    <Button onClick={handleClearSelection} className="w-full bg-red-500 hover:bg-red-600 text-white">
                      Limpiar Selección
                    </Button>
                  </div>
                </div>
              )}
              {isMobile && (
                <div className="w-full mt-4">
                  <Input
                    type="text"
                    placeholder="Selecciona Área (solo Palcos o VIP)"
                    value={selectedArea}
                    readOnly
                    className="w-full bg-gray-100 border-gray-300 mb-2"
                  />
                  <Button onClick={handleClearSelection} className="w-full bg-red-500 hover:bg-red-600 text-white">
                    Limpiar Selección
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="container px-4 md:px-6 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Hacer una Reservación</h2>
          <form onSubmit={handleSubmit} className="max-w-md mx-auto grid gap-4 text-black">
            <Input
              type="text"
              placeholder="Nombre"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
              required
            />
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
              required
            />
            <Input
              type="tel"
              placeholder="Teléfono"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
              required
            />
            <Input
              type="text"
              placeholder="Lugar"
              value={selectedArea}
              readOnly
              className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
            />
            <Textarea
              placeholder="Solicitudes Especiales"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
            />
            <Button type="submit" className="bg-teal-800 hover:bg-teal-900">
              Enviar Reservación
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}

