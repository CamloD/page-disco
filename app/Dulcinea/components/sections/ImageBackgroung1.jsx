/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import React, { useEffect, useRef, useState } from 'react';
import {Imagen} from "app/components/mostrarmedios"

const ImageBackground1 = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const images_dir = process.env.NODE_ENV === 'production' ? '/page-disco' : ''

  const backgrounds = [
    "images/image1.jpg",
    "images/image2.jpg",
    "images/image3.jpg",
    "images/image4.jpg",
    "images/image5.jpg",
  ];
  

  const startAutoChange = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    intervalRef.current = setInterval(() => {
      setCurrentBackgroundIndex(prevIndex => (prevIndex + 1) % backgrounds.length); 
    }, 6000);
  };

  useEffect(() => {
    startAutoChange();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []); 

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight && rect.bottom > 0;
        setIsInView(isInView);

        if (isInView) {
          const scrollPosition = window.pageYOffset;
          setScrollY(Math.max(0, scrollPosition));
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const changeBackground = (newIndex) => {
    setCurrentBackgroundIndex(newIndex);

    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    startAutoChange();
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full relative overflow-hidden flex justify-center items-start pt-[15vh]"
      style={{
        background: "linear-gradient(to right, #000000 0%, #737373 100%)",
      }}
    >
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          className="absolute inset-0 bg-cover bg-center transition-opacity duration-1000 ease-in-out"
          style={{
            backgroundImage: `url(${images_dir}/${bg})`,
            opacity: index === currentBackgroundIndex ? 1 : 0,
          }}
        />
      ))}
      <div
        className="absolute transition-transform duration-100 inset-0 flex justify-center items-center"
        style={{
          transform: `translateY(${isInView ? Math.min(scrollY * 0.2, window.innerHeight * 0.2) : 0}px)`,
        }}
      >
        <Imagen
          src="LOGODULCINEA_CONSOMBRA.png"
          alt="Dulcinea Logo"
          width={380}
          height={350}
          className=" max-y-[400px] max-h-[400px]"
        />
      </div>
      <div
        className="absolute bottom-5 flex justify-center items-center z-20"
      >
        {backgrounds.map((_, index) => (
          <button
            key={index}
            className="w-2.5 h-2.5 rounded-full mx-1 border-none cursor-pointer"
            style={{
              backgroundColor: index === currentBackgroundIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
            }}
            onClick={() => changeBackground(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageBackground1;

