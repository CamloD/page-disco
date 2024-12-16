/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @next/next/no-img-element */
"use client"; 

import React, { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronUp } from 'lucide-react';
import ImageBackgroung1 from "./components/sections/ImageBackgroung1";
import { ProximosEventos } from "app/Dulcinea/components/sections/comingevents";
import { Vestimenta_Code } from "./components/sections/vestimenta_code";
import { ImageGrid } from "app/components/images_gallery/imagesgrid";
import Preguntas from "app/Dulcinea/components/sections/preguntas";

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


const Page = () => {
  const [deviceType, setDeviceType] = useState('desktop');
  const [isLoading, setIsLoading] = useState(true);
  const homeRef = useRef(null);
  const [showFloatingButton, setShowFloatingButton] = useState(false);
  const pathname = usePathname();
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

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

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 199) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleLoad = () => {
      setIsLoading(false);
    };

    if (document.readyState === 'complete') {
      handleLoad();
    } else {
      window.addEventListener('load', handleLoad);
      return () => window.removeEventListener('load', handleLoad);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && window.location.hash) {
      const id = window.location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 180;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "auto"
        });
      }
    }
  }, [isLoading, pathname]);

  const isMobile = deviceType === 'mobile';
  const isTablet = deviceType === 'tablet';
  const isDesktop = deviceType === 'desktop';

  return (
    <div className={`bg-[#1a1a1a] max-w-[100wh] relative ${isLoading ? '' : 'opacity-100 transition-opacity duration-300'}`}>
      <BackgroundFigure isMobile={isMobile} isTablet={isTablet} />
      <main className="flex-1 relative z-0">
        <section id="home" ref={homeRef} className="bg-transparent relative h-screen overflow-hidden">
          <ImageBackgroung1 />
        </section>

        <section id="vestimentacode" className="min-h-[1200px]">
          <Vestimenta_Code />
        </section>

        <section className="bg-transparent py-12 md:py-8 lg:py-12 min-h-[930px]">
          <ProximosEventos isMobile={isMobile} isTablet={isTablet} isDesktop={isDesktop} />
        </section>

        <section id="gallery" className="py-12 bg-transparent text-white">
          <div className="container mx-auto min-h-[820px]">
            <h2 className="text-5xl font-bold mb-6">Gallery</h2>    
            <main className="relative">
              <ImageGrid />
            </main>
          </div>
        </section>

        <section className="min-h-[480px]">
          <Preguntas />
        </section>
      </main>
      <div
        className={`fixed bottom-6 right-4 z-50 transform transition-all duration-500 ease-in-out ${
          showFloatingButton
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-16 pointer-events-none"
        }`}
      >
        <div className="flex space-x-2">
        <Button
            size="lg"
            className="bg-blue-600 hover:bg-blue-700 text-white rounded-[19px] shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2 px-4 py-3"
            onClick={scrollToTop}
          >
            <ChevronUp  className='h-6 w-6'/>
          </Button>
          <Link href="/Dulcinea/reserve">
            <Button
              size="lg"
              className="bg-rose-600 hover:bg-rose-700 text-white rounded-full shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2 px-6 py-3"
            >
              <Calendar className="w-5 h-5" />
              <span>Reservar</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Page;