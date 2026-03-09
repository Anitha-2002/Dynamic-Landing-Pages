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
      className="py-12 md:py-16 px-4 bg-section-dark"
      aria-labelledby="book-heading"
    >
      <div className="max-w-6xl mx-auto">
        <div className="glass-card card-glow p-8 md:p-10 rounded-2xl text-center">
          <h2 id="book-heading" className="text-2xl md:text-3xl font-bold text-white mb-6">
            Book your stay
          </h2>
          <p className="text-white/90 mb-8 max-w-xl mx-auto">
            Compare rates and book {hotel.name} on your preferred platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {channels.map((ch, i) => (
              <a
                key={i}
                href={ch.url}
                target="_blank"
                rel="noopener noreferrer"
                className="led-btn-glow inline-flex items-center px-6 py-3 rounded-lg bg-accent-gold text-banner-night font-semibold hover:opacity-90 transition"
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
