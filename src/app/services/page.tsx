'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { siteConfig } from '@/lib/siteConfig'
import { Check, Star, Sparkles, Shield, Droplets, Car, Zap, Award } from 'lucide-react'
import Link from 'next/link'

// Services data with detailed information
const services = [
  {
    id: 1,
    category: 'Peruspalvelut',
    items: [
      {
        name: 'Peruspesu',
        price: '25€',
        description: 'Ulkopuolinen pesu painepesurin ja shampoon avulla',
        features: [
          'Koko auton ulkopinta',
          'Renkaat ja vanteet',
          'Ikkunat ja peilit',
          'Nopea ja tehokas'
        ],
        popular: false,
        icon: Car
      },
      {
        name: 'Premium Pesu',
        price: '45€',
        description: 'Kattava sisä- ja ulkopuhdistus',
        features: [
          'Kaikki peruspesussa',
          'Sisäpuhdistus',
          'Mattien imurointi',
          'Kojelaudan pyyhintä',
          'Ovien sisäpuolet'
        ],
        popular: true,
        icon: Sparkles
      },
      {
        name: 'Express Pesu',
        price: '35€',
        description: 'Nopea mutta tehokas kokonaispuhdistus',
        features: [
          'Ulkopesu',
          'Nopea sisustuksen imurointi',
          'Ikkunat',
          'Täydellinen kiireisille'
        ],
        popular: false,
        icon: Zap
      }
    ]
  },
  {
    id: 2,
    category: 'Erikoispalvelut',
    items: [
      {
        name: 'Vahapesu',
        price: '65€',
        description: 'Ulkopesu + vahan levitys ja kiillotus',
        features: [
          'Perusteellinen pesu',
          'Premium vaha',
          'Käsin levitys',
          'Pitkäkestoinen suoja',
          'Loistava kiilto'
        ],
        popular: true,
        icon: Star
      },
      {
        name: 'Keraamisuojaus',
        price: '199€',
        description: 'Huippuluokan keraamisuojaus auton pinnalle',
        features: [
          'Pitkäkestoinen suoja (1-2 vuotta)',
          'Nanokeraami',
          'Vesihylkivä pinta',
          'UV-suoja',
          'Helppo puhdistettavuus',
          'Takuu'
        ],
        popular: true,
        icon: Shield
      },
      {
        name: 'Sisäpuhdistus Pro',
        price: '85€',
        description: 'Syvällinen sisustuksen puhdistus ja hoito',
        features: [
          'Perusteellinen imurointi',
          'Verhoilun pesu',
          'Ovien ja kojelaudan puhdistus',
          'Hajunpoisto',
          'Muovien hoito',
          'Nahkaistuimien hoito'
        ],
        popular: false,
        icon: Sparkles
      }
    ]
  },
  {
    id: 3,
    category: 'Premium Palvelut',
    items: [
      {
        name: 'Premium Detail',
        price: '149€',
        description: 'Täydellinen yksityiskohtainen puhdistus ja hoito',
        features: [
          'Täydellinen ulko- ja sisäpuhdistus',
          'Kiillotus',
          'Vahakäsittely',
          'Moottoritilan puhdistus',
          'Ovien ja tankojen puhdistus',
          'Täydellinen lopputulos'
        ],
        popular: true,
        icon: Award
      },
      {
        name: 'Moottoritilan Pesu',
        price: '55€',
        description: 'Ammattitasoinen moottoritilan puhdistus',
        features: [
          'Turvallinen höyrypuhdistus',
          'Rasvanpoisto',
          'Muovien suojaus',
          'Yksityiskohtainen työ',
          'Näyttää kuin uudelta'
        ],
        popular: false,
        icon: Droplets
      },
      {
        name: 'Vanteiden Kiillotus',
        price: '45€',
        description: 'Erikoiskäsittely vanteille',
        features: [
          'Perusteellinen puhdistus',
          'Jarrupölyn poisto',
          'Kiillotus',
          'Suojausaine',
          'Loistava lopputulos'
        ],
        popular: false,
        icon: Star
      },
      {
        name: 'Nahkaistuimien Hoito',
        price: '75€',
        description: 'Erikoishoito nahkapinnoille',
        features: [
          'Perusteellinen puhdistus',
          'Nahkaöljy',
          'UV-suoja',
          'Säilyttää nahan joustavuuden',
          'Pitkäaikainen suoja'
        ],
        popular: false,
        icon: Sparkles
      }
    ]
  },
  {
    id: 4,
    category: 'Lisäpalvelut',
    items: [
      {
        name: 'Hajunpoisto Ozonilla',
        price: '45€',
        description: 'Tehokas hajunpoisto ozonisaattorilla',
        features: [
          'Poistaa tupakan hajun',
          'Poistaa eläinten hajut',
          'Bakteerien tuhoaminen',
          'Raikas lopputulos',
          'Turvallinen menetelmä'
        ],
        popular: false,
        icon: Droplets
      },
      {
        name: 'Lasinpinnoite',
        price: '35€',
        description: 'Vesihylkivä pinnoite ikkunoille',
        features: [
          'Parantaa näkyvyyttä',
          'Vesi valuu pois',
          'Helpottaa talvipuhdistusta',
          'Kesto 6-12 kuukautta',
          'Turvallinen ajolle'
        ],
        popular: false,
        icon: Shield
      },
      {
        name: 'Koirankarvojen Poisto',
        price: '30€',
        description: 'Erikoispuhdistus lemmikkieläinten jäljiltä',
        features: [
          'Tehokas karvojen poisto',
          'Verhoilun imurointi',
          'Hajunpoisto',
          'Erikoistyökalut',
          'Perusteellinen lopputulos'
        ],
        popular: false,
        icon: Car
      }
    ]
  }
]

