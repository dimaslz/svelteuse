<script lang="ts">
	import Button from '@/components/button/Button.svelte';

  import { useThrottledHistory } from '@/hooks/useThrottledHistory/useThrottledHistory';

  // Initialize the custom store
  const { value, subscribe, history, set, redo, undo } = useThrottledHistory<number>(0, { throttle: 500, deep: false });

  let counter = 0;
  subscribe((v) => counter = v)

</script>

<div class="flex">
  <Button on:click={() => set(counter + 1)}>increment counter</Button>
  <Button on:click={() => set(counter - 1)}>decrement counter</Button>
</div>

<pre>{$value}</pre>

<div class="mt-2">
  <Button on:click={undo}>Undo</Button>
  <Button on:click={redo}>Redo</Button>
</div>

<hr />

<h3>Snapshot History:</h3>

<ul>
  {#each $history as h}
    <li>{new Date(h.ts).toLocaleTimeString()}: <code>{h.snapshot}</code></li>
  {/each}
</ul>
