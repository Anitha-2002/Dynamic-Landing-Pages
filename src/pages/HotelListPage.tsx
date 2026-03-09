import { useGetHotelsIndexQuery } from '../services/hotelApi'
import { Link } from 'react-router-dom'

export function HotelListPage() {
  const { data, isLoading } = useGetHotelsIndexQuery(undefined)

  if (isLoading) {
    return (
      <div className="min-h-screen bg-bg-light flex items-center justify-center">
        <div className="animate-pulse text-text-muted">Loading hotels...</div>
      </div>
    )
  }

  const hotels = data?.hotels ?? []

  return (
    <main className="min-h-screen bg-bg-light py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-text-primary mb-6 md:mb-8">Our Hotels</h1>
        <ul className="space-y-4">
          {hotels.map((hotel) => (
            <li key={hotel.slug}>
              <Link
                to={`/${hotel.slug}`}
                className="block p-4 rounded-lg bg-white border border-gray-200 hover:border-primary-blue hover:shadow-md transition"
              >
                <span className="font-semibold text-text-primary">{hotel.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  )
}
