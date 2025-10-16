'use client'

import { useState, useEffect } from 'react'
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  X,
  Calendar,
  Car,
  ChevronUp
} from 'lucide-react'
import { siteConfig } from '../lib/siteConfig'

export default function FloatingContactWidget() {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isBusinessOpen, setIsBusinessOpen] = useState(false)
  const [timeUntilChange, setTimeUntilChange] = useState('')

  // Check business hours
  useEffect(() => {
    const checkBusinessHours = () => {
      const now = new Date()
      const currentHour = now.getHours()
      const currentDay = now.getDay() // 0 = Sunday, 1 = Monday, etc.

      let isOpen = false
      let nextChange = ''

      if (currentDay === 0) {
        // Sunday - Closed
        isOpen = false
        nextChange = 'Avautuu maanantaina klo 8:00'
      } else if (currentDay === 6) {
        // Saturday
        if (currentHour >= 10 && currentHour < 16) {
          isOpen = true
          nextChange = `Sulkeutuu klo 16:00`
        } else {
          isOpen = false
          nextChange = currentHour < 10 ? 'Avautuu klo 10:00' : 'Avautuu maanantaina klo 8:00'
        }
      } else {
        // Monday - Friday
        if (currentHour >= 8 && currentHour < 18) {
          isOpen = true
          nextChange = `Sulkeutuu klo 18:00`
        } else {
          isOpen = false
          nextChange = currentHour < 8 ? 'Avautuu klo 8:00' : 'Avautuu huomenna klo 8:00'
        }
      }

      setIsBusinessOpen(isOpen)
      setTimeUntilChange(nextChange)
    }

    checkBusinessHours()
    const interval = setInterval(checkBusinessHours, 60000) // Check every minute

    return () => clearInterval(interval)
  }, [])

  // Close menu when clicking outside
  useEffect(() => {
    if (isExpanded) {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement
        if (!target.closest('.floating-widget')) {
          setIsExpanded(false)
        }
      }
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [isExpanded])

  const contactMethods = [
    {
      id: 'booking',
      icon: Calendar,
      label: 'Varaa Aika',
      action: () => {
        window.location.href = '/booking'
      },
      bgColor: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600'
    },
    {
      id: 'phone',
      icon: Phone,
      label: 'Soita Meille',
      action: () => {
        window.location.href = `tel:${siteConfig.phone.tel}`
      },
      bgColor: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600'
    },
    {
      id: 'email',
      icon: Mail,
      label: 'Lähetä Viesti',
      action: () => {
        const subject = 'Autopesu - Kiilto & Loisto'
        const body = 'Hei,\n\nHaluaisin tietää lisää autopesupalveluistanne.\n\nKiitos!'
        window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      },
      bgColor: 'bg-gray-600',
      hoverColor: 'hover:bg-gray-700'
    },
    {
      id: 'location',
      icon: MapPin,
      label: 'Reitit Meille',
      action: () => {
        const address = encodeURIComponent(`${siteConfig.address.street}, ${siteConfig.address.city}`)
        window.open(`https://maps.google.com/maps?q=${address}`, '_blank')
      },
      bgColor: 'bg-red-500',
      hoverColor: 'hover:bg-red-600'
    }
  ]

  return (
    <div className="floating-widget fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Expanded Menu */}
      {isExpanded && (
        <div className="mb-3 sm:mb-4 bg-white rounded-2xl shadow-2xl border border-gray-200 w-[calc(100vw-2rem)] sm:w-80 max-w-sm animate-slide-up">
          <div className="p-4">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Car className="text-white w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 text-sm">{siteConfig.shortName}</h3>
                  <div className="flex items-center space-x-1">
                    <div className={`w-2 h-2 rounded-full ${isBusinessOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                    <span className={`text-xs ${isBusinessOpen ? 'text-green-600' : 'text-red-600'}`}>
                      {isBusinessOpen ? 'Auki nyt' : 'Suljettu'}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-gray-600 p-1 transition-colors"
                aria-label="Sulje"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Business Hours Info */}
            <div className="mb-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium text-gray-700">Aukioloajat</span>
              </div>
              <div className="text-xs text-gray-600 space-y-1">
                {siteConfig.hours.map((hour, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{hour.label}:</span>
                    <span className="font-medium">{hour.value}</span>
                  </div>
                ))}
              </div>
              {timeUntilChange && (
                <div className="mt-2 text-xs text-blue-600 font-medium">
                  {timeUntilChange}
                </div>
              )}
            </div>

            {/* Contact Methods */}
            <div className="space-y-2">
              {contactMethods.map((method) => {
                const IconComponent = method.icon
                return (
                  <button
                    key={method.id}
                    onClick={() => {
                      method.action()
                      setIsExpanded(false)
                    }}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-all duration-200 ${method.bgColor} ${method.hoverColor} text-white active:scale-95 touch-manipulation`}
                  >
                    <IconComponent className="w-5 h-5 flex-shrink-0" />
                    <span className="font-medium text-sm">{method.label}</span>
                  </button>
                )
              })}
            </div>

            {/* Quick Stats */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div>
                  <div className="text-lg font-bold text-gray-900">{siteConfig.features.customers}</div>
                  <div className="text-xs text-gray-600">Tyytyväistä</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-gray-900">{siteConfig.features.years}</div>
                  <div className="text-xs text-gray-600">Vuotta</div>
                </div>
              </div>
              <div className="mt-2 text-center">
                <div className="text-sm font-bold text-purple-600">⭐ {siteConfig.features.rating}/5.0</div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Floating Button */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`relative bg-purple-500 hover:bg-purple-600 text-white p-4 rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group active:scale-95 touch-manipulation ${
          isExpanded ? 'rotate-45' : ''
        }`}
        aria-label={isExpanded ? 'Sulje valikko' : 'Avaa yhteystiedot'}
        aria-expanded={isExpanded}
      >
        {/* Business Status Indicator */}
        <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
          isBusinessOpen ? 'bg-green-500 animate-pulse' : 'bg-red-500'
        }`}></div>

        {/* Icon */}
        <div className="relative">
          {isExpanded ? (
            <ChevronUp className="h-6 w-6" />
          ) : (
            <Calendar className="h-6 w-6" />
          )}
        </div>

        {/* Desktop Tooltip - Hidden on Mobile */}
        {!isExpanded && (
          <div className="hidden sm:block absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
            {isBusinessOpen ? 'Varaa aika - Olemme auki!' : 'Ota yhteyttä'}
            <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
          </div>
        )}
      </button>

      {/* Screen Reader Support */}
      <span className="sr-only">
        Ota yhteyttä {siteConfig.name} - {isBusinessOpen ? 'Tällä hetkellä auki' : 'Tällä hetkellä suljettu'}.
      </span>
    </div>
  )
}
