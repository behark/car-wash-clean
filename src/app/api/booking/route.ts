import { NextRequest, NextResponse } from 'next/server';
import { validatePhoneNumber, validateEmail, validateName } from '@/lib/validation';
import { sendBookingConfirmationEmail, sendBusinessNotificationEmail } from '@/lib/email';
import bookingDb from '@/lib/db/bookings';
import twilio from 'twilio';

interface BookingData {
  date: string;
  time: string;
  service: {
    titleFi: string;
    price: number;
    duration: number;
  };
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  vehicleType: string;
  specialRequests: string;
}

// Extract WhatsApp notification to separate function
async function sendWhatsAppNotification(data: BookingData, bookingId: string) {
  console.log('🔍 Checking WhatsApp configuration...');

  if (!process.env.BUSINESS_WHATSAPP_NUMBER || !process.env.TWILIO_ACCOUNT_SID) {
    console.log('⚠️ WhatsApp not configured, skipping notification');
    console.log('- BUSINESS_WHATSAPP_NUMBER:', !!process.env.BUSINESS_WHATSAPP_NUMBER);
    console.log('- TWILIO_ACCOUNT_SID:', !!process.env.TWILIO_ACCOUNT_SID);
    console.log('- TWILIO_AUTH_TOKEN:', !!process.env.TWILIO_AUTH_TOKEN);
    return;
  }

  try {
    console.log('📱 Initializing Twilio client...');
    const client = twilio(
      process.env.TWILIO_ACCOUNT_SID,
      process.env.TWILIO_AUTH_TOKEN
    );

    const formattedDate = new Date(data.date).toLocaleDateString('fi-FI', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    const businessMessage = `🚗 New Car Wash Booking

📅 Date: ${formattedDate} at ${data.time}
💼 Service: ${data.service.titleFi} (€${data.service.price})
👤 Customer: ${data.customerName}
📞 Phone: ${data.customerPhone}
📧 Email: ${data.customerEmail}
🚙 Vehicle: ${data.vehicleType}
🆔 Booking ID: ${bookingId}

${data.specialRequests ? `📝 Notes: ${data.specialRequests}` : '✅ No special requests'}`;

    console.log('📤 Sending WhatsApp message...');
    console.log('- From:', process.env.TWILIO_WHATSAPP_FROM);
    console.log('- To:', process.env.BUSINESS_WHATSAPP_NUMBER);

    const message = await client.messages.create({
      from: `whatsapp:${process.env.TWILIO_WHATSAPP_FROM}`,
      to: `whatsapp:${process.env.BUSINESS_WHATSAPP_NUMBER}`,
      body: businessMessage
    });

    console.log('✅ WhatsApp business notification sent successfully');
    console.log('- Message SID:', message.sid);
    console.log('- Status:', message.status);
  } catch (error: any) {
    console.error('❌ WhatsApp business notification failed:', error);

    // Log specific Twilio error details
    if (error.code) {
      console.error('   Error Code:', error.code);
      console.error('   Error Message:', error.message);

      // Common Twilio WhatsApp error codes
      if (error.code === 63015) {
        console.error('   📱 Solution: Recipient must join sandbox by sending "join <sandbox-word>" to +14155238886');
      } else if (error.code === 63003) {
        console.error('   ⚠️ Solution: Check your WhatsApp sender number configuration');
      } else if (error.code === 63016) {
        console.error('   ⚠️ Solution: Recipient has not accepted WhatsApp terms of service');
      } else if (error.code === 20003) {
        console.error('   ⚠️ Solution: Check your Twilio Account SID and Auth Token');
      }
    }

    throw error; // Let Promise.allSettled handle it
  }
}

// Validate date and time
function validateDateTime(date: string, time: string): { isValid: boolean; error?: string } {
  try {
    const bookingDate = new Date(date);

    // Check if date is valid
    if (isNaN(bookingDate.getTime())) {
      return { isValid: false, error: 'Invalid date format' };
    }

    // Check if date is in the past
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (bookingDate < today) {
      return { isValid: false, error: 'Cannot book dates in the past' };
    }

    // Check if date is Sunday (closed)
    if (bookingDate.getDay() === 0) {
      return { isValid: false, error: 'We are closed on Sundays' };
    }

    // Validate time format (HH:MM)
    const timeRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(time)) {
      return { isValid: false, error: 'Invalid time format' };
    }

    // Validate time is within working hours
    const [hour, minute] = time.split(':').map(Number);
    const timeInMinutes = hour * 60 + minute;
    const dayOfWeek = bookingDate.getDay();

    if (dayOfWeek === 6) {
      // Saturday: 10:00-16:00
      const satOpen = 10 * 60; // 600
      const satClose = 16 * 60; // 960
      if (timeInMinutes < satOpen || timeInMinutes >= satClose) {
        return { isValid: false, error: 'Lauantaisin olemme avoinna klo 10:00-16:00' };
      }
    } else {
      // Weekdays: 08:00-18:00
      const weekdayOpen = 8 * 60; // 480
      const weekdayClose = 18 * 60; // 1080
      if (timeInMinutes < weekdayOpen || timeInMinutes >= weekdayClose) {
        return { isValid: false, error: 'Arkipäivisin olemme avoinna klo 08:00-18:00' };
      }
    }

    return { isValid: true };
  } catch (error) {
    return { isValid: false, error: 'Invalid date or time' };
  }
}

