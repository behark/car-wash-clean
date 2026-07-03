import Link from 'next/link'
import Image from 'next/image'

type Service = {
  _id?: string
  id?: number
  titleFi: string
  descriptionFi: string
  price?: number
  priceCents?: number
  durationMinutes?: number
  duration?: number
  image?: string
}

export default function ServicesGrid({ services }: { services: Service[] }) {
  const displayServices: Service[] = services || []

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {displayServices.map((service, index) => {
        const serviceId = ('_id' in service && service._id) || ('id' in service && service.id) || index
        const price = ('price' in service && service.price) || ('priceCents' in service && service.priceCents ? service.priceCents / 100 : 0)
        const priceCents = ('priceCents' in service && service.priceCents) || ('price' in service && service.price ? service.price * 100 : 0)
        
        return (
          <div
            key={serviceId}
            className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 premium-card overflow-hidden animate-fade-in"
            style={{ animationDelay: `${index * 150}ms` }}
          >
            {/* Premium Badge for expensive services */}
            {priceCents >= 5000 && (
              <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-gold-500 to-gold-600 text-navy-900 text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                LUXURY
              </div>
            )}

            {/* Service Image */}
            <div className="relative h-48 overflow-hidden">
              <Image
                src={service.image || `/images/service${serviceId}.svg`}
                alt={service.titleFi}
                fill
                sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover aspect-[16/9] group-hover:scale-105 group-hover:brightness-110 transition-all duration-500"
                priority={index < 4}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent group-hover:from-purple-900/30 group-hover:via-purple-600/10 group-hover:to-transparent transition-all duration-500"></div>
            </div>

            {/* Service Content */}
            <div className="p-6">
              <h3 className="font-display text-xl font-bold text-navy-900 mb-3 group-hover:text-purple-600 transition-colors">
                {service.titleFi}
              </h3>

              <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">
                {service.descriptionFi}
              </p>

              {/* Price and CTA */}
              <div className="flex items-center justify-between">
                <div className="text-left">
                  <div className="text-sm text-slate-500 mb-1">Alkaen</div>
                  <div className="text-2xl font-bold text-purple-600">
                    {price.toFixed(0)}€
                  </div>
                </div>

                <Link
                  href="/booking"
                  className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-medium px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Varaa nyt
                </Link>
              </div>

              {/* Guarantee Badge */}
              <div className="mt-4 pt-4 border-t border-silver-100">
                <div className="flex items-center space-x-2 text-sm text-slate-600">
                  <svg className="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>100% Tyytyväisyystakuu</span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
