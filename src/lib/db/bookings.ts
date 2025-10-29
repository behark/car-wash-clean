import fs from 'fs'
import path from 'path'

// Database schema
export interface Booking {
  id: string
  date: string
  time: string
  service: {
    titleFi: string
    price: number
    duration: number
  }
  customerName: string
  customerPhone: string
  customerEmail: string
  vehicleType: string
  specialRequests?: string
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled'
  createdAt: string
  updatedAt: string
}

// Simple file-based database (for demo purposes)
// In production, replace with PostgreSQL, MongoDB, or another database
class BookingDatabase {
  private dbPath: string
  private bookings: Booking[] = []

  constructor() {
    // Store in data directory (create if doesn't exist)
    const dataDir = path.join(process.cwd(), 'data')
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true })
    }

    this.dbPath = path.join(dataDir, 'bookings.json')
    this.loadBookings()
  }

  private loadBookings() {
    try {
      if (fs.existsSync(this.dbPath)) {
        const data = fs.readFileSync(this.dbPath, 'utf-8')
        this.bookings = JSON.parse(data)
      }
    } catch (error) {
      console.error('Error loading bookings:', error)
      this.bookings = []
    }
  }

  private saveBookings() {
    try {
      fs.writeFileSync(this.dbPath, JSON.stringify(this.bookings, null, 2))
    } catch (error) {
      console.error('Error saving bookings:', error)
    }
  }

  // Create a new booking
  async create(bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> {
    const booking: Booking = {
      ...bookingData,
      id: this.generateBookingId(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }

    this.bookings.push(booking)
    this.saveBookings()
    return booking
  }

  // Get all bookings
  async getAll(): Promise<Booking[]> {
    return this.bookings
  }

  // Get bookings by date
  async getByDate(date: string): Promise<Booking[]> {
    return this.bookings.filter(booking => booking.date === date)
  }

  // Get a single booking by ID
  async getById(id: string): Promise<Booking | null> {
    return this.bookings.find(booking => booking.id === id) || null
  }

  // Update booking status
  async updateStatus(id: string, status: Booking['status']): Promise<Booking | null> {
    const index = this.bookings.findIndex(booking => booking.id === id)
    if (index === -1) return null

    this.bookings[index].status = status
    this.bookings[index].updatedAt = new Date().toISOString()
    this.saveBookings()
    return this.bookings[index]
  }

  // Delete a booking
  async delete(id: string): Promise<boolean> {
    const index = this.bookings.findIndex(booking => booking.id === id)
    if (index === -1) return false

    this.bookings.splice(index, 1)
    this.saveBookings()
    return true
  }

  // Get bookings for admin dashboard
  async getBookingsForDashboard(startDate?: string, endDate?: string): Promise<{
    bookings: Booking[]
    stats: {
      total: number
      pending: number
      confirmed: number
      completed: number
      cancelled: number
      totalRevenue: number
    }
  }> {
    let filteredBookings = [...this.bookings]

    // Filter by date range if provided
    if (startDate && endDate) {
      filteredBookings = filteredBookings.filter(booking => {
        return booking.date >= startDate && booking.date <= endDate
      })
    }

    // Calculate stats
    const stats = {
      total: filteredBookings.length,
      pending: filteredBookings.filter(b => b.status === 'pending').length,
      confirmed: filteredBookings.filter(b => b.status === 'confirmed').length,
      completed: filteredBookings.filter(b => b.status === 'completed').length,
      cancelled: filteredBookings.filter(b => b.status === 'cancelled').length,
      totalRevenue: filteredBookings
        .filter(b => b.status !== 'cancelled')
        .reduce((sum, b) => sum + b.service.price, 0)
    }

    // Sort by date and time (newest first)
    filteredBookings.sort((a, b) => {
      const dateCompare = b.date.localeCompare(a.date)
      if (dateCompare !== 0) return dateCompare
      return b.time.localeCompare(a.time)
    })

    return { bookings: filteredBookings, stats }
  }

  // Generate unique booking ID
  private generateBookingId(): string {
    const year = new Date().getFullYear()
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    return `BK-${year}-${randomNum}`
  }

  // Check for time slot availability
  async isTimeSlotAvailable(date: string, time: string): Promise<boolean> {
    const bookingsOnDate = await this.getByDate(date)
    const conflictingBooking = bookingsOnDate.find(
      booking => booking.time === time && booking.status !== 'cancelled'
    )
    return !conflictingBooking
  }

  // Get available time slots for a date
  async getAvailableTimeSlots(date: string): Promise<string[]> {
    const allTimeSlots = [
      '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
      '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
      '17:00', '17:30', '18:00'
    ]

    const bookingsOnDate = await this.getByDate(date)
    const bookedTimes = bookingsOnDate
      .filter(b => b.status !== 'cancelled')
      .map(b => b.time)

    return allTimeSlots.filter(slot => !bookedTimes.includes(slot))
  }
}

// Export singleton instance
const bookingDb = new BookingDatabase()
export default bookingDb