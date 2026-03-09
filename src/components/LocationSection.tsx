import type { Hotel } from '../services/hotelApi'

interface LocationSectionProps {
  hotel: Hotel
}

export function LocationSection({ hotel }: LocationSectionProps) {
  const loc = hotel.location
  if (!loc) return null

  const mapEmbedUrl =
    loc.latitude != null && loc.longitude != null
      ? `https://maps.google.com/maps?q=${loc.latitude},${loc.longitude}&output=embed`
      : null

  return (
    <section
      className="py-12 md:py-16 px-4 bg-section-light"
      aria-labelledby="location-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2 id="location-heading" className="text-2xl md:text-3xl font-bold text-white mb-8">
          Location
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="glass-card card-glow card-glow-hover p-6 rounded-xl transition-shadow duration-300">
            <address className="not-italic text-white">
              <p className="font-semibold">{hotel.name}</p>
              <p className="text-white/70 mt-2">{loc.address}</p>
              <p className="text-white/70 mt-1">
                {loc.city}, {loc.country}
              </p>
            </address>
            {loc.mapUrl && (
              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="led-btn-glow inline-block mt-4 px-4 py-2 rounded-lg bg-accent-gold text-banner-night font-medium hover:opacity-90 transition"
              >
                Open in Google Maps
              </a>
            )}
          </div>
          {mapEmbedUrl && (
            <div className="glass-card card-glow aspect-video w-full rounded-xl overflow-hidden">
              <iframe
                src={mapEmbedUrl}
                title={`Map showing location of ${hotel.name}`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
