import { Link } from 'react-router-dom'
import type { Hotel } from '../services/hotelApi'

interface FooterSectionProps {
  hotel: Hotel
}

export function FooterSection({ hotel }: FooterSectionProps) {
  const loc = hotel.location

  return (
    <footer className="bg-footer-bg border-t border-white/10 py-12 px-4" role="contentinfo">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          <div className="glass-card card-glow p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-2 text-white">{hotel.name}</h3>
            <p className="text-white/80 text-sm">{hotel.shortDescription}</p>
          </div>
          {loc && (
            <div className="glass-card card-glow p-6 rounded-xl">
              <h3 className="font-bold text-lg mb-2 text-white">Contact</h3>
              <address className="not-italic text-white/80 text-sm">
                {loc.address}
                <br />
                {loc.city}, {loc.country}
              </address>
            </div>
          )}
          <div className="glass-card card-glow p-6 rounded-xl">
            <h3 className="font-bold text-lg mb-2 text-white">Explore</h3>
            <Link to="/" className="text-accent-gold hover:underline text-sm">
              View all hotels
            </Link>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 text-center text-white/60 text-sm">
          <p>© {new Date().getFullYear()} {hotel.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
