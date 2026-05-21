import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthorized, unauthorized } from '../_utils';

export async function GET(request: Request) {
  if (!isAuthorized(request)) return unauthorized();

  const media = await prisma.mediaAsset.findMany({
    orderBy: [{ category: 'asc' }, { sortOrder: 'asc' }, { createdAt: 'desc' }],
  });

  return NextResponse.json({ media });
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return unauthorized();

  const body = (await request.json()) as {
    title?: string;
    alt?: string;
    url?: string;
    category?: string;
    sortOrder?: number;
    isActive?: boolean;
  };

  if (!body.title || !body.url) {
    return NextResponse.json({ error: 'Title and URL are required' }, { status: 400 });
  }

  const media = await prisma.mediaAsset.create({
    data: {
      title: body.title,
      alt: body.alt || '',
      url: body.url,
      category: body.category || 'general',
      sortOrder: Number(body.sortOrder || 0),
      isActive: body.isActive ?? true,
    },
  });

  return NextResponse.json({ media }, { status: 201 });
}
