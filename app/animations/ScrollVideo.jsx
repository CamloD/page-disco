"use client";
import React, { useEffect, useState } from 'react';
import { motion, useInView, useScroll } from 'framer-motion';
import styles from "@/app/Styles/ParallaxVideo.css"


const ScrollVideo = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="video-container1" style={{ position: 'relative' }}>
      <div className="">
      <motion.video
  src="video.mp4"
  autoPlay
  loop
  muted
  playsInline
  style={{
    objectFit: 'cover',
    width: '100%',
    height: '100vh',
    position: 'absolute',
    top: 0,
    left: 0,
    transform: `translateY(${scrollY * 0.5}px)`, // Actualizado para que el video se mueva según la posición del scroll
  }}
  transition={{ duration: 0.5 }}
></motion.video>
      </div>
    </div>
  );
};

export default ScrollVideo;