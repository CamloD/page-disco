'use client'

import { useState, useRef, useEffect } from 'react'
import Image from 'next/image'
import { Play, Search, Image as ImageIcon } from 'lucide-react'
import { Lightbox } from './lightbox'

const mediaItems = [
  { id: 1, src: 'https://picsum.photos/1200/800?random=1', type: 'image', alt: "Image 1" },
  { id: 2, src: 'https://picsum.photos/600/800?random=2', type: 'image', alt: "Image 2" },
  { id: 3, src: 'https://videos.pexels.com/video-files/5862131/5862131-hd_1920_1080_24fps.mp4', type: 'video', alt: "Video 1" },
  { id: 4, src: 'https://picsum.photos/1200/800?random=3', type: 'image', alt: "Image 3" },
  { id: 5, src: 'https://videos.pexels.com/video-files/3940071/3940071-uhd_2560_1440_30fps.mp4', type: 'video', alt: "Video 2" },
  { id: 6, src: 'https://picsum.photos/1200/800?random=4', type: 'image', alt: "Image 4" },
  { id: 7, src: 'https://picsum.photos/600/800?random=5', type: 'image', alt: "Image 5" },
  { id: 8, src: 'https://picsum.photos/1200/800?random=6', type: 'image', alt: "Image 6" },
  { id: 9, src: 'https://videos.pexels.com/video-files/27034803/12052488_2560_1440_30fps.mp4', type: 'video', alt: "Video 3" },
  { id: 10, src: 'https://picsum.photos/1200/800?random=7', type: 'image', alt: "Image 7" },
  { id: 11, src: 'https://picsum.photos/600/800?random=8', type: 'image', alt: "Image 8" },
  { id: 12, src: 'https://picsum.photos/1200/800?random=9', type: 'image', alt: "Image 9" },
  { id: 13, src: 'video/video.mp4', type:  'video', alt: "Video 4" },
  { id: 14, src: 'images/image3.jpg', type: 'image', alt: "Image 10" },
  { id: 1, src: 'https://picsum.photos/1200/800?random=1', type: 'image', alt: "Image 1" },
  { id: 2, src: 'https://picsum.photos/600/800?random=2', type: 'image', alt: "Image 2" },
  { id: 3, src: 'https://videos.pexels.com/video-files/5862131/5862131-hd_1920_1080_24fps.mp4', type: 'video', alt: "Video 1" },
  { id: 4, src: 'https://picsum.photos/1200/800?random=3', type: 'image', alt: "Image 3" },
  { id: 5, src: 'https://videos.pexels.com/video-files/3940071/3940071-uhd_2560_1440_30fps.mp4', type: 'video', alt: "Video 2" },
  { id: 6, src: 'https://picsum.photos/1200/800?random=4', type: 'image', alt: "Image 4" },
  { id: 7, src: 'https://picsum.photos/600/800?random=5', type: 'image', alt: "Image 5" },
  { id: 8, src: 'https://picsum.photos/1200/800?random=6', type: 'image', alt: "Image 6" },
  { id: 9, src: 'https://videos.pexels.com/video-files/27034803/12052488_2560_1440_30fps.mp4', type: 'video', alt: "Video 3" },
  { id: 10, src: 'https://picsum.photos/1200/800?random=7', type: 'image', alt: "Image 7" },
  { id: 11, src: 'https://picsum.photos/600/800?random=8', type: 'image', alt: "Image 8" },
  { id: 12, src: 'https://picsum.photos/1200/800?random=9', type: 'image', alt: "Image 9" },
  { id: 13, src: 'video/video.mp4', type:  'video', alt: "Video 4" },
  { id: 14, src: 'images/image3.jpg', type: 'image', alt: "Image 10" },

]

function VideoThumbnail({ src, alt }) {
  const videoRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    if (isHovered && videoRef.current && !hasError) {
      videoRef.current.play().catch(error => {
        console.error('Error playing video:', error)
        setHasError(true) // Marca un error si no se puede reproducir el video
      });
    } else if (videoRef.current) {
      videoRef.current.pause()
      videoRef.current.currentTime = 0
    }
  }, [isHovered, hasError])

  return (
    <div 
      className="relative w-full h-full bg-gray-200"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <video
        ref={videoRef}
        src={src}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        aria-label={alt}
      />
      {!isHovered && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <Play className="w-12 h-12 text-white" />
        </div>
      )}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-500 bg-opacity-50">
          <p className="text-white">Error al cargar el video</p>
        </div>
      )}
    </div>
  )
}

export function ImageGrid() {
  const [selectedIndex, setSelectedIndex] = useState(-1)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {mediaItems.map((item, index) => (
          <div
            key={item.id}
            className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
            onClick={() => setSelectedIndex(index)}
          >
            {item.type === 'image' ? (
              <Image
                src={item.src}
                alt={item.alt}
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
            ) : (
              <VideoThumbnail src={item.src} alt={item.alt} />
            )}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-opacity duration-300 flex items-center justify-center">
              {item.type === 'image' ? (
                <Search className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              ) : (
                <Play className="w-12 h-12 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              )}
            </div>
            <div className="absolute top-2 left-2 bg-black bg-opacity-50 rounded-full p-1">
              {item.type === 'image' ? (
                <ImageIcon className="w-4 h-4 text-white" />
              ) : (
                <Play className="w-4 h-4 text-white" />
              )}
            </div>
          </div>
        ))}
      </div>
      {selectedIndex >= 0 && (
        <Lightbox
          mediaItems={mediaItems}
          selectedId={selectedIndex}
          onClose={() => setSelectedIndex(-1)}
          onNavigate={setSelectedIndex}
        />
      )}
    </div>
  )
}