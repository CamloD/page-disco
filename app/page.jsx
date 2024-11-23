
"use client"

import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'



const PagePrincipal = () => {
    const [esVisible, PonerVisible] = useState(false)
    const [isMobile, setIsMobile] = useState(false)


    useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)
    return () => window.removeEventListener('resize', checkIfMobile)
  }, [])
    
    return (
        <div className="dark">
        <Link href="/Dulcinea" passHref>
        <div 
          className="relative w-screen h-screen overflow-hidden bg-gray-900 cursor-pointer"
          onMouseEnter={() => !isMobile && PonerVisible(true)}
          onMouseLeave={() => !isMobile && PonerVisible(false)}
          role="img"
          aria-label={esVisible || isMobile ? "Imagen de fondo" : "Patrón de puntos de fondo"}
        >
            <div 
            className="absolute inset-0 flex items-center justify-center"
            style={{
                transform: 'rotate(-45deg) scale(2)',
                width: '200vw',
                height: '200vh',
                left: '-50%',
                top: '-50%',
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='12' height='12' viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='2' fill='%230a5770' fill-opacity='0.4'/%3E%3C/svg%3E")`,
                backgroundSize: '5px 5px',
                backgroundPosition: 'center',
                backgroundRepeat: 'repeat',
                opacity: esVisible ? 0 : 1,
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
                    opacity: esVisible ? 1 : 0,
                    transition: 'opacity 0.5s ease-in-out',
                }}
                    
            />
            <div className="absolute inset-0 flex items-center justify-center">
                <Image
                src="LOGODULCINEA_CONSOMBRA.png?height=300&width=400"
                alt="Imagen central"
                width={400}
                height={450}
                className="rounded-lg shadow-xl z-10"
                />
            </div>
        </div>
      </Link>
    </div>
    )
}

export default PagePrincipal;