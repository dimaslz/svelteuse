import { describe, it, expect } from 'vitest';
import { writable, get } from 'svelte/store';

import { usePrevious } from './usePrevious';

describe('usePrevious', () => {
  it('should return null on initial value', () => {
    const value = writable(10);
    const previous = usePrevious(value);

    expect(get(previous)).toBe(null);
  });

  it('should return the previous value after an update', () => {
    const value = writable(1);
    const previous = usePrevious(value);

    // Initial state
    expect(get(previous)).toBe(null);

    value.set(2);
    expect(get(previous)).toBe(1);

    value.set(5);
    expect(get(previous)).toBe(2);
  });

  it('should keep updating with every change', () => {
    const source = writable('a');
    const previous = usePrevious(source);

    expect(get(previous)).toBe(null);

    source.set('b');
    expect(get(previous)).toBe('a');

    source.set('c');
    expect(get(previous)).toBe('b');

    source.set('d');
    expect(get(previous)).toBe('c');
  });
});