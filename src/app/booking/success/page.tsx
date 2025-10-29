'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { siteConfig } from '@/lib/siteConfig'

function BookingSuccessContent() {
  const searchParams = useSearchParams()
  const [bookingDetails, setBookingDetails] = useState<any>(null)

  useEffect(() => {
    // Parse booking details from URL params or sessionStorage
    const bookingId = searchParams.get('id')
    const date = searchParams.get('date')
    const time = searchParams.get('time')
    const service = searchParams.get('service')
    const name = searchParams.get('name')

    // Try to get details from sessionStorage for security
    const storedBooking = sessionStorage.getItem('lastBooking')
    if (storedBooking) {
      setBookingDetails(JSON.parse(storedBooking))
      // Clear the stored booking after retrieving
      sessionStorage.removeItem('lastBooking')
    } else if (bookingId) {
      // Fallback to URL params if available
      setBookingDetails({
        bookingId,
        date,
        time,
        service,
        customerName: name
      })
    }
  }, [searchParams])

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <svg
                className="w-12 h-12 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-display font-bold text-navy-900 mb-4">
            Varaus vahvistettu!
          </h1>
          <p className="text-lg text-silver-600 mb-8">
            Kiitos varauksestasi. Olemme lähettäneet vahvistuksen sähköpostiisi.
          </p>

          {/* Booking Details */}
          {bookingDetails ? (
            <div className="bg-silver-50 rounded-xl p-6 mb-8 text-left">
              <h2 className="text-xl font-bold text-navy-900 mb-4">Varauksen tiedot:</h2>
              <div className="space-y-3">
                {bookingDetails.bookingId && (
                  <div className="flex justify-between">
                    <span className="text-silver-600">Varausnumero:</span>
                    <span className="font-semibold text-navy-900">{bookingDetails.bookingId}</span>
                  </div>
                )}
                {bookingDetails.date && (
                  <div className="flex justify-between">
                    <span className="text-silver-600">Päivämäärä:</span>
                    <span className="font-semibold text-navy-900">
                      {new Date(bookingDetails.date).toLocaleDateString('fi-FI', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                )}
                {bookingDetails.time && (
                  <div className="flex justify-between">
                    <span className="text-silver-600">Aika:</span>
                    <span className="font-semibold text-navy-900">{bookingDetails.time}</span>
                  </div>
                )}
                {bookingDetails.service && (
                  <div className="flex justify-between">
                    <span className="text-silver-600">Palvelu:</span>
                    <span className="font-semibold text-navy-900">{bookingDetails.service}</span>
                  </div>
                )}
                {bookingDetails.customerName && (
                  <div className="flex justify-between">
                    <span className="text-silver-600">Nimi:</span>
                    <span className="font-semibold text-navy-900">{bookingDetails.customerName}</span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="bg-silver-50 rounded-xl p-6 mb-8">
              <p className="text-silver-600">
                Varauksen tiedot on lähetetty sähköpostiisi.
              </p>
            </div>
          )}

          {/* Next Steps */}
          <div className="bg-blue-50 rounded-xl p-6 mb-8 text-left">
            <h2 className="text-xl font-bold text-navy-900 mb-4">Seuraavat vaiheet:</h2>
            <ol className="list-decimal list-inside space-y-2 text-silver-700">
              <li>Tarkista sähköpostisi vahvistusta varten</li>
              <li>Saavu paikalle 5 minuuttia ennen varattua aikaa</li>
              <li>Poista arvoesineet autosta ennen pesua</li>
              <li>Ilmoita henkilökunnalle saapuessasi</li>
            </ol>
          </div>

          {/* Contact Information */}
          <div className="bg-gold-50 rounded-xl p-6 mb-8">
            <h3 className="text-lg font-bold text-navy-900 mb-3">Tarvitsetko apua?</h3>
            <div className="space-y-2">
              <p className="text-silver-700">
                <span className="font-semibold">Puhelin:</span>{' '}
                <a href={`tel:${siteConfig.phone.tel}`} className="text-gold-600 hover:underline">
                  {siteConfig.phone.display}
                </a>
              </p>
              <p className="text-silver-700">
                <span className="font-semibold">Sähköposti:</span>{' '}
                <a href={`mailto:${siteConfig.email}`} className="text-gold-600 hover:underline">
                  {siteConfig.email}
                </a>
              </p>
              <p className="text-silver-700">
                <span className="font-semibold">Osoite:</span> {siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.city}
              </p>
            </div>
          </div>

          {/* Cancellation Policy */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 mb-8">
            <p className="text-sm text-yellow-800">
              <strong>Peruutusehdot:</strong> Maksuton peruutus viimeistään 24 tuntia ennen varattua aikaa.
              Peruutukset puhelimitse numeroon {siteConfig.phone.display}.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-semibold px-8 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Palaa etusivulle
            </Link>
            <Link
              href="/booking"
              className="bg-white border-2 border-gold-500 text-gold-600 hover:bg-gold-50 font-semibold px-8 py-3 rounded-xl transition-all duration-300"
            >
              Tee uusi varaus
            </Link>
          </div>

          {/* Add to Calendar */}
          <div className="mt-8 pt-8 border-t border-silver-200">
            <p className="text-sm text-silver-600">
              Voit lisätä varauksen kalenteriisi vahvistussähköpostin kautta.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function BookingSuccess() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-b from-green-50 to-white py-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-silver-600">Ladataan varauksen tietoja...</p>
        </div>
      </div>
    }>
      <BookingSuccessContent />
    </Suspense>
  )
}