import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthorized, unauthorized } from '../_utils';

export async function GET(request: Request) {
  if (!isAuthorized(request)) return unauthorized();

  const enquiries = await prisma.enquiry.findMany({
    orderBy: { createdAt: 'desc' },
    take: 100,
  });

  return NextResponse.json({ enquiries });
}
