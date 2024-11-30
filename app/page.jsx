"use client"

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Imagen } from "app/components/mostrarmedios"
import { Instagram, Facebook, Twitter } from 'app/components/icons'



const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 990
const BACKGROUND_PATTERN = "data:image/svg+xml,%3Csvg width='6' height='6' viewBox='6 6 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='12' height='12' fill='%230a5770' fill-opacity='0.4'/%3E%3C/svg%3E"

const BackgroundFigure = ({ isMobile }) => (
  <div className="relative w-full h-full overflow-hidden bg-gray-900 cursor-pointer flex flex-auto">
    {!isMobile && (
      <>
        <div 
          className="absolute inset-0 flex items-center justify-center"
          style={{
            transform: 'rotate(-45deg) scale(2)',
            width: '200vw',
            height: '200vh',
            left: '-50%',
            top: '-50%',
            backgroundImage: `url("${BACKGROUND_PATTERN}")`,
            backgroundSize: '5px 5px',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat',
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-700/50 to-gray-800/50" />
        </div> 
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950/100" />
      </>
    )}
  </div> 
)


const Fondo = ({ imagenfondo, esVisible, isMobile }) => {
  return (
    <div>
      <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${imagenfondo}')`,
            opacity: esVisible || isMobile ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}
        />
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            width: '100%',
            height: '100%',
            left: '0',
            top: '0',
            backgroundImage: `url('${imagenfondo}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: esVisible ? 1 : 0,
            transition: 'opacity 0.6s ease-in-out',
          }}      
        />
    </div>
  );
};


const ImagenesFondo = ({ href_fondo, isMobile, setEsVisible, esVisible, imagenfondo, logo_imagen, sizelogo }) => {
  const logo_width = sizelogo?.width || 200;  
  const logo_height = sizelogo?.height || 300;

  
  return (
    <Link href={href_fondo} passHref>
      <div
        className='relative w-full h-full'
        onMouseEnter={() => !isMobile && setEsVisible(true)}
        onMouseLeave={() => !isMobile && setEsVisible(false)}
        aria-label={esVisible || isMobile ? "Imagen de fondo" : "Patrón de puntos de fondo"}
      >
        <Fondo imagenfondo={imagenfondo} esVisible={esVisible} isMobile={isMobile} />
        <div className="absolute inset-0 flex justify-center items-center my-12">
          <div className="-mt-40">
            <Imagen
              src={logo_imagen}
              alt="Imagen central"
              width={logo_width}
              height={logo_height}
              className="rounded-lg z-10"
              priority
            />
          </div>
        </div>
      </div>
    </Link>
  )
}

const PagePrincipal = () => {
  const [esVisible1, PonerVisible1] = useState(false);
  const [esVisible2, PonerVisible2] = useState(false);
  const [deviceType, setDeviceType] = useState('desktop');

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

  // Eventos para cambiar visibilidad
  const handleMouseEnter1 = () => {
    if (!isMobile) {
      PonerVisible1(true); // Activamos la visibilidad de la primera imagen
    }
  };

  const handleMouseLeave1 = () => {
    if (!isMobile) {
      PonerVisible1(false);
    }
  };

  const handleMouseEnter2 = () => {
    if (!isMobile) {
      PonerVisible2(true);
    }
  };

  const handleMouseLeave2 = () => {
    if (!isMobile) {
      PonerVisible2(false);
    }
  };

  const handleMouseEnterAll = () => {
    if (!isMobile) {
      PonerVisible1(true);
      PonerVisible2(true);
    }
  };

  const handleMouseLeaveAll = () => {
    if (!isMobile) {
      PonerVisible1(false);
      PonerVisible2(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow">
        <section className="relative h-screen w-full overflow-hidden">
          <div className="absolute z-0 w-full h-full">
            <BackgroundFigure isMobile={isMobile} />
          </div>

          
          <div
            className={`absolute z-10 w-full h-full flex ${isMobile ? 'flex-col' : 'flex-row'}`}
             
          >
            <div className={` ${!isMobile? '': 'hidden' } absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[-40px] flex justify-center items-end space-x-6 z-10 text-white pointer-events-auto `}
              onMouseEnter={handleMouseEnterAll}
              onMouseLeave={handleMouseLeaveAll}
            >
              <a href="https://www.instagram.com" className="pointer-events-auto" target="_blank">
                <Instagram width="40" height="40"  />
              </a>
              <a href="https://www.facebook.com" className="pointer-events-auto" target="_blank">
                <Facebook width="40" height="40"  fill = "currentColor"/>
              </a>
              <a href="https://x.com"className="pointer-events-auto" target="_blank">
                <Twitter width="40" height="40" fill = "currentColor"/>
              </a>
            </div>
            <div
              className={`w-full ${isMobile ? 'h-full' : isTablet ? 'h-full w-1/2' : 'h-full flex-1'}`}
              onMouseEnter={handleMouseEnter1}
              onMouseLeave={handleMouseLeave1}
            >
              <ImagenesFondo
                href_fondo="/Dulcinea"
                isMobile={isTablet || isMobile}
                setEsVisible={PonerVisible1}
                esVisible={esVisible1}
                imagenfondo="images1.jpg"
                logo_imagen="LOGODULCINEA_CONSOMBRA.png"
                sizelogo={{ width: isMobile ? 325 : 400, height: isMobile ? 375 : 450 }}
              />
            </div>

          {/*<div
              className={`w-full ${isMobile ? 'h-1/2' : isTablet ? 'h-full w-1/2' : 'h-full flex-1'}`}
              onMouseEnter={handleMouseEnter2}
              onMouseLeave={handleMouseLeave2}
            >
              <ImagenesFondo
                href_fondo="/Dulcinea/gallery"
                isMobile={isTablet || isMobile}
                setEsVisible={PonerVisible2}
                esVisible={esVisible2}
                imagenfondo="images/image1.jpg"
                logo_imagen="logo.png"
                sizelogo={{ width: isMobile ? 75 : 150, height: isMobile ? 75 : 150 }}
              />
            </div>*/}
          </div>
        </section>
      </main>

      <footer className="bg-gray-900 py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white text-center md:text-start">
              <p>&copy; 2024 Discoteca Disco. All rights reserved.</p>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-6 text-white">
              <Link href="#" className="hover:text-gray-400 transition-colors">Privacy</Link>
              <Link href="#" className="hover:text-gray-400 transition-colors">Terms</Link>
              <Link href="#" className="hover:text-gray-400 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};


export default PagePrincipal
