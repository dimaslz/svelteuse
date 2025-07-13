import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { useStorage } from './useStorage';

describe('Hook - useStorage (SSR safe)', () => {
  beforeEach(() => localStorage.clear());

  it('initializes with default if no value is stored', () => {
    const s = useStorage('counter', 5);
    expect(get(s)).toBe(5);
    expect(localStorage.getItem('counter')).toBe('5');
  });

  it('reads from localStorage if available', () => {
    localStorage.setItem('user', JSON.stringify({ name: 'Jane' }));
    const s = useStorage('user', { name: 'Default' });
    expect(get(s)).toEqual({ name: 'Jane' });
  });

  it('writes to localStorage on set', () => {
    const s = useStorage('theme', 'light');
    s.set('dark');
    expect(localStorage.getItem('theme')).toBe('"dark"');
  });

  it('removes key from localStorage when set to null', () => {
    const s = useStorage<string | null>('key', 'val');
    s.set(null);
    expect(localStorage.getItem('key')).toBeNull();
  });

  it('supports mergeDefaults (shallow)', () => {
    localStorage.setItem('config', JSON.stringify({ font: 'serif' }));
    const s = useStorage('config', { font: 'sans', size: 14 }, localStorage, {
      mergeDefaults: true,
    });
    expect(get(s)).toEqual({ font: 'serif', size: 14 });
  });

  it('handles broken JSON gracefully', () => {
    localStorage.setItem('broken', '{ not valid json }');
    const s = useStorage('broken', { safe: true });
    expect(get(s)).toEqual({ safe: true });
  });
});
