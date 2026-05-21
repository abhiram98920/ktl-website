"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './Navbar.module.css';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { href: '/', label: 'Home', meta: 'Start here' },
  { href: '/about', label: 'About Us', meta: 'Studio profile' },
  { href: '/services', label: 'Services', meta: 'Turnkey scope' },
  { href: '/portfolio', label: 'Portfolio', meta: 'Project visuals' },
  { href: '/contact', label: 'Contact', meta: 'Talk to KTL' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/logo/KTL_Interior_logo_site.png"
            alt="KTL Interiors"
            width={148}
            height={73}
            priority
            style={{ objectFit: 'contain' }}
          />
        </Link>

        <div className={styles.navActions}>
          <a className={styles.enquiryButton} href="#enquiry-Navbar">Enquiry</a>
          <button className={styles.menuToggle} onClick={() => setMenuOpen(true)} aria-label="Open Menu">
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className={styles.menuOverlay}
          >
            <button className={styles.closeButton} onClick={closeMenu} aria-label="Close Menu">
              <span></span>
              <span></span>
            </button>

            <div className={styles.menuShell}>
              <div className={styles.menuContent}>
                <div className={styles.menuKicker}>KTL Interiors</div>
                <div className={styles.menuLinks}>
                  {navItems.map((item, index) => (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, y: 24 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 + index * 0.05 }}
                    >
                      <Link href={item.href} onClick={closeMenu}>
                        <span>{String(index + 1).padStart(2, '0')}</span>
                        <strong>{item.label}</strong>
                        <em>{item.meta}</em>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>

              <motion.aside
                className={styles.menuFeature}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.18 }}
              >
                <div className={styles.featureImage}>
                  <Image src="/profile-images/profile_page_08_image_01_xref_42.jpeg" alt="KTL interior project" fill sizes="34vw" />
                </div>
                <div className={styles.featureCopy}>
                  <span>Interior consultation</span>
                  <h2>Plan the workspace before site work starts.</h2>
                  <p>Audit layout, finishes, furniture, lighting, MEP coordination, and project phasing with KTL.</p>
                  <a href="#enquiry-Menu" onClick={closeMenu}>Start an enquiry</a>
                </div>
              </motion.aside>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
