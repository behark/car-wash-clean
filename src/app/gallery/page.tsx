import { Metadata } from 'next'
import Image from 'next/image'
import { Camera, Star, ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Galleria - Kiilto & Loisto',
  description: 'Katso aitoja asiakastöitämme! Ammattitasoinen autopesu, sisäpuhdistus, vahaus ja erikoispalvelut. Kaikki kuvat todellisista projekteistamme.',
}

const galleryImages = [
  {
    id: 1,
    title: 'Premium-pesu - Asiakastyö',
    description: 'Ammattitaitoinen ulkopuhdistus ja viimeistely',
    image: '/images/gallery/car-wash-01.jpg',
    category: 'premium'
  },
  {
    id: 2,
    title: 'Perusteellinen sisäpuhdistus',
    description: 'Täydellinen sisätilojen puhdistus ja hoito',
    image: '/images/gallery/car-wash-02.jpg',
    category: 'interior'
  },
  {
    id: 3,
    title: 'Vahaus & kiillotus',
    description: 'Suojava vaha-aukset ja pitkäaikainen kiilto',
    image: '/images/gallery/car-wash-03.jpg',
    category: 'wax'
  },
  {
    id: 4,
    title: 'Täysipalvelu',
    description: 'Kaikki palvelut yhdessä paketissa',
    image: '/images/gallery/car-wash-04.jpg',
    category: 'full'
  },
  {
    id: 5,
    title: 'Ulkopuhdistus',
    description: 'Nopea ja tehokas ulkopuhdistus',
    image: '/images/gallery/car-wash-05.jpg',
    category: 'basic'
  },
  {
    id: 6,
    title: 'Detailing työ',
    description: 'Yksityiskohtainen puhdistus ja hoito',
    image: '/images/gallery/car-wash-06.jpg',
    category: 'premium'
  },
  {
    id: 7,
    title: 'Renkaat ja alustapesu',
    description: 'Renkaat ja alustan perusteellinen puhdistus',
    image: '/images/gallery/car-wash-07.jpg',
    category: 'tire'
  },
  {
    id: 8,
    title: 'Ammattipesu',
    description: 'Kokeneiden ammattilaisten käsialaa',
    image: '/images/gallery/car-wash-08.jpg',
    category: 'premium'
  },
  {
    id: 9,
    title: 'Pesupalvelu',
    description: 'Laadukasta pesupalvelua asiakkaille',
    image: '/images/gallery/car-wash-09.jpg',
    category: 'basic'
  },
  {
    id: 10,
    title: 'Sisätilojen hoito',
    description: 'Huolellinen sisätilojen puhdistus',
    image: '/images/gallery/car-wash-10.jpg',
    category: 'interior'
  },
  {
    id: 11,
    title: 'Laadukas työ',
    description: 'Tarkka ja huolellinen työnjälki',
    image: '/images/gallery/car-wash-11.jpg',
    category: 'premium'
  },
  {
    id: 12,
    title: 'Asiakastyytyväisyys',
    description: 'Tyytyväinen asiakas on meidän tavoitteemme',
    image: '/images/gallery/car-wash-12.jpg',
    category: 'basic'
  }
]

const testimonials = [
  {
    id: 1,
    name: 'Mikko Virtanen',
    rating: 5,
    comment: 'Erinomaista palvelua! Autoni näyttää uudelta premium-pesun jälkeen.',
    service: 'Premium-pesu',
    image: '/images/testimonials/mikko.jpg'
  },
  {
    id: 2,
    name: 'Anna Koskinen',
    rating: 5,
    comment: 'Sisäpuhdistus oli täydellistä. Poistivat jopa lemmikkieläinten karvat!',
    service: 'Sisäpuhdistus',
    image: '/images/testimonials/anna.jpg'
  },
  {
    id: 3,
    name: 'Jari Mäkelä',
    rating: 5,
    comment: 'Vahaus kesti todella 3 kuukautta. Suosittelen kaikille!',
    service: 'Vahaus & Suojaus',
    image: '/images/testimonials/jari.jpg'
  }
]

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <Camera className="h-12 w-12 mx-auto mb-6 text-purple-200" />
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Galleria
            </h1>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              Näe itse minkälaisia tuloksia saamme aikaan. Ennen ja jälkeen -kuvat
              todellisista asiakkaistamme ja heidän autoistaan.
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl text-center mb-16">
          <h2 className="text-base font-semibold leading-7 text-purple-600">Asiakastöitämme</h2>
          <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Ammattilaisten työn jälki
          </p>
          <p className="mt-4 text-lg text-gray-600">
            Näe itse minkälaista laatua saat Kiilto & Loisto palveluista.
            Kaikki kuvat ovat aitoja asiakastöitämme.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {galleryImages.map((item) => (
            <div
              key={item.id}
              className="group relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative aspect-square overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Category Badge */}
                <div className="absolute top-4 right-4">
                  <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
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
                     'Perupesu'}
                  </span>
                </div>

                {/* Content Overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-200">{item.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Stats */}
        <div className="mt-16 bg-gradient-to-br from-purple-50 to-blue-50 rounded-3xl p-8">
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-3 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">12+</div>
              <p className="text-gray-600">Erilaista palvelua</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">500+</div>
              <p className="text-gray-600">Tyytyväistä asiakasta</p>
            </div>
            <div>
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <p className="text-gray-600">Tyytyväisyystakuu</p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Testimonials */}
      <div className="bg-gray-50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center mb-16">
            <h2 className="text-base font-semibold leading-7 text-purple-600">Asiakaspalautteet</h2>
            <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Mitä asiakkaamme sanovat
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white rounded-2xl p-8 shadow-sm">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-700 mb-6">"{testimonial.comment}"</p>

                <div className="flex items-center gap-3">
                  <div className="h-12 w-12 rounded-full bg-purple-100 flex items-center justify-center">
                    <span className="text-purple-600 font-semibold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900">{testimonial.name}</p>
                    <p className="text-sm text-gray-600">{testimonial.service}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
        <div className="rounded-2xl bg-purple-600 px-6 py-16 text-center sm:py-24 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Haluatko autosi näyttävän näin hyvältä?
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-8 text-purple-100">
            Varaa aika tänään ja koe itse miksi asiakkaamme ovat niin tyytyväisiä palveluumme.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <a
              href="/booking"
              className="rounded-md bg-white px-6 py-3 text-sm font-semibold text-purple-600 shadow-sm hover:bg-gray-100 transition-colors"
            >
              Varaa aika nyt
            </a>
            <a href="/services" className="text-sm font-semibold leading-6 text-white">
              Katso palvelut <ArrowRight className="inline h-4 w-4 ml-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}