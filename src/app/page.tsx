"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollyStudio from "@/components/home/ScrollyStudio";
import { getPageConfig } from "@/lib/cmsDefaults";
import { cards, list, section, text, useCmsPage } from "@/hooks/useCmsPage";
import styles from "./page.module.css";

type HomeHero = {
  eyebrow: string;
  title: string;
  copy: string;
  image: string;
  badges: string[];
  locations: string[];
};

type HomeTextSection = {
  label: string;
  title: string;
  copy: string;
};

type HomeListSection = {
  label: string;
  title: string;
  items: string[];
};

type HomeCard = {
  title?: unknown;
  text?: unknown;
};

const homeDefaults = getPageConfig("home").defaults;

export default function Home() {
  const content = useCmsPage("home");
  const hero = section(content, "hero", homeDefaults.hero as HomeHero);
  const intro = section(content, "intro", homeDefaults.intro as HomeTextSection);
  const consultation = section(content, "consultation", homeDefaults.consultation as HomeTextSection & { image: string; items: HomeCard[] });
  const servicesSection = section(content, "services", homeDefaults.services as HomeListSection);
  const showcase = section(content, "showcase", homeDefaults.showcase as HomeTextSection & { images: string[] });
  const why = section(content, "why", homeDefaults.why as HomeListSection);
  const cta = section(content, "cta", homeDefaults.cta as HomeTextSection & { image: string; eyebrow: string });
  const serviceItems = list(servicesSection.items, []);
  const reasonItems = list(why.items, []);
  const gallery = list(showcase.images, []);
  const consultationItems = cards<HomeCard>(consultation.items, []);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "28%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0.35]);

  return (
    <div ref={containerRef} className={styles.mainContainer}>
      <section className={styles.hero}>
        <Image
          src={text(hero.image, "/profile-images/profile_page_01_image_01_xref_304.jpeg")}
          alt="KTL office interior"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className={styles.heroContent}>
          <p className={styles.eyebrow}>{text(hero.eyebrow)}</p>
          <h1>{text(hero.title)}</h1>
          <p className={styles.heroCopy}>
            {text(hero.copy)}
          </p>
          <div className={styles.heroBadges}>
            {list(hero.badges, []).map((badge) => (
              <span key={badge}>{badge}</span>
            ))}
          </div>
          <div className={styles.heroActions}>
            <a href="#enquiry-Hero%20CTA" className="btn-primary">Enquiry Now</a>
            <Link href="/contact" className={styles.secondaryButton}>Contact Details</Link>
            <Link href="/portfolio" className={styles.textLink}>View Work</Link>
          </div>
        </motion.div>
        <div className={styles.heroStats}>
          {list(hero.locations, []).map((location) => (
            <span key={location}>{location}</span>
          ))}
        </div>
      </section>

      <ScrollyStudio />

      <section className={styles.introSection} data-watermark={text(intro.label, "Short profile")}>
        <div className={styles.metricsStrip}>
          <div>
            <strong>5</strong>
            <span>Operating cities</span>
          </div>
          <div>
            <strong>360</strong>
            <span>Degree fit-out delivery</span>
          </div>
          <div>
            <strong>01</strong>
            <span>Single execution partner</span>
          </div>
        </div>
        <div className={styles.sectionLabel}>{text(intro.label)}</div>
        <div className={styles.introGrid}>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            {text(intro.title)}
          </motion.h2>
          <div className={styles.introText}>
            <p>
              {text(intro.copy)}
            </p>
            <Link href="/about" className={styles.textLink}>Read the story</Link>
          </div>
        </div>
      </section>

      <section className={styles.consultationSection} data-watermark={text(consultation.label, "Interior consultation")}>
        <div className={styles.consultationImage}>
          <Image
            src={text(consultation.image, "/profile-images/profile_page_04_image_01_xref_347.jpeg")}
            alt="Interior consultation and workspace planning"
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
          />
        </div>
        <div className={styles.consultationContent}>
          <div className={styles.sectionLabel}>{text(consultation.label)}</div>
          <h2>{text(consultation.title)}</h2>
          <p>
            {text(consultation.copy)}
          </p>
          <div className={styles.consultationGrid}>
            {consultationItems.map((item) => (
              <div key={text(item.title)}>
                <h3>{text(item.title)}</h3>
                <p>{text(item.text)}</p>
              </div>
            ))}
          </div>
          <a href="#enquiry-Consultation%20Section" className="btn-primary">Request Consultation</a>
        </div>
      </section>

      <section className={styles.servicesSection} data-watermark={text(servicesSection.title, "Services")}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>{text(servicesSection.label)}</div>
          <h2>{text(servicesSection.title)}</h2>
        </div>
        <div className={styles.serviceGrid}>
          {serviceItems.map((service, index) => (
            <motion.div
              key={service}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06 }}
              className={styles.serviceTile}
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <p>{service}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.showcaseSection} data-watermark={text(showcase.label, "Portfolio")}>
        <div className={styles.showcaseLead}>
          <div className={styles.sectionLabel}>{text(showcase.label)}</div>
          <h2>{text(showcase.title)}</h2>
          <p>
            {text(showcase.copy)}
          </p>
          <Link href="/portfolio" className="btn-primary">Open Portfolio</Link>
        </div>
        <div className={styles.mosaic}>
          {gallery.map((src, index) => (
            <motion.a
              key={src}
              href="/portfolio"
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={styles.mosaicItem}
              aria-label="View portfolio"
            >
              <Image src={src} alt="KTL project interior" fill sizes="(max-width: 768px) 50vw, 24vw" />
            </motion.a>
          ))}
        </div>
      </section>

      <section className={styles.whySection} data-watermark={text(why.label, "Why choose KTL")}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>{text(why.label)}</div>
          <h2>{text(why.title)}</h2>
        </div>
        <div className={styles.reasonGrid}>
          {reasonItems.map((reason) => (
            <div key={reason} className={styles.reasonItem}>{reason}</div>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection} data-watermark={text(cta.eyebrow, "Consultation")}>
        <Image
          src={text(cta.image, "/profile-images/profile_page_13_image_01_xref_72.jpeg")}
          alt="Finished KTL interior"
          fill
          sizes="100vw"
          className={styles.ctaImage}
        />
        <div className={styles.ctaShade} />
        <div className={styles.ctaContent}>
          <p className={styles.eyebrow}>{text(cta.eyebrow)}</p>
          <h2>{text(cta.title)}</h2>
          <p>
            {text(cta.copy)}
          </p>
          <a href="#enquiry-Final%20CTA" className="btn-primary">Request Consultation</a>
        </div>
      </section>
    </div>
  );
}
