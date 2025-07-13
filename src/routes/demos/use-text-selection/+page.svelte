<script lang="ts">
  import { useTextSelection } from '@/hooks';
  const { text, rects } = useTextSelection();
</script>

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