export default function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const categories = ['all', ...services.map(s => s.category)]

  const filteredServices = selectedCategory === 'all'
    ? services
    : services.filter(s => s.category === selectedCategory)

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
                Ammattitaitoinen autopesu
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Palvelumme
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-purple-100 max-w-3xl mx-auto px-4">
              Kattava valikoima laadukkaita autopesupalveluita. Valitse sinulle sopiva paketti tai räätälöi oma!
            </p>
          </div>
        </section>

        {/* Trust Badges */}
        <section className="py-8 sm:py-12 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Star className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-1">{siteConfig.features.rating}</div>
                <div className="text-xs text-slate-600">Keskiarvo</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Check className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-1">{siteConfig.features.customers}</div>
                <div className="text-xs text-slate-600">Tyytyväistä</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Shield className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-1">{siteConfig.features.guarantee}</div>
                <div className="text-xs text-slate-600">Takuu</div>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-2">
                  <Award className="w-6 h-6 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-1">{siteConfig.features.years}</div>
                <div className="text-xs text-slate-600">Vuotta</div>
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-6 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 sm:px-6 py-2 rounded-lg font-medium transition-all text-sm sm:text-base ${
                    selectedCategory === category
                      ? 'bg-purple-600 text-white shadow-lg scale-105'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {category === 'all' ? 'Kaikki palvelut' : category}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            {filteredServices.map((serviceGroup, groupIndex) => (
              <div key={serviceGroup.id} className={groupIndex > 0 ? 'mt-16' : ''}>
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
                  {serviceGroup.category}
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                  {serviceGroup.items.map((service, index) => {
                    const Icon = service.icon
                    return (
                      <div
                        key={index}
                        className={`relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden ${
                          service.popular ? 'ring-2 ring-purple-500' : ''
                        }`}
                        style={{
                          animationDelay: `${index * 100}ms`,
                          animation: 'fadeIn 0.6s ease-out both'
                        }}
                      >
                        {/* Popular Badge */}
                        {service.popular && (
                          <div className="absolute top-4 right-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                            <Star className="w-3 h-3 fill-current" />
                            Suosittu
                          </div>
                        )}

                        <div className="p-6 sm:p-8">
                          {/* Icon */}
                          <div className="w-14 h-14 bg-gradient-to-br from-purple-100 to-blue-100 rounded-xl flex items-center justify-center mb-4">
                            <Icon className="w-7 h-7 text-purple-600" />
                          </div>

                          {/* Header */}
                          <h3 className="text-xl sm:text-2xl font-bold text-slate-900 mb-2">
                            {service.name}
                          </h3>

                          <div className="mb-4">
                            <div className="text-3xl font-bold text-purple-600">
                              {service.price}
                            </div>
                          </div>

                          <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                            {service.description}
                          </p>

                          {/* Features */}
                          <ul className="space-y-3 mb-6">
                            {service.features.map((feature, i) => (
                              <li key={i} className="flex items-start text-sm text-slate-700">
                                <Check className="w-5 h-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>

                          {/* CTA Button */}
                          <Link
                            href="/booking"
                            className="block w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white text-center font-semibold py-3 rounded-xl transition-all hover:scale-105 shadow-md"
                          >
                            Varaa aika
                          </Link>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Add-ons Section - Removed since all services are now in main categories */}

        {/* CTA Section */}
        <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-br from-purple-600 to-blue-600 text-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 sm:mb-6">
                Valmis varaamaan?
              </h2>
              <p className="text-base sm:text-lg text-purple-100 mb-6 sm:mb-8">
                Varaa aika helposti verkossa. Nopea, kätevä, ja luotettava palvelu!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/booking"
                  className="inline-flex items-center justify-center bg-white text-purple-600 font-bold px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-purple-50 transition-colors"
                >
                  Varaa aika nyt
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center bg-purple-500/20 backdrop-blur-md border border-white/20 hover:bg-purple-500/30 text-white font-semibold px-6 sm:px-8 py-3 sm:py-4 rounded-xl transition-colors"
                >
                  Kysy lisää
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-8 text-center">
                Usein kysytyt kysymykset
              </h2>

              <div className="space-y-6">
                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">Kuinka kauan pesu kestää?</h3>
                  <p className="text-slate-600 text-sm">
                    Pesun kesto riippuu valitusta palvelusta. Kerromme tarkan ajan varauksen yhteydessä.
                    Voit odottaa paikan päällä tai jättää auton meille.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">Voinko peruuttaa varauksen?</h3>
                  <p className="text-slate-600 text-sm">
                    Kyllä! Peruutus on maksuton 24h ennen varattua aikaa.
                    Voit peruuttaa helposti varaussähköpostista tai soittamalla meille.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">Mitä tuotteita käytätte?</h3>
                  <p className="text-slate-600 text-sm">
                    Käytämme vain laadukkaita, ympäristöystävällisiä tuotteita.
                    Kaikki tuotteet ovat auton pinnalle turvallisia ja tehokkaita.
                  </p>
                </div>

                <div className="bg-slate-50 rounded-xl p-6">
                  <h3 className="font-semibold text-slate-900 mb-2">Onko maksaminen turvallista?</h3>
                  <p className="text-slate-600 text-sm">
                    Kyllä! Hyväksymme käteisen, kortit, ja MobilePay:n.
                    Kaikki maksut ovat turvallisia ja salattuja.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
