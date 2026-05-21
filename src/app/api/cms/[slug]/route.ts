import { NextResponse } from 'next/server';
import { getPageConfig, mergeCmsContent } from '@/lib/cmsDefaults';
import { prisma } from '@/lib/prisma';

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const config = getPageConfig(slug);

  try {
    const page = await prisma.cmsPage.findUnique({
      where: { slug },
    });

    return NextResponse.json({
      slug,
      title: page?.title || config.title,
      content: mergeCmsContent(config.defaults, page?.content),
    });
  } catch {
    return NextResponse.json({
      slug,
      title: config.title,
      content: config.defaults,
    });
  }
}
