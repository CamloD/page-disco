'use client'

import { useEffect, useState, useCallback, useRef } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, X, Star, Download, Info } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { getImageMetadata, getVideoMetadata } from './lib/mediaUtils'
import { useMediaQuery } from './hooks/useMediaQuery'

export function Lightbox({ mediaItems, selectedId, onClose, onNavigate }) {
  const [showInfo, setShowInfo] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(selectedId)
  const [direction, setDirection] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [dragStart, setDragStart] = useState(0)
  const [metadata, setMetadata] = useState(null)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const containerRef = useRef(null)

  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [])

  useEffect(() => {
    const fetchMetadata = async () => {
      const currentItem = mediaItems[currentIndex]
      if (currentItem.type === 'image') {
        const data = await getImageMetadata(currentItem.src)
        setMetadata(data)
      } else if (currentItem.type === 'video') {
        const data = await getVideoMetadata(currentItem.src)
        setMetadata(data)
      } else {
        setMetadata(null)
      }
    }
    fetchMetadata()
  }, [currentIndex, mediaItems])

  const handleDragStart = useCallback((e) => {
    if (isMobile) {
      setIsDragging(true)
      setDragStart(e.touches[0].clientX)
    }
  }, [isMobile])

  const handleDragEnd = useCallback((e) => {
    if (isMobile && isDragging) {
      setIsDragging(false)
      const dragEnd = e.changedTouches[0].clientX
      const dragDistance = dragEnd - dragStart
      if (Math.abs(dragDistance) > window.innerWidth / 4) {
        if (dragDistance > 0) {
          handlePrevious()
        } else {
          handleNext()
        }
      }
    }
  }, [isMobile, isDragging, dragStart])

  const handlePrevious = useCallback(() => {
    setDirection(-1)
    setCurrentIndex((prevIndex) => (prevIndex - 1 + mediaItems.length) % mediaItems.length)
  }, [mediaItems.length])

  const handleNext = useCallback(() => {
    setDirection(1)
    setCurrentIndex((prevIndex) => (prevIndex + 1) % mediaItems.length)
  }, [mediaItems.length])

  const handleClick = useCallback((e) => {
    const containerWidth = containerRef.current.offsetWidth
    const clickX = e.clientX
    if (clickX < containerWidth / 3) {
      handlePrevious()
    } else if (clickX > containerWidth * 2 / 3) {
      handleNext()
    }
  }, [handlePrevious, handleNext])

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault()
        onClose()
      } else if (e.key === 'ArrowLeft') {
        handlePrevious()
      } else if (e.key === 'ArrowRight') {
        handleNext()
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [onClose, handlePrevious, handleNext])

  useEffect(() => {
    onNavigate(currentIndex)
  }, [currentIndex, onNavigate])

  const currentItem = mediaItems[currentIndex]

  const renderMediaItem = (item, isActive = false) => {
    const scale = showInfo ? 0.87 : 0.95
    return item.type === 'image' ? (
      <Image
        src={item.src}
        alt={item.alt}
        width={1400}
        height={1000}
        className={`max-w-full max-h-[90vh] object-contain transition-transform duration-300 ${isActive ? '' : 'pointer-events-none'}`}
        style={{ transform: `scale(${scale})` }}
        draggable={false}
      />
    ) : (
      <video
        src={item.src}
        controls={isActive}
        className={`max-w-full max-h-[90vh] object-contain transition-transform duration-300 ${isActive ? '' : 'pointer-events-none'}`}
        style={{ transform: `scale(${scale})` }}
        onClick={(e) => isActive && e.stopPropagation()}
      />
    )
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50"
      >
        <div 
          ref={containerRef}
          className="relative w-full h-full max-w-7xl mx-auto flex items-center"
          onClick={handleClick}
          onTouchStart={handleDragStart}
          onTouchEnd={handleDragEnd}
        >
          <motion.div 
            className={`relative ${showInfo ? 'w-3/4' : 'w-full'} h-full transition-all duration-300 ease-in-out`}
          >
            <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 z-20">
              <button onClick={onClose} className="text-white hover:text-gray-300" aria-label="Close lightbox">
                <X size={24} />
              </button>
              <div className="flex space-x-4">
                <button className="text-white hover:text-gray-300" aria-label="Add to favorites">
                  <Star size={24} />
                </button>
                <button className="text-white hover:text-gray-300" aria-label="Download">
                  <Download size={24} />
                </button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-gray-300"
                  onClick={(e) => {
                    e.stopPropagation()
                    setShowInfo(!showInfo)
                  }}
                  aria-label="Toggle information"
                >
                  <Info size={24} />
                </Button>
              </div>
            </div>
  
            <div className="w-full h-full flex items-center justify-center">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={{
                    enter: (direction) => ({
                      x: direction > 0 ? '100%' : '-100%',
                      opacity: 0,
                    }),
                    center: {
                      zIndex: 1,
                      x: 0,
                      opacity: 1,
                    },
                    exit: (direction) => ({
                      zIndex: 0,
                      x: direction < 0 ? '100%' : '-100%',
                      opacity: 0,
                    }),
                  }}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                  }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  {renderMediaItem(currentItem, true)}
                </motion.div>
              </AnimatePresence>
            </div>
  
            {!isMobile && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); handlePrevious(); }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={48} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); handleNext(); }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300 z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={48} />
                </button>
              </>
            )}
          </motion.div>
  
          <AnimatePresence>
            {showInfo && (
              <motion.div
                initial={{ opacity: 0, x: '100%' }}
                animate={{ opacity: 1, x: '0%' }}
                exit={{ opacity: 0, x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 w-1/4 h-full bg-white p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h2 className="text-2xl font-bold mb-4">{currentItem.alt}</h2>
                {metadata && (
                  <div className="space-y-2">
                    {currentItem.type === 'image' ? (
                      <>
                        <p><strong>Fecha:</strong> {metadata.dateTaken}</p>
                        <p><strong>Dispositivo:</strong> {metadata.device}</p>
                        <p><strong>Ubicación:</strong> {metadata.location}</p>
                        <p><strong>Nombre del archivo:</strong> {metadata.fileName}</p>
                        <p><strong>Dimensiones:</strong> {metadata.dimensions}</p>
                        <p><strong>Tamaño del archivo:</strong> {metadata.fileSize}</p>
                      </>
                    ) : (
                      <>
                        <p><strong>Duración:</strong> {metadata.duration}</p>
                        <p><strong>Formato:</strong> {metadata.format}</p>
                        <p><strong>Resolución:</strong> {metadata.resolution}</p>
                        <p><strong>Nombre del archivo:</strong> {metadata.fileName}</p>
                        <p><strong>Tamaño del archivo:</strong> {metadata.fileSize}</p>
                      </>
                    )}
                  </div>
                )}
                <p className="text-gray-600 mt-4">{currentItem.description}</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </AnimatePresence>
  )
}