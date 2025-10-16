'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { siteConfig } from '@/lib/siteConfig'
import { Star, Quote, ThumbsUp, Award } from 'lucide-react'

// Extended testimonials data
const testimonials = [
  {
    id: 1,
    name: 'Matti Virtanen',
    rating: 5,
    date: '2 viikkoa sitten',
    service: 'Premium Pesu',
    text: 'Erinomainen palvelu! Auto näyttää ja tuoksuu kuin uudelta. Henkilökunta oli erittäin ystävällistä ja ammattimaista. Suosittelen lämpimästi!',
    verified: true
  },
  {
    id: 2,
    name: 'Laura Korhonen',
    rating: 5,
    date: '3 viikkoa sitten',
    service: 'Sisäpuhdistus',
    text: 'Parasta palvelua mitä olen saanut! Auton sisusta oli todella likainen, mutta he saivat sen näyttämään upealta. Voin vilpittömästi suositella.',
    verified: true
  },
  {
    id: 3,
    name: 'Jukka Nieminen',
    rating: 5,
    date: '1 kuukausi sitten',
    service: 'Vahapesu',
    text: 'Huippuammattilaisia! Autoni kiilto on uskomaton vahauksen jälkeen. Hinta-laatusuhde erinomainen. Tulen varmasti uudelleen.',
    verified: true
  },
  {
    id: 4,
    name: 'Sanna Mäkinen',
    rating: 5,
    date: '1 kuukausi sitten',
    service: 'Keraamisuojaus',
    text: 'Keraamisuojaus oli investoinnin arvoinen! Auto pysyy puhtaana pidempään ja vesi valuu pois kuin taikuutta. Palvelu oli nopeaa ja tehokasta.',
    verified: true
  },
  {
    id: 5,
    name: 'Pekka Lahtinen',
    rating: 5,
    date: '2 kuukautta sitten',
    service: 'Moottoritilan Pesu',
    text: 'Moottoritila näyttää upealta pesun jälkeen. Todella huolellista työtä. Hinta oli kohtuullinen ja lopputulos ylitti odotukset.',
    verified: true
  },
  {
    id: 6,
    name: 'Tiina Järvinen',
    rating: 5,
    date: '2 kuukautta sitten',
    service: 'Premium Detail',
    text: 'Wow! En uskonut että autoni voi näyttää näin hyvältä. Jokainen yksityiskohta hoidettu täydellisesti. Paras autopesu Helsingissä!',
    verified: true
  },
  {
    id: 7,
    name: 'Mikko Saari',
    rating: 5,
    date: '3 kuukautta sitten',
    service: 'Peruspesu',
    text: 'Nopea ja tehokas palvelu. Vaikka kyseessä oli peruspesu, lopputulos oli erinomainen. Henkilökunta ystävällistä ja ammattitaitoista.',
    verified: true
  },
  {
    id: 8,
    name: 'Anna Lehtonen',
    rating: 5,
    date: '3 kuukautta sitten',
    service: 'Sisä- ja ulkopesu',
    text: 'Täydellinen palvelu alusta loppuun! Auto oli todella likainen, mutta lopputulos oli upea. Kiitos ammattimaisesta työstä!',
    verified: true
  },
  {
    id: 9,
    name: 'Heikki Rantanen',
    rating: 5,
    date: '4 kuukautta sitten',
    service: 'Vanteiden kiillotus',
    text: 'Vanteet näyttävät uusilta! Erittäin tyytyväinen palveluun. Varaus oli helppoa ja aikataulu piti täydellisesti.',
    verified: true
  },
  {
    id: 10,
    name: 'Kaisa Virtanen',
    rating: 5,
    date: '4 kuukautta sitten',
    service: 'Premium Pesu',
    text: 'Erinomaista työtä! Autoni on 10 vuotta vanha, mutta pesun jälkeen se näyttää paljon uudemmalta. Suosittelen kaikille!',
    verified: true
  },
  {
    id: 11,
    name: 'Tommi Laine',
    rating: 5,
    date: '5 kuukautta sitten',
    service: 'Vahapesu',
    text: 'Paras vahapesu mitä olen saanut! Auto kiiltää ja vesi valuu pois täydellisesti. Palvelu oli nopeaa ja hinta kohdallaan.',
    verified: true
  },
  {
    id: 12,
    name: 'Riikka Salo',
    rating: 5,
    date: '5 kuukautta sitten',
    service: 'Sisäpuhdistus',
    text: 'Lapset ja lemmikkieläimet olivat tehneet autosta melkoisen sotkun, mutta Kiilto & Loisto sai sisustuksen näyttämään upealta! Kiitos!',
    verified: true
  }
]

