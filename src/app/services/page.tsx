"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { getPageConfig } from "@/lib/cmsDefaults";
import { cards, section, text, useCmsPage } from "@/hooks/useCmsPage";
import styles from "./page.module.css";

type ServicesHeader = {
  kicker: string;
  title: string;
};

type ServiceCard = {
  title?: unknown;
  text?: unknown;
  copy?: unknown;
  image?: unknown;
};

type ServiceSection = {
  items: ServiceCard[];
};

const servicesDefaults = getPageConfig("services").defaults;

export default function Services() {
  const content = useCmsPage("services");
  const header = section(content, "header", servicesDefaults.header as ServicesHeader);
  const serviceSection = section(content, "services", servicesDefaults.services as ServiceSection);
  const services = cards<ServiceCard>(serviceSection.items, []);

  return (
    <div className={styles.pageWrapper} data-watermark={text(header.kicker, "Services")}>
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

        <div className={styles.servicesGrid}>
          {services.map((service, index) => (
            <motion.article
              key={`${text(service.title, "service")}-${index}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className={styles.serviceCard}
            >
              <div className={styles.imageWrapper}>
                <Image
                  src={text(service.image, "/profile-images/profile_page_03_image_01_xref_332.jpeg")}
                  alt={text(service.title, "KTL service")}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{text(service.title)}</h3>
              <p>{text(service.text, text(service.copy))}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}
