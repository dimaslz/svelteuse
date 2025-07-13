import { writable } from 'svelte/store';

export function useObjectState<T extends object>(initial: T) {
  const store = writable<T>(initial);

  function setState(
    update: Partial<T> | ((prev: T) => Partial<T>)
  ) {
    store.update(prev => {
      const patch = typeof update === 'function'
        ? update(prev)
        : update;
      return { ...prev, ...patch };
    });
  }

  return {
    subscribe: store.subscribe,
    setState
  };
}
