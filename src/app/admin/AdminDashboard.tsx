"use client";

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { CmsField, getPageConfig, mergeCmsContent, pageConfigs } from '@/lib/cmsDefaults';
import styles from './page.module.css';

type Enquiry = {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  source: string;
  message: string;
  status: string;
  createdAt: string;
};

type MediaAsset = {
  id: number;
  title: string;
  alt: string | null;
  url: string;
  category: string;
  sortOrder: number;
  isActive: boolean;
};

type CmsPage = {
  id: number;
  slug: string;
  title: string;
  content: unknown;
  isActive: boolean;
  updatedAt: string;
};

type Summary = {
  totalEnquiries: number;
  newEnquiries: number;
  mediaAssets: number;
  cmsPages: number;
  recentEnquiries: Enquiry[];
};

const emptySummary: Summary = {
  totalEnquiries: 0,
  newEnquiries: 0,
  mediaAssets: 0,
  cmsPages: 0,
  recentEnquiries: [],
};

export default function AdminDashboard() {
  const [summary, setSummary] = useState<Summary>(emptySummary);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [media, setMedia] = useState<MediaAsset[]>([]);
  const [pages, setPages] = useState<CmsPage[]>([]);
  const [status, setStatus] = useState('Loading dashboard...');
  const [authorized, setAuthorized] = useState(true);
  const [selectedSlug, setSelectedSlug] = useState('home');
  const [selectedSection, setSelectedSection] = useState('hero');

  const newestEnquiry = useMemo(() => enquiries[0], [enquiries]);
  const selectedConfig = useMemo(() => getPageConfig(selectedSlug), [selectedSlug]);
  const savedPage = useMemo(
    () => pages.find((page) => page.slug === selectedSlug),
    [pages, selectedSlug]
  );
  const selectedContent = useMemo(
    () => mergeCmsContent(selectedConfig.defaults, savedPage?.content),
    [savedPage, selectedConfig]
  );
  const activeSection = useMemo(
    () => selectedConfig.sections.find((section) => section.key === selectedSection) || selectedConfig.sections[0],
    [selectedConfig, selectedSection]
  );
  const activeSectionContent = useMemo(() => {
    const value = selectedContent[activeSection.key];
    return value && typeof value === 'object' && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : {};
  }, [activeSection.key, selectedContent]);

  const loadDashboard = async () => {
    const [summaryResponse, enquiriesResponse, mediaResponse, contentResponse] = await Promise.all([
      fetch('/api/admin/summary'),
      fetch('/api/admin/enquiries'),
      fetch('/api/admin/media'),
      fetch('/api/admin/content'),
    ]);

    if ([summaryResponse, enquiriesResponse, mediaResponse, contentResponse].some((response) => response.status === 401)) {
      setAuthorized(false);
      setStatus('Please sign in to continue.');
      return;
    }

    const summaryData = (await summaryResponse.json()) as Summary;
    const enquiriesData = (await enquiriesResponse.json()) as { enquiries: Enquiry[] };
    const mediaData = (await mediaResponse.json()) as { media: MediaAsset[] };
    const contentData = (await contentResponse.json()) as { pages: CmsPage[] };

    setSummary(summaryData);
    setEnquiries(enquiriesData.enquiries);
    setMedia(mediaData.media);
    setPages(contentData.pages);
    setStatus('Dashboard synced');
  };

  useEffect(() => {
    const timer = window.setTimeout(() => {
      loadDashboard().catch(() => {
        setStatus('Unable to load dashboard. Check DATABASE_URL and run migrations.');
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const updateEnquiryStatus = async (id: number, nextStatus: string) => {
    await fetch(`/api/admin/enquiries/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: nextStatus }),
    });
    await loadDashboard();
  };

  const createMedia = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    await fetch('/api/admin/media', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: form.get('title'),
        alt: form.get('alt'),
        url: form.get('url'),
        category: form.get('category'),
        sortOrder: Number(form.get('sortOrder') || 0),
      }),
    });

    event.currentTarget.reset();
    await loadDashboard();
  };

  const formatFieldValue = (field: CmsField, value: unknown) => {
    if (field.type === 'list') {
      return Array.isArray(value) ? value.join('\n') : '';
    }

    if (field.type === 'cards') {
      if (!Array.isArray(value)) return '';

      return value
        .map((item) => {
          if (!item || typeof item !== 'object') return '';
          const card = item as Record<string, unknown>;
          return [card.title, card.text || card.copy, card.image]
            .filter((part) => typeof part === 'string' && part.trim())
            .join(' | ');
        })
        .filter(Boolean)
        .join('\n');
    }

    return typeof value === 'string' ? value : '';
  };

  const parseFieldValue = (field: CmsField, rawValue: FormDataEntryValue | null) => {
    const raw = String(rawValue || '');

    if (field.type === 'list') {
      return raw
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean);
    }

    if (field.type === 'cards') {
      return raw
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean)
        .map((line) => {
          const [title = '', text = '', image = ''] = line.split('|').map((part) => part.trim());
          return image ? { title, text, image } : { title, text };
        });
    }

    return raw.trim();
  };

  const saveSection = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextSection: Record<string, unknown> = {};

    activeSection.fields.forEach((field) => {
      nextSection[field.key] = parseFieldValue(field, form.get(field.key));
    });

    const nextContent = {
      ...selectedContent,
      [activeSection.key]: nextSection,
    };

    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: selectedConfig.slug,
        title: selectedConfig.title,
        content: nextContent,
      }),
    });

    await loadDashboard();
    setStatus(`${selectedConfig.title} / ${activeSection.label} saved`);
  };

  const logout = async () => {
    await fetch('/api/admin/logout', { method: 'POST' });
    window.location.href = '/admin/login';
  };

  if (!authorized) {
    return (
      <main className={styles.adminPage}>
        <section className={styles.authNotice}>
          <p>KTL Admin</p>
          <h1>Dashboard locked.</h1>
          <Link href="/admin/login">Sign in</Link>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.adminPage}>
      <header className={styles.header}>
        <div>
          <p>Dashboard</p>
          <h1>KTL CMS Control Room</h1>
          <span>{status}</span>
        </div>
        <button type="button" onClick={logout}>Logout</button>
      </header>

      <section className={styles.statsGrid}>
        <article>
          <span>Total enquiries</span>
          <strong>{summary.totalEnquiries}</strong>
        </article>
        <article>
          <span>New enquiries</span>
          <strong>{summary.newEnquiries}</strong>
        </article>
        <article>
          <span>Media assets</span>
          <strong>{summary.mediaAssets}</strong>
        </article>
        <article>
          <span>CMS pages</span>
          <strong>{summary.cmsPages}</strong>
        </article>
      </section>

      <section className={styles.dashboardGrid}>
        <article className={styles.panel}>
          <div className={styles.panelHeader}>
            <p>Enquiries</p>
            <span>{newestEnquiry ? `Latest from ${newestEnquiry.name}` : 'No enquiries yet'}</span>
          </div>
          <div className={styles.tableWrap}>
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Contact</th>
                  <th>Source</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {enquiries.map((enquiry) => (
                  <tr key={enquiry.id}>
                    <td>
                      <strong>{enquiry.name}</strong>
                      <small>{new Date(enquiry.createdAt).toLocaleString()}</small>
                    </td>
                    <td>
                      <a href={`mailto:${enquiry.email}`}>{enquiry.email}</a>
                      <small>{enquiry.phone || 'No phone'}</small>
                    </td>
                    <td>{enquiry.source}</td>
                    <td><span className={styles.statusPill}>{enquiry.status}</span></td>
                    <td>
                      <select
                        value={enquiry.status}
                        onChange={(event) => updateEnquiryStatus(enquiry.id, event.target.value)}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="won">Won</option>
                        <option value="closed">Closed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>

        <article className={styles.panel}>
          <div className={styles.panelHeader}>
            <p>Media manager</p>
            <span>Add website and portfolio images</span>
          </div>
          <form className={styles.form} onSubmit={createMedia}>
            <input name="title" placeholder="Image title" required />
            <input name="url" placeholder="/profile-images/example.jpeg or https://..." required />
            <input name="alt" placeholder="Alt text" />
            <div className={styles.formRow}>
              <input name="category" placeholder="portfolio" defaultValue="portfolio" />
              <input name="sortOrder" type="number" placeholder="0" defaultValue="0" />
            </div>
            <button type="submit">Add media</button>
          </form>
          <div className={styles.assetList}>
            {media.map((asset) => (
              <div key={asset.id}>
                <strong>{asset.title}</strong>
                <span>{asset.category} / {asset.isActive ? 'active' : 'hidden'}</span>
                <small>{asset.url}</small>
              </div>
            ))}
          </div>
        </article>

        <article className={styles.panel}>
          <div className={styles.panelHeader}>
            <p>Page editor</p>
            <span>Edit every page section by section</span>
          </div>

          <div className={styles.pageTabs} aria-label="CMS pages">
            {pageConfigs.map((page) => (
              <button
                key={page.slug}
                type="button"
                className={page.slug === selectedSlug ? styles.activeTab : ''}
                onClick={() => {
                  setSelectedSlug(page.slug);
                  setSelectedSection(page.sections[0]?.key || '');
                }}
              >
                {page.slug}
              </button>
            ))}
          </div>

          <div className={styles.sectionTabs} aria-label="Page sections">
            {selectedConfig.sections.map((cmsSection) => (
              <button
                key={cmsSection.key}
                type="button"
                className={cmsSection.key === activeSection.key ? styles.activeSection : ''}
                onClick={() => setSelectedSection(cmsSection.key)}
              >
                {cmsSection.label}
              </button>
            ))}
          </div>

          <form key={`${selectedSlug}-${activeSection.key}`} className={styles.form} onSubmit={saveSection}>
            {activeSection.fields.map((field) => {
              const value = formatFieldValue(field, activeSectionContent[field.key]);
              const rows = field.type === 'textarea' ? 5 : field.type === 'list' || field.type === 'cards' ? 7 : undefined;

              return (
                <label className={styles.cmsField} key={field.key}>
                  <span>{field.label}</span>
                  {field.help ? <small>{field.help}</small> : null}
                  {field.type === 'text' || field.type === 'image' ? (
                    <input
                      name={field.key}
                      defaultValue={value}
                      placeholder={field.type === 'image' ? '/profile-images/example.jpeg or https://...' : field.label}
                    />
                  ) : (
                    <textarea name={field.key} rows={rows} defaultValue={value} />
                  )}
                </label>
              );
            })}
            <button type="submit">Save section</button>
          </form>

          <div className={styles.assetList}>
            {pages.map((page) => (
              <div key={page.id}>
                <strong>{page.title}</strong>
                <span>/{page.slug} / {page.isActive ? 'active' : 'hidden'}</span>
                <small>{new Date(page.updatedAt).toLocaleString()}</small>
              </div>
            ))}
          </div>
        </article>
      </section>
    </main>
  );
}
