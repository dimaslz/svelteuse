import { writable } from 'svelte/store';

export function useHistory<T>(initial: T, options: {
  deep?: boolean,
  capacity?: number
} = {}) {
  const { deep = false, capacity } = options;
  const src = writable(initial);
  const history = writable<{ value: T; ts: number }[]>([]);
  const undoStack: { value: T; ts: number }[] = [];
  const redoStack: { value: T; ts: number }[] = [];
  let tracking = true;

  const cloneVal = (v: T) => deep ? structuredClone(v) : v;

  function record(v: T) {
    const snap = cloneVal(v);
    const rec = { value: snap, ts: Date.now() };
    undoStack.unshift(rec);
    if (capacity && undoStack.length > capacity) undoStack.pop();
    redoStack.length = 0;
    history.set([...undoStack]);
  }

  src.subscribe(v => {
    if (!tracking) return;
    record(v);
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
        src.set(cloneVal(next.value));
        tracking = true;
        history.set([...undoStack]);
      }
    },
    redo: () => {
      if (redoStack.length) {
        const next = redoStack.shift()!;
        undoStack.unshift(next);
        tracking = false;
        src.set(cloneVal(next.value));
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
