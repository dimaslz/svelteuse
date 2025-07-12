export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useIdle } from "@dimaslz/svelteuse";

	const idle = useIdle(5000);

	let isTracking = true;
	idle.isTracking.subscribe((v) => isTracking = v)
</script>

<!-- html -->
<div>
  <p>isTracking: {isTracking}</p>
  <p>User is { $idle ? 'idle 😴' : 'active 👍' }</p>

  <button on:click={idle.start}>Start tracking</button>
  <button on:click={idle.stop}>Stop tracking</button>
</div>
`;

export const sourceCode = `
import { writable } from 'svelte/store';

export function useIdle(ms = 20000, events: (keyof WindowEventMap)[] = [
  'mousemove', 'mousedown', 'keydown', 'touchstart', 'wheel', 'resize'
]) {
  const { subscribe, set } = writable(false);
  const isTracking = writable(true);
  let timer: ReturnType<typeof setTimeout>;

  function reset() {
    clearTimeout(timer);
    set(false);
    timer = setTimeout(() => set(true), ms);
  }

  function start() {
    reset();
    events.forEach(e => window.addEventListener(e, reset));
    isTracking.set(true);
  }

  function stop() {
    clearTimeout(timer);
    events.forEach(e => window.removeEventListener(e, reset));
    isTracking.set(false);
  }

  // auto-start on import
  if (typeof window !== 'undefined') start();

  return { subscribe, isTracking, start, stop };
}
`;
