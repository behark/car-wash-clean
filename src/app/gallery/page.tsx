import { Metadata } from 'next'
import Image from 'next/image'
import { Camera, Star, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Galleria - Kiilto & Loisto',
  description: 'Katso aitoja asiakastöitämme! Ammattitasoinen autopesu, sisäpuhdistus, vahaus ja erikoispalvelut. Kaikki kuvat todellisista projekteistamme.',
}

const galleryImages = [
  {
    id: 1,
    title: 'Premium-pesu - Asiakastyö',
    description: 'Ammattitaitoinen ulkopuhdistus ja viimeistely',
    image: 'https://images.unsplash.com/photo-1520340356584-f9917d1eea6f?q=80&w=800&auto=format&fit=crop',
    category: 'premium'
  },
  {
    id: 2,
    title: 'Perusteellinen sisäpuhdistus',
    description: 'Täydellinen sisätilojen puhdistus ja hoito',
    image: 'https://images.unsplash.com/photo-1607860108855-64acf2078ed9?q=80&w=800&auto=format&fit=crop',
    category: 'interior'
  },
  {
    id: 3,
    title: 'Vahaus & kiillotus',
    description: 'Suojava vaha-aukset ja pitkäaikainen kiilto',
    image: 'https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=800&auto=format&fit=crop',
    category: 'wax'
  },
  {
    id: 4,
    title: 'Täysipalvelu',
    description: 'Kaikki palvelut yhdessä paketissa',
    image: 'https://images.unsplash.com/photo-1489824904134-891ab64532f1?q=80&w=800&auto=format&fit=crop',
    category: 'full'
  },
  {
    id: 5,
    title: 'Ulkopuhdistus',
    description: 'Nopea ja tehokas ulkopuhdistus',
    image: 'https://images.unsplash.com/photo-1601362840469-51e4d8d58785?q=80&w=800&auto=format&fit=crop',
    category: 'basic'
  },
  {
    id: 6,
    title: 'Detailing työ',
    description: 'Yksityiskohtainen puhdistus ja hoito',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
    category: 'premium'
  },
  {
    id: 7,
    title: 'Renkaat ja alustapesu',
    description: 'Renkaat ja alustan perusteellinen puhdistus',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?q=80&w=800&auto=format&fit=crop',
    category: 'tire'
  },
  {
    id: 8,
    title: 'Ammattipesu',
    description: 'Kokeneiden ammattilaisten käsialaa',
    image: 'https://images.unsplash.com/photo-1632823469959-87caf57e0073?q=80&w=800&auto=format&fit=crop',
    category: 'premium'
  },
  {
    id: 9,
    title: 'Pesupalvelu',
    description: 'Laadukasta pesupalvelua asiakkaille',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=800&auto=format&fit=crop',
    category: 'basic'
  },
  {
    id: 10,
    title: 'Sisätilojen hoito',
    description: 'Huolellinen sisätilojen puhdistus',
    image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=800&auto=format&fit=crop',
    category: 'interior'
  },
  {
    id: 11,
    title: 'Laadukas työ',
    description: 'Tarkka ja huolellinen työnjälki',
    image: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=800&auto=format&fit=crop',
    category: 'premium'
  },
  {
    id: 12,
    title: 'Asiakastyytyväisyys',
    description: 'Tyytyväinen asiakas on meidän tavoitteemme',
    image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?q=80&w=800&auto=format&fit=crop',
    category: 'basic'
  }
]

