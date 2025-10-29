'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

// Mock data for demonstration
const mockBookings = [
  {
    id: 'BK-2024-001',
    date: '2024-10-30',
    time: '10:00',
    service: 'Käsinpesu + Sisäpuhdistus',
    customerName: 'Matti Meikäläinen',
    customerPhone: '+358401234567',
    customerEmail: 'matti@example.com',
    vehicleType: 'Henkilöauto',
    status: 'confirmed',
    price: 55
  },
  {
    id: 'BK-2024-002',
    date: '2024-10-30',
    time: '14:00',
    service: 'Käsinpesu + Kovavaha',
    customerName: 'Liisa Lahtinen',
    customerPhone: '+358409876543',
    customerEmail: 'liisa@example.com',
    vehicleType: 'SUV',
    status: 'confirmed',
    price: 110
  },
  {
    id: 'BK-2024-003',
    date: '2024-10-31',
    time: '09:00',
    service: 'Renkaiden Vaihto',
    customerName: 'Pekka Pekkanen',
    customerPhone: '+358405555555',
    customerEmail: 'pekka@example.com',
    vehicleType: 'Henkilöauto',
    status: 'pending',
    price: 20
  }
]

export default function AdminDashboard() {
  const router = useRouter()
  const [bookings, setBookings] = useState(mockBookings)
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [stats, setStats] = useState({
    todayBookings: 3,
    weekBookings: 12,
    monthRevenue: 2450,
    pendingConfirmations: 1
  })

  useEffect(() => {
    // Check authentication
    const isAuth = sessionStorage.getItem('adminAuth')
    if (!isAuth) {
      router.push('/admin')
    }
  }, [router])

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth')
    router.push('/admin')
  }

  const filteredBookings = bookings.filter(booking => booking.date === selectedDate)

  const getStatusBadge = (status: string) => {
    const badges = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800'
    }
    return badges[status as keyof typeof badges] || 'bg-gray-100 text-gray-800'
  }

  const getStatusText = (status: string) => {
    const texts = {
      confirmed: 'Vahvistettu',
      pending: 'Odottaa',
      cancelled: 'Peruutettu',
      completed: 'Valmis'
    }
    return texts[status as keyof typeof texts] || status
  }

  return (
    <div className="min-h-screen bg-silver-50">
      {/* Header */}
      <header className="bg-navy-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Kiilto & Loisto Admin</h1>
              <p className="text-silver-300 text-sm">Hallintapaneeli</p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-silver-300">Admin</span>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors"
              >
                Kirjaudu ulos
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-silver-600 text-sm">Tänään</p>
                <p className="text-3xl font-bold text-navy-900">{stats.todayBookings}</p>
                <p className="text-sm text-silver-500">varausta</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-silver-600 text-sm">Tämä viikko</p>
                <p className="text-3xl font-bold text-navy-900">{stats.weekBookings}</p>
                <p className="text-sm text-silver-500">varausta</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-silver-600 text-sm">Kuukauden liikevaihto</p>
                <p className="text-3xl font-bold text-navy-900">{stats.monthRevenue}€</p>
                <p className="text-sm text-silver-500">+12% ed. kk</p>
              </div>
              <div className="w-12 h-12 bg-gold-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-gold-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-silver-600 text-sm">Odottaa vahvistusta</p>
                <p className="text-3xl font-bold text-navy-900">{stats.pendingConfirmations}</p>
                <p className="text-sm text-silver-500">varausta</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-silver-200">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold text-navy-900">Varaukset</h2>
              <div className="flex gap-4">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-4 py-2 border border-silver-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent"
                />
                <button className="bg-gold-500 hover:bg-gold-600 text-white px-4 py-2 rounded-lg transition-colors">
                  Vie Excel
                </button>
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-silver-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-silver-600 uppercase tracking-wider">
                    Varausnumero
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-silver-600 uppercase tracking-wider">
                    Aika
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-silver-600 uppercase tracking-wider">
                    Asiakas
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-silver-600 uppercase tracking-wider">
                    Palvelu
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-silver-600 uppercase tracking-wider">
                    Hinta
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-silver-600 uppercase tracking-wider">
                    Tila
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-silver-600 uppercase tracking-wider">
                    Toiminnot
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-silver-200">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((booking) => (
                    <tr key={booking.id} className="hover:bg-silver-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-medium text-navy-900">{booking.id}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm text-navy-900">{booking.time}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="font-medium text-navy-900">{booking.customerName}</div>
                          <div className="text-silver-600">{booking.customerPhone}</div>
                          <div className="text-silver-500 text-xs">{booking.customerEmail}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm">
                          <div className="text-navy-900">{booking.service}</div>
                          <div className="text-silver-600 text-xs">{booking.vehicleType}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="text-sm font-semibold text-navy-900">{booking.price}€</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(booking.status)}`}>
                          {getStatusText(booking.status)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <button className="text-gold-600 hover:text-gold-700 mr-3">
                          Muokkaa
                        </button>
                        <button className="text-red-600 hover:text-red-700">
                          Peruuta
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="px-6 py-12 text-center">
                      <p className="text-silver-500">Ei varauksia valitulle päivälle</p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/admin/bookings/new"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-navy-900">Uusi varaus</h3>
                <p className="text-sm text-silver-600">Luo varaus manuaalisesti</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/services"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-navy-900">Hallitse palveluita</h3>
                <p className="text-sm text-silver-600">Muokkaa hintoja ja palveluita</p>
              </div>
            </div>
          </Link>

          <Link
            href="/admin/reports"
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
          >
            <div className="flex items-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4">
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v1a1 1 0 001 1h4a1 1 0 001-1v-1m3-2V8a2 2 0 00-2-2H8a2 2 0 00-2 2v8m5 0h2m2 0h3m-10 0h-3m9-13V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M8 6h8" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold text-navy-900">Raportit</h3>
                <p className="text-sm text-silver-600">Näytä tilastot ja raportit</p>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  )
}