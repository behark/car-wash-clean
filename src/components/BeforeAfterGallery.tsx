'use client'

import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight, Star, Clock } from 'lucide-react'

interface BeforeAfterImage {
  id: string
  before: string
  after: string
  titleFi: string
  descriptionFi: string
  serviceFi: string
  duration: string
  rating: number
}

const beforeAfterImages: BeforeAfterImage[] = [
  {
    id: '1',
    before: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop',
    titleFi: 'Täydellinen Auton Muodonmuutos',
    descriptionFi: 'Pölyisestä ja laiminlyödystä näyttelysalin kuntoon',
    serviceFi: 'Premium Yksityiskohtainen Palvelu',
    duration: '90 min',
    rating: 5
  },
  {
    id: '2',
    before: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop',
    titleFi: 'Sisätilojen Syvapesu',
    descriptionFi: 'Ammattimainen sisätilojen kunnostus ja desinfioiminen',
    serviceFi: 'Sisätilojen Yksityiskohdat',
    duration: '60 min',
    rating: 5
  },
  {
    id: '3',
    before: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=800&auto=format&fit=crop',
    after: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=800&auto=format&fit=crop',
    titleFi: 'Maastoauton Täydellinen Muodonmuutos',
    descriptionFi: 'Suurten ajoneuvojen erikoispesu ja suojaus',
    serviceFi: 'Maastoauton Premium Pesu',
    duration: '75 min',
    rating: 4.9
  }
]

export default function BeforeAfterGallery() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showAfter, setShowAfter] = useState(false)

  const currentImage = beforeAfterImages[currentIndex]

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % beforeAfterImages.length)
    setShowAfter(false)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + beforeAfterImages.length) % beforeAfterImages.length)
    setShowAfter(false)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
            ⭐ Ennen & Jälkeen
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-navy-900 mb-4">
            Katso Uskomattomia Tuloksia
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Todelliset muutokset tyytyväisiltä asiakkailtamme
          </p>
        </div>

        {/* Main Gallery */}
        <div className="max-w-4xl mx-auto">
          {/* Image Display */}
          <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-gray-200 mb-6">
            <div className="relative aspect-[16/10]">
              {/* Before Image */}
              <div className={`absolute inset-0 transition-opacity duration-500 ${showAfter ? 'opacity-0' : 'opacity-100'}`}>
                <Image
                  src={currentImage.before}
                  alt={`Ennen: ${currentImage.titleFi}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                  priority={currentIndex === 0}
                />
                <div className="absolute top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  ENNEN
                </div>
              </div>

              {/* After Image */}
              <div className={`absolute inset-0 transition-opacity duration-500 ${showAfter ? 'opacity-100' : 'opacity-0'}`}>
                <Image
                  src={currentImage.after}
                  alt={`Jälkeen: ${currentImage.titleFi}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 800px"
                />
                <div className="absolute top-4 right-4 bg-green-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  JÄLKEEN
                </div>
              </div>

              {/* Toggle Button */}
              <button
                onClick={() => setShowAfter(!showAfter)}
                className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/90 backdrop-blur-sm hover:bg-white text-navy-900 font-semibold px-6 py-3 rounded-full shadow-lg transition-all hover:scale-105 active:scale-95 touch-manipulation"
              >
                {showAfter ? '← Näytä Ennen' : 'Näytä Jälkeen →'}
              </button>
            </div>
          </div>

          {/* Image Info */}
          <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
            <h3 className="text-2xl font-bold text-navy-900 mb-2">
              {currentImage.titleFi}
            </h3>
            <p className="text-slate-600 mb-4">{currentImage.descriptionFi}</p>

            <div className="flex flex-wrap items-center gap-4 text-sm">
              <div className="flex items-center space-x-2 text-purple-600">
                <span className="font-medium">✨ {currentImage.serviceFi}</span>
              </div>
              <div className="flex items-center space-x-2 text-blue-600">
                <Clock className="w-4 h-4" />
                <span>{currentImage.duration}</span>
              </div>
              <div className="flex items-center space-x-2 text-yellow-600">
                <Star className="w-4 h-4 fill-current" />
                <span className="font-medium">{currentImage.rating}/5</span>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center space-x-4">
            <button
              onClick={prevImage}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95 touch-manipulation"
              aria-label="Edellinen kuva"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <div className="flex items-center space-x-2">
              {beforeAfterImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setCurrentIndex(index)
                    setShowAfter(false)
                  }}
                  className={`w-3 h-3 rounded-full transition-all touch-manipulation ${
                    index === currentIndex
                      ? 'bg-purple-600 scale-125'
                      : 'bg-gray-300 hover:bg-purple-300'
                  }`}
                  aria-label={`Kuva ${index + 1}`}
                />
              ))}
            </div>

            <button
              onClick={nextImage}
              className="p-3 bg-white rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-110 active:scale-95 touch-manipulation"
              aria-label="Seuraava kuva"
            >
              <ChevronRight className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            <div className="text-center bg-white rounded-xl p-4 md:p-6 shadow-lg">
              <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">500+</div>
              <div className="text-xs md:text-sm text-slate-600">Tyytyväistä Asiakasta</div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 md:p-6 shadow-lg">
              <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">4.9</div>
              <div className="text-xs md:text-sm text-slate-600">Keskiarvo</div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 md:p-6 shadow-lg">
              <div className="text-2xl md:text-3xl font-bold text-green-600 mb-1">100%</div>
              <div className="text-xs md:text-sm text-slate-600">Tyytyväisyys</div>
            </div>
            <div className="text-center bg-white rounded-xl p-4 md:p-6 shadow-lg">
              <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">24h</div>
              <div className="text-xs md:text-sm text-slate-600">Nopea Palvelu</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
