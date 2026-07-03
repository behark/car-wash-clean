import { NextRequest, NextResponse } from 'next/server';
import { verifyCredentials, createSessionToken, ADMIN_COOKIE } from '@/lib/adminAuth';

export async function POST(request: NextRequest) {
  try {
    const { username, password } = await request.json();

    if (typeof username !== 'string' || typeof password !== 'string') {
      return NextResponse.json({ error: 'Puuttuvat tunnukset' }, { status: 400 });
    }

    if (!verifyCredentials(username, password)) {
      return NextResponse.json(
        { error: 'Virheellinen käyttäjätunnus tai salasana' },
        { status: 401 }
      );
    }

    const token = createSessionToken();
    if (!token) {
      return NextResponse.json({ error: 'Palvelinvirhe' }, { status: 500 });
    }

    const response = NextResponse.json({ success: true });
    response.cookies.set(ADMIN_COOKIE, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 12 * 60 * 60,
    });
    return response;
  } catch {
    return NextResponse.json({ error: 'Palvelinvirhe' }, { status: 500 });
  }
}

// Logout: clear the session cookie
export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.set(ADMIN_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
  return response;
}
