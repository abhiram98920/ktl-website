"use client";

import { useEffect, useMemo, useState } from 'react';
import { getPageConfig, mergeCmsContent } from '@/lib/cmsDefaults';

export type CmsContent = Record<string, unknown>;

export function useCmsPage(slug: string) {
  const config = useMemo(() => getPageConfig(slug), [slug]);
  const [content, setContent] = useState<CmsContent>(() => config.defaults);

  useEffect(() => {
    let active = true;

    fetch(`/api/cms/${slug}`, { cache: 'no-store' })
      .then((response) => response.json())
      .then((data: { content?: unknown }) => {
        if (!active) return;
        setContent(mergeCmsContent(config.defaults, data.content));
      })
      .catch(() => {
        if (active) setContent(config.defaults);
      });

    return () => {
      active = false;
    };
  }, [config, slug]);

  return content;
}

export function section<T extends Record<string, unknown>>(
  content: CmsContent,
  key: string,
  fallback: T
): T {
  const value = content[key];
  return value && typeof value === 'object' && !Array.isArray(value)
    ? ({ ...fallback, ...(value as Record<string, unknown>) } as T)
    : fallback;
}

export function text(value: unknown, fallback = '') {
  return typeof value === 'string' && value.trim() ? value : fallback;
}

export function list(value: unknown, fallback: string[] = []) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === 'string') : fallback;
}

export function cards<T extends Record<string, unknown>>(value: unknown, fallback: T[] = []) {
  return Array.isArray(value) ? (value.filter((item) => item && typeof item === 'object') as T[]) : fallback;
}
