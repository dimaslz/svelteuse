export const exampleCode = `
<!-- javascript -->
<script lang="ts">
  import { useHistory } from '@dimaslz/svelteuse';

  const { subscribe, set, history, undo, redo } = useHistory(0, { deep: false, capacity: 20 });

  let value = 0;
  subscribe(v => value = v);
</script>

<!-- html -->
<div class="flex">
  <button on:click={() => set(value + 1)}>Increment</button>
  <button on:click={() => set(value - 1)}>Decrement</button>

  <button on:click={undo}>Undo</button>
  <button on:click={redo}>Redo</button>
</div>

<p>Current Value: <strong>{value}</strong></p>

<hr />

<h3>Snapshot History:</h3>

<ul>
  {#each $history as h}
    <li>{new Date(h.ts).toLocaleTimeString()}: {h.value}</li>
  {/each}
</ul>
`;

export const sourceCode = `
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
`;
