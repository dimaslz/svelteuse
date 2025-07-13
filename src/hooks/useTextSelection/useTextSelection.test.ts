import { describe, it, expect } from 'vitest';
import { get } from 'svelte/store';

import { useTextSelection } from './useTextSelection';

describe('Hook - useTextSelection', () => {
  it('initializes empty', () => {
    const { text, rects, ranges, selectionObj } = useTextSelection();

    expect(get(text)).toBe('');
    expect(get(rects)).toEqual([]);
    expect(get(ranges)).toEqual([]);
    expect(get(selectionObj)).toBeNull();
  });

  it('updates when selection changes', async () => {
    document.body.innerHTML = '<p>abc</p><p>def</p>';
    const p = document.querySelector('p')!;
    const range = document.createRange();
    range.selectNodeContents(p);
    const sel = window.getSelection()!;
    sel.removeAllRanges();
    sel.addRange(range);

    document.dispatchEvent(new Event('selectionchange'));

    const { text, rects, ranges, selectionObj } = useTextSelection();

    document.dispatchEvent(new Event('selectionchange'));

    expect(get(text)).toBe('abc');
    expect(get(ranges).length).toBe(1);
    // expect(get(rects).length).toBeGreaterThan(0);
    expect(get(selectionObj)).toBeInstanceOf(Selection);
  });
});
