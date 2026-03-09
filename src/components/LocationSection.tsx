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
      className="py-12 md:py-16 px-4 bg-white"
      aria-labelledby="location-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2 id="location-heading" className="text-2xl md:text-3xl font-bold text-text-primary mb-8">
          Location
        </h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <address className="not-italic text-text-primary">
              <p className="font-semibold">{hotel.name}</p>
              <p className="text-text-muted mt-2">{loc.address}</p>
              <p className="text-text-muted mt-1">
                {loc.city}, {loc.country}
              </p>
            </address>
            {loc.mapUrl && (
              <a
                href={loc.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-4 px-4 py-2 rounded-lg bg-primary-blue text-white font-medium hover:opacity-90"
              >
                Open in Google Maps
              </a>
            )}
          </div>
          {mapEmbedUrl && (
            <div className="aspect-video w-full rounded-xl overflow-hidden border border-gray-200">
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
