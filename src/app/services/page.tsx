"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import styles from "./page.module.css";

const services = [
  {
    title: "Complete Office Interiors",
    copy: "Office interior designing and turnkey contracting from concept, planning, material coordination, and execution through handover.",
    image: "/profile-images/profile_page_03_image_01_xref_332.jpeg",
  },
  {
    title: "Furniture & Modular Systems",
    copy: "Furniture, partitions, and modular installations designed for flexible, efficient, and brand-aligned workplaces.",
    image: "/profile-images/profile_page_03_image_02_xref_333.jpeg",
  },
  {
    title: "MEP & Technology Integration",
    copy: "Lighting, electrical, HVAC, and technology integration coordinated into one clean interior delivery process.",
    image: "/profile-images/profile_page_03_image_04_xref_335.jpeg",
  },
  {
    title: "Space Planning & CAD Layouts",
    copy: "Customised CAD layouts and ergonomic space planning that optimise circulation, collaboration, and resource use.",
    image: "/profile-images/profile_page_03_image_03_xref_334.jpeg",
  },
  {
    title: "Renovation & Custom Fit-Outs",
    copy: "Renovations, refurbishments, and custom fit-outs for offices, coworking spaces, commercial buildings, and premium residences.",
    image: "/profile-images/profile_page_03_image_05_xref_336.png",
  },
];

export default function Services() {
  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.header}
        >
          <p className={styles.kicker}>Our services</p>
          <h1>One team for design intent, site execution, and final handover.</h1>
        </motion.div>

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <motion.article
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={styles.serviceCard}
            >
              <div className={styles.imageWrapper}>
                <Image src={service.image} alt={service.title} fill sizes="(max-width: 768px) 100vw, 33vw" />
              </div>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{service.title}</h3>
              <p>{service.copy}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
