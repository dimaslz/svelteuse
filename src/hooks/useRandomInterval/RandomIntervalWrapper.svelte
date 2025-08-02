<script lang="ts">
	import { onMount } from "svelte";
	import { useRandomInterval } from "./useRandomInterval";

	let count = 0;

	export let minDelay = 100;
	export let maxDelay = 100;
	export let onUpdate: (value: number) => void = () => {};

	onMount(() => {
		const clear = useRandomInterval(
			() => {
				count += 1;
				onUpdate(count);
			},
			{ minDelay, maxDelay },
		);

		return () => {
			clear();
		};
	});
</script>

<p data-testid="count">Count: {count}</p>
