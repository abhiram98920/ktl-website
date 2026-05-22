"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./ScrollyStudio.module.css";

const beats = [
  {
    label: "01 | Discover",
    title: "We translate your workflow into a spatial brief.",
    copy: "Team size, departments, visitor movement, storage, acoustic needs, power points, and brand tone are shaped before design begins.",
    image: "/profile-images/profile_page_05_image_02_xref_353.jpeg",
  },
  {
    label: "02 | Design",
    title: "Layouts, finishes, lighting, and services become one plan.",
    copy: "You see how cabins, open workstations, meeting rooms, ceilings, flooring, and MEP decisions fit together before site execution.",
    image: "/profile-images/profile_page_10_image_01_xref_53.jpeg",
  },
  {
    label: "03 | Deliver",
    title: "Execution stays aligned with budget, deadline, and finish quality.",
    copy: "From modular installation to final handover, KTL keeps site coordination transparent and the workspace ready for day-one use.",
    image: "/profile-images/profile_page_01_image_01_xref_304.jpeg",
  },
];

function ProcessCard({
  beat,
  index,
}: {
  beat: (typeof beats)[number];
  index: number;
}) {
  return (
    <div className={styles.cardStep}>
      <motion.article
        className={`${styles.processCard} ${styles[`card${index + 1}`]}`}
        initial={{ opacity: 0, y: 42 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.28 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: index * 0.08 }}
      >
        <div className={styles.cardGlow} aria-hidden="true" />
        <div className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</div>
        <div className={styles.cardCopy}>
          <span>{beat.label}</span>
          <h2>{beat.title}</h2>
          <p>{beat.copy}</p>
        </div>
        <div className={styles.cardImage}>
          <Image
            src={beat.image}
            alt={`${beat.label} KTL Interiors process`}
            fill
            sizes="(max-width: 900px) 100vw, 44vw"
          />
        </div>
      </motion.article>
    </div>
  );
}

export default function ScrollyStudio() {
  return (
    <section className={styles.scrollyStage} data-watermark="Process">
      <div className={styles.sectionHeader}>
        <span>Process</span>
        <h2>From brief to handover, every workspace decision stays visible.</h2>
      </div>
      <div className={styles.cardStack}>
        <div className={styles.stackRail} aria-hidden="true" />
        {beats.map((beat, index) => (
          <ProcessCard key={beat.label} beat={beat} index={index} />
        ))}
      </div>
    </section>
  );
}
