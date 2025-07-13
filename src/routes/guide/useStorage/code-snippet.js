export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useStorage } from "@dimaslz/svelteuse";

	const count = useStorage<number>('my-count', 0);
  const settings = useStorage<{ theme: string }>(
    'settings',
    { theme: 'light' },
    typeof window !== 'undefined' ? localStorage : undefined,
    { mergeDefaults: true }
  );

  function inc() {
    count.update(n => n + 1);
  }
</script>

<!-- html -->
<Button on:click={inc}>Increment: {$count}</Button>
<select bind:value={$settings.theme}>
  <option>light</option>
  <option>dark</option>
</select>
`;

export const sourceCode = `
import { writable, type Writable } from 'svelte/store';

const isClient = typeof window !== 'undefined';

export function useStorage<T>(
  key: string,
  defaultValue: T,
  storage: Storage | undefined = isClient ? localStorage : undefined,
  options?: {
    mergeDefaults?: boolean | ((stored: T, defaults: T) => T)
    serializer?: {
      read: (v: string) => T;
      write: (v: T) => string;
    }
  }
): Writable<T> {
  const {
    mergeDefaults = false,
    serializer = {
      read: JSON.parse,
      write: JSON.stringify,
    },
  } = options ?? {};

  let initialValue = defaultValue;

  if (isClient && storage) {
    const raw = storage.getItem(key);
    if (raw !== null) {
      try {
        const parsed = serializer.read(raw);
        if (
          mergeDefaults &&
          typeof parsed === 'object' &&
          typeof defaultValue === 'object'
        ) {
          initialValue =
            typeof mergeDefaults === 'function'
              ? mergeDefaults(parsed, defaultValue)
              : { ...defaultValue, ...parsed };
        } else {
          initialValue = parsed;
        }
      } catch {
        initialValue = defaultValue;
      }
    }
  }

  const store = writable<T>(initialValue, (set) => {
    if (!isClient || !storage) return () => {};

    const onStorage = (e: StorageEvent) => {
      if (e.key === key && e.storageArea === storage) {
        try {
          const val = e.newValue ? serializer.read(e.newValue) : defaultValue;
          set(val);
        } catch {
          set(defaultValue);
        }
      }
    };

    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  });

  store.subscribe((val) => {
    if (!isClient || !storage) return;
    try {
      if (val == null) storage.removeItem(key);
      else storage.setItem(key, serializer.write(val));
    } catch {}
  });

  return store;
}
`;
