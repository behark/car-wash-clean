'use client'

import { useState, useEffect, useCallback, useMemo } from 'react'
import { Sparkles, Shield, Star, CheckCircle } from 'lucide-react'
import { getServices, Service, urlFor, cleanupSanityCache } from '../lib/sanity'
import { mockServices } from '../lib/mockData'
import { siteConfig } from '../lib/siteConfig'
import Image from 'next/image'
import Link from 'next/link'

export default function EnhancedServicesPage() {
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  // Memoize expensive calculations
  const categorizedServices = useMemo(() => {
    const categories = {
      wash: services.filter(s => s.category === 'wash'),
      tire: services.filter(s => s.category === 'tire'),
      additional: services.filter(s => s.category === 'additional'),
      premium: services.filter(s => s.category === 'premium'),
    };
    return categories;
  }, [services]);

  const fetchServices = useCallback(async () => {
    try {
      setLoading(true);
      const sanityServices = await getServices();

      if (sanityServices && sanityServices.length > 0) {
        setServices(sanityServices);
      } else {
        // Fallback to mock data if no Sanity data
        // Fallback to mock data when Sanity is not available
        setServices(mockServices); // Show all services on services page
      }
    } catch (err) {
      console.error('Error fetching services:', err);
      setError('Virhe palveluiden lataamisessa');
      // Use all mock data as fallback
      setServices(mockServices);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    let isMounted = true;
    let timeoutId: NodeJS.Timeout;

    const loadData = async () => {
      if (!isMounted) return;
      await fetchServices();
    };

    // Delay initial load to reduce memory pressure
    timeoutId = setTimeout(loadData, 100);

    return () => {
      isMounted = false;
      if (timeoutId) clearTimeout(timeoutId);
      // Cleanup when component unmounts
      cleanupSanityCache();
    };
  }, [fetchServices])

  // Memory-optimized loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-slate-600 text-sm">Ladataan...</p>
        </div>
      </div>
    )
  }

  if (error && services.length === 0) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Virhe tietojen lataamisessa</h2>
          <p className="text-slate-600">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-purple-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700"
          >
            Yritä uudelleen
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Palvelumme
            </h1>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              {siteConfig.subtitle} - Laadukas palvelu, luotettava tulokset.
            </p>
            {error && (
              <div className="mt-4 bg-yellow-500/20 text-yellow-100 px-4 py-2 rounded-lg text-sm">
                ⚠️ Käytetään varmuuskopiotietoja
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Services Grid */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-purple-600">Palveluvalikoima</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Kaikki autosi tarvitsemat palvelut yhdestä paikasta
          </p>
          <p className="mt-4 text-slate-600">
            {services.length} palvelua saatavilla
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {services.map((service) => (
            <div
              key={service._id}
              className="relative rounded-2xl p-6 bg-white border border-slate-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              {/* Service Icon */}
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {service.image && service.image.asset ? (
                  <Image
                    src={urlFor(service.image).width(40).height(40).url()}
                    alt={service.titleFi}
                    width={32}
                    height={32}
                    className="filter brightness-0 invert rounded"
                  />
                ) : (
                  <Sparkles className="w-8 h-8 text-white" />
                )}
              </div>

              {/* Service Details */}
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">{service.titleFi}</h3>
                  <p className="text-slate-600 text-sm line-clamp-3">{service.descriptionFi}</p>
                </div>

                {/* Service Info */}
                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-purple-600">
                    {service.price}€
                  </div>
                  <div className="text-xs text-slate-500">
                    👥 {service.capacity} paikkaa
                  </div>
                </div>

                {/* Duration if available */}
                {service.duration && (
                  <div className="text-xs text-slate-500">
                    ⏱️ {service.duration} min
                  </div>
                )}

                {/* Category Badge */}
                <div className="flex items-center justify-between">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                    service.category === 'wash' ? 'bg-blue-100 text-blue-700' :
                    service.category === 'premium' ? 'bg-purple-100 text-purple-700' :
                    service.category === 'tire' ? 'bg-green-100 text-green-700' :
                    service.category === 'additional' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {service.category === 'wash' ? 'Pesu' :
                     service.category === 'premium' ? 'Premium' :
                     service.category === 'tire' ? 'Renkaat' :
                     service.category === 'additional' ? 'Lisäpalvelu' :
                     'Muu'}
                  </span>
                </div>

                {/* Book Button */}
                <Link href="/booking" className="block w-full">
                  <button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-medium py-3 px-4 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95">
                    Varaa palvelu
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-12">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">
              Etkö löytänyt sopivaa palvelua?
            </h3>
            <p className="text-lg text-slate-600 mb-8 max-w-2xl mx-auto">
              Otamme vastaan erikoistoiveita ja räätälöimme palvelun juuri sinun autollesi sopivaksi.
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 transform hover:scale-105"
            >
              Ota yhteyttä
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="mt-24">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold text-slate-900 mb-4">Miksi valita meidät?</h3>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Yli {siteConfig.features.years} vuoden kokemus ja {siteConfig.features.customers} tyytyväistä asiakasta.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Laatutakuu</h4>
              <p className="text-slate-600">{siteConfig.features.guarantee}</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-blue-600" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Arvostettu</h4>
              <p className="text-slate-600">{siteConfig.features.rating}/5 tähteä asiakasarvioissa</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-purple-600" />
              </div>
              <h4 className="text-lg font-semibold text-slate-900 mb-2">Ammattitaidot</h4>
              <p className="text-slate-600">Sertifioidut ammattilaiset ja laadukkaat tuotteet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}