export async function POST(request: NextRequest) {
  try {
    const bookingData: BookingData = await request.json();

    // Validate required fields
    if (!bookingData.date || !bookingData.time || !bookingData.service) {
      return NextResponse.json(
        { error: 'Missing required booking information' },
        { status: 400 }
      );
    }

    if (!bookingData.customerName || !bookingData.customerPhone || !bookingData.customerEmail) {
      return NextResponse.json(
        { error: 'Missing required customer information' },
        { status: 400 }
      );
    }

    // Validate date and time
    const dateTimeValidation = validateDateTime(bookingData.date, bookingData.time);
    if (!dateTimeValidation.isValid) {
      return NextResponse.json(
        { error: dateTimeValidation.error },
        { status: 400 }
      );
    }

    // Validate customer name
    const nameValidation = validateName(bookingData.customerName);
    if (!nameValidation.isValid) {
      return NextResponse.json(
        { error: nameValidation.error },
        { status: 400 }
      );
    }

    // Validate phone number
    const phoneValidation = validatePhoneNumber(bookingData.customerPhone);
    if (!phoneValidation.isValid) {
      return NextResponse.json(
        { error: phoneValidation.error },
        { status: 400 }
      );
    }

    // Validate email
    const emailValidation = validateEmail(bookingData.customerEmail);
    if (!emailValidation.isValid) {
      return NextResponse.json(
        { error: emailValidation.error },
        { status: 400 }
      );
    }

    // Use formatted/sanitized values
    const validatedData: BookingData = {
      ...bookingData,
      customerName: nameValidation.formatted!,
      customerPhone: phoneValidation.formatted!,
      customerEmail: emailValidation.formatted!
    };

    // Check if time slot is still available
    const isAvailable = await bookingDb.isTimeSlotAvailable(validatedData.date, validatedData.time);
    if (!isAvailable) {
      return NextResponse.json(
        { error: 'Valittu aika on jo varattu. Valitse toinen aika.' },
        { status: 409 }
      );
    }

    // Save booking to database
    const savedBooking = await bookingDb.create({
      date: validatedData.date,
      time: validatedData.time,
      service: validatedData.service,
      customerName: validatedData.customerName,
      customerPhone: validatedData.customerPhone,
      customerEmail: validatedData.customerEmail,
      vehicleType: validatedData.vehicleType,
      specialRequests: validatedData.specialRequests,
      status: 'confirmed'
    });

    const bookingId = savedBooking.id;
    const timestamp = savedBooking.createdAt;

    console.log(`📝 New booking saved to database: ${bookingId} at ${timestamp}`);

    // Prepare email data
    const emailData = {
      customerName: validatedData.customerName,
      customerEmail: validatedData.customerEmail,
      service: validatedData.service,
      date: validatedData.date,
      time: validatedData.time,
      vehicleType: validatedData.vehicleType,
      specialRequests: validatedData.specialRequests,
      bookingId
    };

    // ✅ AWAIT notifications before responding (Vercel requirement)
    console.log('🔄 Sending notifications for booking:', bookingId);

    const results = await Promise.allSettled([
      // Customer email confirmation
      sendBookingConfirmationEmail(emailData),

      // Business email notification
      sendBusinessNotificationEmail(emailData),

      // WhatsApp business notification (if configured)
      sendWhatsAppNotification(validatedData, bookingId)
    ]);

    // Log detailed results
    const successful = results.filter(r => r.status === 'fulfilled').length;
    const failed = results.filter(r => r.status === 'rejected').length;

    results.forEach((result, index) => {
      const notificationTypes = ['Customer email', 'Business email', 'WhatsApp'];
      if (result.status === 'fulfilled') {
        console.log(`✅ ${notificationTypes[index]} sent successfully`);
      } else {
        console.error(`❌ ${notificationTypes[index]} failed:`, result.reason);
      }
    });

    console.log(`🎉 Notifications completed for ${bookingId}: ${successful} successful, ${failed} failed`);

    // Respond to user after notifications are sent
    return NextResponse.json({
      success: true,
      message: 'Varaus vahvistettu! Lähetämme vahvistuksen sähköpostiisi.',
      bookingId,
      booking: {
        date: validatedData.date,
        time: validatedData.time,
        service: validatedData.service.titleFi,
        price: validatedData.service.price
      }
    }, {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      }
    });

  } catch (error) {
    console.error('❌ Booking error:', error);

    // Handle specific error types
    if (error instanceof SyntaxError) {
      return NextResponse.json(
        { error: 'Invalid request format' },
        { status: 400 }
      );
    }

    // Handle Twilio-specific errors
    if (error instanceof Error && error.message.includes('phone number')) {
      return NextResponse.json(
        { error: 'Invalid phone number format. Please use international format (e.g., +358401234567)' },
        { status: 400 }
      );
    }

    // Generic error response
    return NextResponse.json(
      { error: 'Failed to process booking. Please try again.' },
      { status: 500 }
    );
  }
}
