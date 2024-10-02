"use client"

import { useState } from 'react'
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import SVG_Piso1 from './components/svgpiso1'
import SVG_Piso2 from './components/svgpiso2'

const InteractiveSVG = ({ selectedArea, setSelectedArea }) => {
  const [currentFloor, setCurrentFloor] = useState(1)

  const handleFloorChange = (floor) => {
    setCurrentFloor(floor)
    setSelectedArea('') // Resetea el área seleccionada al cambiar de piso
  }

  const handleAreaClick = (area) => {
    if (area.toLowerCase().includes('palco') || area.toLowerCase().includes('vip')) {
      // Agregar el piso al área seleccionada
      const floorLabel = currentFloor === 1 ? ' 1er piso ' : ' 2do piso ';
      setSelectedArea(`${area}  (${floorLabel})`);
    }
  }

  return (
    <div className="relative grid gap-4">
      <div className="flex justify-center items-center space-x-4">
        <Button
          onClick={() => handleFloorChange(1)}
          className={currentFloor === 1 ? 'bg-blue-800' : 'bg-blue-500'}
        >
          1st Floor
        </Button>
        <Button
          onClick={() => handleFloorChange(2)}
          className={currentFloor === 2 ? 'bg-blue-800' : 'bg-blue-500'}
        >
          2nd Floor
        </Button>
      </div>
      <div className='grid grid-flow-col p-4 border border-gray-300 rounded'> 
        <div className="flex justify-center items-center " style={{ width: '100%', height: '680px' }}>
          {currentFloor === 1 ? (
            <SVG_Piso1 onClick={handleAreaClick} className="text-white" />
          ) : (
            <SVG_Piso2 onClick={handleAreaClick} className="text-white" />
          )}
        </div>
        <div className='flex p-4 items-center'>
          <Input
            type="text"
            placeholder="Selecciona Área (solo Palcos o VIP)"
            value={selectedArea}
            readOnly
            className="flex bg-gray-100 border-gray-300 "
          />
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  const [selectedArea, setSelectedArea] = useState('')
  return (
    <div>
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Calistoga&display=swap" rel="stylesheet" />
      </head>
      <title>Reservación | Disco</title>
      <section id="reservations" className="min-h-screen bg-[#1f1f1f] py-24 px-4">
        <div className="max-w-4xl mx-auto ">
          <InteractiveSVG selectedArea={selectedArea} setSelectedArea={setSelectedArea} />
        </div>
        <div className="container px-4 md:px-6 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Make a Reservation</h2>
          <form className="max-w-md mx-auto grid gap-4 text-black">
            <Input
              type="text"
              placeholder="Name"
              className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
            />
            <Input
              type="email"
              placeholder="Email"
              className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
            />
            <Input
              type="tel"
              placeholder="Phone"
              className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
            />
            <Input
              type="text"
              placeholder="Lugar"
              value={selectedArea}
              readOnly
              className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
            />
            <Textarea
              placeholder="Special Requests"
              className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
            />
            <Button type="submit" className="bg-teal-800 hover:bg-teal-900">
              Submit Reservation
            </Button>
          </form>
        </div>
      </section>
    </div>
  )
}
