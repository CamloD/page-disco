'use client'


import Image from 'next/image'
import { motion } from 'framer-motion'

const mediaItems = [
  'images/image1.jpg',
  'images/image2.jpg',
  'images/image3.jpg',
  'images/image4.jpg',
  'images/image5.jpg',
]

export function ImageGrid() {

  return (
    <div className="max-w-7xl mx-auto px-2 sm:px-3 lg:px-4 py-2">
      
        {mediaItems.map((src, index) => (
          <motion.div
            key={index}
             
          >
            <Image
              src={src}
              alt={`Image ${index + 1}`}
              width={200}
              height={200}
            />
          </motion.div>
        ))}
      
    </div>
  )
}
