import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { get } from 'svelte/store';

import { usePreferredLanguage } from './usePreferredLanguage';

describe('Hooks - usePreferredLanguage', () => {
  const originalWindow = globalThis.window;
  const originalNavigator = globalThis.navigator;

  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    globalThis.window = originalWindow;
    globalThis.navigator = originalNavigator;
  });

  it('should return "en" on server (no window or navigator)', () => {
    // Simulate SSR
    // @ts-ignore
    delete globalThis.window;
    // @ts-ignore
    delete globalThis.navigator;

    const store = usePreferredLanguage();
    expect(get(store)).toBe('en');
  });

  it('should return navigator.language in the browser', () => {
    globalThis.navigator = {
      language: 'fr-FR',
    } as Navigator;

    globalThis.window = {
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    } as any;

    const store = usePreferredLanguage();
    expect(get(store)).toBe('fr-FR');
  });

  it('should update when languagechange event fires', () => {
    let language = 'fr-FR';

    globalThis.navigator = {
      get language() {
        return language;
      },
    } as any;

    let listener: () => void = () => {};
    globalThis.window = {
      addEventListener: vi.fn((_, cb) => {
        listener = cb;
      }),
      removeEventListener: vi.fn(),
    } as any;

    const store = usePreferredLanguage();
    expect(get(store)).toBe('fr-FR');

    // Simulate language change
    language = 'es-ES';
    listener();
    expect(get(store)).toBe('es-ES');
  });
});