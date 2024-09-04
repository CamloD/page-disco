"use client";
import React from 'react';
import { motion, useInView, useScroll } from 'framer-motion';
import styles from "@/app/Styles/ParallaxVideo.css"



const translate = document.querySelectorAll(".translate");
const big_title = document.querySelector(".big-title");
const header = document.querySelector("header");
const shadow = document.querySelector(".shadow");
const content = document.querySelector(".content");
const section = document.querySelector("section");
const image_container = document.querySelector(".imgContainer");
const opacity = document.querySelectorAll(".opacity");
const border = document.querySelector(".border");

let header_height = header.offsetHeight;
let section_height = section.offsetHeight;


const ScrollVideo = () => {
  const { scrollY } = useScroll();
  const videoRef = React.createRef();

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
          y={scrollY * 0.5}
          transition={{ duration: 0.5 }}
        ></motion.video>
      </div>
      <style>
        {`
          .video-container1 {
            position: relative;
            height: 100vh;
            overflow: hidden;
          }

          .video-background1 {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          .video-background1 video {
            object-fit: cover;
            width: 100%;
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
          }
        `}
      </style>
    </div>
  );
};

export default ScrollVideo;