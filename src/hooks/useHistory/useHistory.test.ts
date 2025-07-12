import { describe, it, expect, vi, beforeEach } from 'vitest';
import { get } from 'svelte/store';
import { useHistory } from './useHistory';

describe('Hooks - useHistory', () => {
  vi.useFakeTimers();
  let now = 0;

  beforeEach(() => {
    now = 1000000;
    vi.setSystemTime(now);
  });

  it('should initialize with the initial value', () => {
    const store = useHistory(5);

    let current;

    store.subscribe(v => current = v)(); // subscribe once

    expect(current).toBe(5);
    expect(get(store.history)).toHaveLength(1);
    expect(get(store.history)[0].value).toBe(5);
  });

  it('should record changes and maintain undo stack', () => {
    const store = useHistory(1);

    store.set(2);
    vi.advanceTimersByTime(10);
    store.set(3);

    const snapshots = get(store.history).map(h => h.value);
    expect(snapshots).toEqual([3, 2, 1]);
  });

  it('should undo and redo properly --', () => {
    const store = useHistory('a');

    store.set('b');
    store.set('c');

    let current;
    store.subscribe(v => current = v);

    store.undo(); // back to 'b'
    expect(current).toBe('b');

    store.undo(); // back to 'a'
    expect(current).toBe('a');

    store.redo(); // forward to 'b'
    expect(current).toBe('b');

    store.redo(); // forward to 'c'
    expect(current).toBe('c');
  });

  it('should not allow undo beyond initial', () => {
    const store = useHistory(10);

    store.set(11);
    store.undo();
    store.undo(); // Should stay at initial

    let current;
    store.subscribe(v => current = v)();
    expect(current).toBe(10);
  });

  it('should clear history and redo stack', () => {
    const store = useHistory(100);

    store.set(101);
    store.set(102);

    store.clear();

    expect(get(store.history)).toHaveLength(0);

    store.undo();

    let value;
    store.subscribe(v => value = v)();
    expect(value).toBe(102); // No change
  });

  it('should respect capacity limit', () => {
    const store = useHistory(0, { capacity: 3 });

    store.set(1);
    store.set(2);
    store.set(3);
    store.set(4); // This should push out the oldest

    const snapshots = get(store.history).map(h => h.value);
    expect(snapshots).toEqual([4, 3, 2]); // 1 should be dropped
  });

  it('should deep clone objects if option is enabled', () => {
    const store = useHistory({ count: 1 }, { deep: true });
    const obj = { count: 2 };
    store.set(obj);

    obj.count = 999; // mutation should not affect stored value

    const historySnap = get(store.history)[0].value;
    expect(historySnap).toEqual({ count: 2 });
  });
});
