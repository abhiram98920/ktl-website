import { prisma } from '@/lib/prisma';
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

export default async function Portfolio() {
  const projects = await getPortfolioProjects();

  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        <PortfolioGrid projects={projects} />
      </div>
    </div>
  );
}
