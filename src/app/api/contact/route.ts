import { NextRequest, NextResponse } from 'next/server';
import { sendContactMessageEmail } from '@/lib/email';
import { validateEmail, validateName } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, email, phone, service, message, website } = body;

    // Honeypot field — real users never fill this
    if (website) {
      return NextResponse.json({ success: true });
    }

    const firstNameCheck = validateName(firstName || '');
    const lastNameCheck = validateName(lastName || '');
    const emailCheck = validateEmail(email || '');

    if (!firstNameCheck.isValid || !lastNameCheck.isValid) {
      return NextResponse.json({ error: 'Virheellinen nimi' }, { status: 400 });
    }
    if (!emailCheck.isValid) {
      return NextResponse.json({ error: emailCheck.error }, { status: 400 });
    }
    if (!message || message.trim().length < 5) {
      return NextResponse.json({ error: 'Viesti on liian lyhyt' }, { status: 400 });
    }
    if (message.length > 5000) {
      return NextResponse.json({ error: 'Viesti on liian pitkä' }, { status: 400 });
    }

    const sent = await sendContactMessageEmail({
      firstName: firstNameCheck.formatted!,
      lastName: lastNameCheck.formatted!,
      email: emailCheck.formatted!,
      phone: typeof phone === 'string' ? phone.slice(0, 30) : undefined,
      service: typeof service === 'string' ? service.slice(0, 100) : undefined,
      message: message.trim(),
    });

    if (!sent) {
      return NextResponse.json(
        { error: 'Viestin lähetys epäonnistui. Yritä uudelleen tai soita meille.' },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: 'Viestin lähetys epäonnistui. Yritä uudelleen tai soita meille.' },
      { status: 500 }
    );
  }
}
