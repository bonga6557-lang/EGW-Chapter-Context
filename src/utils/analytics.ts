/**
 * Privacy-respecting analytics. No cookies.
 * When VITE_GOATCOUNTER_CODE is set, events are sent to GoatCounter.
 * Otherwise track() is a no-op (safe for local/dev).
 */
declare global {
  interface Window {
    goatcounter?: {
      count?: (opts: { path?: string; title?: string; event?: boolean }) => void;
      no_onload?: boolean;
    };
  }
}

export type AnalyticsEvent =
  | 'chapter_opened'
  | 'guided_completed'
  | 'quiz_taken'
  | 'export_used'
  | 'backup_exported';

let analyticsInstalled = false;

function goatCounterEndpoint(code: string): string {
  const trimmed = code.trim();
  if (/^https?:\/\//i.test(trimmed)) {
    return trimmed.endsWith('/count') ? trimmed : `${trimmed.replace(/\/$/, '')}/count`;
  }
  if (trimmed.includes('.')) {
    return `https://${trimmed.replace(/\/$/, '')}/count`;
  }
  return `https://${trimmed}.goatcounter.com/count`;
}

export function installAnalytics(): void {
  try {
    if (analyticsInstalled || typeof document === 'undefined' || typeof window === 'undefined') return;

    const code = import.meta.env.VITE_GOATCOUNTER_CODE?.trim();
    if (!code) return;

    window.goatcounter = {
      ...window.goatcounter,
      no_onload: true,
    };

    const existing = document.querySelector<HTMLScriptElement>('script[data-goatcounter]');
    if (existing) {
      analyticsInstalled = true;
      return;
    }

    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://gc.zgo.at/count.js';
    script.dataset.goatcounter = goatCounterEndpoint(code);
    document.head.appendChild(script);
    analyticsInstalled = true;
  } catch {
    // analytics must never block rendering
  }
}

export function track(event: AnalyticsEvent, detail?: string): void {
  try {
    if (typeof window === 'undefined') return;
    const path = detail ? `event-${event}/${detail}` : `event-${event}`;
    if (window.goatcounter?.count) {
      window.goatcounter.count({ path, title: event, event: true });
      return;
    }
    if (import.meta.env.DEV) {
      console.debug('[analytics]', event, detail || '');
    }
  } catch {
    // never break the study desk for analytics
  }
}
