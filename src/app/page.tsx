import Link from 'next/link'
import Hero from '../components/Hero'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ServicesGrid from '../components/ServicesGrid'
import BeforeAfterGallery from '../components/BeforeAfterGallery'
import FloatingContactWidget from '../components/FloatingContactWidget'
import { siteConfig } from '../lib/siteConfig'
import { getServices, getTestimonials } from '../lib/sanity'
import { mockServices, mockTestimonials } from '../lib/mockData'
import { Star, CheckCircle } from 'lucide-react'

export default async function HomePage() {
  // Memory-optimized data fetching with limits
  let services: any[] = []
  let testimonials: any[] = []

  try {
    const [servicesData, testimonialsData] = await Promise.allSettled([
      getServices(),
      getTestimonials()
    ])

    services = servicesData.status === 'fulfilled' ? servicesData.value : []
    testimonials = testimonialsData.status === 'fulfilled' ? testimonialsData.value.slice(0, 6) : []
  } catch (error) {
    // Fallback to mock data when Sanity is not available
  }

  // Fallback to all mock data if Sanity returns empty
  if (services.length === 0) services = mockServices
  if (testimonials.length === 0) testimonials = mockTestimonials.slice(0, 6)

  return (
    <>
      <Header />
      <Hero />

      <main className="bg-slate-50">
        {/* Trust Badges Section */}
        <section className="py-12 bg-white border-b border-silver-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {siteConfig.certifications.map((cert, index) => (
                <div key={index} className="flex flex-col items-center space-y-2 animate-fade-in" style={{animationDelay: `${index * 100}ms`}}>
                  <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-gold-600" />
                  </div>
                  <span className="text-sm font-medium text-slate-700">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                🚗 Laadukas palvelu
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 mb-6">
                Autopesupalvelumme
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
                Tarjoamme kattavan valikoiman laadukkaita autopesupalveluita, jotka antavat autollesi ansaitsemansa huippuluokan hoidon ja suojan.
              </p>
            </div>

            <ServicesGrid services={services} />

            <div className="text-center mt-12 animate-fade-in">
              <Link
                href="/services"
                className="inline-flex items-center bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group"
              >
                Tutustu palveluihimme
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Before/After Gallery Section */}
        <BeforeAfterGallery />

        {/* Testimonials Section */}
        <section className="py-20 bg-slate-50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in">
              <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                ⭐ Asiakaskokemukset
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-navy-900 mb-6">
                Mitä asiakkaamme sanovat
              </h2>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                Yli {siteConfig.features.customers} tyytyväistä asiakasta - lue heidän kokemuksiaan palvelustamme.
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial) => (
                <div key={testimonial._id} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <div className="flex text-gold-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-700 mb-4">"{testimonial.contentFi}"</p>
                  <p className="text-sm font-medium text-slate-900">- {testimonial.name}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12 animate-fade-in">
              <Link
                href="/testimonials"
                className="inline-flex items-center text-gold-600 hover:text-gold-700 font-semibold transition-colors group"
              >
                Lue lisää arvosteluja
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Premium CTA Section */}
        <section className="relative py-20 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700"></div>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-15"></div>

          <div className="relative container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <div className="inline-flex items-center bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-6 py-2 mb-8">
                <span className="text-purple-300 text-sm font-medium">
                  🚗 Varaa aika nyt ja säästä aikaa
                </span>
              </div>

              <h2 className="font-display text-4xl md:text-6xl font-bold text-white mb-6">
                Valmis antamaan autollesi
                <span className="block bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
                  ansaitsemansa hoidon?
                </span>
              </h2>

              <p className="text-xl md:text-2xl text-silver-200 mb-8 max-w-3xl mx-auto">
                Helppo online-varaus, laadukas palvelu, ja {siteConfig.features.guarantee}.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Link
                  href="/booking"
                  className="group relative bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-navy-900 font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <span className="relative z-10">Varaa aika nyt</span>
                  <div className="absolute inset-0 bg-gradient-to-r from-gold-400 to-gold-500 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>

                <Link
                  href="/services"
                  className="bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-semibold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:border-gold-400/50"
                >
                  Katso hinnat
                </Link>
              </div>

              <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400 mb-2">{siteConfig.features.rating}</div>
                  <div className="text-sm text-silver-300">⭐ Keskiarvo</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400 mb-2">{siteConfig.features.customers}</div>
                  <div className="text-sm text-silver-300">Tyytyväistä asiakasta</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gold-400 mb-2">{siteConfig.features.years}</div>
                  <div className="text-sm text-silver-300">Vuotta kokemusta</div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
      <FloatingContactWidget />
    </>
  )
}
