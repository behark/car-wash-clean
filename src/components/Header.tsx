'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, Home, Phone } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: 'Etusivu', href: '/', icon: Home },
    { name: 'Palvelut', href: '/services' },
    { name: 'Galleria', href: '/gallery' },
    { name: 'Arvostelut', href: '/testimonials' },
    { name: 'Meistä', href: '/about' },
    { name: 'Yhteystiedot', href: '/contact' },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-xl">K&L</span>
              </div>
              <div className="hidden sm:block">
                <div className="text-lg font-bold text-slate-900">{siteConfig.shortName}</div>
                <div className="text-xs text-slate-600">Autopesupalvelu</div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex lg:gap-x-6 items-center">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-slate-700 hover:text-purple-600 transition-colors flex items-center gap-1"
              >
                {item.icon && <item.icon className="w-4 h-4" />}
                {item.name}
              </Link>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Phone (Desktop) */}
            <a
              href={`tel:${siteConfig.phone.tel}`}
              className="hidden sm:flex items-center gap-2 text-sm font-medium text-slate-700 hover:text-purple-600 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span className="hidden md:inline">{siteConfig.phone.display}</span>
            </a>

            {/* Book Button */}
            <Link
              href="/booking"
              className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-4 sm:px-6 py-2 rounded-lg text-sm font-semibold transition-all hover:scale-105 shadow-md"
            >
              Varaa aika
            </Link>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-slate-200 mt-2">
            <div className="space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.icon && <item.icon className="w-5 h-5" />}
                  {item.name}
                </Link>
              ))}

              {/* Mobile Phone Link */}
              <a
                href={`tel:${siteConfig.phone.tel}`}
                className="flex items-center gap-2 rounded-lg px-4 py-3 text-base font-medium text-slate-700 hover:bg-purple-50 hover:text-purple-600 transition-colors border-t border-slate-200 mt-2 pt-4"
              >
                <Phone className="w-5 h-5" />
                {siteConfig.phone.display}
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
