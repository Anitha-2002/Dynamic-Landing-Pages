import type { Hotel } from '../services/hotelApi'

interface ChannelsSectionProps {
  hotel: Hotel
}

/** Digits only for wa.me (country code + number). */
function phoneToWhatsAppNumber(phone: string): string {
  const digits = phone.replace(/\D/g, '')
  if (digits.length === 10) return '91' + digits
  return digits
}

function buildWhatsAppBookingUrl(phone: string, hotelName: string): string {
  const num = phoneToWhatsAppNumber(phone)
  const text = encodeURIComponent(
    `Hello, I would like to enquire about availability and book a stay at ${hotelName}.`
  )
  return `https://wa.me/${num}?text=${text}`
}

export function ChannelsSection({ hotel }: ChannelsSectionProps) {
  const channels = hotel.channels ?? []
  const phone = hotel.phone
  const hasChannels = channels.length > 0
  const hasContact = !!phone

  if (!hasChannels && !hasContact) return null

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
            Compare rates and book {hotel.name} on your preferred platform. You can also call or message us on WhatsApp.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            {phone && (
              <>
                <a
                  href={`tel:${phone.replace(/\s/g, '')}`}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary-blue text-white font-semibold hover:opacity-90 transition shadow-sm"
                  aria-label="Call to book"
                >
                  <span aria-hidden>📞</span> Call to book
                </a>
                <a
                  href={buildWhatsAppBookingUrl(phone, hotel.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[#25D366] text-white font-semibold hover:opacity-90 transition shadow-sm"
                  aria-label="Book via WhatsApp"
                >
                  <span aria-hidden>WhatsApp</span> Book via WhatsApp
                </a>
              </>
            )}
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
