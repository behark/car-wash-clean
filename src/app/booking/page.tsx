'use client'

import { useState } from 'react'
import Link from 'next/link'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Calendar, Clock, Car, CheckCircle2, Sparkles, Star, Shield, Droplets, Award, Zap, User, Mail, Phone, FileText } from 'lucide-react'

// REAL Services matching your business
const services = [
  // Autopesut
  { id: 'kasinpesu', name: 'Käsinpesu', price: 25, category: 'Autopesut', icon: Car, color: 'blue' },
  { id: 'pikavaha', name: 'Käsinpesu + Pikavaha', price: 30, category: 'Autopesut', icon: Sparkles, color: 'purple' },
  { id: 'sisapuhdistus', name: 'Käsinpesu + Sisäpuhdistus', price: 55, category: 'Autopesut', icon: Sparkles, color: 'indigo', popular: true },
  { id: 'normaalivaha', name: 'Käsinpesu + Normaalivaha', price: 70, category: 'Autopesut', icon: Star, color: 'amber', popular: true },
  { id: 'kovavaha', name: 'Käsinpesu + Kovavaha', price: 110, category: 'Autopesut', icon: Shield, color: 'emerald', popular: true },
  { id: 'kiillotus', name: 'Maalipinnan Kiillotus', price: 350, category: 'Autopesut', icon: Award, color: 'gold', popular: true, note: 'alk. (Henkilöauto 350€, Maasturi 400€, Pakettiauto 450€)' },

  // Renkaat
  { id: 'renkaiden-vaihto', name: 'Renkaiden Vaihto', price: 20, category: 'Renkaat', icon: Car, color: 'slate' },
  { id: 'renkaiden-pesu', name: 'Renkaiden Pesu', price: 10, category: 'Renkaat', icon: Droplets, color: 'cyan' },
  { id: 'rengashotelli', name: 'Rengashotelli', price: 69, category: 'Renkaat', icon: Shield, color: 'blue' },

  // Lisäpalvelut
  { id: 'moottorin-pesu', name: 'Moottorin Pesu', price: 20, category: 'Lisäpalvelut', icon: Droplets, color: 'teal' },
  { id: 'hajunpoisto', name: 'Hajunpoisto Otsonoinnilla', price: 50, category: 'Lisäpalvelut', icon: Droplets, color: 'sky' },
  { id: 'penkkien-pesu', name: 'Penkkien Pesu', price: 100, category: 'Lisäpalvelut', icon: Sparkles, color: 'pink' }
]

