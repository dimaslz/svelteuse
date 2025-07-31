import { describe, it, expect, beforeEach, vi } from 'vitest';
import { get } from 'svelte/store';

import { useUrlSearchParams } from './useUrlSearchParams';

describe('Hook - useUrlSearchParams', () => {
  let mockWin: any;

  beforeEach(() => {
    mockWin = {
      location: { pathname: '/page', search: '?a=1', hash: '#b=2' },
      history: { replaceState: vi.fn(), pushState: vi.fn() },
      addEventListener: vi.fn(),
    };
  });

  it('reads initial params from search mode', () => {
    const store = useUrlSearchParams(
      'history',
      {
        initialValue: { a: '0' },
        windowRef: mockWin
      }
    );

    expect(get(store)).toEqual({ a: '1' });
  });

  it('uses default initial when missing', () => {
    mockWin.location.search = '';
    const store = useUrlSearchParams(
      'history',
      {
        initialValue:{ a: '5' },
        windowRef: mockWin
      }
    );

    expect(get(store)).toEqual({ a: '5' });
  });

  it('updates params & writes URL', () => {
    const store = useUrlSearchParams('history', { windowRef: mockWin });
    store.setParams({ c: '3' });

    expect(mockWin.history.replaceState).toHaveBeenCalledWith(
      {},
      '',
      '/page?a=1&c=3'
    );
    // expect(get(store)).toEqual({ c: '3' });
  });

  it('popstate triggers read', () => {
    const store = useUrlSearchParams('history', { windowRef: mockWin });
    mockWin.location.search = '?z=x';
    const listener = mockWin.addEventListener.mock.calls.find(
      (c: any[]) => c[0] === 'popstate'
    )[1];

    listener();
    expect(get(store)).toEqual({ z: 'x' });
  });

  it('hash mode reads and writes hash string', () => {
    mockWin.location.hash = '#foo=bar';
    const store = useUrlSearchParams('hash', { windowRef: mockWin });
    expect(get(store)).toEqual({ foo: 'bar' });
    store.setParams({ foo:'baz' });
    expect(mockWin.history.replaceState).toHaveBeenCalled();
  });
});
