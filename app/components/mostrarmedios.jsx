/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import Image from 'next/image'

export const MostrarImages = ({
    Image_src,
    Image_alt,
    Image_width,
    Image_height,
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
    decorative = false,
    ...props
}) => {
    const width_default = 200;
    const height_default = 300;
    const images_dir = process.env.NODE_ENV === 'production' ? '/page-disco' : '';

    
    const imageProps = {
        src: `${images_dir}/${Image_src}`,
        alt: decorative ? "" : (Image_alt || "Image"),
        width: Image_width || width_default,
        height: Image_height || height_default,
        className: className,
        layout: layout || 'intrinsic',
        priority: priority || false,
        objectFit: objectFit || 'contain',
        objectPosition: objectPosition || 'center',
        quality: quality || 75,
        placeholder: placeholder || 'empty',
        blurDataURL: blurDataURL || undefined,
        loading: loading || 'lazy',
        onClick: onClick,
        style: style || {},
        id: id || undefined,
        ...props
    };

    return (
        <>
            <Image {...imageProps} />
        </>
    )
}


export const MostrarVideos = ({
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
    ...props
}) => {
    const width_default = 200;
    const height_default = 300;
    const video_dir = process.env.NODE_ENV === 'production' ? '/page-disco' : '';
    const video_style = style;

    
    const videoProps = {
        src: `${video_dir}/${src}`,
        width: width || width_default,
        height: height || height_default,
        className,
        style: video_style || {},
        autoPlay: autoPlay ? true : false,
        loop: loop ? true : false,
        muted: muted ? true : false,
        controls: controls ? true : false,
        poster: poster || undefined,
        preload: preload || undefined,
        playsInline: playsInline ? true : false,
        crossOrigin: crossOrigin || undefined,
        onEnded,
        onPlay,
        onPause,
        onTimeUpdate,
    };

    
    const filteredProps = Object.fromEntries(
        Object.entries(videoProps).filter(([key, value]) => value !== undefined && value !== false)
    );

    return (
        <video {...filteredProps} {...props} />
    );
}
