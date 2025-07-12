import { get, writable } from 'svelte/store';

export function useThrottledHistory<T>(initial: T, options: {
  throttle?: number;
  deep?: boolean,
  capacity?: number
} = {}) {
  const { throttle = 1000, deep = false, capacity } = options;
  const src = writable(initial);
  const history = writable<{ snapshot: T; ts: number }[]>([]);
  const undoStack: { snapshot: T; ts: number }[] = [];
  const redoStack: { snapshot: T; ts: number }[] = [];
  let timeoutId: ReturnType<typeof setTimeout> | null = null;
  let timeoutDone: boolean = true;
  let tracking = true;

  const cloneVal = (v: T) => deep ? structuredClone(v) : v;

  function record(v: T) {
    const snap = cloneVal(v);
    const rec = { snapshot: snap, ts: Date.now() };
    undoStack.unshift(rec);
    if (capacity && undoStack.length > capacity) undoStack.pop();
    redoStack.length = 0;
    history.set([...undoStack]);
  }

  src.subscribe((value) => {
    if (get(history).length === 0 && initial) { record(value) }

    if (!tracking) return;

    if (timeoutDone) {
      timeoutDone = false

      if (timeoutId) clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        record(get(src));

        timeoutId = null;
        timeoutDone = true;
      }, throttle);
    }
  });

  return {
    value: src,
    subscribe: src.subscribe,
    set: src.set,
    update: src.update,
    history,
    undo: () => {
      if (undoStack.length > 1) {
        const top = undoStack.shift()!;
        redoStack.unshift(top);
        const next = undoStack[0];
        tracking = false;
        src.set(cloneVal(next.snapshot));
        tracking = true;
        history.set([...undoStack]);
      }
    },
    redo: () => {
      if (redoStack.length) {
        const next = redoStack.shift()!;
        undoStack.unshift(next);
        tracking = false;
        src.set(cloneVal(next.snapshot));
        tracking = true;
        history.set([...undoStack]);
      }
    },
    clear: () => {
      undoStack.length = 0;
      redoStack.length = 0;
      history.set([]);
    }
  };
}
