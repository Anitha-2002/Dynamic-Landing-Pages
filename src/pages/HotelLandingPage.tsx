import { useParams } from 'react-router-dom'
import { useGetHotelBySlugQuery } from '@/services/hotelApi'
import { Hero3DSection } from '@/components/Hero3DSection'
import { HighlightsSection } from '@/components/HighlightsSection'
import { RoomsSection } from '@/components/RoomsSection'
import { ReviewsSection } from '@/components/ReviewsSection'
import { LocationSection } from '@/components/LocationSection'
import { ChannelsSection } from '@/components/ChannelsSection'
import { FooterSection } from '@/components/FooterSection'
import { HotelSEO } from '@/components/HotelSEO'

function LandingSkeleton() {
  return (
    <div className="min-h-screen bg-banner-page animate-pulse">
      <div className="h-[70vh] bg-bg-dark" />
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        <div className="h-8 bg-white/10 rounded w-3/4" />
        <div className="h-4 bg-white/10 rounded w-full" />
        <div className="h-4 bg-white/10 rounded w-5/6" />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-24 bg-white/10 rounded" />
          ))}
        </div>
      </div>
    </div>
  )
}

export function HotelLandingPage() {
  const { hotelSlug } = useParams<{ hotelSlug: string }>()
  const { data: hotel, isLoading, isError } = useGetHotelBySlugQuery(hotelSlug!, { skip: !hotelSlug })

  if (!hotelSlug) return null
  if (isLoading) return <LandingSkeleton />
  if (isError || !hotel) {
    return (
      <main className="min-h-screen bg-banner-page flex items-center justify-center">
        <p className="text-font-red">Hotel not found.</p>
      </main>
    )
  }

  return (
    <>
      <HotelSEO hotel={hotel} />
      <div className="min-h-screen bg-banner-page">
        <header aria-label="Hotel hero">
          <Hero3DSection hotel={hotel} />
        </header>
        <main>
          <HighlightsSection hotel={hotel} />
          <RoomsSection hotel={hotel} />
          <ReviewsSection hotel={hotel} />
          <LocationSection hotel={hotel} />
          <ChannelsSection hotel={hotel} />
        </main>
        <footer>
          <FooterSection hotel={hotel} />
        </footer>
      </div>
    </>
  )
}
