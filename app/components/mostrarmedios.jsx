/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import Image from 'next/image'

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
    const width_default = 200;
    const height_default = 300;
    const images_dir = process.env.NODE_ENV === 'production' ? '/page-disco' : '';

    return (
        <>
            <Image
                src={`${images_dir}/${src}`}
                alt={alt || "Image"}
                width={width || width_default}
                height={height || height_default}
                className={className}
                layout={layout}
                priority={priority}
                objectFit={objectFit}
                objectPosition={objectPosition}
                quality={quality}
                placeholder={placeholder}
                blurDataURL={blurDataURL}
                loading={loading}
                onClick={onClick}
                style={style}
                id={id}
            />
        </>
    )
}


export function Videos ({
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
}) {
    const width_default = 200;
    const height_default = 300;
    const video_dir = process.env.NODE_ENV === 'production' ? '/page-disco' : '';

    const videoProps = {
        src: `${video_dir}/${src}`,
        width: width || width_default,
        height: height || height_default,
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
    };

    const filteredProps = Object.fromEntries(
        Object.entries(videoProps).filter(([key, value]) => value !== undefined && value !== false)
    );

    return (
        <video
            //src={filteredProps.src}
            width={filteredProps.width}
            height={filteredProps.height}
            className={filteredProps.className}
            style={filteredProps.style}
            autoPlay={filteredProps.autoPlay}
            loop={filteredProps.loop}
            muted={filteredProps.muted}
            controls={filteredProps.controls}
            poster={filteredProps.poster}
            preload={filteredProps.preload}
            playsInline={filteredProps.playsInline}
            crossOrigin={filteredProps.crossOrigin}
            onEnded={filteredProps.onEnded}
            onPlay={filteredProps.onPlay}
            onPause={filteredProps.onPause}
            onTimeUpdate={filteredProps.onTimeUpdate}
            typeof={filteredProps.type}
        >
            <source src={filteredProps.src} type={type || "video/mp4"} />
        </video>
    );
};
