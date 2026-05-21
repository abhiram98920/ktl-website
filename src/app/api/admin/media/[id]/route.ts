import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthorized, unauthorized } from '../../_utils';

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) return unauthorized();

  const { id } = await params;
  const body = (await request.json()) as {
    title?: string;
    alt?: string;
    url?: string;
    category?: string;
    sortOrder?: number;
    isActive?: boolean;
  };

  const media = await prisma.mediaAsset.update({
    where: { id: Number(id) },
    data: {
      title: body.title,
      alt: body.alt,
      url: body.url,
      category: body.category,
      sortOrder: body.sortOrder === undefined ? undefined : Number(body.sortOrder),
      isActive: body.isActive,
    },
  });

  return NextResponse.json({ media });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  if (!isAuthorized(request)) return unauthorized();

  const { id } = await params;
  await prisma.mediaAsset.delete({ where: { id: Number(id) } });

  return NextResponse.json({ ok: true });
}
