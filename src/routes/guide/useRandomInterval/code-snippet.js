export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { onMount } from "svelte";

	import { useRandomInterval } from "@dimaslz/svelteuse";

	let count = 0;

	onMount(() => {
		const clear = useRandomInterval(() => {
			count += 1;
		}, { minDelay: 300, maxDelay: 1000 });

		// Optional: cancel after some time
		setTimeout(() => {
			clear();
		}, 5000);
	});
</script>

<!-- html -->
<div>
	<pre>{count}</pre>
</div>
`;

export const sourceCode = `
import { onDestroy } from 'svelte';

// Internal fallback no-op
let safeOnDestroy = (cb: () => void) => {};
try {
	onDestroy(() => {});
	safeOnDestroy = onDestroy;
} catch {
	// Ignore - not in component scope
}

function getRandomNumber(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

type RandomIntervalOptions = {
	minDelay: number;
	maxDelay: number;
};

export function useRandomInterval(
	callback: () => void,
	{ minDelay, maxDelay }: RandomIntervalOptions
): () => void {
	let timeoutId: ReturnType<typeof setTimeout> | null = null;
	let isCleared = false;

	function clear() {
		if (timeoutId !== null) {
			clearTimeout(timeoutId);
			timeoutId = null;
			isCleared = true;
		}
	}

	function tick() {
		if (isCleared) return;
		const interval = getRandomNumber(minDelay, maxDelay);
		timeoutId = setTimeout(() => {
			callback();
			tick();
		}, interval);
	}

	tick();

	safeOnDestroy(() => {
		clear();
	});

	return clear;
};
`;
