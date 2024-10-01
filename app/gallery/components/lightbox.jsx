'use client'

import { useEffect } from 'react'
import { ChevronLeft, ChevronRight, X, Star, Download, Info } from 'lucide-react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'

export function Lightbox({ mediaItems, selectedId, onClose, onNavigate }) {
  const selectedItem = mediaItems[selectedId]

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  const handlePrevious = () => {
    const previousIndex = (selectedId - 1 + mediaItems.length) % mediaItems.length
    onNavigate(previousIndex)
  }

  const handleNext = () => {
    const nextIndex = (selectedId + 1) % mediaItems.length
    onNavigate(nextIndex)
  }

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = selectedItem.src
    link.download = `${selectedItem.alt || 'download'}.${selectedItem.type === 'video' ? 'mp4' : 'jpg'}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, selectedId])

  if (!selectedItem) return null

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black bg-opacity-90 flex flex-col z-50"
        onClick={onClose}
      >
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4">
          <button onClick={(e) => { e.stopPropagation(); onClose(); }} className="text-white hover:text-gray-300" aria-label="Close lightbox">
            <X size={24} />
          </button>
          <div className="flex space-x-4">
            <button className="text-white hover:text-gray-300" aria-label="Add to favorites">
              <Star size={24} />
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleDownload(); }} className="text-white hover:text-gray-300" aria-label="Download">
              <Download size={24} />
            </button>
            <button className="text-white hover:text-gray-300" aria-label="Info">
              <Info size={24} />
            </button>
          </div>
        </div>

        <div className="flex-grow flex items-center justify-center">
          <motion.div
            key={selectedId}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl max-h-full relative" // Aumentar el max-width
          >
            {selectedItem.type === 'image' ? (
              <Image
                src={selectedItem.src}
                alt={selectedItem.alt}
                width={1400} // Aumentar el ancho
                height={1000} // Aumentar la altura
                className="max-w-full max-h-[90vh] object-contain" // Ajustar max-height
                draggable={false}
              />
            ) : (
              <video
                src={selectedItem.src}
                controls
                className="max-w-full max-h-[90vh] object-contain"
                onClick={(e) => e.stopPropagation()}
              />
            )}
          </motion.div>
        </div>

        {/* Área de navegación izquierda */}
        <button
          onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
          aria-label="Previous image"
        >
          <ChevronLeft size={48} />
        </button>

        {/* Área de navegación derecha */}
        <button
          onClick={(e) => { e.stopPropagation(); handleNext(); }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
          aria-label="Next image"
        >
          <ChevronRight size={48} />
        </button>
      </motion.div>
    </AnimatePresence>
  )
}