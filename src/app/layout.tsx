import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import EnquiryPopup from '@/components/ui/EnquiryPopup';
import ScrollProgress from '@/components/ui/ScrollProgress';
import InteriorAtmosphere from '@/components/ui/InteriorAtmosphere';

export const metadata: Metadata = {
  title: 'KTL Interiors - Transforming Offices with Excellence',
  description: 'KTL Interiors is a multidisciplinary interior contracting firm delivering functional, aesthetic, and high-performing workspaces across India.',
  keywords: 'Interior Design, KTL Interiors, Office Interiors, Turnkey Contracting, Commercial Interior Design, Coworking Interiors',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <div className="grid-line-center"></div>
        <ScrollProgress />
        <InteriorAtmosphere />
        <Navbar />
        <main>{children}</main>
        <Footer />
        <EnquiryPopup />
      </body>
    </html>
  );
}
