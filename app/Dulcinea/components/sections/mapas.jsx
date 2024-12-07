'use client'

import React, { useCallback, useEffect, useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { cn } from "@/lib/utils"
 

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 990

const containerStyle = {
  width: '100%',
  height: '100%',
}

const center = {
  lat: 6.249409334148027,
  lng: -75.5884542736625,
}

const libraries = ['places']

const options = {
  zoomControl: true,
  mapTypeControl: false,
  streetViewControl: false,
  fullscreenControl: true,
  styles: [
    {
      elementType: 'labels.icon',
      stylers: [
        { visibility: 'off' }
      ]
    },
   
  ]
};

function InteractiveMap() {
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
    libraries,
  })

  const [map, setMap] = useState(null)

  const onLoad = useCallback((mapInstance) => {
    mapInstance.setZoom(20)
    setMap(mapInstance)
  }, [])

  const onUnmount = useCallback(() => {
    setMap(null)
  }, [])

  if (loadError) {
    return (
      <div className="p-4 text-red-400">
        Error al cargar el mapa. Por favor, verifica tu API key y configuración.
      </div>
    )
  }

  if (!isLoaded) {
    return (
      <div className="p-4 text-gray-300">
        Cargando mapa...
      </div>
    )
  }

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={19}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={options}
    >
      <Marker position={center} />
    </GoogleMap>
  )
}
const InfoContent = ({ ismobile, istablet, isdesktop }) => {
  return(
  <div className={`flex flex-col space-y-4 ${ismobile || istablet || isdesktop ? ' text-center' : ''}`}>
    <div className={`flex-col ${ismobile || istablet || isdesktop ? 'text-left' : 'text-center'}`}>
      <h3 className="text-xl font-semibold mb-2">Dirección:</h3>
      <p className="text-gray-300">Calle Gran Vía, 28013 Madrid, España</p>
    </div>
    <Link
      href="https://www.google.com/maps/dir/?api=1&destination=Discoteca+Dulcinea,+Cl+44+%2369-96,+Laureles+-+Estadio,+Medellín,+Laureles,+Medellín,+Antioquia"
      target="_blank"
      rel="noopener noreferrer"
      className={``}
    >
      <Button 
        className={`${
          ismobile ? 'w-full' : 'w-full' 
        }  bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center space-x-2`}
      >
        <MapPin className="w-5 h-5" />
        <span>Cómo llegar</span>
      </Button>
    </Link>
  </div>
  )
}


export function Mapas() {
  const [deviceType, setDeviceType] = useState('mobile');

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

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';

  return (
    <main className="relative bg-gray-900">
      <Card className="w-full bg-gray-800 border-gray-700 text-white overflow-hidden">
        <CardContent className="p-0">
          <div className={cn(
            "transition-all duration-300 ease-in-out",
            isMobile ? "h-auto" : "h-0 overflow-hidden"
          )}>
            <div className="bg-[#1C2638]/85 p-4 w-full">
              <InfoContent />
            </div>
          </div>
          <div className={cn(
            "relative transition-all duration-300 ease-in-out",
            isMobile ? 'h-[calc(100vh-120px)]' : 'h-[300px] sm:h-[400px] md:h-[500px] lg:h-[700px]'
          )}>
            <InteractiveMap />
            <div className={cn(
              "absolute top-0 right-0 bg-[#1C2638]/85 p-4 sm:p-6 md:p-8",
              "transition-all duration-300 ease-in-out -translate-x-16 translate-y-12",
              isMobile ? "opacity-0 pointer-events-none" : "opacity-100",
              isTablet ? "w-[300px]" : isDesktop ? "w-[400px] lg:w-[450px]" : "w-full"
            )}>
              <InfoContent ismobile = {isMobile} istablet = {isTablet} isdesktop = {isDesktop} />
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  )
}

export default Mapas

