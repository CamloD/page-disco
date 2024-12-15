"use client"

import Link from 'next/link'
import { useEffect, useLayoutEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Imagen } from './components/mostrarmedios'

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

const BackgroundImage = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Nuevo estado de carga
  
    useLayoutEffect(() => {
      const checkScreenSize = () => {
        if (window.innerWidth <= 768) {
          setIsMobile(true);
        } else {
          setIsMobile(false);
        }
      };
  
      checkScreenSize(); // Realizamos el cálculo inmediatamente
      setIsLoading(false); // Establecemos isLoading a false después de hacer el cálculo
  
      window.addEventListener('resize', checkScreenSize);
  
      return () => {
        window.removeEventListener('resize', checkScreenSize);
      };
    }, []); // Solo se ejecuta cuando el componente se monta
  
    if (isLoading) {
      return null; // Mientras cargamos, no renderizamos nada (para evitar parpadeos)
    }
  
    return (
      <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
        {isMobile ? (
          <div
            className={`text-[40vw] font-bold text-gray-200 opacity-5 select-none`}
            style={{
              transform: 'rotate(-46.60deg) scale(1)',
              width: '600vw',
              height: '800vh',
              left: '0%',
              top: '0%',
              transform: 'rotate(-46.60deg) scale(2) translate(0%, 20%)',
              backgroundImage: 'url("/LOGODULCINEA_CONSOMBRA.png")',
              backgroundRepeat: 'repeat',
              backgroundSize: '150px 150px',
              backgroundPosition: 'center',
              transition: 'opacity 0.5s ease-in-out',
            }}
          ></div>
        ) : (
          <div className="text-[40vw] font-bold text-gray-200 opacity-5 select-none">
            <Imagen
              src="LOGODULCINEA_CONSOMBRA.png"
              alt="Logo"
              width={900}
              height={600}
              loading="eager"
            />
          </div>
        )}
      </div>
    );
  }
  

export default function NotFound() {
  const [deviceType, setDeviceType] = useState('desktop');

  useEffect(() => {
    document.body.style.backgroundColor = '#f3f4f6';

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

    return () => {
      window.removeEventListener('resize', checkDeviceType);
      document.body.style.backgroundColor = '';
    };
  }, []);

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 relative overflow-hidden">
      <BackgroundFigure isMobile={isMobile} isTablet={isTablet} />
      <BackgroundImage isMobile={isMobile} />
      <div className="text-center relative z-10">
        <motion.h1
          className="text-8xl font-extrabold text-white mb-4 tracking-tighter"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            textShadow: '0 4px 8px rgba(0,0,0,0.3)', // Sombra de texto más fuerte
            background: 'linear-gradient(to right, #ffffff, #e0e0e0)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          404
        </motion.h1>

        <motion.p
          className="text-2xl text-gray-300 mb-8 font-light"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Oops! Parece que te has perdido.
        </motion.p>

        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <Link
            href="/Dulcinea"
            className="inline-block bg-gradient-to-r from-rose-600 to-rose-800 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:bg-rose-700"
            style={{
              boxShadow: '0 4px 10px rgba(0, 0, 0, 0.15)',
            }}
          >
            Volver a la página principal
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
