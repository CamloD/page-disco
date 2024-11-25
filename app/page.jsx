
"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 990
const BACKGROUND_PATTERN = "data:image/svg+xml,%3Csvg width='6' height='6' viewBox='6 6 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='12' height='12' fill='%230a5770' fill-opacity='0.4'/%3E%3C/svg%3E"


const BackgroundFigure = ({isMobile }) => (
  
  <div className="relative w-full h-full overflow-hidden bg-gray-900 cursor-pointer flex flex-auto">
    {!isMobile && (
      <div>
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
            //opacity: esVisible ? 0 : 1,
            transition: 'opacity 0.5s ease-in-out',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-gray-700/50 to-gray-800/50" />
        </div> 
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950/100" />
      </div>
    )}
  </div> 
)

const ImagenesFondo = ({href_fondo, isMobile, setEsVisible, esVisible, imagenfondo, logo_imagen, sizelogo}) => {
  const logo_width = sizelogo?.width || 200;  
  const logo_height = sizelogo?.height || 300;
  return(
    <Link href={href_fondo} passHref>
      <div
      className='relative w-full h-full'
      onMouseEnter={() => !isMobile && setEsVisible(true)}
      onMouseLeave={() => !isMobile && setEsVisible(false)}
      aria-label={esVisible || isMobile ? "Imagen de fondo" : "Patrón de puntos de fondo"}
      >
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
          <div className="absolute inset-0 flex items-center justify-center">
            <Image
              src={logo_imagen}
              alt="Imagen central"
              width={logo_width}
              height={logo_height}
              className="rounded-lg z-10"
              priority 
              
            />
        </div> 
      </div>
      
    </Link>
  )
}


const PagePrincipal = () => {
  const [esVisible1, PonerVisible1] = useState(false)
  const [esVisible2, PonerVisible2] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
      const checkIfMobile = () => setIsMobile(window.innerWidth <= 768)
      checkIfMobile()
      window.addEventListener('resize', checkIfMobile)
      return () => window.removeEventListener('resize', checkIfMobile)
    }, [])
    
    return (
      <div>
        <section>
          <div className='relative h-screen w-full overflow-hidden'>
            <div className='absolute z-0 w-full h-full'> 
              <BackgroundFigure
                isMobile={isMobile}
              />
            </div>
            <div className="absolute z-10 w-screen h-screen flex flex-col md:flex-row">
              <div className="absolute z-10 w-screen h-screen flex flex-wrap">
                <div className="flex-1 w-full h-full">
                  <ImagenesFondo
                    href_fondo="/Dulcinea"
                    isMobile={isMobile}
                    setEsVisible={PonerVisible1}
                    esVisible={esVisible1}
                    imagenfondo="images1.jpg"
                    logo_imagen="LOGODULCINEA_CONSOMBRA.png"
                    sizelogo={{ width: 400, height: 450 }}
                  />
                </div>
                <div className="flex-1 w-full h-full">
                  <ImagenesFondo
                    href_fondo="/Dulcinea/gallery"
                    isMobile={isMobile}
                    setEsVisible={PonerVisible2}
                    esVisible={esVisible2}
                    imagenfondo="images/image1.jpg"
                    logo_imagen="logo.png"
                    sizelogo={{ width: 150, height: 150 }} 
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section>
          <footer className="bg-gray-900 py-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
                <div className="text-white text-center md:text-start">
                  <p>&copy; 2024 Discoteca Disco. All rights reserved.</p>
                </div>
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-6 text-white">
                  <Link href="#" className="hover:text-gray-400 transition-colors">Privacy</Link>
                  <Link href="#" className="hover:text-gray-400 transition-colors">Terms</Link>
                  <Link href="#" className="hover:text-gray-400 transition-colors">Contact</Link>
                </div>
              </div>
            </div>
          </footer>
        </section>
      </div>
    )
}

export default PagePrincipal;