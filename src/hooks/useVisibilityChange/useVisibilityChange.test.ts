import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { useVisibilityChange } from './useVisibilityChange';

describe('useVisibilityChange', () => {
  let originalVisibility: string;

  beforeEach(() => {
    originalVisibility = document.visibilityState;

    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => 'visible',
    });
  });

  afterEach(() => {
    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => originalVisibility,
    });

    vi.restoreAllMocks();
  });

  it('should return true when document is visible', () => {
    const isVisible = useVisibilityChange();

    let current = false;
    const unsubscribe = isVisible.subscribe((v) => (current = v));

    expect(current).toBe(true);
    unsubscribe();
  });

  it('should update when document becomes hidden', () => {
    let state = 'visible';

    Object.defineProperty(document, 'visibilityState', {
      configurable: true,
      get: () => state,
    });

    const isVisible = useVisibilityChange();
    let current = true;
    const unsubscribe = isVisible.subscribe((v) => (current = v));

    expect(current).toBe(true);

    state = 'hidden';
    document.dispatchEvent(new Event('visibilitychange'));

    expect(current).toBe(false);
    unsubscribe();
  });

  it('should be server-safe and default to true', () => {
    const originalDocument = globalThis.document;
    // @ts-ignore
    delete globalThis.document;

    const store = useVisibilityChange();
    let val = false;
    const unsubscribe = store.subscribe((v) => (val = v));
    expect(val).toBe(true); // fallback

    unsubscribe();
    globalThis.document = originalDocument;
  });
});