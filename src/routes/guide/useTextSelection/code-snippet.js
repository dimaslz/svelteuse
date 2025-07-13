export const exampleCode = `
<!-- javascript -->
<script lang="ts">
  import { useTextSelection } from '@/hooks';
  const { text, rects } = useTextSelection();
</script>

<!-- html -->
<div class="p-4">
  <p>Select any part of this:</p>
  <p>“The quick brown fox jumps over the lazy dog.”</p>
</div>

<div class="p-4 text-left w-full">
  <p>
    <strong>Selected text:</strong> {$text || '— none —'}
  </p>
</div>

{#if $rects.length}
  <ul>
    {#each $rects as r}
      <li>Rect: {r.top.toFixed(0)}, {r.left.toFixed(0)}</li>
    {/each}
  </ul>
{/if}
`;

export const sourceCode = `
import { writable, type Writable } from 'svelte/store';

const isClient = typeof window !== 'undefined';

export function useTextSelection() {
  const text: Writable<string> = writable('');
  const rects: Writable<DOMRect[]> = writable([]);
  const ranges: Writable<Range[]> = writable([]);
  const selectionObj: Writable<Selection | null> = writable(null);

  function update() {
    if (!isClient) return;
    const sel = window.getSelection();
    if (!sel) return;

    selectionObj.set(sel);
    text.set(sel.toString());

    const rArr: Range[] = [];
    const rectsArr: DOMRect[] = [];
    for (let i = 0; i < sel.rangeCount; i++) {
      const r = sel.getRangeAt(i);
      rArr.push(r);

      if (r.getClientRects) {
        rectsArr.push(...Array.from(r.getClientRects()));
      }
    }

    ranges.set(rArr);
    rects.set(rectsArr);
  }

  if (isClient) {
    document.addEventListener('selectionchange', update);
  }

  return { text, rects, ranges, selectionObj };
}
`;
