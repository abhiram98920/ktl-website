"use client";

import { motion, useScroll } from "framer-motion";
import styles from "./ScrollProgress.module.css";

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();

  return (
    <motion.div
      className={styles.progress}
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}
