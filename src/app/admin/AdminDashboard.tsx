"use client";

import { FormEvent, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
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

  const newestEnquiry = useMemo(() => enquiries[0], [enquiries]);

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

  const saveContent = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const rawContent = String(form.get('content') || '{}');
    let content: unknown = {};

    try {
      content = JSON.parse(rawContent);
    } catch {
      setStatus('CMS content must be valid JSON.');
      return;
    }

    await fetch('/api/admin/content', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: form.get('slug'),
        title: form.get('title'),
        content,
      }),
    });

    event.currentTarget.reset();
    await loadDashboard();
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
            <p>CMS content</p>
            <span>Store editable page copy as JSON</span>
          </div>
          <form className={styles.form} onSubmit={saveContent}>
            <div className={styles.formRow}>
              <input name="slug" placeholder="home" required />
              <input name="title" placeholder="Home page" required />
            </div>
            <textarea
              name="content"
              rows={7}
              defaultValue={'{\n  "heroTitle": "KTL Interiors transforms offices with excellence"\n}'}
            />
            <button type="submit">Save content</button>
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
