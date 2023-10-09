<script lang="ts">
	import { get } from "svelte/store";

	import { Button } from "@/components";
	import { useCounter } from "@/hooks";

	const { count, increment, decrement, reset, setCount } = useCounter(99);

	const multiplyBy2 = () => setCount((x: number) => x * 2);
</script>

<div class="w-full">
	<h1 class="text-4xl">useCounter</h1>

	<div class="mt-4 space-y-4">
		<!-- <div class="px-4 py-2 bg-gray-950/50 text-xs border-l-4 text-gray-400">
			<p>Just works with SvelteKit</p>
		</div> -->

		<div class="p-4 bg-gray-950/50">
			<p>
				Value <code>{$count}</code>
			</p>
		</div>

		<div>
			<Button on:click={() => increment()}>increment</Button>
			<Button on:click={() => decrement()}>decrement</Button>
			<Button on:click={reset}>reset</Button>
			<Button on:click={multiplyBy2}>multiply by 2</Button>
		</div>
	</div>
</div>
