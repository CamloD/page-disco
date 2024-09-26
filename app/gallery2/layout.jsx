import { Inter } from 'next/font/google'
import { Sidebar } from './components/sidebar'


const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Google Photos Clone',
  description: 'A simple clone of Google Photos',
}

export default function SecondaryLayout({ children }) {
  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        {children}
        
      </div>
    </div>
  )
}
