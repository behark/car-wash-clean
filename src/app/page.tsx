import Link from 'next/link'
import { Suspense } from 'react'
import dynamic from 'next/dynamic'
import { Metadata } from 'next'
import Hero from '../components/Hero'
import Header from '../components/Header'
import Footer from '../components/Footer'
import ServicesGrid from '../components/ServicesGrid'
import FloatingContactWidget from '../components/FloatingContactWidget'
import { siteConfig } from '../lib/siteConfig'
import { getServices, getTestimonials } from '../lib/sanity'
import { mockServices, mockTestimonials } from '../lib/mockData'
import { Star, CheckCircle, Sparkles } from 'lucide-react'

// Lazy load heavy components (Next.js 15 compatible)
const BeforeAfterGallery = dynamic(() => import('../components/BeforeAfterGallery'), {
  loading: () => (
    <div className="py-16 bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="container mx-auto px-4 text-center">
        <div className="animate-pulse">
          <div className="h-8 bg-slate-200 rounded w-48 mx-auto mb-4"></div>
          <div className="h-64 bg-slate-200 rounded-xl"></div>
        </div>
      </div>
    </div>
  )
  // Note: ssr: false removed - not compatible with Next.js 15 Server Components
})

// SEO Metadata
export const metadata: Metadata = {
  title: `${siteConfig.name} - Ammattitasoinen autopesu Helsingissä`,
  description: `Laadukas autopesu, sisäpuhdistus ja erikoispalvelut Helsingissä. Yli ${siteConfig.features.customers} tyytyväistä asiakasta. Varaa aika helposti verkossa!`,
  keywords: ['autopesu Helsinki', 'autopesu', 'autonpesu', 'sisäpuhdistus', 'vahaus', 'kiillotus', siteConfig.name],
  openGraph: {
    title: `${siteConfig.name} - Ammattitasoinen autopesu Helsingissä`,
    description: `Laadukas autopesu ja erikoispalvelut. ${siteConfig.features.rating} tähteä, ${siteConfig.features.customers} tyytyväistä asiakasta.`,
    type: 'website',
    locale: 'fi_FI',
  },
}

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
        <section className="py-8 sm:py-12 bg-white border-b border-slate-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-8 text-center">
              {siteConfig.certifications.map((cert, index) => (
                <div 
                  key={index} 
                  className="flex flex-col items-center space-y-2 animate-fade-in" 
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-slate-700">{cert}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 sm:mb-16 animate-fade-in">
              <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                <Sparkles className="w-4 h-4 mr-2" />
                Laadukas palvelu
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
                Autopesupalvelumme
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed px-4">
                Tarjoamme kattavan valikoiman laadukkaita autopesupalveluita, jotka antavat autollesi ansaitsemansa huippuluokan hoidon ja suojan.
              </p>
            </div>

            <ServicesGrid services={services} />

            <div className="text-center mt-8 sm:mt-12 animate-fade-in">
              <Link
                href="/services"
                className="inline-flex items-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl group text-sm sm:text-base"
              >
                Tutustu palveluihimme
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Before/After Gallery Section - Lazy Loaded */}
        <Suspense fallback={
          <div className="py-16 bg-gradient-to-br from-slate-50 to-purple-50">
            <div className="container mx-auto px-4 text-center">
              <div className="animate-pulse space-y-4">
                <div className="h-8 bg-slate-200 rounded w-48 mx-auto"></div>
                <div className="h-64 bg-slate-200 rounded-xl"></div>
              </div>
            </div>
          </div>
        }>
          <BeforeAfterGallery />
        </Suspense>

        {/* Testimonials Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 sm:mb-16 animate-fade-in">
              <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
                ⭐ Asiakaskokemukset
              </div>
              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 mb-4 sm:mb-6">
                Mitä asiakkaamme sanovat
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto px-4">
                Yli {siteConfig.features.customers} tyytyväistä asiakasta - lue heidän kokemuksiaan palvelustamme.
              </p>
            </div>

            {/* Testimonials Grid */}
            <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div 
                  key={testimonial._id} 
                  className="bg-gradient-to-br from-slate-50 to-purple-50 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-current" />
                      ))}
                    </div>
                  </div>
                  <p className="text-slate-700 mb-4 text-sm sm:text-base">"{testimonial.contentFi}"</p>
                  <p className="text-sm font-semibold text-slate-900">— {testimonial.name}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-8 sm:mt-12 animate-fade-in">
              <Link
                href="/gallery"
                className="inline-flex items-center text-purple-600 hover:text-purple-700 font-semibold transition-colors group text-sm sm:text-base"
              >
                Katso lisää galleriassa
                <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Premium CTA Section */}
        <section className="relative py-12 sm:py-16 lg:py-20 overflow-hidden">
          {/* Background Gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900"></div>
          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          </div>

          <div className="relative container mx-auto px-4 text-center">
            <div className="max-w-4xl mx-auto animate-fade-in">
              <div className="inline-flex items-center bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-4 sm:px-6 py-2 mb-6 sm:mb-8">
                <span className="text-purple-300 text-xs sm:text-sm font-medium">
                  🚗 Varaa aika nyt ja säästä aikaa
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6">
                Valmis antamaan autollesi
                <span className="block bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
                  ansaitsemansa hoidon?
                </span>
              </h2>

              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-200 mb-6 sm:mb-8 max-w-3xl mx-auto px-4">
                Helppo online-varaus, laadukas palvelu, ja {siteConfig.features.guarantee}.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
                <Link
                  href="/booking"
                  className="w-full sm:w-auto group relative bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl"
                >
                  <span className="relative z-10">Varaa aika nyt</span>
                </Link>

                <Link
                  href="/services"
                  className="w-full sm:w-auto bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-xl text-base sm:text-lg transition-all duration-300 hover:border-purple-400/50"
                >
                  Katso hinnat
                </Link>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 mt-12 sm:mt-16 pt-8 sm:pt-16 border-t border-white/20">
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">{siteConfig.features.rating}</div>
                  <div className="text-xs sm:text-sm text-slate-300">⭐ Keskiarvo</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">{siteConfig.features.customers}</div>
                  <div className="text-xs sm:text-sm text-slate-300">Tyytyväistä asiakasta</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl sm:text-3xl font-bold text-purple-400 mb-2">{siteConfig.features.years}</div>
                  <div className="text-xs sm:text-sm text-slate-300">Vuotta kokemusta</div>
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
