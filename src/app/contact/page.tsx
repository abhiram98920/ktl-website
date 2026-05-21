"use client";
import styles from './page.module.css';
import { motion } from 'framer-motion';
import { getPageConfig } from '@/lib/cmsDefaults';
import { cards, section, text, useCmsPage } from '@/hooks/useCmsPage';

type ContactHeader = {
  title: string;
  subtitle: string;
};

type ContactBlock = {
  title?: unknown;
  text?: unknown;
};

type ContactDetails = {
  title: string;
  blocks: ContactBlock[];
};

type ContactForm = {
  namePlaceholder: string;
  emailPlaceholder: string;
  phonePlaceholder: string;
  messagePlaceholder: string;
  button: string;
};

const contactDefaults = getPageConfig('contact').defaults;

export default function Contact() {
  const content = useCmsPage('contact');
  const header = section(content, 'header', contactDefaults.header as ContactHeader);
  const details = section(content, 'details', contactDefaults.details as ContactDetails);
  const form = section(content, 'form', contactDefaults.form as ContactForm);
  const infoBlocks = cards<ContactBlock>(details.blocks, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message. We will get back to you shortly.");
  };

  return (
    <div className={styles.pageWrapper} data-watermark={text(header.title, "Contact")}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.header}
        >
          <h1>{text(header.title)}</h1>
          <p className={styles.subtitle}>{text(header.subtitle)}</p>
        </motion.div>

        <div className={styles.contentGrid}>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.contactInfo}
          >
            <h2>{text(details.title)}</h2>
            {infoBlocks.map((block) => (
              <div className={styles.infoBlock} key={text(block.title)}>
                <h3>{text(block.title)}</h3>
                {text(block.text)
                  .split('/')
                  .map((line) => line.trim())
                  .filter(Boolean)
                  .map((line) => <p key={line}>{line}</p>)}
              </div>
            ))}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.formContainer}
          >
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" required placeholder={text(form.namePlaceholder)} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required placeholder={text(form.emailPlaceholder)} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" required placeholder={text(form.phonePlaceholder)} />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" required rows={5} placeholder={text(form.messagePlaceholder)}></textarea>
              </div>
              <button type="submit" className="btn-primary">
                {text(form.button)}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
