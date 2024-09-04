"use client";
import React, { useEffect, useRef  } from 'react';
import { motion, useInView, useScroll } from 'framer-motion';
import styles from "@/app/Styles/ParallaxVideo.css"


const ScrollVideo = () => {
  const { scrollY } = useScroll();
  const videoRef = useRef(null);
  const bigTitleRef = useRef(null);
  const headerRef = useRef(null);
  const shadowRef = useRef(null);
  const contentRef = useRef(null);
  const imageContainerRef = useRef(null);
  const borderRef = useRef(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bigTitleRef.current || !headerRef.current || !shadowRef.current || !contentRef.current || !imageContainerRef.current || !borderRef.current || !sectionRef.current) {
        return;
      }

      const scroll = window.pageYOffset;
      const sectionY = sectionRef.current.getBoundingClientRect();
      const headerHeight = headerRef.current.offsetHeight;
      const sectionHeight = sectionRef.current.offsetHeight;

      document.querySelectorAll('.translate').forEach(element => {
        const speed = element.dataset.speed;
        element.style.transform = `translateY(${scroll * speed}px)`;
      });

      document.querySelectorAll('.opacity').forEach(element => {
        element.style.opacity = scroll / (sectionY.top + sectionHeight);
      });

      bigTitleRef.current.style.opacity = -scroll / (headerHeight / 2) + 1;
      shadowRef.current.style.height = `${scroll * 0.5 + 300}px`;

      contentRef.current.style.transform = `translateY(${scroll / (sectionHeight + sectionY.top) * 50 - 50}px)`;
      imageContainerRef.current.style.transform = `translateY(${scroll / (sectionHeight + sectionY.top) * -50 + 50}px)`;

      borderRef.current.style.width = `${scroll / (sectionY.top + sectionHeight) * 30}%`;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="video-container1">
      <div className="video-background1" ref={videoRef}>
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
          }}
          animate={{ y: scrollY.current * 0.5 }}
          transition={{ duration: 0.5 }}
        />
      </div>

      
    </div>
  );
};

export default ScrollVideo;
