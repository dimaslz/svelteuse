export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { onMount } from "svelte";

	import { useState, useTimeoutFn } from "@dimaslz/svelteuse";

	const [value, update] = useState<string>("Please wait 3 seconds");
	const { start, stop, isPending } = useTimeoutFn(() => {
		update("Fired!");
	}, 3000);

	const startTimeout = () => {
		update("Please wait 3 seconds");
		start();
	};

	onMount(() => {
		return () => {
			stop();
		};
	});
</script>

<!-- html -->
<p>
	{$value}
</p>

<div>
	{#if $isPending}
		<button on:click={stop}>stop</button>
	{:else}
		<button on:click={startTimeout}>start</button>
	{/if}
</div>
`;

export const sourceCode = `
import { onMount } from "svelte";

export function useTimeoutFn(
	callback: () => void,
	delay: number | undefined = 1000,
	cancelOnUnmount: boolean = true,
) {
	let savedCallback = callback;

	onMount(() => {
		savedCallback = callback;

		if (!delay && delay !== 0) {
			return;
		}

		const id = setTimeout(() => savedCallback(), delay);

		return () => {
			if (cancelOnUnmount) {
				clearTimeout(id);
			}
		};
	});
}
`;
