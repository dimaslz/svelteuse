import { tick } from 'svelte';

export function useEventCallback<Args extends unknown[], R>(
  fn: ((...args: Args) => R) | undefined
): ((...args: Args) => R) | undefined {
  let currentFn = fn;

  // Update the reference asynchronously to mimic effect timing
  async function updateFn(newFn: typeof fn) {
    await tick();
    currentFn = newFn;
  }

  updateFn(currentFn);

  if (!currentFn) return undefined;

  return (...args: Args) => {

    if (!currentFn) {
      throw new Error('Cannot call an event handler while rendering.');
    }

    return currentFn(...args);
  };
}