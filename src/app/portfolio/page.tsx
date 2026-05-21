import { prisma } from '@/lib/prisma';
import { getPageConfig, mergeCmsContent } from '@/lib/cmsDefaults';
import PortfolioGrid, { PortfolioProject } from './PortfolioGrid';
import styles from './page.module.css';

export const dynamic = 'force-dynamic';

const fallbackProjects: PortfolioProject[] = [
  ["Corporate Workspace", "Office interior", "/profile-images/profile_page_02_image_01_xref_316.jpeg"],
  ["Collaborative Work Floor", "Coworking hub", "/profile-images/profile_page_06_image_02_xref_29.jpeg"],
  ["Modern Fit-Out", "Commercial execution", "/profile-images/profile_page_07_image_01_xref_37.jpeg"],
  ["Executive Interior", "Premium finish", "/profile-images/profile_page_08_image_01_xref_42.jpeg"],
  ["Focused Work Zones", "Space planning", "/profile-images/profile_page_09_image_01_xref_47.jpeg"],
  ["Full Scale Delivery", "Turnkey contracting", "/profile-images/profile_page_10_image_01_xref_53.jpeg"],
  ["Detail-Led Spaces", "Custom fit-out", "/profile-images/profile_page_11_image_01_xref_58.jpeg"],
  ["Signature Workspace", "Brand-led interior", "/profile-images/profile_page_12_image_01_xref_64.jpeg"],
];

async function getPortfolioProjects() {
  try {
    const assets = await prisma.mediaAsset.findMany({
      where: { category: 'portfolio', isActive: true },
      orderBy: [{ sortOrder: 'asc' }, { createdAt: 'desc' }],
      take: 24,
    });

    if (!assets.length) return fallbackProjects;

    return assets.map((asset) => [
      asset.title,
      asset.alt || 'Portfolio image',
      asset.url,
    ] satisfies PortfolioProject);
  } catch {
    return fallbackProjects;
  }
}

async function getPortfolioHeader() {
  const config = getPageConfig('portfolio');

  try {
    const page = await prisma.cmsPage.findUnique({
      where: { slug: 'portfolio' },
    });
    const content = mergeCmsContent(config.defaults, page?.content);
    const header = content.header as { kicker?: string; title?: string };

    return {
      kicker: header?.kicker || 'Portfolio',
      title: header?.title || 'Extracted visuals from the KTL company profile.',
    };
  } catch {
    return {
      kicker: 'Portfolio',
      title: 'Extracted visuals from the KTL company profile.',
    };
  }
}

export default async function Portfolio() {
  const [projects, header] = await Promise.all([getPortfolioProjects(), getPortfolioHeader()]);

  return (
    <div className={styles.pageWrapper} data-watermark={header.kicker}>
      <div className="container">
        <PortfolioGrid projects={projects} header={header} />
      </div>
    </div>
  );
}
