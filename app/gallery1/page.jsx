import { ImageGrid } from './components/imagesgrid'
import { Header } from './components/header'

export default function Home() {
  return (
    <main className=" min-h-screen bg-white">
      <div className='flex py-8'></div>
      <Header />
      <div className="p-4">
        <ImageGrid />
      </div>
    </main>
  )
}