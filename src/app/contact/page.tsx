'use client'

import { useState } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { MapPin, Phone, Mail, Clock, MessageSquare, Send, Sparkles, Star, Shield, Award, Check } from 'lucide-react'
import { siteConfig } from '@/lib/siteConfig'
import { useToast } from '@/components/Toast'

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
              <MessageSquare className="w-4 h-4 mr-2" />
              <span className="text-purple-200 text-xs sm:text-sm font-medium">
                Olemme täällä auttamassa
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Ota yhteyttä
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-purple-100 max-w-3xl mx-auto px-4">
              Ota rohkeasti yhteyttä, niin vastaamme mahdollisimman pian. Autamme mielellämme!
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

        {/* Contact Content */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-12 lg:gap-16 lg:grid-cols-2">

              {/* Contact Information */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6 sm:mb-8">
                  Yhteystietomme
                </h2>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-purple-100 p-3 flex-shrink-0">
                        <MapPin className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Osoite</h3>
                        <p className="text-slate-700 text-sm sm:text-base">
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
                  </div>

                  {/* Phone */}
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-purple-100 p-3 flex-shrink-0">
                        <Phone className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Puhelin</h3>
                        <a
                          href={`tel:${siteConfig.phone.tel}`}
                          className="text-purple-600 hover:text-purple-700 font-medium text-sm sm:text-base"
                        >
                          {siteConfig.phone.display}
                        </a>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">MA-PE 8-18, LA 10-16</p>
                      </div>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-purple-100 p-3 flex-shrink-0">
                        <Mail className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">Sähköposti</h3>
                        <a
                          href={`mailto:${siteConfig.email}`}
                          className="text-purple-600 hover:text-purple-700 font-medium text-sm sm:text-base break-all"
                        >
                          {siteConfig.email}
                        </a>
                      </div>
                    </div>
                  </div>

                  {/* Hours */}
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-purple-100 p-3 flex-shrink-0">
                        <Clock className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-2">Aukioloajat</h3>
                        <div className="text-slate-700 text-sm sm:text-base space-y-1">
                          {siteConfig.hours.map((hour, index) => (
                            <p key={index}>
                              <span className="inline-block w-32">{hour.label}:</span>
                              <span className="font-medium">{hour.value}</span>
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* WhatsApp */}
                  <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="rounded-lg bg-purple-100 p-3 flex-shrink-0">
                        <MessageSquare className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-slate-900 mb-1">WhatsApp</h3>
                        <a
                          href={`https://wa.me/${siteConfig.phone.tel.replace(/\D/g, '')}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-purple-600 hover:text-purple-700 font-medium text-sm sm:text-base"
                        >
                          {siteConfig.phone.display}
                        </a>
                        <p className="text-xs sm:text-sm text-slate-500 mt-1">Nopea tapa varata aikoja ja kysyä</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="mt-8 p-6 bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl shadow-lg hover:shadow-xl transition-all">
                  <h3 className="font-semibold text-slate-900 mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    Nopeat toiminnot
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`tel:${siteConfig.phone.tel}`}
                      className="flex-1 bg-purple-600 text-white px-4 py-3 rounded-lg hover:bg-purple-700 transition-all hover:scale-105 text-center font-medium text-sm shadow-lg"
                    >
                      Soita meille
                    </a>
                    <a
                      href="/booking"
                      className="flex-1 bg-white text-purple-600 px-4 py-3 rounded-lg hover:bg-gray-50 transition-all hover:scale-105 text-center font-medium text-sm border-2 border-purple-200 shadow-md"
                    >
                      Varaa aika
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6 sm:mb-8">
                  Lähetä viesti
                </h2>

                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                      <div>
                        <label htmlFor="firstName" className="block text-sm font-medium text-slate-900 mb-2">
                          Etunimi *
                        </label>
                        <input
                          type="text"
                          name="firstName"
                          id="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="block w-full rounded-lg border-0 px-4 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 transition-all hover:ring-slate-400 sm:text-sm"
                          placeholder="Matti"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-sm font-medium text-slate-900 mb-2">
                          Sukunimi *
                        </label>
                        <input
                          type="text"
                          name="lastName"
                          id="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="block w-full rounded-lg border-0 px-4 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 transition-all hover:ring-slate-400 sm:text-sm"
                          placeholder="Virtanen"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-slate-900 mb-2">
                        Sähköposti *
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="block w-full rounded-lg border-0 px-4 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 transition-all hover:ring-slate-400 sm:text-sm"
                        placeholder="matti@email.com"
                      />
                    </div>

                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-slate-900 mb-2">
                        Puhelinnumero
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        id="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="block w-full rounded-lg border-0 px-4 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 transition-all hover:ring-slate-400 sm:text-sm"
                        placeholder="+358 40 123 4567"
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-slate-900 mb-2">
                        Kiinnostava palvelu
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className="block w-full rounded-lg border-0 px-4 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 transition-all hover:ring-slate-400 sm:text-sm"
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
                      <label htmlFor="message" className="block text-sm font-medium text-slate-900 mb-2">
                        Viesti *
                      </label>
                      <textarea
                        name="message"
                        id="message"
                        rows={4}
                        required
                        value={formData.message}
                        onChange={handleChange}
                        className="block w-full rounded-lg border-0 px-4 py-3 text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 transition-all hover:ring-slate-400 sm:text-sm resize-none"
                        placeholder="Kerro meille lisätietoja toiveistasi..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 px-4 py-3 text-center text-sm font-semibold text-white shadow-lg focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-all disabled:bg-slate-400 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex items-center justify-center"
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
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-12 sm:py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 mb-6 sm:mb-8 text-center">
              Löydät meidät täältä
            </h2>
            <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl max-w-5xl mx-auto">
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
            <div className="text-center mt-6">
              <a
                href={`https://maps.google.com/maps?q=${encodeURIComponent(`${siteConfig.address.street}, ${siteConfig.address.city}`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium transition-colors"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Avaa Google Mapsissa
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
