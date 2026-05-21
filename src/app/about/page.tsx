"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getPageConfig } from "@/lib/cmsDefaults";
import { list, section, text, useCmsPage } from "@/hooks/useCmsPage";
import styles from "./page.module.css";

type AboutHeader = {
  kicker: string;
  title: string;
};

type AboutStory = {
  paragraphs: string[];
};

type AboutImages = {
  items: string[];
};

const aboutDefaults = getPageConfig("about").defaults;

export default function About() {
  const content = useCmsPage("about");
  const header = section(content, "header", aboutDefaults.header as AboutHeader);
  const story = section(content, "story", aboutDefaults.story as AboutStory);
  const images = section(content, "images", aboutDefaults.images as AboutImages);
  const imageItems = list(images.items, []);

  return (
    <div className={styles.pageWrapper} data-watermark={text(header.kicker, "About")}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.header}
        >
          <p className={styles.kicker}>{text(header.kicker)}</p>
          <h1>{text(header.title)}</h1>
        </motion.div>

        <div className={styles.contentGrid}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.textContent}
          >
            {list(story.paragraphs, []).map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className={styles.imageGrid}
          >
            <div className={`${styles.imageBox} ${styles.img1}`}>
              <Image src={text(imageItems[0], "/profile-images/profile_page_04_image_01_xref_347.jpeg")} alt="KTL finished interior" fill />
            </div>
            <div className={`${styles.imageBox} ${styles.img2}`}>
              <Image src={text(imageItems[1], "/profile-images/profile_page_05_image_03_xref_354.jpeg")} alt="KTL workspace detail" fill />
            </div>
            <div className={`${styles.imageBox} ${styles.img3}`}>
              <Image src={text(imageItems[2], "/profile-images/profile_page_03_image_04_xref_335.jpeg")} alt="KTL office planning" fill />
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
