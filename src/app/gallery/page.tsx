import BookingCta from '@/components/BookingCta'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { siteConfig } from '@/lib/siteConfig'

export const metadata: Metadata = {
  title: 'Galleria – Kuvia työstämme',
  description:
    'Katso kuvia Autopesu Kiilto & Loiston työn tuloksista: käsinpesut, sisäpuhdistukset, vahaukset ja kiillotukset Helsingissä.',
}

const galleryImages = Array.from({ length: 12 }, (_, i) => ({
  src: `/images/gallery/car-wash-${String(i + 1).padStart(2, '0')}.jpg`,
  alt: `Autopesu Kiilto & Loisto – työnäyte ${i + 1}`,
}))

export default function GalleryPage() {
  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 pt-20">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white py-16 sm:py-20">
          <div className="relative container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
              Galleria
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-purple-100 max-w-3xl mx-auto">
              Kuvia työmme tuloksista – jokainen auto saa ansaitsemansa huolellisen käsittelyn.
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto">
              {galleryImages.map((image, index) => (
                <div
                  key={image.src}
                  className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-slate-200"
                >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    priority={index < 3}
                  />
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="text-center mt-12">
              <p className="text-lg text-slate-700 mb-6">
                Haluatko autollesi saman käsittelyn?
              </p>
              <BookingCta className="inline-block bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg" size="lg">
                Varaa aika nyt
              </BookingCta>
              {siteConfig.booking.onlineEnabled && (
              <p className="text-sm text-slate-500 mt-4">
                tai soita <a href={`tel:${siteConfig.phone.tel}`} className="text-purple-600 font-medium">{siteConfig.phone.display}</a>
              </p>
              )}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
