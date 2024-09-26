'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Lightbox } from './lightbox'

const images = [

  { id: 1, src: 'https://picsum.photos/1200/800?random=1', alt: 'Image 1' },
  { id: 2, src: 'https://picsum.photos/600/800?random=2', alt: 'Image 2' },
  { id: 3, src: 'https://picsum.photos/600/800?random=3', alt: 'Image 3' },
  { id: 4, src: 'https://picsum.photos/600/800?random=4', alt: 'Image 4' },
  { id: 5, src: 'https://picsum.photos/600/800?random=5', alt: 'Image 5' },
  { id: 6, src: 'https://picsum.photos/1200/800?random=6', alt: 'Image 6' },
  { id: 7, src: 'https://picsum.photos/600/800?random=7', alt: 'Image 7' },
  { id: 8, src: 'https://picsum.photos/600/800?random=8', alt: 'Image 8' },
  { id: 9, src: 'https://picsum.photos/600/800?random=9', alt: 'Image 9' },
  { id: 10, src: 'https://picsum.photos/1200/800?random=10', alt: 'Image 10' },
  { id: 11, src: 'https://picsum.photos/1200/800?random=11', alt: 'Image 11' },
  { id: 12, src: 'https://picsum.photos/600/800?random=12', alt: 'Image 12' },
  { id: 13, src: 'https://picsum.photos/1200/800?random=13', alt: 'Image 13' },
  { id: 14, src: 'https://picsum.photos/1200/800?random=14', alt: 'Image 14' },
  { id: 15, src: 'https://picsum.photos/1200/800?random=15', alt: 'Image 15' },
  { id: 16, src: 'https://picsum.photos/1200/800?random=16', alt: 'Image 16' },
  { id: 17, src: "images/image3.jpg", type: "image",date: "2023-09-10", alt: 'Image 17'  },
]


export function ImageGrid() {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((image) => (
          <div
            key={image.id}
            className="aspect-square overflow-hidden rounded-lg cursor-pointer"
            onClick={() => setSelectedImage(image.id)}
          >
            <Image
              src={image.src}
              alt={image.alt}
              width={300}
              height={300}
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
            />
          </div>
        ))}
      </div>
      {selectedImage && (
        <Lightbox
          images={images}
          selectedId={selectedImage}
          onClose={() => setSelectedImage(null)}
          onNavigate={setSelectedImage}
        />
      )}
    </div>
  )
}