import { writable, type Writable } from 'svelte/store';

export function useScrollLock(
  target: HTMLElement | Window | Document | null = null,
  initial = false
) {

  target = typeof window === 'undefined' ? null : document.body;

  const isLocked: Writable<boolean> = writable(initial);
  let originalOverflow = '';

  const lock = () => {
    const el = getElement();
    if (!el) return;
    if (el instanceof HTMLBodyElement || el instanceof HTMLElement) {
      originalOverflow = el.style.overflow;
      el.style.overflow = 'hidden';
    } else if (el instanceof Document || el instanceof Window) {
      originalOverflow = document.documentElement.style.overflow;
      document.documentElement.style.overflow = 'hidden';
    }
    isLocked.set(true);
  };

  const unlock = () => {
    const el = getElement();
    if (!el) return;
    if (el instanceof HTMLBodyElement || el instanceof HTMLElement) {
      el.style.overflow = originalOverflow;
    } else {
      document.documentElement.style.overflow = originalOverflow;
    }
    isLocked.set(false);
  };

  function getElement(): HTMLElement | Window | Document | null {
    if (typeof window === 'undefined') return null;

    if (target instanceof Window || target instanceof Document) return target;
    return target;
  }

  const set = (value: boolean) => (value ? lock() : unlock());

  if (initial) lock();

  return { isLocked, lock, unlock, set };
}
