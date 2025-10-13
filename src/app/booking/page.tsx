'use client'

import { useState } from 'react'
import { Calendar, Clock, Car, MapPin, Phone, CheckCircle2, AlertCircle } from 'lucide-react'

const services = [
  { id: 'express', name: 'Pika-pesu', price: 10, duration: 15 },
  { id: 'basic', name: 'Perupesu', price: 15, duration: 30 },
  { id: 'interior', name: 'Sisäpuhdistus', price: 20, duration: 40 },
  { id: 'premium', name: 'Premium-pesu', price: 25, duration: 45 },
  { id: 'wax', name: 'Vahaus & Suojaus', price: 35, duration: 60 },
  { id: 'full', name: 'Täysipalvelu', price: 40, duration: 90 }
]

const timeSlots = [
  '8:00', '8:30', '9:00', '9:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'
]

export default function BookingPage() {
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

  const selectedServiceData = services.find(s => s.id === selectedService)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here would be the actual booking logic
    setIsSubmitted(true)
  }

  const nextStep = () => {
    if (bookingStep < 3) setBookingStep(bookingStep + 1)
  }

  const prevStep = () => {
    if (bookingStep > 1) setBookingStep(bookingStep - 1)
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="max-w-md w-full text-center">
          <CheckCircle2 className="h-16 w-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Varaus vahvistettu!</h1>
          <p className="text-gray-600 mb-8">
            Olemme lähettäneet vahvistuksen sähköpostiisi. Nähdään {selectedDate} klo {selectedTime}!
          </p>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md bg-purple-600 px-6 py-3 text-sm font-semibold text-white hover:bg-purple-500 transition-colors"
          >
            Takaisin etusivulle
          </a>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-white shadow-sm">
        <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Varaa aika
            </h1>
            <p className="mt-6 text-lg leading-8 text-gray-600">
              Valitse sopiva palvelu ja aika. Varaus kestää vain muutaman minuutin.
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-6 py-12 lg:px-8">
        {/* Progress Steps */}
        <div className="mb-12">
          <div className="flex items-center justify-center">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-semibold ${
                  step <= bookingStep
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`h-1 w-16 mx-4 ${
                    step < bookingStep ? 'bg-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-4 text-sm text-gray-600 max-w-md mx-auto">
            <span>Palvelu</span>
            <span>Aika</span>
            <span>Tiedot</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Step 1: Service Selection */}
          {bookingStep === 1 && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Valitse palvelu</h2>
              <div className="grid gap-4">
                {services.map((service) => (
                  <div
                    key={service.id}
                    className={`relative rounded-lg border p-4 cursor-pointer transition-colors ${
                      selectedService === service.id
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedService(service.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <input
                          type="radio"
                          name="service"
                          value={service.id}
                          checked={selectedService === service.id}
                          onChange={() => setSelectedService(service.id)}
                          className="h-4 w-4 text-purple-600 focus:ring-purple-600 border-gray-300"
                        />
                        <div className="ml-3">
                          <label className="text-lg font-medium text-gray-900 cursor-pointer">
                            {service.name}
                          </label>
                          <p className="text-sm text-gray-600">Kesto: {service.duration} min</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-2xl font-bold text-purple-600">€{service.price}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-8 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!selectedService}
                  className="rounded-md bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Seuraava
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Date and Time Selection */}
          {bookingStep === 2 && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Valitse päivä ja aika</h2>

              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">Päivämäärä</label>
                  <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-900 mb-3">Kellonaika</label>
                  <div className="grid grid-cols-4 gap-2 max-h-64 overflow-y-auto">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => setSelectedTime(time)}
                        className={`p-2 text-sm rounded-md border transition-colors ${
                          selectedTime === time
                            ? 'border-purple-600 bg-purple-600 text-white'
                            : 'border-gray-300 hover:border-gray-400'
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {selectedServiceData && selectedDate && selectedTime && (
                <div className="mt-8 p-4 bg-purple-50 rounded-lg">
                  <h3 className="font-semibold text-gray-900 mb-2">Varauksesi yhteenveto:</h3>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><strong>Palvelu:</strong> {selectedServiceData.name} (€{selectedServiceData.price})</p>
                    <p><strong>Kesto:</strong> {selectedServiceData.duration} minuuttia</p>
                    <p><strong>Aika:</strong> {selectedDate} klo {selectedTime}</p>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="rounded-md bg-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-400 transition-colors"
                >
                  Takaisin
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!selectedDate || !selectedTime}
                  className="rounded-md bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Seuraava
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Customer Information */}
          {bookingStep === 3 && (
            <div className="bg-white rounded-lg shadow-sm p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Yhteystiedot</h2>

              <div className="grid gap-6">
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-900">
                      Etunimi *
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      required
                      value={customerInfo.firstName}
                      onChange={(e) => setCustomerInfo({...customerInfo, firstName: e.target.value})}
                      className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-900">
                      Sukunimi *
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      required
                      value={customerInfo.lastName}
                      onChange={(e) => setCustomerInfo({...customerInfo, lastName: e.target.value})}
                      className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                      Sähköposti *
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={customerInfo.email}
                      onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                      className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-900">
                      Puhelinnumero *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      required
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label htmlFor="carModel" className="block text-sm font-medium text-gray-900">
                      Auton merkki ja malli
                    </label>
                    <input
                      type="text"
                      id="carModel"
                      placeholder="esim. Toyota Corolla"
                      value={customerInfo.carModel}
                      onChange={(e) => setCustomerInfo({...customerInfo, carModel: e.target.value})}
                      className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    />
                  </div>

                  <div>
                    <label htmlFor="licensePlate" className="block text-sm font-medium text-gray-900">
                      Rekisterinumero
                    </label>
                    <input
                      type="text"
                      id="licensePlate"
                      placeholder="ABC-123"
                      value={customerInfo.licensePlate}
                      onChange={(e) => setCustomerInfo({...customerInfo, licensePlate: e.target.value})}
                      className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-900">
                    Lisätiedot
                  </label>
                  <textarea
                    id="notes"
                    rows={3}
                    placeholder="Kerro lisätietoja tai erityistoiveita..."
                    value={customerInfo.notes}
                    onChange={(e) => setCustomerInfo({...customerInfo, notes: e.target.value})}
                    className="mt-2 block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-purple-600 sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

              <div className="mt-8 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="rounded-md bg-gray-300 px-6 py-3 text-sm font-semibold text-gray-700 shadow-sm hover:bg-gray-400 transition-colors"
                >
                  Takaisin
                </button>
                <button
                  type="submit"
                  className="rounded-md bg-purple-600 px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600 transition-colors"
                >
                  Vahvista varaus
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}