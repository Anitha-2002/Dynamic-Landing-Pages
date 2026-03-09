import type { Hotel } from '../services/hotelApi'

interface ChannelsSectionProps {
  hotel: Hotel
}

export function ChannelsSection({ hotel }: ChannelsSectionProps) {
  const channels = hotel.channels ?? []

  if (channels.length === 0) return null

  return (
    <section
      id="book"
      className="py-12 md:py-16 px-4 bg-bg-light"
      aria-labelledby="book-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="p-8 md:p-10 rounded-2xl bg-white border border-gray-200 shadow-sm text-center">
          <h2 id="book-heading" className="text-2xl md:text-3xl font-bold text-text-primary mb-6">
            Book your stay
          </h2>
          <p className="text-text-muted mb-8 max-w-xl mx-auto">
            Compare rates and book {hotel.name} on your preferred platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {channels.map((ch, i) => (
              <a
                key={i}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-3 rounded-lg bg-accent-gold text-primary-blue font-semibold hover:opacity-90 transition shadow-sm"
              >
                {ch.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
