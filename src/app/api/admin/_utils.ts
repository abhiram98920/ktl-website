import { NextResponse } from 'next/server';
import { getAdminCookieName, verifyAdminSession } from '@/lib/adminAuth';

export function unauthorized() {
  return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
}

export function isAuthorized(request: Request) {
  const cookieHeader = request.headers.get('cookie') || '';
  const session = cookieHeader
    .split(';')
    .map((item) => item.trim())
    .find((item) => item.startsWith(`${getAdminCookieName()}=`))
    ?.split('=')
    .slice(1)
    .join('=');

  return verifyAdminSession(session);
}
