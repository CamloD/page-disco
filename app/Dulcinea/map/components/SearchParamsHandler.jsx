import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

export function SearchParamsHandler({ onParamsChange }) {
  const searchParams = useSearchParams()

  useEffect(() => {
    const eventTitle = searchParams.get('eventTitle')
    const eventDate = searchParams.get('eventDate')
    const eventTime = searchParams.get('eventTime')
    const selectedArea = searchParams.get('selectedArea')
    const guestCount = searchParams.get('guestCount')

    onParamsChange({ eventTitle, eventDate, eventTime, selectedArea, guestCount })
  }, [searchParams, onParamsChange])

  return null
}
