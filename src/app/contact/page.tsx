"use client";
import styles from './page.module.css';
import { motion } from 'framer-motion';

export default function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Thank you for your message. We will get back to you shortly.");
  };

  return (
    <div className={styles.pageWrapper}>
      <div className="container">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={styles.header}
        >
          <h1>Contact Us</h1>
          <p className={styles.subtitle}>Let us connect and build something great</p>
        </motion.div>

        <div className={styles.contentGrid}>
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.contactInfo}
          >
            <h2>Get in Touch</h2>
            <div className={styles.infoBlock}>
              <h3>Head Office</h3>
              <p>3rd Floor Royal Oak Mall, TK Junction</p>
              <p>Kannur, Kerala 670002</p>
            </div>
            
            <div className={styles.infoBlock}>
              <h3>Branch Office</h3>
              <p>#1282, 2nd Floor, 16th Cross</p>
              <p>Hongasandra, 7th Main Rd, Begur</p>
              <p>Bengaluru, Karnataka-560114</p>
            </div>

            <div className={styles.infoBlock}>
              <h3>Contact Details</h3>
              <p>Email: office@ktlcoworks.com</p>
              <p>Phone: +91 9746 241 399</p>
            </div>
            
            <div className={styles.infoBlock}>
              <h3>Our Locations</h3>
              <p>Kochi | Kozhikode | Kannur | Bengaluru | Hyderabad</p>
            </div>
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
                <input type="text" id="name" required placeholder="Your Name" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input type="email" id="email" required placeholder="Your Email" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="phone">Phone</label>
                <input type="tel" id="phone" required placeholder="Your Phone Number" />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="message">Message</label>
                <textarea id="message" required rows={5} placeholder="Tell us about your project..."></textarea>
              </div>
              <button type="submit" className="btn-primary">
                Send Message
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
