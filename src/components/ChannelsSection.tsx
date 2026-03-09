import type { Hotel, Channel } from '../services/hotelApi'

interface ChannelsSectionProps {
  hotel: Hotel
}

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

function getChannelMeta(ch: Channel): { label: string; description: string; icon: 'globe' | 'building' | 'star' } {
  const name = ch.name.toLowerCase()
  if (name.includes('agoda'))
    return { label: 'ONLINE PLATFORM', description: 'Compare rates & instant confirmation', icon: 'globe' }
  if (name.includes('booking'))
    return { label: 'ONLINE PLATFORM', description: "World's largest accommodation platform", icon: 'building' }
  if (name.includes('tripadvisor'))
    return { label: 'REVIEWS & BOOKING', description: 'Trusted by millions of travellers', icon: 'star' }
  return { label: 'ONLINE PLATFORM', description: ch.label, icon: 'globe' }
}

function IconPhone() {
  return (
    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V21a2 2 0 01-2 2h-1C9.716 23 3 16.284 3 8V5z" />
    </svg>
  )
}

function IconWhatsApp() {
  return (
    <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

function IconGlobe() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0h.5a2.5 2.5 0 002.5-2.5V3.935M12 20.488A9.997 9.997 0 0112 12c0-5.523 4.477-10 10-10S32 6.477 32 12a9.997 9.997 0 01-8 9.488" />
    </svg>
  )
}

function IconBuilding() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  )
}

function IconStar() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
    </svg>
  )
}

export function ChannelsSection({ hotel }: ChannelsSectionProps) {
  const channels = hotel.channels ?? []
  const phone = hotel.phone
  const hasChannels = channels.length > 0
  const hasContact = !!phone

  if (!hasChannels && !hasContact) return null

  const platformChannels = channels.slice(0, 3)

  return (
    <section
      id="book"
      className="py-12 md:py-20 px-4 bg-bg-dark relative overflow-hidden"
      aria-labelledby="reservations-heading"
    >
      {/* Subtle grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.06] pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, white 1px, transparent 1px),
            linear-gradient(to bottom, white 1px, transparent 1px)
          `,
          backgroundSize: '32px 32px',
        }}
      />
      <div className="max-w-5xl mx-auto relative">
        {/* Header */}
        <header className="text-center mb-10 md:mb-14">
          <p className="flex items-center justify-center gap-3 text-accent-gold text-sm font-semibold tracking-widest uppercase mb-4">
            <span className="w-8 h-px bg-accent-gold" aria-hidden />
            Reservations
            <span className="w-8 h-px bg-accent-gold" aria-hidden />
          </p>
          <h2 id="reservations-heading" className="text-3xl md:text-4xl font-serif font-semibold text-white mb-4">
            Reserve Your <span className="text-accent-gold font-serif italic">Perfect Stay</span>
          </h2>
          <p className="text-white/70 text-sm md:text-base max-w-xl mx-auto mb-6">
            Choose your preferred platform or contact us directly. Best rates guaranteed when you call or message us.
          </p>
          <p className="flex items-center justify-center gap-2 text-accent-gold" aria-hidden>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
            <span className="text-accent-gold" style={{ fontSize: '0.5rem' }}>◆</span>
            <span className="w-1.5 h-1.5 rounded-full bg-accent-gold" />
          </p>
        </header>

        {/* Direct contact cards */}
        {hasContact && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12 md:mb-16">
            <a
              href={`tel:${phone.replace(/\s/g, '')}`}
              className="group flex flex-col items-center justify-center text-center p-8 md:p-10 rounded-xl bg-accent-gold text-primary-blue hover:opacity-95 transition shadow-lg"
              aria-label="Call to book"
            >
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white shadow-inner mb-4 group-hover:scale-105 transition">
                <IconPhone />
              </span>
              <span className="text-white text-xs font-semibold tracking-widest uppercase mb-2">Direct Line</span>
              <span className="font-serif text-xl font-semibold text-primary-blue mb-1">Call to Book</span>
              <span className="text-primary-blue/90 text-sm mb-4">Speak directly with our team</span>
              <span className="font-medium text-primary-blue">{phone}</span>
            </a>
            <a
              href={buildWhatsAppBookingUrl(phone, hotel.name)}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col items-center justify-center text-center p-8 md:p-10 rounded-xl bg-whatsapp-teal text-white hover:opacity-95 transition shadow-lg"
              aria-label="Book via WhatsApp"
            >
              <span className="flex items-center justify-center w-16 h-16 rounded-full bg-white/20 text-white shadow-inner mb-4 group-hover:scale-105 transition">
                <IconWhatsApp />
              </span>
              <span className="text-white text-xs font-semibold tracking-widest uppercase mb-2">Instant Message</span>
              <span className="text-[#25D366] font-serif text-xl font-semibold mb-1">Book via WhatsApp</span>
              <span className="text-white/90 text-sm mb-4">Quick response, easy booking</span>
              <span className="font-medium text-white">{phone}</span>
            </a>
          </div>
        )}

        {/* Online platforms */}
        {hasChannels && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {platformChannels.map((ch, i) => {
              const meta = getChannelMeta(ch)
              return (
                <a
                  key={i}
                  href={ch.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-col items-center text-center p-6 md:p-8 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-accent-gold/30 transition"
                >
                  <span className="flex items-center justify-center w-14 h-14 rounded-full border-2 border-accent-gold/60 text-accent-gold shadow-md mb-4 group-hover:border-accent-gold group-hover:scale-105 transition">
                    {meta.icon === 'globe' && <IconGlobe />}
                    {meta.icon === 'building' && <IconBuilding />}
                    {meta.icon === 'star' && <IconStar />}
                  </span>
                  <span className="text-accent-gold text-xs font-semibold tracking-widest uppercase mb-2">
                    {meta.label}
                  </span>
                  <span className="font-serif text-lg font-semibold text-white mb-2">{ch.label}</span>
                  <span className="text-white/60 text-sm">{meta.description}</span>
                </a>
              )
            })}
          </div>
        )}
      </div>
    </section>
  )
}
