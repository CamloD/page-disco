"use client";
import React, { useEffect, useRef, useState } from 'react';
import styles from "@/app/Styles/ParallaxVideo.css";
import Link from "next/link"

const Presentacion = () => {
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
      <div ref={videoWrapperRef} className='video-background1'>
        <div  className={styles.videoWrapper1}>
          <video
            className={styles.backgroundVideo1}
            autoPlay
            muted
            loop
            style={{ transform: `translateY(${isInView ? scrollY * 0.9 : 0}px)` }}
          >
            <source src="video/video_banner_2.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Optional: Display the scroll offset for debugging or informational purposes */}
          <div className={styles.offsetInfo}>
            <p>Scroll Y - Top Offset: {scrollY}px</p>
          </div>
        </div>
      </div>
  )
}

export default Presentacion