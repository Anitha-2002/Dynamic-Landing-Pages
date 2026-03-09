import { useState } from 'react'
import type { Hotel } from '../services/hotelApi'

interface ReviewsSectionProps {
  hotel: Hotel
}

export function ReviewsSection({ hotel }: ReviewsSectionProps) {
  const comments = hotel.topPositiveComments ?? []
  const ratings = hotel.ratings
  const [activeIndex, setActiveIndex] = useState(0)

  if (comments.length === 0) return null

  return (
    <section
      className="py-12 md:py-16 px-4 bg-bg-light"
      aria-labelledby="reviews-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2 id="reviews-heading" className="text-2xl md:text-3xl font-bold text-text-primary mb-8">
          What guests say
        </h2>
        {ratings && (
          <div className="flex items-center gap-4 mb-8">
            <span className="text-3xl font-bold text-primary-blue">
              {ratings.overall.toFixed(1)}
            </span>
            <div>
              <p className="text-text-primary font-medium">Overall rating</p>
              {ratings.google && (
                <p className="text-sm text-text-muted">
                  {ratings.google.reviewCount.toLocaleString()} Google reviews
                </p>
              )}
            </div>
          </div>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {comments.map((c, i) => (
            <blockquote
              key={i}
              className={`p-6 rounded-xl border bg-white ${
                i === activeIndex ? 'border-accent-gold shadow-md' : 'border-gray-200'
              }`}
              onFocus={() => setActiveIndex(i)}
            >
              <p className="text-text-primary mb-4">&ldquo;{c.quote}&rdquo;</p>
              <footer className="flex items-center justify-between text-sm text-text-muted">
                <cite className="not-italic font-medium text-text-primary">{c.author}</cite>
                <span>{c.source}</span>
                {c.rating != null && (
                  <span className="text-accent-gold" aria-label={`${c.rating} stars`}>
                    {'★'.repeat(c.rating)}
                  </span>
                )}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
