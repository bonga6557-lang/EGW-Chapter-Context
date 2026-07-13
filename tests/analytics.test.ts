import { afterEach, describe, expect, it, vi } from 'vitest';
import { installAnalytics } from '../src/utils/analytics';

describe('installAnalytics', () => {
  afterEach(() => {
    document.head.innerHTML = '';
    vi.unstubAllEnvs();
    vi.resetModules();
  });

  it('does nothing when no analytics site is configured', () => {
    installAnalytics();
    expect(document.querySelector('script[data-goatcounter]')).toBeNull();
  });

  it('loads GoatCounter when VITE_GOATCOUNTER_CODE is configured', () => {
    vi.stubEnv('VITE_GOATCOUNTER_CODE', 'egw-study');

    installAnalytics();

    const script = document.querySelector<HTMLScriptElement>('script[data-goatcounter]');
    expect(script).not.toBeNull();
    expect(script?.src).toBe('https://gc.zgo.at/count.js');
    expect(script?.dataset.goatcounter).toBe('https://egw-study.goatcounter.com/count');
  });
});
