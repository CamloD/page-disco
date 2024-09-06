/* eslint-disable react-hooks/exhaustive-deps */
"use client"; 

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Nav from './Nav';
import MobileNav from './MobileNav';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [headerShadow, setHeaderShadow] = useState('shadow-sm');
  const headerRef = useRef(null);

  const updateHeaderHeight = () => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      setHeaderHeight(height);
      //console.log('Altura del header (offsetHeight):', height);
      //console.log('Posición del scroll:', window.scrollY); 
    }
  };

  const handleScroll = () => {
    {/* en caso de ponerlo con referencia al tamaño del objeto
      setIsScrolled(window.scrollY > headerHeight);*/}
      const scrollTop = window.scrollY;
      setIsScrolled(window.scrollY > headerHeight - 30);
      setHeaderShadow(scrollTop > headerHeight - 30 ? 'shadow-xl' : 'shadow-sm');
      //console.log('Posición del scroll:', window.scrollY); 
  };

  useEffect(() => {
    

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', () => {
      updateHeaderHeight();
      handleScroll();
    }); 
    updateHeaderHeight(); 
     handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', () => {
        updateHeaderHeight();
        handleScroll();
      });
    };
  }, [handleScroll, headerHeight]);

  const initialColor = 'rgba(26, 26, 26, 0)'; 
  const scrolledColor = 'rgba(26, 26, 26, 0.97)';

  const headerStyle = {
    backgroundColor: isScrolled ? scrolledColor : initialColor,
    transition: 'background-color 0.3s ease',
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%', 
    zIndex: 2
  };
  return (
    <header 
      className={`fixed top-0 left-0 w-full text-white ${headerShadow}`} 
      ref={headerRef} 
      style={headerStyle}
      >
        <div className="container mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center">
            <Link href="/" className="flex items-center justify-center space-x-2" prefetch={false}>
            <Music2Icon className="h-6 w-6" />
              <h1 className="text-2xl font-bold uppercase">Discoteca</h1>
            </Link>
          </div>
          <Nav>
          </Nav>
          {/* Mobile nav */}
            <div className="md:hidden">
                <MobileNav />
            </div>
        </div>
      </header>
    
  )
}
function Music2Icon(props) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="8" cy="18" r="4" />
        <path d="M12 18V2l7 4" />
      </svg>
    )
  }
export default Header