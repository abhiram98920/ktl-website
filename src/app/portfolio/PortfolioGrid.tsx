"use client";

import { motion } from "framer-motion";
import styles from "./page.module.css";

export type PortfolioProject = [title: string, category: string, image: string];

export default function PortfolioGrid({ projects }: { projects: PortfolioProject[] }) {
  return (
    <>
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
            key={`${title}-${image}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.06, duration: 0.55 }}
            className={styles.projectCard}
          >
            <div className={styles.imagePlaceholder}>
              {/* Standard img keeps CMS-managed local and hosted image URLs flexible. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={image} alt={title} />
            </div>
            <div className={styles.projectInfo}>
              <span>{category}</span>
              <h3>{title}</h3>
            </div>
          </motion.article>
        ))}
      </div>
    </>
  );
}
