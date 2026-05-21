"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./page.module.css";

export default function About() {
  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.header}
        >
          <p className={styles.kicker}>About KTL Interiors</p>
          <h1>Multidisciplinary interior contracting for high-performing spaces.</h1>
        </motion.div>

        <div className={styles.contentGrid}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.textContent}
          >
            <p>
              KTL Interiors delivers functional, aesthetic, and future-ready
              spaces across offices, coworking hubs, healthcare facilities,
              luxury villas, and large-scale commercial buildings.
            </p>
            <p>
              The studio blends thoughtful planning, clean aesthetics, ergonomic
              detailing, and site-level execution. From concept to completion,
              the focus stays on quality, efficiency, and design integrity.
            </p>
            <p>
              Every project is shaped to reflect the client brand while
              supporting collaboration, productivity, comfort, and the evolving
              needs of modern professionals.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={styles.imageGrid}
          >
            <div className={`${styles.imageBox} ${styles.img1}`}>
              <Image src="/profile-images/profile_page_04_image_01_xref_347.jpeg" alt="KTL finished interior" fill />
            </div>
            <div className={`${styles.imageBox} ${styles.img2}`}>
              <Image src="/profile-images/profile_page_05_image_03_xref_354.jpeg" alt="KTL workspace detail" fill />
            </div>
            <div className={`${styles.imageBox} ${styles.img3}`}>
              <Image src="/profile-images/profile_page_03_image_04_xref_335.jpeg" alt="KTL office planning" fill />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
