import { NextRequest, NextResponse } from 'next/server';
import bookingDb from '@/lib/db/bookings';

// Simple authentication check
function isAuthenticated(request: NextRequest): boolean {
  // In production, use proper JWT tokens and authentication
  const authHeader = request.headers.get('authorization');

  // For demo purposes, check a simple Bearer token
  // In production, validate JWT token here
  return authHeader === 'Bearer admin-kiilto-loisto-2024';
}

// GET: Fetch bookings for admin dashboard
export async function GET(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get query parameters
    const searchParams = request.nextUrl.searchParams;
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const date = searchParams.get('date');

    // If specific date is requested
    if (date) {
      const bookings = await bookingDb.getByDate(date);
      return NextResponse.json({
        success: true,
        bookings,
        count: bookings.length
      });
    }

    // Get bookings with optional date range
    const dashboardData = await bookingDb.getBookingsForDashboard(
      startDate || undefined,
      endDate || undefined
    );

    return NextResponse.json({
      success: true,
      ...dashboardData
    });

  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    );
  }
}

// PUT: Update booking status
export async function PUT(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id, status } = await request.json();

    if (!id || !status) {
      return NextResponse.json(
        { error: 'Missing booking ID or status' },
        { status: 400 }
      );
    }

    // Validate status
    const validStatuses = ['pending', 'confirmed', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return NextResponse.json(
        { error: 'Invalid status' },
        { status: 400 }
      );
    }

    const updatedBooking = await bookingDb.updateStatus(id, status as any);

    if (!updatedBooking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      booking: updatedBooking
    });

  } catch (error) {
    console.error('Error updating booking:', error);
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    );
  }
}

// DELETE: Cancel/delete a booking
export async function DELETE(request: NextRequest) {
  try {
    // Check authentication
    if (!isAuthenticated(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const searchParams = request.nextUrl.searchParams;
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json(
        { error: 'Missing booking ID' },
        { status: 400 }
      );
    }

    const deleted = await bookingDb.delete(id);

    if (!deleted) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: 'Booking deleted successfully'
    });

  } catch (error) {
    console.error('Error deleting booking:', error);
    return NextResponse.json(
      { error: 'Failed to delete booking' },
      { status: 500 }
    );
  }
}