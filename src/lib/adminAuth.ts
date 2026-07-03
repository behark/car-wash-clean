import { createHmac, timingSafeEqual } from 'crypto';
import { NextRequest } from 'next/server';

export const ADMIN_COOKIE = 'admin_session';
const SESSION_HOURS = 12;

function getSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || null;
}

function sign(payload: string, secret: string): string {
  return createHmac('sha256', secret).update(payload).digest('hex');
}

export function verifyCredentials(username: string, password: string): boolean {
  const expectedUser = process.env.ADMIN_USERNAME;
  const expectedPass = process.env.ADMIN_PASSWORD;
  if (!expectedUser || !expectedPass) return false;

  const userBuf = Buffer.from(username);
  const passBuf = Buffer.from(password);
  const expUserBuf = Buffer.from(expectedUser);
  const expPassBuf = Buffer.from(expectedPass);

  const userOk = userBuf.length === expUserBuf.length && timingSafeEqual(userBuf, expUserBuf);
  const passOk = passBuf.length === expPassBuf.length && timingSafeEqual(passBuf, expPassBuf);
  return userOk && passOk;
}

export function createSessionToken(): string | null {
  const secret = getSecret();
  if (!secret) return null;
  const expires = Date.now() + SESSION_HOURS * 60 * 60 * 1000;
  const payload = String(expires);
  return `${payload}.${sign(payload, secret)}`;
}

export function isAuthenticated(request: NextRequest): boolean {
  const secret = getSecret();
  if (!secret) return false;

  const token = request.cookies.get(ADMIN_COOKIE)?.value;
  if (!token) return false;

  const [payload, signature] = token.split('.');
  if (!payload || !signature) return false;

  const expected = sign(payload, secret);
  const sigBuf = Buffer.from(signature);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !timingSafeEqual(sigBuf, expBuf)) return false;

  return Number(payload) > Date.now();
}
