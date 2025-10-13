import { Metadata } from 'next'
import { MapPin, Phone, Mail, Clock, MessageSquare } from 'lucide-react'
import { siteConfig } from '../../lib/siteConfig'

export const metadata: Metadata = {
  title: 'Yhteystiedot - PuhtaanPuhdas',
  description: 'Ota yhteyttä autopesuumme. Löydät meidät Helsingistä. Avoinna ma-la 8-20, su 10-18.',
}

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
              Ota yhteyttä
            </h1>
            <p className="mt-6 text-lg leading-8 text-purple-100">
              Olemme täällä auttamassa. Ota rohkeasti yhteyttä, niin vastaamme mahdollisimman pian.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
              Yhteystietomme
            </h2>

            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-purple-100 p-3">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Osoite</h3>
                  <p className="text-gray-700">
                    {siteConfig.name}<br />
                    {siteConfig.address.street}<br />
                    {siteConfig.address.postalCode} {siteConfig.address.city}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-purple-100 p-3">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Puhelin</h3>
                  <p className="text-gray-700">
                    {siteConfig.phone.display}<br />
                    <span className="text-sm text-gray-500">MA-PE 8-18, LA 10-16</span>
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-purple-100 p-3">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Sähköposti</h3>
                  <p className="text-gray-700">{siteConfig.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-purple-100 p-3">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Aukioloajat</h3>
                  <div className="text-gray-700">
                    <p>Maanantai - Perjantai: 08:00 - 18:00</p>
                    <p>Lauantai: 10:00 - 16:00</p>
                    <p>Sunnuntai: Suljettu</p>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-purple-100 p-3">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                  <p className="text-gray-700">
                    {siteConfig.phone.display}<br />
                    <span className="text-sm text-gray-500">Nopea tapa varata aikoja ja kysyä</span>
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8">
              Lähetä viesti
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="first-name" className="block text-sm font-medium text-gray-900">
                    Etunimi
                  </label>
                  <input
                    type="text"
                    name="first-name"
                    id="first-name"
                    autoComplete="given-name"
                    className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  />
                </div>
                <div>
                  <label htmlFor="last-name" className="block text-sm font-medium text-gray-900">
                    Sukunimi
                  </label>
                  <input
                    type="text"
                    name="last-name"
                    id="last-name"
                    autoComplete="family-name"
                    className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Sähköposti
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  autoComplete="email"
                  className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                  Puhelinnumero
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  autoComplete="tel"
                  className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-900">
                  Kiinnostava palvelu
                </label>
                <select
                  id="service"
                  name="service"
                  className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                >
                  <option value="">Valitse palvelu...</option>
                  <option value="basic">Perupesu (€15)</option>
                  <option value="premium">Premium-pesu (€25)</option>
                  <option value="interior">Sisäpuhdistus (€20)</option>
                  <option value="full">Täysipalvelu (€40)</option>
                  <option value="wax">Vahaus & Suojaus (€35)</option>
                  <option value="express">Pika-pesu (€10)</option>
                  <option value="custom">Erikoistoive</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                  Viesti
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  placeholder="Kerro meille lisätietoja toiveistasi..."
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-md bg-purple-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-colors"
              >
                Lähetä viesti
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-24">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-8 text-center">
            Löydät meidät täältä
          </h2>
          <div className="rounded-2xl bg-gray-100 p-8 text-center">
            <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
              <div className="text-gray-500">
                <MapPin className="h-12 w-12 mx-auto mb-4" />
                <p>Kartta ladataan...</p>
                <p className="text-sm mt-2">{siteConfig.address.street}, {siteConfig.address.postalCode} {siteConfig.address.city}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}