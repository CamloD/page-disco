"use client"

import React, { useEffect, useRef, useState } from 'react';
import styles from "@/app/Styles/ParallaxVideo.css";

const VideoBackground = () => {
    const [scrollY, setScrollY] = useState(0);
    const [isInView, setIsInView] = useState(false);
    const videoWrapperRef = useRef(null);
  
    useEffect(() => {
      const handleScroll = () => {
        if (videoWrapperRef.current) {
          const rect = videoWrapperRef.current.getBoundingClientRect();
          const isInView = rect.top < window.innerHeight && rect.bottom > 0;
          setIsInView(isInView);
  
          if (isInView) {
            const scrollPosition = Math.max(0, window.pageYOffset - window.innerHeight);
            setScrollY(scrollPosition);
          }
        }
      };
  
      window.addEventListener('scroll', handleScroll);
      handleScroll();
      return () => window.removeEventListener('scroll', handleScroll);
    }, []);
  
    return (
      <div ref={videoWrapperRef} className='video-background1'>
        <div className={styles.videoWrapper1}>  
          <video
            className={`${styles.backgroundVideo1}`}
            autoPlay
            muted
            loop
            style={{ 
              transform: `translateY(${isInView ? Math.min(scrollY * 0.2, window.innerHeight * 0.2) : 0}px)`,
              transition: "transform 0.01s"
            }}
          >
            <source src="/video/video_banner_2.mp4" type="video/mp4" />
          </video>
        </div>
      </div>
    )
}

export default VideoBackground