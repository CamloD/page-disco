/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import Image from 'next/image'
import { useEffect, useState } from 'react';

export function Imagen ({
    src,
    alt,
    width,
    height,
    className,
    layout,
    priority,
    objectFit,
    objectPosition,
    quality,
    placeholder,
    blurDataURL,
    loading,
    onClick,
    style,
    id,

}) {
    const images_dir = process.env.NODE_ENV === 'production' ? '/page-disco' : '';
    const imageLoading = 'eager';
    

    return (
        <>
            <Image
                src={`${images_dir}/${src}`}
                alt={alt || "Image"}
                width={width}
                height={height}
                className={className}
                layout={layout}
                priority={priority}
                objectFit={objectFit}
                objectPosition={objectPosition}
                quality={quality}
                placeholder={placeholder}
                blurDataURL={blurDataURL}
                loading={loading || imageLoading}
                onClick={onClick}
                style={style}
                id={id}
                
            />
        </>
    )
}



export function Videos({
    src,
    width,
    height,
    className,
    style,
    autoPlay,
    loop,
    muted,
    controls,
    poster,
    preload,
    playsInline,
    crossOrigin,
    onEnded,
    onPlay,
    onPause,
    onTimeUpdate,
    type,
    alt,
  }) {
    const [isClient, setIsClient] = useState(false);
    const [videoSrc, setVideoSrc] = useState(null);
  
    useEffect(() => {
      setIsClient(true);
      const videoURL = `${process.env.NODE_ENV === 'production' ? '/page-disco' : ''}/${src}`;
      setVideoSrc(videoURL);
    }, [src]);
  
    if (!isClient || !videoSrc) {
      return null;
    }
  
    return (
      <video
        width={width || 200}
        height={height || 300}
        className={className}
        style={style}
        autoPlay={autoPlay}
        loop={loop}
        muted={muted}
        controls={controls}
        poster={poster}
        preload={preload}
        playsInline={playsInline}
        crossOrigin={crossOrigin}
        onEnded={onEnded}
        onPlay={onPlay}
        onPause={onPause}
        onTimeUpdate={onTimeUpdate}
        typeof={type}
        alt={alt}
      >
        <source src={videoSrc} type={type || "video/mp4"} />
      </video>
    );
  };

