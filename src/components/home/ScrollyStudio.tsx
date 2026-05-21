"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
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
  const cardRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.08, 1.01, 1.08]);

  return (
    <motion.article
      ref={cardRef}
      className={`${styles.processCard} ${styles[`card${index + 1}`]}`}
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: false, amount: 0.36 }}
      transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className={styles.cardCopy}>
        <span>{beat.label}</span>
        <h2>{beat.title}</h2>
        <p>{beat.copy}</p>
      </div>
      <motion.div className={styles.cardImage} style={{ y: imageY, scale: imageScale }}>
        <Image src={beat.image} alt={`${beat.label} KTL Interiors process`} fill sizes="(max-width: 900px) 100vw, 44vw" />
      </motion.div>
      <div className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</div>
    </motion.article>
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
        {beats.map((beat, index) => (
          <div key={beat.label} className={styles.cardStep}>
            <ProcessCard beat={beat} index={index} />
          </div>
        ))}
      </div>
    </section>
  );
}
