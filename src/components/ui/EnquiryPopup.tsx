"use client";

import { FormEvent, useEffect, useState } from 'react';
import styles from './EnquiryPopup.module.css';
import { FiCheckCircle, FiMessageSquare, FiX } from 'react-icons/fi';

export default function EnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [source, setSource] = useState('Floating CTA');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle');

  useEffect(() => {
    const openFromHash = () => {
      if (!window.location.hash.startsWith('#enquiry-')) return;
      const sourceFromHash = window.location.hash.replace(/^#enquiry-/, '').replace(/-\d+$/, '');
      setSource(decodeURIComponent(sourceFromHash || 'Website CTA'));
      setStatus('idle');
      setIsOpen(true);
    };

    openFromHash();
    window.addEventListener('hashchange', openFromHash);
    return () => window.removeEventListener('hashchange', openFromHash);
  }, []);

  const closePopup = () => {
    setIsOpen(false);
    if (window.location.hash.startsWith('#enquiry-')) {
      history.replaceState(null, '', window.location.pathname + window.location.search);
    }
    window.setTimeout(() => setStatus('idle'), 250);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const form = new FormData(e.currentTarget);
    const projectType = String(form.get('projectType') || '');
    const timeline = String(form.get('timeline') || '');
    const message = String(form.get('message') || '');

    await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.get('name'),
        email: form.get('email'),
        phone: form.get('phone'),
        source,
        message: `Project type: ${projectType}\nTimeline: ${timeline}\n\n${message}`,
      }),
    });

    setStatus('sent');
    e.currentTarget.reset();
  };

  return (
    <>
      <a
        href="#enquiry-Floating%20CTA"
        className={styles.floatingButton}
        aria-label="Open Enquiry Form"
      >
        <FiMessageSquare size={24} />
      </a>

      {isOpen && (
        <div className={styles.overlay} onClick={closePopup}>
          <div className={styles.popup} onClick={(e) => e.stopPropagation()}>
            <button className={styles.closeButton} onClick={closePopup} aria-label="Close enquiry form">
              <FiX size={24} />
            </button>

            <div className={styles.visualPanel}>
              <span>Workspace consultation</span>
              <h2>Tell us what you want to build.</h2>
              <p>KTL can help with planning, budgeting, fit-out, MEP coordination, and final handover.</p>
            </div>

            <div className={styles.content}>
              {status === 'sent' ? (
                <div className={styles.successState}>
                  <FiCheckCircle size={38} />
                  <h2>Enquiry received</h2>
                  <p>Thank you. The KTL team will get back to you shortly.</p>
                  <button type="button" className="btn-primary" onClick={closePopup}>Close</button>
                </div>
              ) : (
                <>
                  <p className={styles.formKicker}>Source: {source}</p>
                  <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label htmlFor="name">Name</label>
                        <input name="name" type="text" id="name" required placeholder="Your name" />
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="phone">Phone</label>
                        <input name="phone" type="tel" id="phone" required placeholder="+91" />
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="email">Email</label>
                      <input name="email" type="email" id="email" required placeholder="you@company.com" />
                    </div>

                    <div className={styles.formGrid}>
                      <div className={styles.formGroup}>
                        <label htmlFor="projectType">Project type</label>
                        <select name="projectType" id="projectType" defaultValue="Office interior">
                          <option>Office interior</option>
                          <option>Coworking space</option>
                          <option>Renovation</option>
                          <option>Custom fit-out</option>
                          <option>Commercial space</option>
                        </select>
                      </div>
                      <div className={styles.formGroup}>
                        <label htmlFor="timeline">Timeline</label>
                        <select name="timeline" id="timeline" defaultValue="Immediately">
                          <option>Immediately</option>
                          <option>Within 30 days</option>
                          <option>1-3 months</option>
                          <option>Planning stage</option>
                        </select>
                      </div>
                    </div>

                    <div className={styles.formGroup}>
                      <label htmlFor="message">Project notes</label>
                      <textarea name="message" id="message" required rows={4} placeholder="Location, approximate area, requirements..." />
                    </div>

                    <button type="submit" className="btn-primary" disabled={status === 'sending'}>
                      {status === 'sending' ? 'Sending...' : 'Send Enquiry'}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
