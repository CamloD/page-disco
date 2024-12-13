/* eslint-disable @next/next/no-page-custom-font */
"use client"

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Head from "next/head"
//import SVG_Piso1 from "./svgpiso1"; import SVG_Piso2 from "./svgpiso2"
import SVG_Piso1 from "./SVG_Piso1"; import SVG_Piso2 from "./SVG_Piso2"


const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 990
const BACKGROUND_PATTERN = "data:image/svg+xml,%3Csvg width='6' height='6' viewBox='6 6 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='12' height='12' fill='%230a5770' fill-opacity='0.4'/%3E%3C/svg%3E"

const BackgroundFigure = ({isMobile, isTablet}) => {
  const width = isMobile ? '1500vw' : (isTablet ? '900vw' : '600vw');
  const height = isMobile ? '1000vh' : (isTablet ? '1200vh' : '800vh');
  const trnansX = isMobile ? '11%' : (isTablet ? '-5%' : '-5%');
  const trnansY = isMobile ? '-29%' : (isTablet ? '-24%' : '-24%');


  return(
  <div className="absolute inset-0 w-full h-full overflow-hidden bg-gray-900 flex">
    <div 
      className="absolute inset-0 flex items-center justify-center"
      style={{
        transform: 'rotate(-46.60deg) scale(2)',
        width: width,  //'400vw'
        height: height, // '800vh'
        left: '50%',
        top: '50%',
        transform: `rotate(-46.60deg) scale(2) translate(${trnansX}, ${trnansY})`,
      //transform: 'rotate(-46.60deg) scale(2) translate(-5%, -24%)',
        backgroundImage: `url("${BACKGROUND_PATTERN}")`,
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
  const [deviceType, setDeviceType] = useState('desktop');

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
          //onClick={handleAreaClick}
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

  useEffect(() => {
    const checkDeviceType = () => {
      if (window.innerWidth <= MOBILE_BREAKPOINT) {
        setDeviceType('mobile');
      } else if (window.innerWidth <= TABLET_BREAKPOINT) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };
    checkDeviceType();
    window.addEventListener('resize', checkDeviceType);
    return () => window.removeEventListener('resize', checkDeviceType);
  }, []);

  //const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';

  return (
    <div className='relative'>
      <BackgroundFigure isMobile= {isMobile} isTablet={isTablet}/>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Calistoga&display=swap" rel="stylesheet" />
      </Head>
      <title>Reservación | Disco</title>
      <section id="reservations" className="min-h-screen py-24 px-4 relative z-0">
        <div className="max-w-5xl mx-auto">
          <div className="relative grid gap-4">
            <div className="flex justify-center items-center space-x-4">
              <Button onClick={() => handleFloorChange(1)} className={currentFloor === 1 ? "bg-blue-800" : "bg-blue-500"}>
                1er Piso
              </Button>
              <Button onClick={() => handleFloorChange(2)} className={currentFloor === 2 ? "bg-blue-800" : "bg-blue-500"}>
                2do Piso
              </Button>
            </div>
            <div className={`grid ${isMobile ? "grid-cols-1" : "grid-flow-col"} p-4 border border-slate-800 rounded bg-white/[3%]`}>
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

