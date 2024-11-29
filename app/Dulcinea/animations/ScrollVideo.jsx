"use client";
import React, { useEffect, useRef, useState } from 'react';
import styles from "@/app/Styles/ParallaxVideo.css";
import {Imagen, Videos} from "app/components/mostrarmedios"

const ScrollVideo = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const videoWrapperRef = useRef(null);

  const handleScroll = () => {
    if (videoWrapperRef.current) {
      const rect = videoWrapperRef.current.getBoundingClientRect();
      const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
      setIsInView(isInView);

      if (isInView) {
        const offsetTop = videoWrapperRef.current.offsetTop;
        setScrollY(window.scrollY - offsetTop);
      } else {
        setScrollY(0); // Optionally reset scrollY when out of view
      }
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    // Initial check in case the page is already scrolled
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  //console.log("offset", scrollY);
  
  return (
    <div ref={videoWrapperRef} className='video-container1 bg-[#1a1a1a]'>
      <div className='video-background1'>
        <div  className={styles.videoWrapper1}>
          <Videos
            src="video/video_banner.mp4"
            className={styles.backgroundVideo1}
            autoPlay
            muted
            loop
            style={{ transform: `translateY(${isInView ? scrollY * 0.5 : 0}px)` }}
            type="video/mp4"
          />
        </div>
      </div>
    </div>
  );
};

export default ScrollVideo;
