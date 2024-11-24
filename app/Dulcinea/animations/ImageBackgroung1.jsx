/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from 'react';

const ImageBackground1 = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const [currentBackgroundIndex, setCurrentBackgroundIndex] = useState(0);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);

  const backgrounds = [
    //"linear-gradient(to right, #000000 0%, #737373 100%)",
    //"url('images1.jpg')",
    "url('/images/image1.jpg')",
    "url('/images/image2.jpg')",
    "url('/images/image3.jpg')",
    "url('/images/image4.jpg')",
    "url('/images/image5.jpg')",
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
      style={{
        background: "linear-gradient(to right, #000000 0%, #737373 100%)",
        minHeight: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        paddingTop: "15vh"
      }}
    >
      {backgrounds.map((bg, index) => (
        <div
          key={index}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: bg,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            transition: "opacity 1s ease-in-out",
            opacity: index === currentBackgroundIndex ? 1 : 0,
          }}
        />
      ))}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          transform: `translateY(${isInView ? Math.min(scrollY * 0.2, window.innerHeight * 0.2) : 0}px)`,
          transition: "transform 0.01s"
        }}
      >
        <img
          src="LOGODULCINEA_CONSOMBRA.png"
          alt="Dulcinea Logo"
          style={{
            width: "auto",
            height: "auto",
            maxWidth: "410px",
            maxHeight: "500px"
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: '20px',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 2
        }}
      >
        {backgrounds.map((_, index) => (
          <button
            key={index}
            style={{
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              backgroundColor: index === currentBackgroundIndex ? 'white' : 'rgba(255, 255, 255, 0.5)',
              margin: '0 5px',
              border: 'none',
              cursor: 'pointer'
            }}
            onClick={() => changeBackground(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageBackground1;
