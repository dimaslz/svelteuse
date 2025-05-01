import { describe, it, expect, vi } from 'vitest';
import { tick } from 'svelte';

import { useEventCallback } from './useEventCallback';

describe('Hooks - useEventCallback', () => {
  it('returns a function that calls the original callback', async () => {
    const spy = vi.fn((x: number) => x * 2);

    const cb = useEventCallback(spy)!;
    await tick(); // wait for stabilization

    const result = cb(4);
    expect(result).toBe(8);
    expect(spy).toHaveBeenCalledWith(4);
  });

  it('uses the latest version of the callback after reassign', async () => {
    let currentFn = vi.fn(() => 'v1');
    let cb = useEventCallback(currentFn)!;
    await tick();

    expect(cb()).toBe('v1');

    currentFn = vi.fn(() => 'v2');
    cb = useEventCallback(currentFn)!;
    await tick();

    expect(cb()).toBe('v2');
  });

  it('returns undefined if callback is not provided', () => {
    const cb = useEventCallback(undefined);

		expect(cb).toBe(undefined);
  });
});