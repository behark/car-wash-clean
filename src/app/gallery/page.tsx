'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import VehicleImageWithFallback from '@/components/VehicleImageWithFallback'
import { Sparkles, Star } from 'lucide-react'

// Gallery images data - Using reliable placeholder service
const galleryImages = [
  {
    id: 1,
    before: 'https://placehold.co/800x600/cbd5e1/475569?text=Ennen+Pesua&font=roboto',
    after: 'https://placehold.co/800x600/34d399/ffffff?text=Jalkeen+Pesua&font=roboto',
    title: 'Ulkopesu & Kiillotus',
    description: 'Täydellinen ulkopesu ja vahakäsittely'
  },
  {
    id: 2,
    before: 'https://placehold.co/800x600/cbd5e1/475569?text=Likainen+Sisusta&font=roboto',
    after: 'https://placehold.co/800x600/34d399/ffffff?text=Puhdas+Sisusta&font=roboto',
    title: 'Sisäpuhdistus',
    description: 'Syvällinen sisustuksen puhdistus'
  },
  {
    id: 3,
    before: 'https://placehold.co/800x600/cbd5e1/475569?text=Ennen+Detailointia&font=roboto',
    after: 'https://placehold.co/800x600/34d399/ffffff?text=Premium+Tulos&font=roboto',
    title: 'Premium Detailing',
    description: 'Kokonaisvaltainen yksityiskohtainen puhdistus'
  },
  {
    id: 4,
    before: 'https://placehold.co/800x600/cbd5e1/475569?text=Likainen+Moottori&font=roboto',
    after: 'https://placehold.co/800x600/34d399/ffffff?text=Puhdas+Moottori&font=roboto',
    title: 'Moottoritilan Puhdistus',
    description: 'Ammattitasoinen moottoritilan puhdistus'
  },
  {
    id: 5,
    before: 'https://placehold.co/800x600/cbd5e1/475569?text=Tahriintuneet+Vanteet&font=roboto',
    after: 'https://placehold.co/800x600/34d399/ffffff?text=Kiiluvat+Vanteet&font=roboto',
    title: 'Vanteiden Kiillotus',
    description: 'Vanteiden erikoiskäsittely ja kiillotus'
  },
  {
    id: 6,
    before: 'https://placehold.co/800x600/cbd5e1/475569?text=Ennen+Suojausta&font=roboto',
    after: 'https://placehold.co/800x600/34d399/ffffff?text=Suojattu+Pinta&font=roboto',
    title: 'Keraamisuojaus',
    description: 'Kestävä keraamisuojaus'
  }
]

export default function GalleryPage() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null)

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white py-16 sm:py-20 lg:py-24">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          </div>

          <div className="relative container mx-auto px-4 text-center">
            <div className="inline-flex items-center bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-4 sm:px-6 py-2 mb-6 sm:mb-8">
              <Sparkles className="w-4 h-4 mr-2" />
              <span className="text-purple-200 text-xs sm:text-sm font-medium">
                Ennen & Jälkeen
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Työnäytteitä
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-purple-100 max-w-3xl mx-auto px-4">
              Katso, miten autosi voi näyttää huippuluokan pesun ja hoidon jälkeen.
              Jokainen auto ansaitsee parhaan mahdollisen hoidon!
            </p>
          </div>
        </section>

        {/* Gallery Grid */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-12 sm:mb-16">
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">500+</div>
                <div className="text-xs sm:text-sm text-slate-600">Tyytyväistä asiakasta</div>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">4.9</div>
                <div className="text-xs sm:text-sm text-slate-600">⭐ Keskiarvo</div>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">15+</div>
                <div className="text-xs sm:text-sm text-slate-600">Vuotta kokemusta</div>
              </div>
              <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm text-center">
                <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-xs sm:text-sm text-slate-600">Tyytyväisyystakuu</div>
              </div>
            </div>

            {/* Before/After Gallery */}
            <div className="space-y-12 sm:space-y-16">
              {galleryImages.map((item, index) => (
                <div
                  key={item.id}
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
                  style={{
                    animationDelay: `${index * 100}ms`,
                    animation: 'fadeIn 0.6s ease-out both'
                  }}
                >
                  <div className="p-4 sm:p-6 lg:p-8">
                    <div className="text-center mb-6 sm:mb-8">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-slate-600">{item.description}</p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8">
                      {/* Before Image */}
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center justify-center gap-2 text-slate-600">
                          <div className="h-px flex-1 bg-slate-300"></div>
                          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider">
                            Ennen
                          </span>
                          <div className="h-px flex-1 bg-slate-300"></div>
                        </div>
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                          <VehicleImageWithFallback
                            src={item.before}
                            alt={`${item.title} - Ennen`}
                            fill
                            type="before"
                            className="rounded-xl"
                            priority={index < 2}
                          />
                        </div>
                      </div>

                      {/* After Image */}
                      <div className="space-y-3 sm:space-y-4">
                        <div className="flex items-center justify-center gap-2 text-emerald-600">
                          <div className="h-px flex-1 bg-emerald-300"></div>
                          <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider flex items-center gap-1">
                            <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                            Jälkeen
                          </span>
                          <div className="h-px flex-1 bg-emerald-300"></div>
                        </div>
                        <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-slate-100">
                          <VehicleImageWithFallback
                            src={item.after}
                            alt={`${item.title} - Jälkeen`}
                            fill
                            type="after"
                            className="rounded-xl"
                            priority={index < 2}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA Section */}
            <div className="mt-12 sm:mt-16 text-center bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl p-8 sm:p-12 lg:p-16 text-white">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                Haluatko autosi näyttämään tältä?
              </h2>
              <p className="text-base sm:text-lg text-purple-100 mb-6 sm:mb-8 max-w-2xl mx-auto">
                Varaa aika nyt ja anna autosi ansaita huippuluokan hoidon!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/booking"
                  className="inline-flex items-center justify-center bg-white text-purple-600 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-purple-50 transition-colors text-sm sm:text-base"
                >
                  Varaa aika nyt
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center justify-center bg-purple-500/20 backdrop-blur-md border border-white/20 hover:bg-purple-500/30 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-colors text-sm sm:text-base"
                >
                  Katso palvelut
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Customer Reviews */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 mb-4">
                Mitä asiakkaamme sanovat
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
              {[
                { name: 'Matti V.', rating: 5, text: 'Erinomainen palvelu! Auto näyttää uudelta.' },
                { name: 'Laura K.', rating: 5, text: 'Huippuammattilaisia. Suosittelen lämpimästi!' },
                { name: 'Jukka P.', rating: 5, text: 'Paras autopsu Helsingissä. Ehdottomasti!' }
              ].map((review, index) => (
                <div key={index} className="bg-slate-50 rounded-xl p-6 shadow-sm">
                  <div className="flex text-yellow-400 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-4 text-sm sm:text-base">"{review.text}"</p>
                  <p className="text-sm font-semibold text-slate-900">— {review.name}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
