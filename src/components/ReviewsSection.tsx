import { useCallback, useEffect, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import type { Hotel } from '../services/hotelApi'

interface ReviewsSectionProps {
  hotel: Hotel
}

export function ReviewsSection({ hotel }: ReviewsSectionProps) {
  const comments = hotel.topPositiveComments ?? []
  const ratings = hotel.ratings
  const VISIBLE = 3
  const n = comments.length
  const [slideIndex, setSlideIndex] = useState(0)
  const [isResetting, setIsResetting] = useState(false)
  const reduceMotion = useReducedMotion()

  // Duplicate list for infinite: when we reach slideIndex n we show same as 0, then reset
  const trackList = n > 0 ? [...comments, ...comments] : []
  const trackLength = trackList.length

  const duration = reduceMotion ? 0 : 0.45
  const ease = [0.25, 0.46, 0.45, 0.94]

  const goNext = useCallback(() => {
    if (n <= 1) return
    setSlideIndex((prev) => Math.min(prev + 1, n))
  }, [n])

  const goPrev = useCallback(() => {
    if (n <= 1) return
    setSlideIndex((prev) => (prev === 0 ? n : prev - 1))
  }, [n])

  const onSlideComplete = useCallback(() => {
    if (slideIndex === n && n > 0) {
      setIsResetting(true)
      setSlideIndex(0)
    }
  }, [slideIndex, n])

  useEffect(() => {
    if (!isResetting) return
    const t = requestAnimationFrame(() => setIsResetting(false))
    return () => cancelAnimationFrame(t)
  }, [isResetting])

  useEffect(() => {
    if (n < VISIBLE) return
    const id = window.setInterval(goNext, 6000)
    return () => window.clearInterval(id)
  }, [n, goNext])

  if (comments.length === 0) return null

  const displayIndex = slideIndex >= n ? 0 : slideIndex

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
        <div className="relative overflow-hidden">
          <div className="w-full overflow-hidden">
            <motion.div
              className="flex"
              style={{ width: `${(trackLength * 100) / VISIBLE}%` }}
              animate={{
                x: isResetting ? '0%' : `-${(slideIndex / trackLength) * 100}%`,
              }}
              transition={{
                duration: isResetting ? 0 : duration,
                ease,
              }}
              onAnimationComplete={onSlideComplete}
            >
              {trackList.map((c, i) => (
                <div
                  key={i}
                  className="flex-none px-2 sm:px-3"
                  style={{ width: `${100 / trackLength}%` }}
                >
                  <blockquote className="h-full p-6 rounded-xl border-2 bg-white shadow-sm border-accent-gold">
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
                </div>
              ))}
            </motion.div>
          </div>
          {n > 1 && (
            <div className="mt-6 flex items-center justify-between">
              <button
                type="button"
                onClick={goPrev}
                className="text-sm text-primary-blue hover:underline"
                aria-label="Previous review"
              >
                Previous
              </button>
              <div className="flex gap-1.5">
                {comments.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 w-2 rounded-full transition-colors ${
                      i === displayIndex ? 'bg-accent-gold' : 'bg-gray-300'
                    }`}
                    aria-hidden
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={goNext}
                className="text-sm text-primary-blue hover:underline"
                aria-label="Next review"
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
