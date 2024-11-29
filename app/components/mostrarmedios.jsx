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



