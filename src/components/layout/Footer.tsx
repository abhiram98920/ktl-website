import Link from 'next/link';
import Image from 'next/image';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerContent}`}>
        <div className={styles.column}>
          <Image
            src="/logo/KTL_Interior_logo_site.png"
            alt="KTL Interiors"
            width={180}
            height={89}
            style={{ objectFit: 'contain' }}
          />
          <p className={styles.description}>Transforming Offices With Excellence. We specialize in designing and delivering modern office and coworking interiors.</p>
        </div>
        <div className={styles.column}>
          <h3>Quick Links</h3>
          <Link href="/">Home</Link>
          <Link href="/about">About Us</Link>
          <Link href="/services">Services</Link>
          <Link href="/portfolio">Portfolio</Link>
        </div>
        <div className={styles.column}>
          <h3>Contact Us</h3>
          <p>3rd Floor Royal Oak Mall, TK Junction</p>
          <p>Kannur, Kerala 670002</p>
          <p>office@ktlcoworks.com</p>
          <p>+91 9746 241 399</p>
        </div>
        <div className={styles.column}>
          <h3>Locations</h3>
          <p>Kochi | Kozhikode | Kannur | Bengaluru | Hyderabad</p>
        </div>
      </div>
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContent}`}>
          <p>&copy; {new Date().getFullYear()} KTL Interiors. All rights reserved.</p>
          <p>
            Designed and developed by{' '}
            <a href="tel:+917012649326">Abhiram P Mohan</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
