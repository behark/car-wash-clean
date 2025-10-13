'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar,
  Clock,
  Car,
  CheckCircle,
  X,
  Euro,
  MapPin,
  User,
  Phone,
  Mail,
  Info,
  Sparkles,
  Shield,
  Zap,
  Star
} from 'lucide-react';
import { mockServices } from '../lib/mockData';

interface Service {
  _id: string;
  titleFi: string;
  titleEn: string;
  descriptionFi: string;
  descriptionEn: string;
  price: number;
  duration: number;
  capacity: number;
  image: string;
  isActive: boolean;
  category: 'wash' | 'premium' | 'tire' | 'additional';
}

interface TimeSlot {
  time: string;
  available: boolean;
  duration: number;
}

interface BookingData {
  date: string;
  time: string;
  service: Service;
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleType: string;
  specialRequests: string;
}

const services: Service[] = mockServices;

const vehicleTypes = [
  'Henkilöauto / Car',
  'SUV / Maastoauto',
  'Van / Pakettiauto',
  'Moottoripyörä / Motorcycle'
];

export default function BookingSystem() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [availableSlots, setAvailableSlots] = useState<TimeSlot[]>([]);
  const [bookingData, setBookingData] = useState<BookingData>({
    date: '',
    time: '',
    service: mockServices[0],
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    vehicleType: vehicleTypes[0],
    specialRequests: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate available time slots
  const generateTimeSlots = useCallback(() => {
    const slots: TimeSlot[] = [];
    const startHour = 8;
    const endHour = 18;
    const duration = selectedService?.duration || 30;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        const time = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const endTime = new Date();
        endTime.setHours(hour, minute + duration);

        // Don't add slot if service would go past closing time
        if (endTime.getHours() <= endHour) {
          slots.push({
            time,
            available: Math.random() > 0.3, // Simulate availability
            duration
          });
        }
      }
    }

    setAvailableSlots(slots);
  }, [selectedService]);

  useEffect(() => {
    if (selectedDate && selectedService) {
      generateTimeSlots();
    }
  }, [selectedDate, selectedService, generateTimeSlots]);

  const getNextAvailableDates = () => {
    const dates = [];
    const today = new Date();

    for (let i = 1; i <= 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);

      // Skip Sundays (day 0)
      if (date.getDay() !== 0) {
        dates.push({
          value: date.toISOString().split('T')[0],
          label: date.toLocaleDateString('fi-FI', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
          })
        });
      }
    }

    return dates;
  };

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setBookingData(prev => ({ ...prev, service }));
    setCurrentStep(2);
  };

  const handleDateTimeSelect = () => {
    setBookingData(prev => ({
      ...prev,
      date: selectedDate,
      time: selectedTime
    }));
    setCurrentStep(3);
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));

    // In real implementation, this would call your booking API
    console.log('Booking submitted:', bookingData);

    setIsSubmitting(false);
    setCurrentStep(4);
  };

  const resetBooking = () => {
    setCurrentStep(1);
    setSelectedService(null);
    setSelectedDate('');
    setSelectedTime('');
    setBookingData({
      date: '',
      time: '',
      service: mockServices[0],
      customerName: '',
      customerPhone: '',
      customerEmail: '',
      vehicleType: vehicleTypes[0],
      specialRequests: ''
    });
  };

  if (!isOpen) {
    return (
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-20 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 z-40 group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Calendar className="h-6 w-6" />
        <div className="absolute right-full mr-3 top-1/2 transform -translate-y-1/2 bg-gray-900 text-white px-3 py-2 rounded-lg text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap pointer-events-none">
          Varaa Pesuvuoro
          <div className="absolute left-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-l-gray-900"></div>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="fixed inset-4 bg-white rounded-2xl shadow-2xl border border-gray-200 z-50 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Calendar className="h-6 w-6" />
            <div>
              <h2 className="text-xl font-bold">Varaa Pesuvuoro</h2>
              <p className="text-emerald-100 text-sm">Vaihe {currentStep} / 4</p>
            </div>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="text-white/80 hover:text-white p-1 rounded"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 bg-emerald-700/30 rounded-full h-2">
          <div
            className="bg-white rounded-full h-2 transition-all duration-500"
            style={{ width: `${(currentStep / 4) * 100}%` }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Service Selection */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Valitse Palvelu</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-h-96 overflow-y-auto">
                {services.map((service) => (
                  <motion.button
                    key={service._id}
                    onClick={() => handleServiceSelect(service)}
                    className={`relative p-4 border-2 rounded-xl transition-all duration-200 text-left group hover:scale-105 ${
                      service.category === 'wash'
                        ? 'border-blue-500 bg-blue-50'
                        : service.category === 'premium'
                        ? 'border-purple-500 bg-purple-50'
                        : service.category === 'tire'
                        ? 'border-green-500 bg-green-50'
                        : 'border-orange-500 bg-orange-50'
                    }`}
                    whileHover={{ y: -2 }}
                  >
                    {service.category === 'premium' && (
                      <div className="absolute -top-2 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        PREMIUM
                      </div>
                    )}
                    {service.category === 'wash' && service._id === '2' && (
                      <div className="absolute -top-2 left-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                        SUOSITUIN
                      </div>
                    )}

                    <div className="flex items-start justify-between mb-3">
                      <h4 className="text-sm font-bold text-gray-900 line-clamp-2">{service.titleFi}</h4>
                      <div className="text-right">
                        <div className="text-lg font-bold text-emerald-600">€{service.price}</div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-xs mb-3 line-clamp-2">{service.descriptionFi}</p>

                    <div className="flex items-center justify-end">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        service.category === 'wash' ? 'bg-blue-100 text-blue-700' :
                        service.category === 'premium' ? 'bg-purple-100 text-purple-700' :
                        service.category === 'tire' ? 'bg-green-100 text-green-700' :
                        'bg-orange-100 text-orange-700'
                      }`}>
                        {service.category === 'wash' ? 'Pesu' :
                         service.category === 'premium' ? 'Premium' :
                         service.category === 'tire' ? 'Renkaat' :
                         'Lisäpalvelu'}
                      </span>
                    </div>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Date & Time Selection */}
          {currentStep === 2 && selectedService && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Valitse Aika</h3>
                <button
                  onClick={() => setCurrentStep(1)}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  ← Takaisin
                </button>
              </div>

              {/* Selected Service Summary */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-bold text-emerald-900">{selectedService.titleFi}</h4>
                    <p className="text-emerald-700 text-sm">{selectedService.descriptionFi}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-bold text-emerald-600">€{selectedService.price}</div>
                  </div>
                </div>
              </div>

              {/* Date Selection */}
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-3">Valitse Päivä</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {getNextAvailableDates().map((date) => (
                    <button
                      key={date.value}
                      onClick={() => setSelectedDate(date.value)}
                      className={`p-3 border rounded-lg transition-all ${
                        selectedDate === date.value
                          ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                          : 'border-gray-200 hover:border-emerald-300'
                      }`}
                    >
                      <div className="text-sm font-medium">{date.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Time Selection */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">Valitse Aika</h4>
                  <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
                    {availableSlots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.time)}
                        disabled={!slot.available}
                        className={`p-2 border rounded-lg transition-all text-sm ${
                          selectedTime === slot.time
                            ? 'border-emerald-500 bg-emerald-50 text-emerald-700'
                            : slot.available
                            ? 'border-gray-200 hover:border-emerald-300'
                            : 'border-gray-100 bg-gray-50 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        {slot.time}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {selectedDate && selectedTime && (
                <button
                  onClick={handleDateTimeSelect}
                  className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  Jatka Tietojen Täyttöön →
                </button>
              )}
            </motion.div>
          )}

          {/* Step 3: Customer Information */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-bold text-gray-900">Yhteystiedot</h3>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="text-emerald-600 hover:text-emerald-700 font-medium"
                >
                  ← Takaisin
                </button>
              </div>

              {/* Booking Summary */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <h4 className="font-bold text-gray-900 mb-2">Varauksen Yhteenveto</h4>
                <div className="space-y-1 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Palvelu:</span>
                    <span className="font-medium">{selectedService?.titleFi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Päivä:</span>
                    <span className="font-medium">{new Date(selectedDate).toLocaleDateString('fi-FI')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Aika:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between font-bold text-emerald-600 pt-2 border-t">
                    <span>Hinta:</span>
                    <span>€{selectedService?.price}</span>
                  </div>
                </div>
              </div>

              {/* Customer Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <User className="inline h-4 w-4 mr-1" />
                    Nimi *
                  </label>
                  <input
                    type="text"
                    required
                    value={bookingData.customerName}
                    onChange={(e) => setBookingData(prev => ({...prev, customerName: e.target.value}))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    placeholder="Etunimi Sukunimi"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Phone className="inline h-4 w-4 mr-1" />
                    Puhelinnumero *
                  </label>
                  <input
                    type="tel"
                    required
                    value={bookingData.customerPhone}
                    onChange={(e) => setBookingData(prev => ({...prev, customerPhone: e.target.value}))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    placeholder="+358 40 123 4567"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Mail className="inline h-4 w-4 mr-1" />
                    Sähköposti *
                  </label>
                  <input
                    type="email"
                    required
                    value={bookingData.customerEmail}
                    onChange={(e) => setBookingData(prev => ({...prev, customerEmail: e.target.value}))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                    placeholder="sähköposti@example.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Car className="inline h-4 w-4 mr-1" />
                    Ajoneuvon Tyyppi
                  </label>
                  <select
                    value={bookingData.vehicleType}
                    onChange={(e) => setBookingData(prev => ({...prev, vehicleType: e.target.value}))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  >
                    {vehicleTypes.map(type => (
                      <option key={type} value={type}>{type}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Info className="inline h-4 w-4 mr-1" />
                  Lisätiedot (valinnainen)
                </label>
                <textarea
                  value={bookingData.specialRequests}
                  onChange={(e) => setBookingData(prev => ({...prev, specialRequests: e.target.value}))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
                  rows={3}
                  placeholder="Erityistoiveet tai lisätiedot autosta..."
                />
              </div>

              <button
                onClick={handleSubmit}
                disabled={!bookingData.customerName || !bookingData.customerPhone || !bookingData.customerEmail || isSubmitting}
                className="w-full bg-emerald-600 text-white py-4 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Vahvistetaan varausta...
                  </>
                ) : (
                  'Vahvista Varaus'
                )}
              </button>
            </motion.div>
          )}

          {/* Step 4: Confirmation */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-6"
            >
              <div className="mx-auto w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-emerald-600" />
              </div>

              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Varaus Vahvistettu!</h3>
                <p className="text-gray-600">Kiitos varauksestasi. Lähetimme vahvistuksen sähköpostiisi.</p>
              </div>

              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-6 text-left">
                <h4 className="font-bold text-emerald-900 mb-4">Varauksen Tiedot</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Palvelu:</span>
                    <span className="font-medium">{selectedService?.titleFi}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Päivä:</span>
                    <span className="font-medium">{new Date(selectedDate).toLocaleDateString('fi-FI')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Aika:</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="flex justify-between font-bold text-emerald-600 pt-2 border-t">
                    <span>Hinta:</span>
                    <span>€{selectedService?.price}</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-start space-x-2">
                  <Info className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm text-blue-800">
                    <p className="font-medium mb-1">Tärkeää:</p>
                    <ul className="space-y-1 text-xs">
                      <li>• Saavu 5 minuuttia ennen varattua aikaa</li>
                      <li>• Tuo ajoneuvon avaimet mukaan</li>
                      <li>• Maksu käteisellä tai kortilla paikan päällä</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="flex flex-col space-y-3">
                <button
                  onClick={() => {
                    resetBooking();
                    setIsOpen(false);
                  }}
                  className="w-full bg-emerald-600 text-white py-3 px-4 rounded-lg hover:bg-emerald-700 transition-colors font-medium"
                >
                  Valmis
                </button>
                <button
                  onClick={resetBooking}
                  className="w-full bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                >
                  Tee Uusi Varaus
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}