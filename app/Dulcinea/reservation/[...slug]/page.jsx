import React, { Suspense } from 'react'
import { EventDetails } from './EventDetails'
import eventsData from '@/app/Dulcinea/data/dataevent.json'

export async function generateStaticParams() {
  return eventsData.events.map(event => {
    const eventDate = event.date.replace(/-/g, '')
    const eventCode = `evento${eventDate}${event.id.toString().padStart(4, '0')}`
    const eventTitle = event.title.toLowerCase().replace(/\s+/g, '-')
    return {
      slug: [eventCode, eventTitle]
    }
  })
}

export default function Page({ params }) {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-900 flex items-center justify-center text-white">Cargando...</div>}>
      <EventDetails slug={params.slug} />
    </Suspense>
  )
}
