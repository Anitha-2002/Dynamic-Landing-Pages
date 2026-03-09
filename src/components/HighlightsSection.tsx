import type { Hotel } from '../services/hotelApi'

interface HighlightsSectionProps {
  hotel: Hotel
}

const defaultIcons: Record<string, string> = {
  pool: '🏊',
  beach: '🏖️',
  cafe: '☕',
  pickup: '🚐',
  wifi: '📶',
  spa: '💆',
  gym: '💪',
  shuttle: '🚗',
  pet: '🐾',
  garden: '🌿',
  fireplace: '🔥',
  restaurant: '🍽️',
}

function iconForHighlight(highlight: string): string {
  const lower = highlight.toLowerCase()
  if (lower.includes('pool')) return defaultIcons.pool
  if (lower.includes('beach')) return defaultIcons.beach
  if (lower.includes('cafe') || lower.includes('café')) return defaultIcons.cafe
  if (lower.includes('airport') || lower.includes('pickup')) return defaultIcons.pickup
  if (lower.includes('wifi')) return defaultIcons.wifi
  if (lower.includes('spa')) return defaultIcons.spa
  if (lower.includes('gym')) return defaultIcons.gym
  if (lower.includes('shuttle')) return defaultIcons.shuttle
  if (lower.includes('pet')) return defaultIcons.pet
  if (lower.includes('garden')) return defaultIcons.garden
  if (lower.includes('fireplace')) return defaultIcons.fireplace
  if (lower.includes('restaurant')) return defaultIcons.restaurant
  return '✨'
}

export function HighlightsSection({ hotel }: HighlightsSectionProps) {
  const highlights = hotel.highlights ?? []

  if (highlights.length === 0) return null

  return (
    <section
      className="py-12 md:py-16 px-4 bg-bg-light"
      aria-labelledby="highlights-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2 id="highlights-heading" className="text-2xl md:text-3xl font-bold text-text-primary mb-8">
          Why stay with us
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {highlights.map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-4 p-4 rounded-lg bg-white border border-gray-100 shadow-sm"
            >
              <span className="text-2xl flex-shrink-0" aria-hidden>
                {iconForHighlight(item)}
              </span>
              <span className="text-text-primary font-medium">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
