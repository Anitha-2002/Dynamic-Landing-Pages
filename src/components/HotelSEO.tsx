import { Helmet } from 'react-helmet-async'
import type { Hotel } from '../services/hotelApi'

interface HotelSEOProps {
  hotel: Hotel
}

export function HotelSEO({ hotel }: HotelSEOProps) {
  const { seo, location, ratings, gallery } = hotel
  const imageUrl = gallery?.[0]?.url
    ? new URL(gallery[0].url, window.location.origin).href
    : undefined
  const canonicalUrl = typeof window !== 'undefined' ? window.location.href : ''

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Hotel',
    name: hotel.name,
    description: hotel.shortDescription,
    address: {
      '@type': 'PostalAddress',
      streetAddress: location.address,
      addressLocality: location.city,
      addressCountry: location.country,
    },
    ...(imageUrl && { image: imageUrl }),
    ...(ratings && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: ratings.overall,
        reviewCount: ratings.google?.reviewCount ?? 0,
        bestRating: 5,
      },
    }),
  }

  return (
    <>
      <Helmet>
        <title>{seo.title}</title>
        <meta name="description" content={seo.metaDescription} />
        <meta name="keywords" content={seo.keywords.join(', ')} />
        <link rel="canonical" href={canonicalUrl} />
        <meta property="og:title" content={seo.title} />
        <meta property="og:description" content={seo.metaDescription} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={seo.title} />
        <meta name="twitter:description" content={seo.metaDescription} />
      </Helmet>
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </>
  )
}
