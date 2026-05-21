import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthorized, unauthorized } from '../../_utils';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) return unauthorized();

  const { id } = await params;
  const body = (await request.json()) as { status?: string };
  const status = body.status || 'new';

  const enquiry = await prisma.enquiry.update({
    where: { id: Number(id) },
    data: { status },
  });

  return NextResponse.json({ enquiry });
}
