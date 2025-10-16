'use client'

import { MapPin, ExternalLink } from 'lucide-react'

interface SimpleMapProps {
  address: string
  mapsQuery: string
}

export default function SimpleMap({ address, mapsQuery }: SimpleMapProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(mapsQuery)}`
  const embedUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&q=${encodeURIComponent(mapsQuery)}&zoom=15`

  return (
    <div className="relative w-full h-[400px] rounded-xl overflow-hidden shadow-lg bg-slate-100">
      {/* Map Iframe */}
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={embedUrl}
        className="absolute inset-0"
      ></iframe>

      {/* Fallback / Overlay Button */}
      <a
        href={mapsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute bottom-4 right-4 bg-white hover:bg-slate-50 text-slate-900 px-4 py-2 rounded-lg shadow-lg font-medium text-sm flex items-center gap-2 transition-all hover:scale-105"
      >
        <MapPin className="w-4 h-4" />
        Avaa Google Mapsissa
        <ExternalLink className="w-3 h-3" />
      </a>

      {/* Address Overlay */}
      <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-3 rounded-lg shadow-lg">
        <p className="text-sm font-semibold text-slate-900 flex items-center gap-2">
          <MapPin className="w-4 h-4 text-purple-600" />
          {address}
        </p>
      </div>
    </div>
  )
}
