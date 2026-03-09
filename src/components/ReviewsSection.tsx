import { useEffect, useState } from 'react'
import type { Hotel } from '../services/hotelApi'

interface ReviewsSectionProps {
  hotel: Hotel
}

export function ReviewsSection({ hotel }: ReviewsSectionProps) {
  const comments = hotel.topPositiveComments ?? []
  const ratings = hotel.ratings
  const [activeIndex, setActiveIndex] = useState(0)

  if (comments.length === 0) return null

  const visibleCount = Math.min(2, comments.length)
  const visibleComments = Array.from({ length: visibleCount }, (_, offset) => {
    const idx = (activeIndex + offset) % comments.length
    return { comment: comments[idx], index: idx }
  })

  useEffect(() => {
    if (comments.length <= visibleCount) return
    const id = window.setInterval(() => {
      setActiveIndex((prev) => (prev + visibleCount) % comments.length)
    }, 6000)
    return () => window.clearInterval(id)
  }, [comments.length, visibleCount])

  const goNext = () => {
    if (comments.length <= visibleCount) return
    setActiveIndex((prev) => (prev + visibleCount) % comments.length)
  }

  const goPrev = () => {
    if (comments.length <= visibleCount) return
    setActiveIndex((prev) => (prev - visibleCount + comments.length) % comments.length)
  }

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
        <div className="relative">
          <div className="flex flex-col lg:flex-row gap-6">
            {visibleComments.map(({ comment: c, index: i }) => (
              <blockquote
                key={i}
                className={`flex-1 p-6 rounded-xl border-2 bg-white shadow-sm border-accent-gold ${
                  i === activeIndex ? 'shadow-md' : ''
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
          {comments.length > visibleCount && (
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={goPrev}
                className="text-sm text-primary-blue hover:underline"
              >
                Previous
              </button>
              <div className="flex gap-1">
                {comments.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full ${
                      i === activeIndex ? 'bg-accent-gold' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={goNext}
                className="text-sm text-primary-blue hover:underline"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
