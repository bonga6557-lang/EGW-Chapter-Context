/**
 * Privacy-respecting analytics. No cookies.
 * When VITE_GOATCOUNTER_CODE is set, events are sent to GoatCounter.
 * Otherwise track() is a no-op (safe for local/dev).
 */
declare global {
  interface Window {
    goatcounter?: {
      count: (opts: { path?: string; title?: string; event?: boolean }) => void;
    };
  }
}

export type AnalyticsEvent =
  | 'chapter_opened'
  | 'guided_completed'
  | 'quiz_taken'
  | 'export_used'
  | 'backup_exported';

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
