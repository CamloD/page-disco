/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import MobileNav from './MobileNav';
import Nav from './Nav';
import {Imagen, Videos} from "app/components/mostrarmedios"
import {useSeleccionContext } from 'app/components/images_gallery/hooks/useSeleccion'
import { Button } from "@/components/ui/button"
import { AlignJustify, Calendar } from 'lucide-react'


const Header = () => {
  
  const [visible, setVisible] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollAccumulator, setScrollAccumulator] = useState(0);
  const headerRef = useRef(null)
  const lastScrollY = useRef(0)
  const [isOpen, setIsOpen] = useState(false);
  const [isClosed, setIClosed] = useState(null);

  const { selectedIndex } = useSeleccionContext();
  const openimage = selectedIndex >= 0

  const SCROLL_THRESHOLD = 70

  useEffect(() => {
    if (headerRef.current) {
      setHeaderHeight(headerRef.current.offsetHeight);
    }
  }, []);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    
    setIsScrolled(currentScrollY > headerHeight);

    const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';

    if (scrollDirection === 'up') {
      setVisible(true);
      setScrollAccumulator(0);
    } else {
      setScrollAccumulator(prev => prev + (currentScrollY - lastScrollY.current));

      if (scrollAccumulator > SCROLL_THRESHOLD) {
        setVisible(false);
        setScrollAccumulator(0);
      }
    }

    lastScrollY.current = currentScrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);


  const initialColor = 'rgba(26, 26, 26, 0.40)';
  const scrolledColor = 'rgba(29, 38, 56, 0.999)';
  const headerStyle = {
    transform: `translateY(${visible? openimage? '-100%' : '0' : '-100%'})`,
    transition: 'transform 0.8s ease, background-color 0.4s ease',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    zIndex: 2,
    backgroundColor: isScrolled ? scrolledColor : initialColor,
  };

  const esvisible = visible? openimage? false : true : false

  const toggleSidebar = () => {
    setIsOpen(prevState => !prevState);
  };
  const buttonVisible = isOpen
  const buttonClosed = 0
  

  return (
    <>      
      <header 
        className={`fixed top-0 left-0 w-full text-white ${isScrolled ? 'shadow-xl' : 'shadow-sm'}`}
        ref={headerRef} 
        style={headerStyle}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center mr-[25px]">
            <Link href="/Dulcinea" passHref>
              <div className="flex items-center justify-center space-x-2">
                <Imagen
                  src="logo.png"
                  alt="Logo" width={65} height={56} className='-mt-1.5 hidden md:block' loading="eager"/>
                <Imagen
                  src="letras_logo.png"
                  alt="Dulcinea Letras Logo" width={224} height={40} className='-mt-2.5 hidden md:block' loading="eager"
                  /> 
                <Imagen
                  src="LOGODULCINEA_CONSOMBRA.png"
                  alt="Logo" width={115} height={15} className='-mt-2.5 block md:hidden' loading="eager"/>
              </div>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            <Nav />
          </div>
          <div className="hidden md:block ml-[25px]">
            <Link href="/Dulcinea/reserve">
              <Button 
                size="sm" 
                className="bg-rose-600 hover:bg-rose-700 text-white rounded-[8px] shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2 px-4 py-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Reservar</span>
                </Button>
            </Link>
          </div>

          

          <div className='flex flex-row p-1 absolute right-6 space-x-3 items-center'>
            <div className=" md:hidden ml-[25px]">
              <Link href="/Dulcinea/reserve">
                <Button 
                  size="sm" 
                  className="bg-rose-600 hover:bg-rose-700 text-white rounded-[8px] shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2 px-4 py-2"
                >
                  <Calendar className="w-5 h-5" />
                  <span className='text-[13px]'>Reservar</span>
                  </Button>
              </Link>
            </div>
            <div>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden p-2 w-11 h-11 "
              onClick={toggleSidebar}
            >
              <AlignJustify className="w-7 h-7 text-white" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </div>
          </div>
          
        </div>
      </header>
      {/* Mobile nav */}
      <div className="md:hidden">
        <MobileNav isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
    </>
  );
};

export default Header;

