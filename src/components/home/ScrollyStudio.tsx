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
  const stepRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: stepRef,
    offset: ["start end", "end start"],
  });

  const cardY = useTransform(scrollYProgress, [0, 0.12, 0.78, 0.92], [100, 0, 0, -60]);
  const cardOpacity = useTransform(scrollYProgress, [0, 0.12, 0.78, 0.92], [0, 1, 1, 0]);
  const cardScale = useTransform(scrollYProgress, [0, 0.12, 0.78, 0.92], [0.93, 1, 1, 0.96]);

  const imageY = useTransform(scrollYProgress, [0, 1], ["-12%", "12%"]);
  const imageScale = useTransform(scrollYProgress, [0, 0.5, 1], [1.1, 1.01, 1.1]);

  const labelY = useTransform(scrollYProgress, [0, 0.12, 0.15], [20, 20, 0]);
  const labelOpacity = useTransform(scrollYProgress, [0, 0.12, 0.15], [0, 0, 1]);
  const titleY = useTransform(scrollYProgress, [0, 0.14, 0.18], [30, 30, 0]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.14, 0.18], [0, 0, 1]);
  const copyY = useTransform(scrollYProgress, [0, 0.16, 0.22], [40, 40, 0]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.16, 0.22], [0, 0, 1]);

  return (
    <div ref={stepRef} className={styles.cardStep}>
      <motion.article
        className={`${styles.processCard} ${styles[`card${index + 1}`]}`}
        style={{ y: cardY, opacity: cardOpacity, scale: cardScale }}
      >
        <div className={styles.cardCopy}>
          <motion.span style={{ y: labelY, opacity: labelOpacity }}>
            {beat.label}
          </motion.span>
          <motion.h2 style={{ y: titleY, opacity: titleOpacity }}>
            {beat.title}
          </motion.h2>
          <motion.p style={{ y: copyY, opacity: copyOpacity }}>
            {beat.copy}
          </motion.p>
        </div>
        <motion.div className={styles.cardImage} style={{ y: imageY, scale: imageScale }}>
          <Image
            src={beat.image}
            alt={`${beat.label} KTL Interiors process`}
            fill
            sizes="(max-width: 900px) 100vw, 44vw"
          />
        </motion.div>
        <div className={styles.cardIndex}>{String(index + 1).padStart(2, "0")}</div>
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
        {beats.map((beat, index) => (
          <ProcessCard key={beat.label} beat={beat} index={index} />
        ))}
      </div>
    </section>
  );
}
