import Link from 'next/link'
import Image from 'next/image'
import { Star, CheckCircle, MapPin, Clock, Phone, Mail, Shield, Award } from 'lucide-react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { siteConfig } from '../lib/siteConfig'
import { getServices, getTestimonials } from '../lib/sanity'
import { mockServices, mockTestimonials } from '../lib/mockData'

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

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-navy-900 overflow-hidden">
        <div className="absolute inset-0 bg-[url('/images/hero-car-wash-professional.jpg')] bg-cover bg-center opacity-90"></div>
        <div className="absolute inset-0 bg-black/30"></div>

        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-6 py-2 mb-8">
              <span className="text-purple-300 text-sm font-medium">
                🚗 Ammattitaitoista autopesupalvelua
              </span>
            </div>

            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              {siteConfig.tagline}
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-silver-200">
              {siteConfig.subtitle} - Laadukas palvelu, luotettava tulokset.
            </p>

            {/* Opening Hours & Contact in Hero */}
            <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-6 text-silver-200">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-gold-400" />
                <span className="text-sm font-medium">Ma-Pe 8:00-18:00 | La 9:00-16:00</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-5 h-5 text-gold-400" />
                <span className="text-sm font-medium">+358 40 123 4567</span>
              </div>
            </div>

            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                href="/booking"
                className="rounded-md bg-gold-600 px-6 py-3 text-sm font-semibold text-navy-900 shadow-sm hover:bg-gold-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold-600 transition-colors"
              >
                Varaa aika nyt
              </Link>
              <Link
                href="/services"
                className="text-sm font-semibold leading-6 text-white hover:text-gold-300 transition-colors"
              >
                Katso palvelut <span aria-hidden="true">→</span>
              </Link>
            </div>

            {/* Trust indicators */}
            <div className="mt-16 grid grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-gold-400">{siteConfig.features.rating}</div>
                <div className="text-sm text-silver-300">⭐ Keskiarvo</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold-400">{siteConfig.features.customers}</div>
                <div className="text-sm text-silver-300">Tyytyväistä asiakasta</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gold-400">{siteConfig.features.years}</div>
                <div className="text-sm text-silver-300">Vuotta kokemusta</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Section */}
      <section className="py-12 bg-white border-b border-silver-100">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
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
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              🚗 Laadukas palvelu
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              Autopesupalvelumme
            </h2>
            <p className="mt-6 text-xl leading-8 text-slate-600 max-w-3xl mx-auto">
              Tarjoamme kattavan valikoiman laadukkaita autopesupalveluita
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {services.map((service) => (
              <div key={service._id} className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 p-6 border border-slate-100 group hover:-translate-y-1">
                {/* Service Icon */}
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-50 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm font-bold">🚗</span>
                  </div>
                </div>

                {/* Service Title & Price */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold text-navy-900 mb-2">{service.titleFi}</h3>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-500">Alkaen</span>
                    <span className="text-2xl font-bold text-purple-600">{service.price}€</span>
                  </div>
                </div>

                {/* Service Description */}
                <p className="text-slate-600 text-sm mb-4 line-clamp-3">{service.descriptionFi}</p>

                {/* Service Details */}
                <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                  <span>👥 {service.capacity} paikkaa</span>
                </div>

                {/* Book Button */}
                <Link href="/booking" className="block w-full">
                  <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2.5 px-4 rounded-xl transition-colors text-sm">
                    Varaa nyt
                  </button>
                </Link>

                {/* Satisfaction Badge */}
                <div className="flex items-center justify-center mt-3 text-xs text-slate-500">
                  <span>✅ 100% Tyytyväisyystakuu</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/services"
              className="inline-flex items-center bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Tutustu kaikkiin palveluihimme
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              ⭐ Asiakaskokemukset
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              Mitä asiakkaamme sanovat
            </h2>
            <p className="mt-6 text-xl leading-8 text-slate-600">
              Yli {siteConfig.features.customers} tyytyväistä asiakasta
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial._id} className="bg-slate-50 rounded-xl p-6">
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
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-blue-50">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              🛡️ Takuu
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              100% Tyytyväisyystakuu
            </h2>
            <p className="mt-6 text-xl leading-8 text-slate-600 max-w-3xl mx-auto">
              Takaamme täydellisen tuloksen jokaisessa pesossa. Jos et ole tyytyväinen, korjaamme sen ilmaiseksi.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Laatutakuu</h3>
              <p className="text-slate-600">Ammattilaisten suorittama pesu laadukkailla tuotteilla</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Kokemusta</h3>
              <p className="text-slate-600">{siteConfig.features.years} vuotta autopesualan kokemusta</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-navy-900 mb-2">Ympäristöystävällinen</h3>
              <p className="text-slate-600">Käytämme vain ympäristöystävällisiä pesuaineita</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact & Location Section */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-4">
              📍 Yhteystiedot
            </div>
            <h2 className="text-4xl font-bold tracking-tight text-navy-900 sm:text-5xl">
              Löydä meidät
            </h2>
            <p className="mt-6 text-xl leading-8 text-slate-600">
              Kätevästi sijaitseva autopesula helpoilla yhteyksillä
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-1">Osoite</h3>
                  <p className="text-slate-600">{siteConfig.name}<br />{siteConfig.address.street}<br />{siteConfig.address.postalCode} {siteConfig.address.city}</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-1">Puhelin</h3>
                  <p className="text-slate-600">+358 40 123 4567</p>
                  <p className="text-sm text-slate-500">Ma-Pe 8:00-18:00</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-1">Sähköposti</h3>
                  <p className="text-slate-600">info@autopesclean.fi</p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-gold-600" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-navy-900 mb-1">Aukioloajat</h3>
                  <div className="text-slate-600 space-y-1">
                    <p>Maanantai - Perjantai: 8:00 - 18:00</p>
                    <p>Lauantai: 9:00 - 16:00</p>
                    <p>Sunnuntai: 10:00 - 15:00</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-slate-100 rounded-xl p-8 flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <MapPin className="w-16 h-16 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-600 mb-2">Kartta</h3>
                <p className="text-slate-500">Google Maps integrointi</p>
                <p className="text-sm text-slate-400 mt-2">Teollisuuskatu 12, Helsinki</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-700"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=1920&auto=format&fit=crop')] bg-cover bg-center opacity-15"></div>

        <div className="relative mx-auto max-w-7xl px-6 text-center lg:px-8">
          <h2 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
            Valmis antamaan autollesi
            <span className="block bg-gradient-to-r from-purple-400 to-purple-200 bg-clip-text text-transparent">
              ansaitsemansa hoidon?
            </span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-xl leading-8 text-silver-200">
            Helppo online-varaus, laadukas palvelu, ja {siteConfig.features.guarantee}.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/booking"
              className="rounded-md bg-gold-600 px-6 py-3 text-lg font-semibold text-navy-900 shadow-sm hover:bg-gold-500 transition-colors"
            >
              Varaa aika nyt
            </Link>
            <Link
              href="/services"
              className="rounded-md bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 text-white font-semibold px-6 py-3 text-lg transition-all"
            >
              Katso hinnat
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}