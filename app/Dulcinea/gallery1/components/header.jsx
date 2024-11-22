import { Search } from 'lucide-react'

export function Header() {
  return (
    <header className="bg-white shadow ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <h1 className="text-2xl font-semibold text-gray-900">Photos</h1>
        <div className="relative">
          <input
            type="text"
            placeholder="Search your photos"
            className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>
    </header>
  )
}