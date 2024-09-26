"use client"

import { ImageGrid } from './components/imagesgrid'


export default function Home() {
  return (
      <main className=" min-h-screen bg-white">
        <div className='flex py-8'></div>
        
       
        <div className="p-4">
          <ImageGrid />
        </div>
      </main>
  )
}