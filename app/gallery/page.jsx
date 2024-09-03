/* eslint-disable @next/next/no-img-element */
"use client"

import { useState} from "react";
import { Button } from "@/components/ui/button"


const Gallery = () => {

  const [selectedMedia, setSelectedMedia] = useState(null)
  const [filteredMedia, setFilteredMedia] = useState([
    {
      id: 1,
      type: "image",
      src: "images/image1.jpg",
      date: "2023-05-01",
    },
    {
      id: 2,
      type: "video",
      src: "video/video.mp4",
      date: "2023-06-15",
    },
    {
      id: 3,
      type: "image",
      src: "images/image2.jpg",
      date: "2023-07-20",
    },
    {
      id: 4,
      type: "video",
      src: "video/video_banner.mp4",
      date: "2023-08-01",
    },
    {
      id: 5,
      type: "image",
      src: "images/image3.jpg",
      date: "2023-09-10",
    },
    {
      id: 6,
      type: "image",
      src: "images/image4.jpg",
      date: "2023-10-05",
    },
    {
      id: 7,
      type: "image",
      src: "images/image5.jpg",
      date: "2023-10-05",
    },
    {
      id: 8,
      type: "image",
      src: "images/image6.jpg",
      date: "2023-10-05",
    },
    {
      id: 9,
      type: "image",
      src: "images/image7.jpg",
      date: "2023-10-05",
    },

    {
      id: 10,
      type: "image",
      src: "/images/image8.jpg",
    
      date: "2023-10-05",
    },
    {
      id: 11,
      type: "image",
      src: "/images/image9.jpg",
      
      date: "2023-10-05",
    },
    {
      id: 12,
      type: "image",
      src: "/images/image10.jpg",
      date: "2023-10-05",
    },
    
    
  ]);
  const handleFilterChange = (category) => {
    if (category === "all") {
      setFilteredMedia(media)
    } else {
      setFilteredMedia(media.filter((item) => item.category === category))
    }
  }
  const handleMediaClick = (item) => {
    setSelectedMedia(item)
  }
  const handleClosePreview = () => {
    setSelectedMedia(null)
  }
  return (
    <div className="flex flex-col min-h-screen ">
      <header className="bg-[#2a2a2a] shadow-sm">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Media Gallery</h1>
          <div className="flex items-center gap-4">
          </div>
        </div>
      </header>
      <main className="flex-1 bg-[#3a3a3a] py-8">
        <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredMedia.map((item) => (
            <div
              key={item.id}
              className="relative overflow-hidden rounded-lg shadow-lg cursor-pointer group"
              onClick={() => handleMediaClick(item)}
            >
              {item.type === "image" ? (
                <img
                  src={item.src}
                  alt={`Media ${item.id}`}
                  className="w-full h-64 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                />
              ) : (
                <video
                  src={item.src}
                  className="w-full h-64 object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
                  controls
                />
              )}
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="text-white text-lg font-medium">
                  {item.type === "image" ? "View Image" : "Play Video"}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
      {selectedMedia && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <div className="max-w-[90vw] max-h-[90vh] overflow-auto">
            {selectedMedia.type === "image" ? (
              <img
                src={selectedMedia.src}
                alt={`Media ${selectedMedia.id}`}
                className="max-w-full max-h-full object-contain"
              />
            ) : (
              <video src={selectedMedia.src} className="max-w-full max-h-full object-contain" controls />
            )}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={handleClosePreview}
            >
              <XIcon className="w-6 h-6" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function XIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function ChevronDownIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  )
}


function PlayIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="6 3 20 12 6 21 6 3" />
    </svg>
  )
}



export default Gallery