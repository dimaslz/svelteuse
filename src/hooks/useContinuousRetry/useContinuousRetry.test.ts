import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

import { useContinuousRetry } from './useContinuousRetry';

describe('Hooks - useContinuousRetry', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should resolve after callback returns true', () => {
    let attempts = 0;
    const callback = () => ++attempts === 3;

    const store = useContinuousRetry(callback, 100);

    let latestValue = false;
    const unsubscribe = store.subscribe((val) => {
      latestValue = val;
    });

    // Trigger 3 intervals: 0ms, 100ms, 200ms
    vi.advanceTimersByTime(300);

    expect(latestValue).toBe(true);
    unsubscribe();
  });

  it('should not resolve before maxRetries is hit', () => {
    const callback = vi.fn(() => false);
    const store = useContinuousRetry(callback, 100, { maxRetries: 3 });

    let latest = false;
    const unsubscribe = store.subscribe((val) => {
      latest = val;
    });

    vi.advanceTimersByTime(400); // 4 ticks

    expect(callback).toHaveBeenCalledTimes(4);
    expect(latest).toBe(false);

    unsubscribe();
  });

  it('should resolve immediately if callback returns true right away', () => {
    const store = useContinuousRetry(() => true, 100);

    let result = false;
    const unsubscribe = store.subscribe((val) => {
      result = val;
		});

    expect(result).toBe(true);
    unsubscribe();
  });

  it('should do nothing in SSR (no window)', () => {
    const originalWindow = globalThis.window;
    // @ts-ignore simulate SSR
    delete globalThis.window;

    const store = useContinuousRetry(() => true, 100);

    let val = false;
    const unsubscribe = store.subscribe((v) => {
      val = v;
    });

    expect(val).toBe(false);
    unsubscribe();

    globalThis.window = originalWindow;
  });
});