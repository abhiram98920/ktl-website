import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { isAuthorized, unauthorized } from '../_utils';

export async function GET(request: Request) {
  if (!isAuthorized(request)) return unauthorized();

  const [totalEnquiries, newEnquiries, mediaAssets, cmsPages, recentEnquiries] = await Promise.all([
    prisma.enquiry.count(),
    prisma.enquiry.count({ where: { status: 'new' } }),
    prisma.mediaAsset.count(),
    prisma.cmsPage.count(),
    prisma.enquiry.findMany({ orderBy: { createdAt: 'desc' }, take: 5 }),
  ]);

  return NextResponse.json({
    totalEnquiries,
    newEnquiries,
    mediaAssets,
    cmsPages,
    recentEnquiries,
  });
}
