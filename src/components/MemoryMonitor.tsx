'use client'

import { useEffect } from 'react'
import { startMemoryMonitoring, stopMemoryMonitoring } from '../lib/memoryMonitor'

// Server-side memory monitor that runs only in production
export default function MemoryMonitor() {
  useEffect(() => {
    // Only run in production and on server-side
    if (process.env.NODE_ENV !== 'production') return
    if (typeof window !== 'undefined') return

    // Starting memory monitoring for car-wash application
    const intervalId = startMemoryMonitoring()

    // Global error handler for memory issues
    const handleError = (error: ErrorEvent) => {
      if (error.message?.includes('out of memory') ||
          error.message?.includes('maximum call stack')) {
        console.error('🚨 Memory-related error detected:', error.message)
        // Emergency cleanup
        import('../lib/memoryMonitor').then(({ emergencyMemoryCleanup }) => {
          emergencyMemoryCleanup()
        })
      }
    }

    // Process event listeners for memory issues
    if (typeof process !== 'undefined') {
      process.on('warning', (warning) => {
        if (warning.name === 'MaxListenersExceededWarning' ||
            warning.message?.includes('memory')) {
          console.warn('⚠️ Memory warning:', warning.message)
        }
      })

      // Handle uncaught exceptions that might be memory related
      process.on('uncaughtException', (error) => {
        if (error.message?.includes('out of memory') ||
            error.message?.includes('heap')) {
          console.error('🚨 Memory-related uncaught exception:', error.message)
          import('../lib/memoryMonitor').then(({ emergencyMemoryCleanup }) => {
            emergencyMemoryCleanup()
          })
        }
      })
    }

    return () => {
      if (intervalId) {
        stopMemoryMonitoring(intervalId)
      }
    }
  }, [])

  // This component renders nothing - it's just for memory monitoring
  return null
}