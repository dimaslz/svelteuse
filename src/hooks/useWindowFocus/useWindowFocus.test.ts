import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { get } from 'svelte/store';

import { useWindowFocus } from './useWindowFocus';

describe('useWindowFocus', () => {
  let mockWindow: Window & {
    events: Record<string, Function[]>;
    trigger: (event: 'focus' | 'blur') => void;
  };

  beforeEach(() => {
    mockWindow = {
      document: {
        hasFocus: vi.fn(() => true),
      },
      events: {
        focus: [],
        blur: [],
      },
      addEventListener: vi.fn((event, cb) => {
        mockWindow.events[event]?.push(cb);
      }),
      removeEventListener: vi.fn((event, cb) => {
        mockWindow.events[event] = mockWindow.events[event].filter(fn => fn !== cb);
      }),
      trigger(event: 'focus' | 'blur') {
        mockWindow.events[event].forEach(fn => fn());
      },
    } as any;
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should initialize with hasFocus true', () => {
    const store = useWindowFocus({ window: mockWindow });
    expect(get(store)).toBe(true);
  });

  it('should update to false on blur event', () => {
    const store = useWindowFocus({ window: mockWindow });

    let result = true;
    const unsubscribe = store.subscribe(val => result = val);

    mockWindow.trigger('blur');
    expect(result).toBe(false);

    unsubscribe();
  });

  it('should update back to true on focus event', () => {
    const store = useWindowFocus({ window: mockWindow });

    let result = true;
    const unsubscribe = store.subscribe(val => result = val);

    mockWindow.trigger('blur');
    expect(result).toBe(false);

    mockWindow.trigger('focus');
    expect(result).toBe(true);

    unsubscribe();
  });

  it('should be false in SSR', () => {
    const originalWindow = globalThis.window;
    // @ts-ignore
    delete globalThis.window;

    const store = useWindowFocus(); // no window
    expect(get(store)).toBe(false);

    globalThis.window = originalWindow;
  });
});