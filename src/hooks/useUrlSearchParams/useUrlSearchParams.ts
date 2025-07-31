import { writable } from 'svelte/store';
import type { Unsubscriber, Subscriber, Invalidator } from 'svelte/store';

const isClient = typeof window !== 'undefined';

export function useUrlSearchParams<T extends Record<string,string>>(
  mode: 'history' | 'hash' | 'hash-params' = 'history',
  options?: {
    write?: boolean;
    writeMode?: 'replace'|'push';
    removeNullishValues?: boolean;
    removeFalsyValues?: boolean;
    initialValue?: Partial<T>;
    stringify?: (params: URLSearchParams) => string;
    windowRef?: Window;
  }
): {
    subscribe: (
      this: void, run: Subscriber<T>, invalidate?: Invalidator<T> | undefined) => Unsubscriber;
    setParams: (obj: Partial<T>) => void;
} {
  const {
    write = true,
    writeMode = 'replace',
    removeNullishValues = true,
    removeFalsyValues = false,
    initialValue = {} as Partial<T>,
    stringify,
    windowRef = isClient ? window : undefined as any
  } = options ?? {};
  const store = writable<T>({} as T);

  function read() {
    if (!isClient || !windowRef) return;
    let search = '';
    if (mode === 'history') search = windowRef.location.search;
    else if (mode === 'hash') search = windowRef.location.hash.replace(/^#/, '');
    else if (mode === 'hash-params') search = windowRef.location.hash.split('?')[1] ?? '';
    const params = new URLSearchParams(search);
    for (const [k,v] of Object.entries(initialValue)) {
      if (!params.has(k) && v !== undefined) params.set(k, String(v));
    }
    const obj: Record<string,string> = {};
    params.forEach((v,k) => {
      if (v === null && removeNullishValues) return;
      if (!v && removeFalsyValues) return;
      obj[k] = v;
    });
    store.set(obj as T);
  }

  function writeUrl(params: URLSearchParams) {
    if (!windowRef || !write) return;
    const q = stringify ? stringify(params) : params.toString();
    let url = '';

    if (mode === 'history') {
      url = `${windowRef.location.pathname}${q ? '?' + q : ''}`;
    } else if (mode === 'hash') {
      url = `#${q}`;
    } else {
      url = `${windowRef.location.pathname}#${q}`;
    }

    windowRef.history[writeMode + 'State']({}, '', url);
  }

  function updateStore(obj: Partial<T>): void {
    store.update(prev => {
      const next = { ...prev, ...obj } as T;
      const params = new URLSearchParams();

      Object.entries(next).forEach(([k,v])=> {
        if (v == null && removeNullishValues) return;
        if (!v && removeFalsyValues) return;
        params.set(k, String(v));
      });

      writeUrl(params);

      return next;
    });
  }

  if (isClient && windowRef) {
    windowRef.addEventListener('popstate', read);
    read();
  } else {
    store.set(initialValue as T);
  }

  return {
    subscribe: store.subscribe,
    setParams: updateStore,
  };
}
