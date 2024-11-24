
"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'


const Section = ({ href, imageSrc, logoSrc, esVisible, setEsVisible, isMobile }) => (
  <Link href={href} passHref>
    <div 
      className="relative w-full h-full overflow-hidden bg-gray-900 cursor-pointer flex flex-auto"
      onMouseEnter={() => !isMobile && setEsVisible(true)}
      onMouseLeave={() => !isMobile && setEsVisible(false)}
      role="img"
      aria-label={esVisible || isMobile ? "Imagen de fondo" : "Patrón de puntos de fondo"}
    >
      <div className='z-0'>
        {!isMobile && (
          <div className='-z-10'>
            <div 
              className="absolute inset-0 flex items-center justify-center"
              style={{
                transform: 'rotate(-45deg) scale(2)',
                width: '200vw',
                height: '200vh',
                left: '-50%',
                top: '-50%',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='0 0 6 6' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='6' height='6' fill='%230a5770' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                backgroundSize: '5px 5px',
                backgroundPosition: 'center',
                backgroundRepeat: 'repeat',
                opacity: esVisible ? 0 : 1,
                transition: 'opacity 0.5s ease-in-out',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-b from-gray-700/50 to-gray-800/50" />
            </div> 
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-950/100" />
          </div>
        )}
      </div>
      <div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('${imageSrc}')`,
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
            backgroundImage: `url('${imageSrc}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            opacity: esVisible ? 1 : 0,
            transition: 'opacity 0.5s ease-in-out',
          }}      
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src={logoSrc}
            alt="Imagen central"
            width={400}
            height={450}
            className="rounded-lg z-10"
          />
        </div>
      </div>
    </div>
  </Link>
)





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
        <Link href="/Dulcinea" passHref>
          <div 
            className="relative w-screen h-screen overflow-hidden bg-gray-900 cursor-pointer flex flex-auto"
            onMouseEnter={() => !isMobile && PonerVisible1(true)}
            onMouseLeave={() => !isMobile && PonerVisible1(false)}
            role="img"
            aria-label={esVisible1 || isMobile ? "Imagen de fondo" : "Patrón de puntos de fondo"}
          >
            <div className='z-0'>
              {!isMobile && (
                <div className='-z-10'>
                  <div 
                    className="absolute inset-0 flex items-center justify-center"
                    style={{
                      transform: 'rotate(-45deg) scale(2)',
                      width: '200vw',
                      height: '200vh',
                      left: '-50%',
                      top: '-50%',
                      backgroundImage: `url("data:image/svg+xml,%3Csvg width='6' height='6' viewBox='6 6 12 12' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='12' height='12' fill='%230a5770' fill-opacity='0.4'/%3E%3C/svg%3E")`,
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
            <div className='relative flex'> {/* datas  */}
              {}
              <div 
              className='container relative flex flex-auto h-full w-full'
              onMouseEnter={() => !isMobile && PonerVisible1(true)}
            onMouseLeave={() => !isMobile && PonerVisible1(false)}
              >
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/images1.jpg')`,
                    opacity: esVisible1 || isMobile ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                  }}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    width: '100vw',
                    height: '100vh',
                    left: '0',
                    top: '0',
                    backgroundImage: `url('images1.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: esVisible1 ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                  }}      
                />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    width: '100vw',
                    height: '100vh',
                    left: '0',
                    top: '0',
                    backgroundImage: `url('images/image1.jpg')`,
                    backgroundSize: '',
                    backgroundPosition: 'center',
                    opacity: esVisible1 ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                  }}      
                />
                <div className="inset-0 flex items-center justify-center z-50">
                  {isMobile? (
                    <Image
                      src="LOGODULCINEA_CONSOMBRA.png?height=300&width=400"
                      alt="Imagen central"
                      width={400}
                      height={450}
                      className="rounded-lg z-10"
                  
                    />
                  ): (
                    <Image
                      src="LOGODULCINEA_CONSOMBRA.png?height=300&width=400"
                      alt="Imagen central"
                      width={400}
                      height={450}
                      className="rounded-lg z-10"
                  
                    />
                  )}
                </div>
              </div>
              <div>
              <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{
                    backgroundImage: `url('/images1.jpg')`,
                    opacity: esVisible1 || isMobile ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                  }}
                />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    width: '100vw',
                    height: '100vh',
                    left: '0',
                    top: '0',
                    backgroundImage: `url('images1.jpg')`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    opacity: esVisible1 ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                  }}      
                />
                <div
                  className="absolute inset-0 flex items-center justify-center"
                  style={{
                    width: '100vw',
                    height: '100vh',
                    left: '0',
                    top: '0',
                    backgroundImage: `url('images/image1.jpg')`,
                    backgroundSize: '',
                    backgroundPosition: 'center',
                    opacity: esVisible1 ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                  }}      
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  {isMobile? (
                    <Image
                      src="LOGODULCINEA_CONSOMBRA.png?height=300&width=400"
                      alt="Imagen central"
                      width={400}
                      height={450}
                      className="rounded-lg z-10"
                  
                    />
                  ): (
                    <Image
                      src="LOGODULCINEA_CONSOMBRA.png?height=300&width=400"
                      alt="Imagen central"
                      width={400}
                      height={450}
                      className="rounded-lg z-10"
                  
                    />
                  )}
                </div>
              </div>
              {}
            </div>
          </div>
        </Link>
      </div>
    )
}

export default PagePrincipal;