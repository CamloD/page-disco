import React, { useEffect, useRef, useState } from 'react';
import styles from "@/app/Styles/ParallaxVideo.css";
import {Imagen, Videos} from "app/components/mostrarmedios"
import ReactPlayer from 'react-player';

export const Vestimenta_Code = () => {
  
  
    return (
      <div className='w-[100wh] bg-transparent'>
        <div className="max-w-full">
          <div className='flex flex-col md:flex-row h-full'>
            
            <div className='flex-1 h-full flex justify-center items-center '>
              <Videos
                autoPlay
                muted
                loop
                width={300}
                height={500}
                src="video/video1.mp4"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className='flex-1 h-full flex justify-center items-center'>
              <Videos
                autoPlay
                muted
                loop
                width={300}
                height={500}
                src="video/video2.mp4"
                className="w-full h-auto object-cover"
              />
            </div>
            <div className='flex-1 h-full flex justify-center items-center'>
              <Videos
                autoPlay
                muted
                loop
                width={300}
                height={500}
                src="video/video3.mp4"
                className="w-full h-auto object-cover"
              />
            </div>
            
          </div>
          {/*<div className='flex flex-col md:flex-row h-screen w-screen '>
            <Videos
            autoPlay
            muted
            loop
            width={300}
            height={500}
            src="video/video4.mp4"
            className="w-full h-auto object-cover"
            />
          </div>*/}
        </div>
      </div>
    )
}
