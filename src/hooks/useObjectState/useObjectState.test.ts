import { describe, it, expect, beforeEach } from 'vitest';
import { get } from 'svelte/store';

import { useObjectState } from './useObjectState';

type TestState = {
  name: string;
  count: number;
  active: boolean;
};

describe('Hooks - useObjectState', () => {
  let store: ReturnType<typeof useObjectState<TestState>>;

  beforeEach(() => {
    store = useObjectState({
      name: 'initial',
      count: 0,
      active: false,
    }) as ReturnType<typeof useObjectState<TestState>>;
  });

  it('should initialize with given state', () => {
    const state = get(store);

    expect(state).toEqual({
      name: 'initial',
      count: 0,
      active: false,
    });
  });

  it('should update state with a partial object', () => {
    store.setState({ count: 5 });
    const state = get(store);

    expect(state).toEqual({
      name: 'initial',
      count: 5,
      active: false,
    });
  });

  it('should update state with an updater function', () => {
    store.setState(prev => ({ count: prev.count + 1 }));
    const state = get(store);

    expect(state.count).toBe(1);
  });

  it('should preserve unchanged keys when updating', () => {
    store.setState({ active: true });
    const state = get(store);

    expect(state).toEqual({
      name: 'initial',
      count: 0,
      active: true,
    });
  });

  it('should allow multiple updates without overriding full state', () => {
    store.setState({ name: 'Alice' });
    store.setState({ count: 42 });
    const state = get(store);

    expect(state).toEqual({
      name: 'Alice',
      count: 42,
      active: false,
    });
  });

  it('should support replacing all fields using function if needed', () => {
    store.setState(() => ({
      name: 'Bob',
      count: 100,
      active: true,
    }));
    const state = get(store);

    expect(state).toEqual({
      name: 'Bob',
      count: 100,
      active: true,
    });
  });
});
