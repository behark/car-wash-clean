'use client'

import { useEffect, useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'

interface Booking {
  id: string
  date: string
  time: string
  service: { titleFi: string; price: number; duration: number }
  customerName: string
  customerPhone: string
  customerEmail: string
  vehicleType: string
  specialRequests?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

const AUTH_TOKEN = 'Bearer admin-kiilto-loisto-2024'

export default function AdminDashboard() {
  const router = useRouter()
  const [bookings, setBookings] = useState<Booking[]>([])
  const [allBookings, setAllBookings] = useState<Booking[]>([])
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    completed: 0,
    cancelled: 0,
    totalRevenue: 0,
  })

  useEffect(() => {
    const isAuth = sessionStorage.getItem('adminAuth')
    if (!isAuth) {
      router.push('/admin')
    }
  }, [router])

  const fetchDashboardData = useCallback(async () => {
    try {
      setLoading(true)
      setError('')
      const res = await fetch('/api/admin/bookings', {
        headers: { Authorization: AUTH_TOKEN },
      })
      if (!res.ok) throw new Error('Failed to fetch bookings')
      const data = await res.json()
      setAllBookings(data.bookings || [])
      setStats(data.stats || { total: 0, pending: 0, confirmed: 0, completed: 0, cancelled: 0, totalRevenue: 0 })
    } catch (err) {
      setError('Varausten haku epäonnistui')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchDashboardData()
  }, [fetchDashboardData])

  useEffect(() => {
    const filtered = allBookings.filter(b => b.date === selectedDate)
    setBookings(filtered.sort((a, b) => a.time.localeCompare(b.time)))
  }, [selectedDate, allBookings])

  const handleStatusUpdate = async (id: string, status: Booking['status']) => {
    try {
      const res = await fetch('/api/admin/bookings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', Authorization: AUTH_TOKEN },
        body: JSON.stringify({ id, status }),
      })
      if (!res.ok) throw new Error('Update failed')
      await fetchDashboardData()
    } catch (err) {
      console.error(err)
      alert('Tilan päivitys epäonnistui')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Haluatko varmasti poistaa tämän varauksen?')) return
    try {
      const res = await fetch(`/api/admin/bookings?id=${id}`, {
        method: 'DELETE',
        headers: { Authorization: AUTH_TOKEN },
      })
      if (!res.ok) throw new Error('Delete failed')
      await fetchDashboardData()
    } catch (err) {
      console.error(err)
      alert('Poisto epäonnistui')
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth')
    router.push('/admin')
  }

  const getStatusBadge = (status: string) => {
    const badges: Record<string, string> = {
      confirmed: 'bg-green-100 text-green-800',
      pending: 'bg-yellow-100 text-yellow-800',
      cancelled: 'bg-red-100 text-red-800',
      completed: 'bg-blue-100 text-blue-800',
    }
    return badges[status] || 'bg-gray-100 text-gray-800'
  }

  const getStatusText = (status: string) => {
    const texts: Record<string, string> = {
      confirmed: 'Vahvistettu',
      pending: 'Odottaa',
      cancelled: 'Peruutettu',
      completed: 'Valmis',
    }
    return texts[status] || status
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('fi-FI', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    })
  }

  const todayStr = new Date().toISOString().split('T')[0]
  const todayBookings = allBookings.filter(b => b.date === todayStr)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-slate-900 text-white shadow-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">Kiilto & Loisto Admin</h1>
              <p className="text-slate-400 text-sm">Hallintapaneeli</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={fetchDashboardData}
                className="text-slate-400 hover:text-white transition-colors"
                title="Päivitä"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                Kirjaudu ulos
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500 text-xs font-medium uppercase">Tänään</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{todayBookings.length}</p>
            <p className="text-sm text-gray-500">varausta</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500 text-xs font-medium uppercase">Yhteensä</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{stats.total}</p>
            <p className="text-sm text-gray-500">varausta</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500 text-xs font-medium uppercase">Vahvistettu</p>
            <p className="text-3xl font-bold text-green-600 mt-1">{stats.confirmed}</p>
            <p className="text-sm text-gray-500">varausta</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500 text-xs font-medium uppercase">Odottaa</p>
            <p className="text-3xl font-bold text-yellow-600 mt-1">{stats.pending}</p>
            <p className="text-sm text-gray-500">varausta</p>
          </div>
          <div className="bg-white rounded-xl shadow p-5">
            <p className="text-gray-500 text-xs font-medium uppercase">Liikevaihto</p>
            <p className="text-3xl font-bold text-slate-900 mt-1">{stats.totalRevenue}€</p>
            <p className="text-sm text-gray-500">ei-peruutettu</p>
          </div>
        </div>

        {/* Bookings Table */}
        <div className="bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-xl font-bold text-slate-900">Varaukset</h2>
              <div className="flex gap-3 items-center">
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                />
                <span className="text-sm text-gray-500">
                  {bookings.length} varausta · {formatDate(selectedDate)}
                </span>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
              <p className="text-gray-500">Ladataan varauksia...</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Aika</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Asiakas</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Palvelu</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Ajoneuvo</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Hinta</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Tila</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-600 uppercase">Toiminnot</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {bookings.length > 0 ? (
                    bookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-slate-900">{booking.time}</span>
                          <span className="text-xs text-gray-500 ml-1">({booking.service.duration}min)</span>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm">
                            <div className="font-medium text-slate-900">{booking.customerName}</div>
                            <div className="text-gray-600">{booking.customerPhone}</div>
                            <div className="text-gray-400 text-xs">{booking.customerEmail}</div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="text-sm text-slate-900">{booking.service.titleFi}</div>
                          {booking.specialRequests && (
                            <div className="text-xs text-amber-700 mt-1">💡 {booking.specialRequests}</div>
                          )}
                        </td>
                        <td className="px-4 py-4">
                          <span className="text-sm text-gray-700">{booking.vehicleType}</span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className="text-sm font-semibold text-slate-900">{booking.service.price}€</span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusBadge(booking.status)}`}>
                            {getStatusText(booking.status)}
                          </span>
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm">
                          <div className="flex gap-1">
                            {booking.status === 'pending' && (
                              <button
                                onClick={() => handleStatusUpdate(booking.id, 'confirmed')}
                                className="text-green-600 hover:text-green-700 font-medium"
                              >
                                Vahvista
                              </button>
                            )}
                            {booking.status === 'confirmed' && (
                              <button
                                onClick={() => handleStatusUpdate(booking.id, 'completed')}
                                className="text-blue-600 hover:text-blue-700 font-medium"
                              >
                                Valmis
                              </button>
                            )}
                            {booking.status !== 'cancelled' && booking.status !== 'completed' && (
                              <button
                                onClick={() => handleStatusUpdate(booking.id, 'cancelled')}
                                className="text-red-600 hover:text-red-700 font-medium"
                              >
                                Peruuta
                              </button>
                            )}
                            <button
                              onClick={() => handleDelete(booking.id)}
                              className="text-gray-400 hover:text-red-600 font-medium"
                              title="Poista"
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={7} className="px-6 py-12 text-center">
                        <p className="text-gray-500">Ei varauksia valitulle päivälle</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Recent bookings across all dates */}
        <div className="mt-8 bg-white rounded-xl shadow-lg">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-lg font-bold text-slate-900">Viimeisimmät varaukset</h2>
          </div>
          <div className="divide-y divide-gray-100">
            {allBookings.slice(0, 10).map((booking) => (
              <div key={booking.id} className="px-6 py-3 flex items-center justify-between hover:bg-gray-50">
                <div className="flex items-center gap-4">
                  <div className="text-sm">
                    <span className="font-medium text-slate-900">{formatDate(booking.date)}</span>
                    <span className="text-gray-500 ml-2">{booking.time}</span>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-slate-900">{booking.customerName}</p>
                    <p className="text-xs text-gray-500">{booking.service.titleFi}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold">{booking.service.price}€</span>
                  <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${getStatusBadge(booking.status)}`}>
                    {getStatusText(booking.status)}
                  </span>
                </div>
              </div>
            ))}
            {allBookings.length === 0 && (
              <div className="px-6 py-8 text-center text-gray-500">Ei varauksia</div>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}