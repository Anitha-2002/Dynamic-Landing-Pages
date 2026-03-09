import type { Hotel } from '../services/hotelApi'

interface RoomsSectionProps {
  hotel: Hotel
}

export function RoomsSection({ hotel }: RoomsSectionProps) {
  const rooms = hotel.rooms ?? []

  if (rooms.length === 0) return null

  return (
    <section
      className="py-12 md:py-16 px-4 bg-section-light"
      aria-labelledby="rooms-heading"
    >
      <div className="max-w-6xl mx-auto">
        <h2 id="rooms-heading" className="text-2xl md:text-3xl font-bold text-white mb-8">
          Rooms &amp; Suites
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-x-auto md:overflow-visible">
          {rooms.map((room, i) => (
            <article
              key={i}
              className="glass-card card-glow card-glow-hover flex flex-col rounded-xl overflow-hidden min-w-[280px] transition-shadow duration-300"
            >
              <div className="aspect-[4/3] bg-bg-dark relative overflow-hidden">
                {room.images?.[0] ? (
                  <img
                    src={room.images[0]}
                    alt={room.name}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-white/60 text-sm">
                    No image
                  </div>
                )}
              </div>
              <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-xl font-semibold text-white mb-2">{room.name}</h3>
                <p className="text-white/70 text-sm mb-4 flex-1">{room.description}</p>
                <dl className="text-xs text-white/60 space-y-1 mb-4">
                  <div className="flex justify-between">
                    <dt>Max guests</dt>
                    <dd>{room.maxGuests}</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt>Size</dt>
                    <dd>{room.sizeSqm} m²</dd>
                  </div>
                </dl>
                {room.highlights?.length > 0 && (
                  <ul className="flex flex-wrap gap-2">
                    {room.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="px-2 py-1 rounded bg-accent-gold/20 text-accent-gold text-xs border border-accent-gold/30"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
