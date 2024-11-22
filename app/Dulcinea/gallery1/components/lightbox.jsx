import { ChevronLeft, ChevronRight, X, Star, Download, Info } from 'lucide-react'
import Image from 'next/image'

export function Lightbox({ images, selectedId, onClose, onNavigate }) {
  const selectedImage = images.find((img) => img.id === selectedId)
  const currentIndex = images.findIndex((img) => img.id === selectedId)

  const handlePrevious = () => {
    const previousIndex = (currentIndex - 1 + images.length) % images.length
    onNavigate(images[previousIndex].id)
  }

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % images.length
    onNavigate(images[nextIndex].id)
  }

  if (!selectedImage) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4">
        <button
          onClick={onClose}
          className="text-white hover:text-gray-300"
          aria-label="Close lightbox"
        >
          <X size={24} />
        </button>
        <div className="flex space-x-4">
          <button className="text-white hover:text-gray-300" aria-label="Add to favorites">
            <Star size={24} />
          </button>
          <button className="text-white hover:text-gray-300" aria-label="Download">
            <Download size={24} />
          </button>
          <button className="text-white hover:text-gray-300" aria-label="Info">
            <Info size={24} />
          </button>
        </div>
      </div>
      <button
        onClick={handlePrevious}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
        aria-label="Previous image"
      >
        <ChevronLeft size={48} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-300"
        aria-label="Next image"
      >
        <ChevronRight size={48} />
      </button>
      <div className="max-w-4xl max-h-full">
        <Image
          src={selectedImage.src}
          alt={selectedImage.alt}
          width={800}
          height={600}
          className="max-w-full max-h-[90vh] object-contain"
        />
      </div>
    </div>
  )
}