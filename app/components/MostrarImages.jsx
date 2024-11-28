import React from 'react'
import Image from 'next/image'

const MostrarImages = ({Image_src, Image_alt, Image_width, Image_height, className}) => {
    const width_default = 200
    const height_default = 300
    const Image_class = className
    return (
        <>
           <Image src="logo.png" alt="Logo" width={65} height={56} className='-mt-1.5'/>
           <Image src="letras_logo.png" alt="Dulcinea Letras Logo" width={224} height={40} className='-mt-2.5' />
        </>
    )
}

export default MostrarImages