export default function TestimonialsPage() {
  const [filter, setFilter] = useState<'all' | 5 | 4>('all')

  const filteredTestimonials = filter === 'all' 
    ? testimonials 
    : testimonials.filter(t => t.rating === filter)

  const averageRating = siteConfig.features.rating
  const totalReviews = testimonials.length

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
            <div className="inline-flex items-center bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-4 sm:px-6 py-2 mb-6 sm:mb-8">
              <Star className="w-4 h-4 mr-2 fill-yellow-400 text-yellow-400" />
              <span className="text-yellow-200 text-xs sm:text-sm font-medium">
                {averageRating} / 5.0 Keskiarvo
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Asiakasarvostelut
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-purple-100 max-w-3xl mx-auto px-4">
              Lue mitä asiakkaamme sanovat palvelustamme. Yli {siteConfig.features.customers} tyytyväistä asiakasta!
            </p>
          </div>
        </section>

        {/* Stats Overview */}
        <section className="py-8 sm:py-12 bg-white">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">
                  {averageRating}
                </div>
                <div className="flex justify-center text-yellow-400 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-current" />
                  ))}
                </div>
                <div className="text-xs sm:text-sm text-slate-600">Keskiarvo</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">{totalReviews}</div>
                <div className="text-xs sm:text-sm text-slate-600">Arvostelua</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">100%</div>
                <div className="text-xs sm:text-sm text-slate-600">Suosittelisi</div>
              </div>
              
              <div className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-purple-600 mb-2">{siteConfig.features.customers}</div>
                <div className="text-xs sm:text-sm text-slate-600">Asiakasta</div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Tabs */}
        <section className="py-6 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="flex justify-center gap-2 sm:gap-4">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base ${
                  filter === 'all'
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                Kaikki ({testimonials.length})
              </button>
              <button
                onClick={() => setFilter(5)}
                className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-colors flex items-center gap-1 text-sm sm:text-base ${
                  filter === 5
                    ? 'bg-purple-600 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                5 Tähteä
              </button>
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-7xl mx-auto">
              {filteredTestimonials.map((testimonial, index) => (
                <div
                  key={testimonial.id}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  style={{
                    animationDelay: `${index * 50}ms`,
                    animation: 'fadeIn 0.6s ease-out both'
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-900">{testimonial.name}</h3>
                        {testimonial.verified && (
                          <div className="flex items-center gap-1 bg-green-100 text-green-700 px-2 py-0.5 rounded-full text-xs">
                            <ThumbsUp className="w-3 h-3" />
                            <span>Vahvistettu</span>
                          </div>
                        )}
                      </div>
                      <div className="flex text-yellow-400 mb-1">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <p className="text-xs text-slate-500">{testimonial.date}</p>
                    </div>
                    <Quote className="w-8 h-8 text-purple-200" />
                  </div>

                  {/* Service Badge */}
                  <div className="inline-flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-medium mb-3">
                    {testimonial.service}
                  </div>

                  {/* Review Text */}
                  <p className="text-slate-700 text-sm leading-relaxed">
                    "{testimonial.text}"
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-12 sm:py-16 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <Award className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-6 text-yellow-300" />
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                Liity tyytyväisten asiakkaidemme joukkoon!
              </h2>
              <p className="text-base sm:text-lg text-purple-100 mb-6 sm:mb-8">
                Varaa aika nyt ja koe miksi olemme Helsingin luotetuin autopesupalvelu.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/booking"
                  className="inline-flex items-center justify-center bg-white text-purple-600 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-purple-50 transition-colors"
                >
                  Varaa aika nyt
                </a>
                <a
                  href="/services"
                  className="inline-flex items-center justify-center bg-purple-500/20 backdrop-blur-md border border-white/20 hover:bg-purple-500/30 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-colors"
                >
                  Katso palvelut
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8">
              Luotettu ja sertifioitu
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {siteConfig.certifications.map((cert, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mb-2">
                    <Award className="w-6 h-6 text-purple-600" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-700 text-center">{cert}</span>
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
