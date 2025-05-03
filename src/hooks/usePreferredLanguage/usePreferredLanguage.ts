import { isClient } from '@/utils/is-client';
import { readable } from 'svelte/store';

export function usePreferredLanguage() {
  return readable<string>('en', (set) => {
    if (!isClient()) return;

    const update = () => set(navigator.language || 'en');

    update(); // initialize immediately

    window.addEventListener('languagechange', update);

    return () => {
      window.removeEventListener('languagechange', update);
    };
  });
}