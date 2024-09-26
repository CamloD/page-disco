/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import { Home, Image, Star, Archive, Trash2 } from 'lucide-react'
import Link from 'next/link'

export function Sidebar() {
  return (
    <aside className="py-20 w-48 bg-white border-r border-gray-200 p-4">
      <div className="flex items-center mb-8">
        <img src="/placeholder.svg?height=40&width=40" alt="Google Photos" className="w-10 h-10 mr-2" />
        <span className="text-xl font-semibold text-gray-800">Photos</span>
      </div>
      <nav>
        <ul className="space-y-2">
          <li>
            <Link href="/gallery1" className="flex items-center px-4 py-2 text-gray-700 rounded-full hover:bg-blue-50">
              <Home className="w-5 h-5 mr-3" />
              <span>Home</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center px-4 py-2 text-gray-700 rounded-full hover:bg-blue-50">
              <Image className="w-5 h-5 mr-3" />
              <span>Photos</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center px-4 py-2 text-gray-700 rounded-full hover:bg-blue-50">
              <Star className="w-5 h-5 mr-3" />
              <span>Favorites</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center px-4 py-2 text-gray-700 rounded-full hover:bg-blue-50">
              <Archive className="w-5 h-5 mr-3" />
              <span>Archive</span>
            </Link>
          </li>
          <li>
            <Link href="#" className="flex items-center px-4 py-2 text-gray-700 rounded-full hover:bg-blue-50">
              <Trash2 className="w-5 h-5 mr-3" />
              <span>Trash</span>
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  )
}