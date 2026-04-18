import { prisma } from './prisma'

// Database schema (kept compatible with existing API)
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

// Map Prisma row to Booking interface
function toBooking(row: any): Booking {
  return {
    id: row.id,
    date: row.date,
    time: row.time,
    service: {
      titleFi: row.serviceTitle,
      price: row.servicePrice,
      duration: row.serviceDuration,
    },
    customerName: row.customerName,
    customerPhone: row.customerPhone,
    customerEmail: row.customerEmail,
    vehicleType: row.vehicleType,
    specialRequests: row.specialRequests ?? undefined,
    status: row.status.toLowerCase() as Booking['status'],
    createdAt: row.createdAt.toISOString(),
    updatedAt: row.updatedAt.toISOString(),
  }
}

// PostgreSQL-backed database via Prisma
class BookingDatabase {
  // Create a new booking
  async create(bookingData: Omit<Booking, 'id' | 'createdAt' | 'updatedAt'>): Promise<Booking> {
    const row = await prisma.booking.create({
      data: {
        date: bookingData.date,
        time: bookingData.time,
        serviceTitle: bookingData.service.titleFi,
        servicePrice: bookingData.service.price,
        serviceDuration: bookingData.service.duration,
        customerName: bookingData.customerName,
        customerPhone: bookingData.customerPhone,
        customerEmail: bookingData.customerEmail,
        vehicleType: bookingData.vehicleType,
        specialRequests: bookingData.specialRequests ?? null,
        status: (bookingData.status || 'confirmed').toUpperCase() as any,
      },
    })
    return toBooking(row)
  }

  // Get all bookings
  async getAll(): Promise<Booking[]> {
    const rows = await prisma.booking.findMany({
      orderBy: [{ date: 'desc' }, { time: 'desc' }],
    })
    return rows.map(toBooking)
  }

  // Get bookings by date
  async getByDate(date: string): Promise<Booking[]> {
    const rows = await prisma.booking.findMany({
      where: { date },
      orderBy: { time: 'asc' },
    })
    return rows.map(toBooking)
  }

  // Get a single booking by ID
  async getById(id: string): Promise<Booking | null> {
    const row = await prisma.booking.findUnique({ where: { id } })
    return row ? toBooking(row) : null
  }

  // Update booking status
  async updateStatus(id: string, status: Booking['status']): Promise<Booking | null> {
    try {
      const row = await prisma.booking.update({
        where: { id },
        data: { status: status.toUpperCase() as any },
      })
      return toBooking(row)
    } catch {
      return null
    }
  }

  // Delete a booking
  async delete(id: string): Promise<boolean> {
    try {
      await prisma.booking.delete({ where: { id } })
      return true
    } catch {
      return false
    }
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
    const where: any = {}
    if (startDate && endDate) {
      where.date = { gte: startDate, lte: endDate }
    }

    const rows = await prisma.booking.findMany({
      where,
      orderBy: [{ date: 'desc' }, { time: 'desc' }],
    })

    const bookings = rows.map(toBooking)

    const stats = {
      total: bookings.length,
      pending: bookings.filter(b => b.status === 'pending').length,
      confirmed: bookings.filter(b => b.status === 'confirmed').length,
      completed: bookings.filter(b => b.status === 'completed').length,
      cancelled: bookings.filter(b => b.status === 'cancelled').length,
      totalRevenue: bookings
        .filter(b => b.status !== 'cancelled')
        .reduce((sum, b) => sum + b.service.price, 0),
    }

    return { bookings, stats }
  }

  // Check for time slot availability
  async isTimeSlotAvailable(date: string, time: string): Promise<boolean> {
    const count = await prisma.booking.count({
      where: {
        date,
        time,
        status: { not: 'CANCELLED' },
      },
    })
    return count === 0
  }

  // Get available time slots for a date
  async getAvailableTimeSlots(date: string): Promise<string[]> {
    const allTimeSlots = [
      '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
      '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
      '14:00', '14:30', '15:00', '15:30', '16:00', '16:30',
      '17:00', '17:30', '18:00',
    ]

    const bookedRows = await prisma.booking.findMany({
      where: { date, status: { not: 'CANCELLED' } },
      select: { time: true },
    })
    const bookedTimes = bookedRows.map(r => r.time)

    return allTimeSlots.filter(slot => !bookedTimes.includes(slot))
  }
}

// Export singleton instance
const bookingDb = new BookingDatabase()
export default bookingDb