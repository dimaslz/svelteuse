import { isClient } from '@/utils/is-client';
import { readable } from 'svelte/store';

export function useVisibilityChange() {

  return readable<boolean>(true, (set) => {
    if (!isClient()) {
      return;
    }

    const update = () => {
      set(document.visibilityState === 'visible');
    };

    update();

    document.addEventListener('visibilitychange', update);

    return () => {
      document.removeEventListener('visibilitychange', update);
    };
  });
}