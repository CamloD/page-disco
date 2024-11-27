/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import MobileNav from './MobileNav';
import Nav from './Nav';
import { getAssetPath } from 'app/utils/aseetsUtils';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [headerHeight, setHeaderHeight] = useState(0);
  const [headerShadow, setHeaderShadow] = useState('shadow-sm');
  const headerRef = useRef(null);

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

  const updateHeaderHeight = () => {
    if (headerRef.current) {
      const height = headerRef.current.offsetHeight;
      setHeaderHeight(height);
    }
  };

  const handleScroll = () => {
    const scrollTop = window.scrollY;
    setIsScrolled(scrollTop > headerHeight - 30);
    setHeaderShadow(scrollTop > headerHeight - 30 ? 'shadow-xl' : 'shadow-sm');
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
  }, []);

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
          <Link href={`${basePath}/Dulcinea`} className="flex items-center justify-center space-x-2">
            <Image
              src={getAssetPath("logo.png")}
              alt="Dulcinea Logo"
              width={65}
              height={56}
              className='-mt-1.5'
            />
            <Image
              src={getAssetPath("letras_logo.png")}
              alt="Dulcinea Letras Logo"
              width={224}
              height={40}
              className='-mt-2.5'
            />
          </Link>
        </div>
        <Nav />
        {/* Mobile nav */}
        <div className="md:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  );
};

export default Header;

