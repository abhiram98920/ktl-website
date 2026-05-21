import { NextResponse } from 'next/server';
import { createAdminSession, getAdminCookieName, isAdminPassword } from '@/lib/adminAuth';

export async function POST(request: Request) {
  const body = (await request.json()) as { password?: string };

  if (!body.password || !isAdminPassword(body.password)) {
    return NextResponse.json({ error: 'Invalid password' }, { status: 401 });
  }

  const response = NextResponse.json({ ok: true });
  response.cookies.set(getAdminCookieName(), createAdminSession(), {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 12,
    path: '/',
  });

  return response;
}
