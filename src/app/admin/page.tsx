'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    // Simple client-side authentication (for demo purposes)
    // In production, this should be handled by a proper auth system
    if (credentials.username === 'admin' && credentials.password === 'KiiltoLoisto2024!') {
      // Store auth state (in production, use proper JWT tokens)
      sessionStorage.setItem('adminAuth', 'true')
      router.push('/admin/dashboard')
    } else {
      setError('Virheellinen käyttäjätunnus tai salasana')
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-navy-900 to-navy-800 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Logo/Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gold-500 rounded-full mx-auto mb-4 flex items-center justify-center">
              <svg
                className="w-10 h-10 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-navy-900">Ylläpitäjän kirjautuminen</h1>
            <p className="text-silver-600 mt-2">Kiilto & Loisto Admin</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="username" className="block text-sm font-medium text-navy-900 mb-2">
                Käyttäjätunnus
              </label>
              <input
                id="username"
                type="text"
                required
                value={credentials.username}
                onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                className="w-full px-4 py-3 border border-silver-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                placeholder="Syötä käyttäjätunnus"
                autoComplete="username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-navy-900 mb-2">
                Salasana
              </label>
              <input
                id="password"
                type="password"
                required
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                className="w-full px-4 py-3 border border-silver-300 rounded-lg focus:ring-2 focus:ring-gold-500 focus:border-transparent transition-all"
                placeholder="Syötä salasana"
                autoComplete="current-password"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Kirjaudutaan...' : 'Kirjaudu sisään'}
            </button>
          </form>

          {/* Help Text */}
          <div className="mt-8 pt-6 border-t border-silver-200 text-center">
            <p className="text-sm text-silver-600">
              Ongelmia kirjautumisessa?
            </p>
            <a
              href="mailto:Info@kiiltoloisto.fi"
              className="text-sm text-gold-600 hover:underline mt-1 inline-block"
            >
              Ota yhteyttä tukeen
            </a>
          </div>

          {/* Demo Credentials Notice */}
          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-xs text-blue-800">
              <strong>Demo-tunnukset:</strong><br />
              Käyttäjä: admin<br />
              Salasana: KiiltoLoisto2024!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}