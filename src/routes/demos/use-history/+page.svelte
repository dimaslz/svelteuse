<script lang="ts">
	import { Button } from '@/components';
  import { useHistory } from '@/hooks/useHistory/useHistory';
  const { subscribe, set, history, undo, redo } = useHistory(0, { deep: false, capacity: 20 });
  
  let value = 0;
  subscribe(v => value = v);
</script>

<div class="flex">
  <Button on:click={() => set(value + 1)}>Increment</Button>
  <Button on:click={() => set(value - 1)}>Decrement</Button>
  <Button on:click={undo}>Undo</Button>
  <Button on:click={redo}>Redo</Button>
</div>

<p>Current Value: <strong>{value}</strong></p>

<hr />

<h3>Snapshot History:</h3>

<ul>
  {#each $history as h}
    <li>{new Date(h.ts).toLocaleTimeString()}: {h.value}</li>
  {/each}
</ul>
