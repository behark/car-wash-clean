'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Calendar, Clock, Car, CheckCircle2 } from 'lucide-react'
import { mockServices } from '@/lib/mockData'
import { useToast } from '@/components/Toast'

// Transform mockServices to match the expected format
const services = mockServices.map(service => ({
  id: service._id,
  name: service.titleFi,
  description: service.descriptionFi,
  price: service.price,
  duration: service.duration,
  category: service.category
}))

// Generate time slots based on business hours
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

const timeSlots = generateTimeSlots()

export default function BookingPage() {
  const { showToast } = useToast()
  const [selectedService, setSelectedService] = useState('')
  const [selectedDate, setSelectedDate] = useState('')
  const [selectedTime, setSelectedTime] = useState('')
  const [customerInfo, setCustomerInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    carModel: '',
    licensePlate: '',
    notes: ''
  })
  const [bookingStep, setBookingStep] = useState(1)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const selectedServiceData = services.find(s => s.id === selectedService)

  // Check if a date is valid (not Sunday, not in past)
  const isValidDate = (dateString: string) => {
    const date = new Date(dateString)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    // Check if date is in the past
    if (date < today) return false
    
    // Check if it's Sunday (0 = Sunday)
    if (date.getDay() === 0) return false
    
    return true
  }

  // Get minimum date (tomorrow)
  const getMinDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split('T')[0]
  }

  // Filter time slots based on selected date
  const getAvailableTimeSlots = () => {
    if (!selectedDate) return timeSlots

    const selected = new Date(selectedDate)
    const today = new Date()
    
    // If selected date is today, filter out past times
    if (selected.toDateString() === today.toDateString()) {
      const currentHour = today.getHours()
      const currentMinute = today.getMinutes()
      
      return timeSlots.filter(slot => {
        const [hour, minute] = slot.split(':').map(Number)
        return hour > currentHour || (hour === currentHour && minute > currentMinute)
      })
    }

    // Saturday hours: 10:00 - 16:00
    if (selected.getDay() === 6) {
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

    try {
      const selectedServiceData = services.find(s => s.id === selectedService)
      if (!selectedServiceData) return

      const bookingData = {
        date: selectedDate,
        time: selectedTime,
        service: {
          titleFi: selectedServiceData.name,
          price: selectedServiceData.price,
          duration: selectedServiceData.duration
        },
        customerName: `${customerInfo.firstName} ${customerInfo.lastName}`,
        customerPhone: customerInfo.phone,
        customerEmail: customerInfo.email,
        vehicleType: customerInfo.carModel || 'Not specified',
        specialRequests: customerInfo.notes
      }

      const response = await fetch('/api/booking', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookingData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to submit booking')
      }

      showToast({
        type: 'success',
        title: 'Varaus vahvistettu!',
        message: 'Vahvistussähköposti lähetetty osoitteeseesi.'
      })

      setIsSubmitted(true)
    } catch (error) {
      showToast({
        type: 'error',
        title: 'Varaus epäonnistui',
        message: error instanceof Error ? error.message : 'Yritä uudelleen.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const nextStep = () => {
    if (bookingStep < 3) setBookingStep(bookingStep + 1)
  }

  const prevStep = () => {
    if (bookingStep > 1) setBookingStep(bookingStep - 1)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full text-center bg-white rounded-2xl shadow-xl p-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Varaus vahvistettu!</h1>
          <div className="bg-purple-50 rounded-lg p-4 mb-6 text-left">
            <p className="text-sm text-gray-600 mb-2">
              <strong>Palvelu:</strong> {selectedServiceData?.name}
            </p>
            <p className="text-sm text-gray-600 mb-2">
              <strong>Aika:</strong> {new Date(selectedDate).toLocaleDateString('fi-FI')} klo {selectedTime}
            </p>
            <p className="text-sm text-gray-600">
              <strong>Hinta:</strong> €{selectedServiceData?.price}
            </p>
          </div>
          <p className="text-gray-600 mb-8">
            Olemme lähettäneet vahvistuksen sähköpostiisi.<br />
            Nähdään {new Date(selectedDate).toLocaleDateString('fi-FI')} klo {selectedTime}!
          </p>
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-700 transition-colors"
          >
            Takaisin etusivulle
          </Link>
        </div>
      </div>
    )
  }

  const availableTimeSlots = getAvailableTimeSlots()

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-purple-600 to-blue-600 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-12 sm:py-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Varaa aika
            </h1>
            <p className="mt-4 sm:mt-6 text-base sm:text-lg leading-7 sm:leading-8 text-purple-100">
              Valitse sopiva palvelu ja aika. Varaus kestää vain muutaman minuutin.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 sm:px-6 py-8 sm:py-12 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-8 sm:mb-12">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-full text-xs sm:text-sm font-semibold transition-colors ${
                  step <= bookingStep
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`h-1 w-12 sm:w-16 mx-2 sm:mx-4 transition-colors ${
                    step < bookingStep ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-3 sm:mt-4 text-xs sm:text-sm text-gray-600 max-w-xs sm:max-w-md mx-auto px-4">
            <span>Palvelu</span>
            <span>Aika</span>
            <span>Tiedot</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-8">
          {/* Step 1: Service Selection */}
          {bookingStep === 1 && (
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Valitse palvelu</h2>

              <div className="space-y-6">
                {[
                  { category: 'wash', title: 'Pesupalvelut', color: 'blue' },
                  { category: 'premium', title: 'Premium-palvelut', color: 'purple' },
                  { category: 'tire', title: 'Rengaspalvelut', color: 'green' },
                  { category: 'additional', title: 'Lisäpalvelut', color: 'orange' }
                ].map(({ category, title, color }) => {
                  const categoryServices = services.filter(s => s.category === category)
                  if (categoryServices.length === 0) return null

                  return (
                    <div key={category}>
                      <h3 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 flex items-center">
                        <div className={`w-3 h-3 bg-${color}-500 rounded-full mr-2`}></div>
                        {title}
                      </h3>
                      <div className="space-y-3">
                        {categoryServices.map((service) => (
                          <div
                            key={service.id}
                            className={`relative rounded-lg border p-3 sm:p-4 cursor-pointer transition-all hover:shadow-md ${
                              selectedService === service.id
                                ? `border-${color}-500 bg-${color}-50 shadow-md`
                                : 'border-gray-300 hover:border-gray-400'
                            }`}
                            onClick={() => setSelectedService(service.id)}
                          >
                            <div className="flex items-start sm:items-center justify-between gap-3">
                              <div className="flex items-start gap-2 sm:gap-3 flex-1">
                                <input
                                  type="radio"
                                  name="service"
                                  value={service.id}
                                  checked={selectedService === service.id}
                                  onChange={() => setSelectedService(service.id)}
                                  className={`mt-1 sm:mt-0 h-4 w-4 text-${color}-600 focus:ring-${color}-600 border-gray-300 flex-shrink-0`}
                                />
                                <div className="flex-1 min-w-0">
                                  <label className="text-base sm:text-lg font-medium text-gray-900 cursor-pointer block">
                                    {service.name}
                                  </label>
                                  <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{service.description}</p>
                                  <p className="text-xs text-gray-500 mt-1">⏱️ {service.duration} min</p>
                                </div>
                              </div>
                              <div className="text-right flex-shrink-0">
                                <span className={`text-xl sm:text-2xl font-bold text-${color}-600`}>€{service.price}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-6 sm:mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!selectedService}
                  className="rounded-lg bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                >
                  Seuraava →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Date and Time Selection */}
          {bookingStep === 2 && (
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Valitse päivä ja aika</h2>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">Päivämäärä</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => {
                      if (isValidDate(e.target.value)) {
                        setSelectedDate(e.target.value)
                        setSelectedTime('') // Reset time when date changes
                      } else {
                        showToast({
                          type: 'warning',
                          title: 'Virheellinen päivä',
                          message: 'Sunnuntaisin olemme kiinni'
                        })
                      }
                    }}
                    min={getMinDate()}
                    className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm"
                  />
                  <p className="mt-2 text-xs text-gray-500">Huom: Sunnuntaisin olemme kiinni</p>
                </div>

                {selectedDate && (
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-3">
                      Kellonaika ({availableTimeSlots.length} vapaata aikaa)
                    </label>
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2 max-h-64 overflow-y-auto p-1">
                      {availableTimeSlots.map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => setSelectedTime(time)}
                          className={`p-2 sm:p-3 text-xs sm:text-sm rounded-lg border transition-all touch-manipulation ${
                            selectedTime === time
                              ? 'border-purple-600 bg-purple-600 text-white shadow-md scale-105'
                              : 'border-gray-300 hover:border-purple-300 hover:bg-purple-50'
                          }`}
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {selectedServiceData && selectedDate && selectedTime && (
                <div className="mt-6 sm:mt-8 p-4 bg-purple-50 rounded-lg border border-purple-200">
                  <h3 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">📋 Varauksesi yhteenveto:</h3>
                  <div className="space-y-2 text-xs sm:text-sm text-gray-700">
                    <p><strong>Palvelu:</strong> {selectedServiceData.name}</p>
                    <p><strong>Hinta:</strong> €{selectedServiceData.price}</p>
                    <p><strong>Kesto:</strong> {selectedServiceData.duration} min</p>
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

              <div className="mt-6 sm:mt-8 flex justify-between gap-3">
                <button
                  type="button"
                  onClick={prevStep}
                  className="rounded-lg bg-gray-200 px-4 sm:px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 transition-colors"
                >
                  ← Takaisin
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!selectedDate || !selectedTime}
                  className="rounded-lg bg-purple-600 px-4 sm:px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95"
                >
                  Seuraava →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Customer Information */}
          {bookingStep === 3 && (
            <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6 lg:p-8">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Yhteystiedot</h2>

              <div className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-900 mb-2">
                      Etunimi *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                      className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-900 mb-2">
                      Sukunimi *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                      className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900 mb-2">
                      Sähköposti *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-900 mb-2">
                      Puhelinnumero *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      placeholder="+358 40 123 4567"
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <div>
                    <label htmlFor="carModel" className="block text-sm font-medium text-gray-900 mb-2">
                      Auton merkki ja malli
                    </label>
                    <input
                      type="text"
                      id="carModel"
                      placeholder="esim. Toyota Corolla"
                      value={customerInfo.carModel}
                      onChange={(e) => setCustomerInfo({...customerInfo, carModel: e.target.value})}
                      className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm"
                    />
                  </div>

                  <div>
                    <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-900 mb-2">
                      Rekisterinumero
                    </label>
                    <input
                      type="text"
                      id="licensePlate"
                      placeholder="ABC-123"
                      value={customerInfo.licensePlate}
                      onChange={(e) => setCustomerInfo({...customerInfo, licensePlate: e.target.value.toUpperCase()})}
                      className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-900 mb-2">
                    Lisätiedot
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    placeholder="Kerro lisätietoja tai erityistoiveita..."
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                    className="block w-full rounded-lg border-0 px-4 py-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-6 sm:mt-8 flex flex-col-reverse sm:flex-row justify-between gap-3">
                <button
                  type="button"
                  onClick={prevStep}
                  disabled={isSubmitting}
                  className="rounded-lg bg-gray-200 px-4 sm:px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-300 transition-colors disabled:opacity-50"
                >
                  ← Takaisin
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-lg bg-purple-600 px-4 sm:px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      Vahvistetaan...
                    </>
                  ) : (
                    '✓ Vahvista varaus'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}
