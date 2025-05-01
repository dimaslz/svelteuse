// src/lib/__tests__/useRandomInterval.integration.test.ts
import { render } from '@testing-library/svelte';
import { describe, it, vi, expect, beforeEach, afterEach } from 'vitest';

import RandomIntervalWrapper from './RandomIntervalWrapper.svelte';

describe('useRandomInterval integration (Svelte)', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('should increment count at random intervals', async () => {
    const updateSpy = vi.fn();
    render(RandomIntervalWrapper, {
      props: {
        minDelay: 100,
        maxDelay: 100,
        onUpdate: updateSpy
      }
    });

    vi.advanceTimersByTime(500); // simulate time passing
    expect(updateSpy).toHaveBeenCalled();
    expect(updateSpy.mock.calls.length).toBeGreaterThan(1);
    expect(updateSpy).toHaveBeenCalledWith(expect.any(Number));
  });

  it('should stop incrementing after unmount', async () => {
    const updateSpy = vi.fn();
    const { unmount } = render(RandomIntervalWrapper, {
      props: { minDelay: 100, maxDelay: 100, onUpdate: updateSpy }
    });

    vi.advanceTimersByTime(300);
    const callsBeforeUnmount = updateSpy.mock.calls.length;

    unmount();
    vi.advanceTimersByTime(500);

    expect(updateSpy.mock.calls.length).toBe(callsBeforeUnmount); // no more calls
  });
});