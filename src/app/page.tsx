"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollyStudio from "@/components/home/ScrollyStudio";
import styles from "./page.module.css";

const services = [
  "Office interior design and turnkey contracting",
  "Furniture, partitions, and modular installations",
  "Lighting, electrical, HVAC, and technology integration",
  "Space planning and customised CAD layouts",
  "Renovations, refurbishments, and custom fit-outs",
];

const reasons = [
  "Experienced project management",
  "Budget friendly space optimisation",
  "Quality craftsmanship",
  "Deadline-led execution",
  "Transparent communication",
  "Trusted by corporate, startup, and coworking clients",
];

const gallery = [
  "/profile-images/profile_page_02_image_01_xref_316.jpeg",
  "/profile-images/profile_page_05_image_02_xref_353.jpeg",
  "/profile-images/profile_page_06_image_02_xref_29.jpeg",
  "/profile-images/profile_page_08_image_01_xref_42.jpeg",
  "/profile-images/profile_page_10_image_01_xref_53.jpeg",
  "/profile-images/profile_page_12_image_01_xref_64.jpeg",
];

const consultationItems = [
  {
    title: "Workspace Audit",
    text: "We study team size, departments, movement, storage, visitor areas, and expansion needs.",
  },
  {
    title: "Look & Feel Direction",
    text: "Material palettes, lighting tone, furniture mood, and brand cues are aligned early.",
  },
  {
    title: "Budget & Timeline Scope",
    text: "You get a practical execution path before committing to the full fit-out.",
  },
  {
    title: "Turnkey Site Plan",
    text: "Interior, furniture, MEP, modular installations, and handover are coordinated together.",
  },
];

export default function Home() {
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
          src="/profile-images/profile_page_01_image_01_xref_304.jpeg"
          alt="KTL office interior"
          fill
          priority
          sizes="100vw"
          className={styles.heroImage}
        />
        <div className={styles.heroShade} />
        <motion.div style={{ y: heroY, opacity: heroOpacity }} className={styles.heroContent}>
          <p className={styles.eyebrow}>Interior contracting | Workspace delivery</p>
          <h1>KTL Interiors transforms offices with excellence</h1>
          <p className={styles.heroCopy}>
            KTL Interiors designs and delivers modern office, coworking, healthcare,
            residential, and commercial interiors with disciplined execution from
            concept to completion.
          </p>
          <div className={styles.heroBadges}>
            <span>Turnkey contracting</span>
            <span>CAD planning</span>
            <span>MEP coordination</span>
          </div>
          <div className={styles.heroActions}>
            <a href="#enquiry-Hero%20CTA" className="btn-primary">Enquiry Now</a>
            <Link href="/contact" className={styles.secondaryButton}>Contact Details</Link>
            <Link href="/portfolio" className={styles.textLink}>View Work</Link>
          </div>
        </motion.div>
        <div className={styles.heroStats}>
          <span>Kochi</span>
          <span>Kozhikode</span>
          <span>Kannur</span>
          <span>Bengaluru</span>
          <span>Hyderabad</span>
        </div>
      </section>

      <ScrollyStudio />

      <section className={styles.introSection}>
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
        <div className={styles.sectionLabel}>Short profile</div>
        <div className={styles.introGrid}>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Functional spaces, clean aesthetics, and ergonomic planning for teams
            that need to move fast.
          </motion.h2>
          <div className={styles.introText}>
            <p>
              KTL Interiors is a multidisciplinary interior contracting firm with
              proven expertise in delivering high-performing spaces. The team
              combines space planning, finish selection, site coordination, and
              project management so each workspace reflects the client brand and
              supports everyday productivity.
            </p>
            <Link href="/about" className={styles.textLink}>Read the story</Link>
          </div>
        </div>
      </section>

      <section className={styles.consultationSection}>
        <div className={styles.consultationImage}>
          <Image
            src="/profile-images/profile_page_04_image_01_xref_347.jpeg"
            alt="Interior consultation and workspace planning"
            fill
            sizes="(max-width: 900px) 100vw, 45vw"
          />
        </div>
        <div className={styles.consultationContent}>
          <div className={styles.sectionLabel}>Interior consultation</div>
          <h2>Book a design discussion before you spend on site.</h2>
          <p>
            KTL helps clients make the big decisions first: space efficiency,
            furniture systems, finish quality, lighting, services, and phasing.
          </p>
          <div className={styles.consultationGrid}>
            {consultationItems.map((item) => (
              <div key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            ))}
          </div>
          <a href="#enquiry-Consultation%20Section" className="btn-primary">Request Consultation</a>
        </div>
      </section>

      <section className={styles.servicesSection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>What we do</div>
          <h2>Turnkey interior delivery</h2>
        </div>
        <div className={styles.serviceGrid}>
          {services.map((service, index) => (
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

      <section className={styles.showcaseSection}>
        <div className={styles.showcaseLead}>
          <div className={styles.sectionLabel}>Portfolio glimpse</div>
          <h2>Real extracted project visuals from the KTL profile.</h2>
          <p>
            A compact look at office workstations, collaborative zones, executive
            finishes, and fit-out details from the company profile assets.
          </p>
          <Link href="/portfolio" className="btn-primary">Open Portfolio</Link>
        </div>
        <div className={styles.mosaic}>
          {gallery.map((src, index) => (
            <motion.div
              key={src}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className={styles.mosaicItem}
            >
              <Image src={src} alt="KTL project interior" fill sizes="(max-width: 768px) 50vw, 24vw" />
            </motion.div>
          ))}
        </div>
      </section>

      <section className={styles.whySection}>
        <div className={styles.sectionHeader}>
          <div className={styles.sectionLabel}>Why choose KTL</div>
          <h2>Built for clarity on site and confidence at handover.</h2>
        </div>
        <div className={styles.reasonGrid}>
          {reasons.map((reason) => (
            <div key={reason} className={styles.reasonItem}>{reason}</div>
          ))}
        </div>
      </section>

      <section className={styles.ctaSection}>
        <Image
          src="/profile-images/profile_page_13_image_01_xref_72.jpeg"
          alt="Finished KTL interior"
          fill
          sizes="100vw"
          className={styles.ctaImage}
        />
        <div className={styles.ctaShade} />
        <div className={styles.ctaContent}>
          <p className={styles.eyebrow}>Free consultation</p>
          <h2>Ready to elevate your workspace?</h2>
          <p>
            Contact KTL Interiors and discover how general contracting expertise
            can bring your vision to life.
          </p>
          <a href="#enquiry-Final%20CTA" className="btn-primary">Request Consultation</a>
        </div>
      </section>
    </div>
  );
}
