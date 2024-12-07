/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import MobileNav from './MobileNav';
import Nav from './Nav';
import {Imagen, Videos} from "app/components/mostrarmedios"
import {useSeleccionContext } from 'app/components/images_gallery/hooks/useSeleccion'


const Header = () => {
  
  const [visible, setVisible] = useState(true);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollAccumulator, setScrollAccumulator] = useState(0);
  const headerRef = useRef(null)
  const lastScrollY = useRef(0)

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


  const initialColor = 'rgba(26, 26, 26, 0)';
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
  

  return (
    <>      
      <header 
        className={`fixed top-0 left-0 w-full text-white ${isScrolled ? 'shadow-xl' : 'shadow-sm'}`}
        ref={headerRef} 
        style={headerStyle}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center">
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
          <Nav />
        </div>
      </header>
      {/* Mobile nav */}
      <div className="md:hidden">
        <MobileNav visible = {esvisible}/>
      </div>
    </>
  );
};

export default Header;