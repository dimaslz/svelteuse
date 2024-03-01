export default `
<!-- javascript -->
<script lang="ts">
	import { useCounter } from "@dimaslz/svelteuse";

	const { count, increment, decrement, reset, setCount } = useCounter(99);
</script>

<!-- html -->
<div>
	<p>
		Value <code>{$count}</code>
	</p>

	<div>
		<button on:click={() => increment()}>increment</button> <!-- by default will increment 1 -->
		<button on:click={() => decrement()}>decrement</button> <!-- by default will decrement 1 -->
		<!-- or -->
		<!-- <button on:click={increment}>increment</button> -->
		<!-- <button on:click={decrement}>decrement</button> -->

		<button on:click={reset}>reset</button>
		<button on:click={multiplyBy2}>multiply by 2</button>
	</div>
</div>
`;
