import { NextRequest, NextResponse } from 'next/server'
import bookingDb from '@/lib/db/bookings'

export async function GET(request: NextRequest) {
  try {
    const date = request.nextUrl.searchParams.get('date')

    if (!date) {
      return NextResponse.json(
        { error: 'Missing date parameter' },
        { status: 400 }
      )
    }

    // Validate date format
    const dateObj = new Date(date)
    if (isNaN(dateObj.getTime())) {
      return NextResponse.json(
        { error: 'Invalid date format' },
        { status: 400 }
      )
    }

    // Check if Sunday (closed)
    if (dateObj.getDay() === 0) {
      return NextResponse.json({
        date,
        bookedSlots: [],
        availableSlots: [],
        message: 'Suljettu sunnuntaisin',
      })
    }

    // Get available slots from the database
    const availableSlots = await bookingDb.getAvailableTimeSlots(date)

    // Derive booked slots from all possible slots minus available
    const dayOfWeek = dateObj.getDay()
    const allSlots = generateAllSlots(dayOfWeek)
    const bookedSlots = allSlots.filter(slot => !availableSlots.includes(slot))

    return NextResponse.json({
      date,
      bookedSlots,
      availableSlots,
    })
  } catch (error) {
    console.error('Error fetching time slots:', error)
    return NextResponse.json(
      { error: 'Failed to fetch time slots' },
      { status: 500 }
    )
  }
}

function generateAllSlots(dayOfWeek: number): string[] {
  const slots: string[] = []
  let startHour = 8
  let endHour = 18

  if (dayOfWeek === 6) {
    startHour = 10
    endHour = 16
  }

  for (let hour = startHour; hour < endHour; hour++) {
    for (const minute of [0, 30]) {
      slots.push(`${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`)
    }
  }
  return slots
}