// Generate time slots
const generateTimeSlots = () => {
  const slots = []
  for (let hour = 8; hour < 20; hour++) {
    for (let minute of [0, 30]) {
      const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`
      slots.push(time)
    }
  }
  return slots
}

export default function BookingPage() {
  const [step, setStep] = useState(1)
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    carModel: '',
    notes: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isComplete, setIsComplete] = useState(false)

  const selectedServiceData = services.find(s => s.id === selectedService)
  const timeSlots = generateTimeSlots()

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  // Check if date is valid (not Sunday)
  const isValidDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.getDay() !== 0 // Not Sunday
  }

  // Filter time slots for Saturdays (10:00-16:00)
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return timeSlots

    const date = new Date(selectedDate)
    if (date.getDay() === 6) { // Saturday
      return timeSlots.filter(slot => {
        const [hour] = slot.split(':').map(Number)
        return hour >= 10 && hour < 16
      })
    }
    return timeSlots
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsComplete(true)
  }

  const nextStep = () => {
    if (step < 3) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  // Success screen
  if (isComplete) {
    return (
      <>
        <Header />
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50 flex items-center justify-center p-4">
          <div className="max-w-2xl w-full">
            <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-12 text-center">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
                Varaus vahvistettu! 🎉
              </h1>

              <p className="text-lg text-slate-600 mb-8">
                Kiitos varauksestasi! Olemme lähettäneet vahvistuksen sähköpostiisi.
              </p>

              <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 mb-8 text-left">
                <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-purple-600" />
                  Varauksesi tiedot:
                </h3>
                <div className="space-y-3 text-slate-700">
                  <p><strong>Palvelu:</strong> {selectedServiceData?.name}</p>
                  <p><strong>Päivä:</strong> {new Date(selectedDate).toLocaleDateString('fi-FI', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}</p>
                  <p><strong>Aika:</strong> {selectedTime}</p>
                  <p><strong>Hinta:</strong> {selectedServiceData?.price}€</p>
                  <p><strong>Asiakas:</strong> {formData.firstName} {formData.lastName}</p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold px-8 py-4 rounded-xl transition-all hover:scale-105 shadow-lg"
                >
                  Takaisin etusivulle
                </Link>
                <Link
                  href="/services"
                  className="inline-flex items-center justify-center bg-white border-2 border-purple-600 text-purple-600 hover:bg-purple-50 font-bold px-8 py-4 rounded-xl transition-all"
                >
                  Katso palvelut
                </Link>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </>
    )
  }

  const availableTimeSlots = getAvailableTimeSlots()

  return (
    <>
      <Header />

      <main className="min-h-screen bg-gradient-to-br from-slate-50 to-purple-50">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-br from-purple-900 via-purple-800 to-blue-900 text-white py-16 sm:py-20">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.1),transparent_50%)]"></div>
          </div>

          <div className="relative container mx-auto px-4 text-center">
            <div className="inline-flex items-center bg-purple-500/20 backdrop-blur-sm border border-purple-400/30 rounded-full px-6 py-2 mb-8">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="text-purple-200 text-sm font-medium">
                Nopea ja helppo varaus
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Varaa aika
            </h1>
            <p className="text-lg sm:text-xl text-purple-100 max-w-2xl mx-auto">
              Valitse palvelu, aika ja täytä tiedot. Varaus vie vain 2 minuuttia!
            </p>
          </div>
        </section>

        {/* Progress Steps */}
        <section className="py-8 bg-white border-b border-slate-200">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="flex items-center justify-between">
                {[
                  { num: 1, title: 'Palvelu', icon: Car },
                  { num: 2, title: 'Aika', icon: Calendar },
                  { num: 3, title: 'Tiedot', icon: User }
                ].map((s, idx) => {
                  const Icon = s.icon
                  return (
                    <div key={s.num} className="flex items-center flex-1">
                      <div className="flex flex-col items-center flex-1">
                        <div className={`w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center transition-all ${
                          step >= s.num
                            ? 'bg-purple-600 text-white shadow-lg scale-110'
                            : 'bg-slate-200 text-slate-400'
                        }`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <span className={`mt-2 text-xs sm:text-sm font-medium ${
                          step >= s.num ? 'text-purple-600' : 'text-slate-400'
                        }`}>
                          {s.title}
                        </span>
                      </div>
                      {idx < 2 && (
                        <div className={`h-1 flex-1 mx-2 transition-all ${
                          step > s.num ? 'bg-purple-600' : 'bg-slate-200'
                        }`} />
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Form Steps */}
        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <form onSubmit={handleSubmit}>
                {/* Step 1: Service Selection */}
                {step === 1 && (
                  <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                      Valitse palvelu
                    </h2>

                    <div className="space-y-8">
                      {['Autopesut', 'Renkaat', 'Lisäpalvelut'].map(category => {
                        const categoryServices = services.filter(s => s.category === category)

                        return (
                          <div key={category}>
                            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                              <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                              {category}
                            </h3>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                              {categoryServices.map(service => {
                                const Icon = service.icon
                                const isSelected = selectedService === service.id

                                return (
                                  <div
                                    key={service.id}
                                    onClick={() => setSelectedService(service.id)}
                                    className={`relative cursor-pointer rounded-xl p-4 border-2 transition-all hover:scale-105 ${
                                      isSelected
                                        ? 'border-purple-600 bg-purple-50 shadow-lg'
                                        : 'border-slate-200 hover:border-purple-300 bg-white'
                                    }`}
                                  >
                                    {service.popular && (
                                      <div className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-600 to-purple-700 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                        <Star className="w-3 h-3 fill-current" />
                                        Suosittu
                                      </div>
                                    )}

                                    <div className="flex items-start gap-3">
                                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                                        isSelected ? 'bg-purple-200' : 'bg-slate-100'
                                      }`}>
                                        <Icon className={`w-5 h-5 ${isSelected ? 'text-purple-600' : 'text-slate-600'}`} />
                                      </div>

                                      <div className="flex-1 min-w-0">
                                        <h4 className="font-bold text-slate-900 text-sm mb-1">
                                          {service.name}
                                        </h4>
                                        <p className="text-2xl font-bold text-purple-600">
                                          {service.price}€
                                        </p>
                                        {service.note && (
                                          <p className="text-xs text-slate-500 mt-1">
                                            {service.note}
                                          </p>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                )
                              })}
                            </div>
                          </div>
                        )
                      })}
                    </div>

                    <div className="mt-8 flex justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!selectedService}
                        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold px-8 py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg"
                      >
                        Seuraava →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 2: Date & Time */}
                {step === 2 && (
                  <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                      Valitse päivä ja aika
                    </h2>

                    <div className="space-y-6">
                      {/* Date Selection */}
                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-3">
                          📅 Päivämäärä
                        </label>
                        <input
                          type="date"
                          value={selectedDate}
                          onChange={(e) => {
                            if (isValidDate(e.target.value)) {
                              setSelectedDate(e.target.value)
                              setSelectedTime('')
                            }
                          }}
                          min={getMinDate()}
                          className="w-full px-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all text-lg"
                        />
                        <p className="mt-2 text-sm text-slate-600">
                          ⚠️ Sunnuntaisin olemme kiinni
                        </p>
                      </div>

                      {/* Time Selection */}
                      {selectedDate && (
                        <div>
                          <label className="block text-sm font-bold text-slate-900 mb-3">
                            ⏰ Kellonaika ({availableTimeSlots.length} vapaata)
                          </label>
                          <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                            {availableTimeSlots.map(time => (
                              <button
                                key={time}
                                type="button"
                                onClick={() => setSelectedTime(time)}
                                className={`py-3 px-2 rounded-lg text-sm font-medium transition-all ${
                                  selectedTime === time
                                    ? 'bg-purple-600 text-white shadow-lg scale-105'
                                    : 'bg-slate-100 hover:bg-purple-100 text-slate-700'
                                }`}
                              >
                                {time}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Summary */}
                      {selectedServiceData && selectedDate && selectedTime && (
                        <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-xl p-6 border-2 border-purple-200">
                          <h3 className="font-bold text-slate-900 mb-4 flex items-center gap-2">
                            <Sparkles className="w-5 h-5 text-purple-600" />
                            Varauksesi yhteenveto
                          </h3>
                          <div className="space-y-2 text-sm text-slate-700">
                            <p><strong>Palvelu:</strong> {selectedServiceData.name}</p>
                            <p><strong>Hinta:</strong> {selectedServiceData.price}€</p>
                            <p><strong>Päivä:</strong> {new Date(selectedDate).toLocaleDateString('fi-FI', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}</p>
                            <p><strong>Aika:</strong> {selectedTime}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="mt-8 flex justify-between gap-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-8 py-4 rounded-xl transition-all"
                      >
                        ← Takaisin
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        disabled={!selectedDate || !selectedTime}
                        className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold px-8 py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg"
                      >
                        Seuraava →
                      </button>
                    </div>
                  </div>
                )}

                {/* Step 3: Customer Info */}
                {step === 3 && (
                  <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-6">
                      Yhteystiedot
                    </h2>

                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-900 mb-2">
                            Etunimi *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="text"
                              required
                              value={formData.firstName}
                              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                              placeholder="Matti"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-900 mb-2">
                            Sukunimi *
                          </label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="text"
                              required
                              value={formData.lastName}
                              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                              placeholder="Virtanen"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-900 mb-2">
                            Sähköposti *
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="email"
                              required
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                              placeholder="matti@email.com"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-bold text-slate-900 mb-2">
                            Puhelinnumero *
                          </label>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                            <input
                              type="tel"
                              required
                              value={formData.phone}
                              onChange={(e) => setFormData({...formData, phone: e.target.value})}
                              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                              placeholder="+358 40 123 4567"
                            />
                          </div>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-2">
                          Auton merkki ja malli (valinnainen)
                        </label>
                        <div className="relative">
                          <Car className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                          <input
                            type="text"
                            value={formData.carModel}
                            onChange={(e) => setFormData({...formData, carModel: e.target.value})}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all"
                            placeholder="esim. Toyota Corolla"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-bold text-slate-900 mb-2">
                          Lisätiedot (valinnainen)
                        </label>
                        <div className="relative">
                          <FileText className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                          <textarea
                            rows={4}
                            value={formData.notes}
                            onChange={(e) => setFormData({...formData, notes: e.target.value})}
                            className="w-full pl-12 pr-4 py-3 rounded-xl border-2 border-slate-200 focus:border-purple-600 focus:ring-2 focus:ring-purple-200 transition-all resize-none"
                            placeholder="Kerro meille lisätietoja tai toiveita..."
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 flex flex-col-reverse sm:flex-row justify-between gap-4">
                      <button
                        type="button"
                        onClick={prevStep}
                        disabled={isSubmitting}
                        className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold px-8 py-4 rounded-xl transition-all disabled:opacity-50"
                      >
                        ← Takaisin
                      </button>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold px-8 py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                      >
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                            Vahvistetaan...
                          </>
                        ) : (
                          <>
                            <CheckCircle2 className="w-5 h-5" />
                            Vahvista varaus
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}
