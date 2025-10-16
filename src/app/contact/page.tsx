'use client'

import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from 'lucide-react'
import { siteConfig } from '../../lib/siteConfig'
import { useToast } from '../../components/Toast'

export default function ContactPage() {
  const { showToast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    service: '',
    message: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))

      showToast({
        type: 'success',
        title: 'Viesti lähetetty!',
        message: 'Vastaamme sinulle mahdollisimman pian.'
      })

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      })
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Virhe',
        message: 'Viestin lähetys epäonnistui. Yritä uudelleen.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-purple-600 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utb3BhY2l0eT0iLjA1IiBzdHJva2Utd2lkdGg9IjIiLz48L2c+PC9zdmc+')] opacity-10"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Ota yhteyttä
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-purple-100">
              Olemme täällä auttamassa. Ota rohkeasti yhteyttä, niin vastaamme mahdollisimman pian.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-16 sm:py-24 lg:py-32 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:gap-16 lg:grid-cols-2">
          {/* Contact Information */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-6 sm:mb-8">
              Yhteystietomme
            </h2>

            <div className="space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-purple-100 p-3 flex-shrink-0">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Osoite</h3>
                  <p className="text-gray-700 text-sm sm:text-base">
                    {siteConfig.name}<br />
                    {siteConfig.address.street}<br />
                    {siteConfig.address.postalCode} {siteConfig.address.city}
                  </p>
                  <a
                    href={`https://maps.google.com/maps?q=${encodeURIComponent(`${siteConfig.address.street}, ${siteConfig.address.city}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 text-sm font-medium mt-2 inline-block"
                  >
                    Avaa kartassa →
                  </a>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-purple-100 p-3 flex-shrink-0">
                  <Phone className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Puhelin</h3>
                  <a
                    href={`tel:${siteConfig.phone.tel}`}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm sm:text-base"
                  >
                    {siteConfig.phone.display}
                  </a>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">MA-PE 8-18, LA 10-16</p>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-purple-100 p-3 flex-shrink-0">
                  <Mail className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Sähköposti</h3>
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm sm:text-base break-all"
                  >
                    {siteConfig.email}
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-purple-100 p-3 flex-shrink-0">
                  <Clock className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Aukioloajat</h3>
                  <div className="text-gray-700 text-sm sm:text-base space-y-1">
                    {siteConfig.hours.map((hour, index) => (
                      <p key={index}>
                        <span className="inline-block w-32">{hour.label}:</span>
                        <span className="font-medium">{hour.value}</span>
                      </p>
                    ))}
                  </div>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="flex items-start gap-4">
                <div className="rounded-lg bg-purple-100 p-3 flex-shrink-0">
                  <MessageSquare className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">WhatsApp</h3>
                  <a
                    href={`https://wa.me/${siteConfig.phone.tel.replace(/\D/g, '')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-600 hover:text-purple-700 font-medium text-sm sm:text-base"
                  >
                    {siteConfig.phone.display}
                  </a>
                  <p className="text-xs sm:text-sm text-gray-500 mt-1">Nopea tapa varata aikoja ja kysyä</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl">
              <h3 className="font-semibold text-gray-900 mb-4">Nopeat toiminnot</h3>
              <div className="flex flex-col sm:flex-row gap-3">
                <a
                  href={`tel:${siteConfig.phone.tel}`}
                  className="flex-1 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-colors text-center font-medium text-sm"
                >
                  Soita meille
                </a>
                <a
                  href="/booking"
                  className="flex-1 bg-white text-purple-600 px-4 py-3 rounded-lg hover:bg-gray-50 transition-colors text-center font-medium text-sm border border-purple-200"
                >
                  Varaa aika
                </a>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-6 sm:mb-8">
              Lähetä viesti
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
                    Etunimi *
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm"
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
                    Sukunimi *
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-2 block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                  Sähköposti *
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm"
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
                  value={formData.phone}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm"
                />
              </div>

              <div>
                <label htmlFor="service" className="block text-sm font-medium text-gray-900">
                  Kiinnostava palvelu
                </label>
                <select
                  id="service"
                  name="service"
                  value={formData.service}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm"
                >
                  <option value="">Valitse palvelu...</option>

                  {/* Autopesut */}
                  <optgroup label="🚗 Autopesut">
                    <option value="kasinpesu">Käsinpesu (25€)</option>
                    <option value="pikavaha">Käsinpesu + Pikavaha (30€)</option>
                    <option value="sisapuhdistus">Käsinpesu + Sisäpuhdistus (55€)</option>
                    <option value="normaalivaha">Käsinpesu + Normaalivaha (70€)</option>
                    <option value="kovavaha">Käsinpesu + Kovavaha (110€)</option>
                    <option value="kiillotus">Maalipinnan Kiillotus (alk. 350€)</option>
                  </optgroup>

                  {/* Renkaat */}
                  <optgroup label="🔧 Renkaat">
                    <option value="renkaiden-vaihto">Renkaiden Vaihto (20€)</option>
                    <option value="renkaiden-pesu">Renkaiden Pesu (10€)</option>
                    <option value="rengashotelli">Rengashotelli (69€)</option>
                  </optgroup>

                  {/* Lisäpalvelut */}
                  <optgroup label="✨ Lisäpalvelut">
                    <option value="moottorin-pesu">Moottorin Pesu (20€)</option>
                    <option value="hajunpoisto">Hajunpoisto Otsonoinnilla (50€)</option>
                    <option value="penkkien-pesu">Penkkien Pesu (100€)</option>
                  </optgroup>

                  <option value="custom">Muu palvelu / Erikoistoive</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-900">
                  Viesti *
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows={4}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm"
                  placeholder="Kerro meille lisätietoja toiveistasi..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg bg-purple-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-all disabled:bg-gray-400 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Lähetetään...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Lähetä viesti
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Map Section */}
        <div className="mt-16 sm:mt-24">
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 mb-6 sm:mb-8 text-center">
            Löydät meidät täältä
          </h2>
          <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl">
            <iframe
              src={`https://maps.google.com/maps?q=${encodeURIComponent(`${siteConfig.address.street}, ${siteConfig.address.city}`)}&t=&z=15&ie=UTF8&iwloc=&output=embed`}
              width="100%"
              height="450"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full"
            ></iframe>
          </div>
          <div className="text-center mt-4">
            <a
              href={`https://maps.google.com/maps?q=${encodeURIComponent(`${siteConfig.address.street}, ${siteConfig.address.city}`)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium"
            >
              <MapPin className="w-4 h-4 mr-2" />
              Avaa Google Mapsissa
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
