import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { get } from 'svelte/store';

import { useIdle } from './useIdle';

describe('Hooks - useIdle', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
    vi.resetAllMocks();
  });

  it('should start as not idle', () => {
    const idle = useIdle(5000);
    expect(get(idle)).toBe(false);
  });

  it('should become idle after specified timeout', () => {
    const idle = useIdle(5000);
    expect(get(idle)).toBe(false);

    vi.advanceTimersByTime(5000);
    expect(get(idle)).toBe(true);
  });

  it('should reset timer on user activity', () => {
    const idle = useIdle(5000);

    // Simulate activity before timeout
    window.dispatchEvent(new Event('mousemove'));
    vi.advanceTimersByTime(3000);
    window.dispatchEvent(new Event('keydown'));
    vi.advanceTimersByTime(3000); // only 6s passed, but idle should still be false

    expect(get(idle)).toBe(false);

    // Wait long enough now to become idle
    vi.advanceTimersByTime(5000);
    expect(get(idle)).toBe(true);
  });

  it('should stop tracking when stop() is called', () => {
    const idle = useIdle(3000);
    idle.stop();

    vi.advanceTimersByTime(10000);
    expect(get(idle)).toBe(false); // should never become idle
  });

  it('should restart tracking when start() is called again', () => {
    const idle = useIdle(3000);
    idle.stop();

    vi.advanceTimersByTime(10000);
    expect(get(idle)).toBe(false); // still not idle

    idle.start();
    vi.advanceTimersByTime(3000);
    expect(get(idle)).toBe(true);
  });

  it('should respond to custom events if provided', () => {
    const idle = useIdle(4000, ['click', 'keydown']);
    window.dispatchEvent(new Event('click'));
    vi.advanceTimersByTime(2000);
    window.dispatchEvent(new Event('keydown'));
    vi.advanceTimersByTime(3000);

    expect(get(idle)).toBe(false);

    vi.advanceTimersByTime(2000); // Now pass enough time
    expect(get(idle)).toBe(true);
  });
});
