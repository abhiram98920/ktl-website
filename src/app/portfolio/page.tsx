"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./page.module.css";

const projects = [
  ["Corporate Workspace", "Office interior", "/profile-images/profile_page_02_image_01_xref_316.jpeg"],
  ["Collaborative Work Floor", "Coworking hub", "/profile-images/profile_page_06_image_02_xref_29.jpeg"],
  ["Modern Fit-Out", "Commercial execution", "/profile-images/profile_page_07_image_01_xref_37.jpeg"],
  ["Executive Interior", "Premium finish", "/profile-images/profile_page_08_image_01_xref_42.jpeg"],
  ["Focused Work Zones", "Space planning", "/profile-images/profile_page_09_image_01_xref_47.jpeg"],
  ["Full Scale Delivery", "Turnkey contracting", "/profile-images/profile_page_10_image_01_xref_53.jpeg"],
  ["Detail-Led Spaces", "Custom fit-out", "/profile-images/profile_page_11_image_01_xref_58.jpeg"],
  ["Signature Workspace", "Brand-led interior", "/profile-images/profile_page_12_image_01_xref_64.jpeg"],
];

export default function Portfolio() {
  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.header}
        >
          <p className={styles.kicker}>Portfolio</p>
          <h1>Extracted visuals from the KTL company profile.</h1>
        </motion.div>

        <div className={styles.gallery}>
          {projects.map(([title, category, image], idx) => (
            <motion.article
              key={image}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.06, duration: 0.55 }}
              className={styles.projectCard}
            >
              <div className={styles.imagePlaceholder}>
                <Image src={image} alt={title} fill sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <div className={styles.projectInfo}>
                <span>{category}</span>
                <h3>{title}</h3>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
