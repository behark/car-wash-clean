import Link from 'next/link'
import { MapPin, Phone, Mail, Clock, Facebook, Instagram } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'

export default function Footer() {
  return (
    <footer className="bg-navy-900 text-white">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-purple-400">Kiilto & Loisto</h3>
            <h4 className="text-lg font-semibold">{siteConfig.name}</h4>
            <p className="text-silver-200 text-sm">
              {siteConfig.subtitle}
            </p>
            <div className="flex space-x-4">
              <Link
                href={siteConfig.social.facebook}
                className="text-silver-300 hover:text-white transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="h-5 w-5" />
              </Link>
              <Link
                href={siteConfig.social.instagram}
                className="text-silver-300 hover:text-white transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Yhteystiedot</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-gold-400" />
                <span className="text-silver-200">
                  {siteConfig.address.street}<br />
                  {siteConfig.address.postalCode} {siteConfig.address.city}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-gold-400" />
                <Link
                  href={`tel:${siteConfig.phone.tel}`}
                  className="text-silver-200 hover:text-white transition-colors"
                >
                  {siteConfig.phone.display}
                </Link>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-gold-400" />
                <Link
                  href={`mailto:${siteConfig.email}`}
                  className="text-silver-200 hover:text-white transition-colors"
                >
                  {siteConfig.email}
                </Link>
              </div>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Aukioloajat</h3>
            <div className="space-y-2 text-sm">
              {siteConfig.hours.map((hour, index) => (
                <div key={index} className="flex justify-between">
                  <span className="text-silver-200">{hour.label}</span>
                  <span className="text-white">{hour.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold">Pikalinkit</h3>
            <div className="space-y-2 text-sm">
              <Link
                href="/services"
                className="block text-silver-200 hover:text-white transition-colors"
              >
                Palvelut
              </Link>
              <Link
                href="/booking"
                className="block text-silver-200 hover:text-white transition-colors"
              >
                Varaa aika
              </Link>
              <Link
                href="/contact"
                className="block text-silver-200 hover:text-white transition-colors"
              >
                Yhteystiedot
              </Link>
              <Link
                href="/gallery"
                className="block text-silver-200 hover:text-white transition-colors"
              >
                Galleria
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-navy-700">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <p className="text-silver-300 text-sm">
              © 2024 {siteConfig.name}. Kaikki oikeudet pidätetään.
            </p>
            <div className="flex space-x-6 text-sm">
              <Link
                href="/privacy"
                className="text-silver-300 hover:text-white transition-colors"
              >
                Tietosuoja
              </Link>
              <Link
                href="/terms"
                className="text-silver-300 hover:text-white transition-colors"
              >
                Käyttöehdot
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}