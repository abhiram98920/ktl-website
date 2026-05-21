import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthorized, unauthorized } from '../_utils';

export async function GET(request: Request) {
  if (!isAuthorized(request)) return unauthorized();

  const pages = await prisma.cmsPage.findMany({
    orderBy: { updatedAt: 'desc' },
  });

  return NextResponse.json({ pages });
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) return unauthorized();

  const body = (await request.json()) as {
    slug?: string;
    title?: string;
    content?: unknown;
    isActive?: boolean;
  };

  if (!body.slug || !body.title) {
    return NextResponse.json({ error: 'Slug and title are required' }, { status: 400 });
  }

  const page = await prisma.cmsPage.upsert({
    where: { slug: body.slug },
    create: {
      slug: body.slug,
      title: body.title,
      content: body.content || {},
      isActive: body.isActive ?? true,
    },
    update: {
      title: body.title,
      content: body.content || {},
      isActive: body.isActive ?? true,
    },
  });

  return NextResponse.json({ page });
}
