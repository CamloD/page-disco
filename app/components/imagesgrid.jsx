'use client'
import Image from 'next/image'

const mediaItems = [
  { src: 'logo.png', alt: 'Logo', width: 65, height: 56, className: '-mt-1.5' },
  { src: 'letras_logo.png', alt: 'Dulcinea Letras Logo', width: 224, height: 60, className: '-mt-2.5' },
]

export function Images_Header() {
  return (
    <div className="flex items-center justify-center space-x-2">
      {mediaItems.map((item, index) => (
        <Image
          key={index}
          src={item.src}
          alt={item.alt}
          width={item.width}
          height={item.height}
          className={item.className}
        />
      ))}
    </div>
  )
}
