"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import SVG_Piso1 from "./components/svgpiso1";
import SVG_Piso2 from "./components/svgpiso2";
import Head from "next/head";

const InteractiveSVG = ({ selectedArea, setSelectedArea, selectedPositions, setSelectedPositions }) => {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const [resetSelection, setResetSelection] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleFloorChange = (floor) => {
    setCurrentFloor(floor);
    // Si la selección está vacía en el piso actual, se toma la selección del otro piso (si la hay).
    setSelectedArea(selectedPositions[floor]?.area || selectedArea);
  };

  const handleAreaClick = (area, event) => {
    if (area.toLowerCase().includes("palco") || area.toLowerCase().includes("vip")) {
      const floorLabel = currentFloor === 1 ? " 1er piso " : " 2do piso ";
      const newArea = `${area} (${floorLabel})`;
      setSelectedArea(newArea);

      if (event && event.target) {
        const rect = event.target.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;

        const selectedColor = "#FF5733"; // Color elegido para la selección

        setSelectedPositions((prev) => ({
          ...prev,
          [currentFloor]: { x, y, area: newArea, color: selectedColor },
        }));
      }
    }
  };

  const handleClearSelection = () => {
    setResetSelection(true);
    setSelectedPositions((prev) => ({
      ...prev,
      [currentFloor]: { x: 0, y: 0, area: "", color: "" },
    }));
    setSelectedArea("");

    setTimeout(() => {
      setResetSelection(false); // Desactivar la bandera de restablecimiento
    }, 50); // Tiempo de espera para forzar la actualización visual
  };

  const renderSVG = (floor) => {
    const SVGComponent = floor === 1 ? SVG_Piso1 : SVG_Piso2;
    return (
      <div className="relative flex justify-center items-center" style={{ width: "100%", height: isMobile ? "auto" : "680px" }}>
        <SVGComponent
          onClick={handleAreaClick}
          resetSelection={resetSelection}
          selectedBlock={selectedPositions[floor]?.area} // Pasamos el área seleccionada
          className="text-white w-full h-full"
        />

        {selectedPositions[floor]?.x !== 0 && selectedPositions[floor]?.y !== 0 && (
          <div
            className="absolute w-6 h-6 rounded-full transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
            style={{
              left: selectedPositions[floor].x,
              top: selectedPositions[floor].y,
              backgroundColor: selectedPositions[floor].color, // Aplicar color de la selección
            }}
          />
        )}
      </div>
    );
  };

  return (
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
  );
};

export default function Page() {
  const [selectedArea, setSelectedArea] = useState("");
  const [selectedPositions, setSelectedPositions] = useState({
    1: { x: 0, y: 0, area: "", color: "" },
    2: { x: 0, y: 0, area: "", color: "" },
  });

  return (
    <div>
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Calistoga&display=swap" rel="stylesheet" />
      </Head>
      <title>Reservación | Disco</title>
      <section id="reservations" className="min-h-screen bg-[#1f1f1f] py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <InteractiveSVG
            selectedArea={selectedArea}
            setSelectedArea={setSelectedArea}
            selectedPositions={selectedPositions}
            setSelectedPositions={setSelectedPositions}
          />
        </div>
        <div className="container px-4 md:px-6 py-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-white">Hacer una Reservación</h2>
          <form className="max-w-md mx-auto grid gap-4 text-black">
            <Input
              type="text"
              placeholder="Nombre"
              className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
            />
            <Input
              type="email"
              placeholder="Email"
              className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
            />
            <Input
              type="tel"
              placeholder="Teléfono"
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
              placeholder="Solicitudes Especiales"
              className="bg-[#d4d4d4] border-[#333] focus:border-[#9b59b6]"
            />
            <Button type="submit" className="bg-teal-800 hover:bg-teal-900">
              Enviar Reservación
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
}