const testimonials = [
  {
    id: 1,
    name: 'Mikko Virtanen',
    rating: 5,
    comment: 'Erinomaista palvelua! Autoni näyttää uudelta premium-pesun jälkeen.',
    service: 'Premium-pesu'
  },
  {
    id: 2,
    name: 'Anna Koskinen',
    rating: 5,
    comment: 'Sisäpuhdistus oli täydellistä. Poistivat jopa lemmikkieläinten karvat!',
    service: 'Sisäpuhdistus'
  },
  {
    id: 3,
    name: 'Jari Mäkelä',
    rating: 5,
    comment: 'Vahaus kesti todella 3 kuukautta. Suosittelen kaikille!',
    service: 'Vahaus & Suojaus'
  }
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-10"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Camera className="h-10 w-10 sm:h-12 sm:w-12 mx-auto mb-4 sm:mb-6 text-purple-200" />
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Galleria
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-purple-100 px-4">
              Näe itse minkälaisia tuloksia saamme aikaan. Ennen ja jälkeen -kuvat
              todellisista asiakkaistamme ja heidän autoistaan.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
          <h2 className="text-sm sm:text-base font-semibold leading-7 text-purple-600">Asiakastöitämme</h2>
          <p className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
            Ammattilaisten työn jälki
          </p>
          <p className="mt-4 text-base sm:text-lg text-gray-600 px-4">
            Näe itse minkälaista laatua saat Kiilto & Loisto palveluista.
            Kaikki kuvat ovat aitoja asiakastöitämme.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-xl sm:rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement
                    target.src = '/images/placeholder-vehicle.svg'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Category Badge */}
                <div className="absolute top-3 right-3 sm:top-4 sm:right-4">
                  <span className={`inline-flex items-center px-2 sm:px-3 py-1 rounded-full text-xs font-medium shadow-sm ${
                    item.category === 'premium' ? 'bg-purple-100 text-purple-700' :
                    item.category === 'interior' ? 'bg-blue-100 text-blue-700' :
                    item.category === 'wax' ? 'bg-yellow-100 text-yellow-700' :
                    item.category === 'tire' ? 'bg-green-100 text-green-700' :
                    item.category === 'full' ? 'bg-orange-100 text-orange-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {item.category === 'premium' ? 'Premium' :
                     item.category === 'interior' ? 'Sisäpuhdistus' :
                     item.category === 'wax' ? 'Vahaus' :
                     item.category === 'tire' ? 'Renkaat' :
                     item.category === 'full' ? 'Täysipalvelu' :
                     'Pesupesu'}
                  </span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-base sm:text-lg font-bold mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-200">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Stats */}
        <div className="mt-12 sm:mt-16 bg-gradient-to-br from-purple-50 to-blue-50 rounded-2xl sm:rounded-3xl p-6 sm:p-8">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-3 text-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">12+</div>
              <p className="text-sm sm:text-base text-gray-600">Erilaista palvelua</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">500+</div>
              <p className="text-sm sm:text-base text-gray-600">Tyytyväistä asiakasta</p>
            </div>
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-purple-600 mb-2">100%</div>
              <p className="text-sm sm:text-base text-gray-600">Tyytyväisyystakuu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="bg-gray-50 py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-12 sm:mb-16">
            <h2 className="text-sm sm:text-base font-semibold leading-7 text-purple-600">Asiakaspalautteet</h2>
            <p className="mt-2 text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-gray-900">
              Mitä asiakkaamme sanovat
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 sm:h-5 sm:w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-sm sm:text-base text-gray-700 mb-6">"{testimonial.comment}"</p>

                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-purple-100 flex items-center justify-center flex-shrink-0">
                    <span className="text-sm sm:text-base text-purple-600 font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="text-sm sm:text-base font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-xs sm:text-sm text-gray-600">{testimonial.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:px-8">
        <div className="rounded-xl sm:rounded-2xl bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-12 sm:py-16 md:py-24 text-center lg:px-8 relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-10"></div>
          
          <div className="relative">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white">
              Haluatko autosi näyttävän näin hyvältä?
            </h2>
            <p className="mx-auto mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-7 sm:leading-8 text-purple-100 px-4">
              Varaa aika tänään ja koe itse miksi asiakkaamme ovat niin tyytyväisiä palveluumme.
            </p>
            <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-x-6">
              <Link
                href="/booking"
                className="w-full sm:w-auto rounded-lg bg-white px-6 py-3 text-sm font-semibold text-purple-600 shadow-lg hover:bg-gray-100 transition-all hover:scale-105 active:scale-95"
              >
                Varaa aika nyt
              </Link>
              <Link 
                href="/services" 
                className="w-full sm:w-auto text-sm font-semibold leading-6 text-white hover:text-purple-100 transition-colors flex items-center justify-center"
              >
                Katso palvelut <ArrowRight className="inline h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
