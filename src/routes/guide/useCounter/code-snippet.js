export const exampleCode = `
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

export const sourceCode = `
import { type TsetValue, useState } from "@dimaslz/svelteuse";

interface UseCounterOutput {
	count: Readonly<SvelteStore<number>>;
	increment: (e?: MouseEvent | number) => void;
	decrement: (e?: MouseEvent | number) => void;
	reset: () => void;
	setCount: TsetValue<number>;
}

export function useCounter(initialValue?: number): UseCounterOutput {
	const [count, setCount] = useState<number>(initialValue || 0);

	const increment = (n: number | MouseEvent = 1) => {
		if (n instanceof MouseEvent) {
			setCount((x) => x + 1);
		} else {
			setCount((x) => x + n);
		}
	};

	const decrement = (n: number | MouseEvent = 1) => {
		if (n instanceof MouseEvent) {
			setCount((x) => x - 1);
		} else {
			setCount((x) => x - n);
		}
	};

	const reset = () => {
		setCount(initialValue || 0);
	};

	return {
		count,
		increment,
		decrement,
		reset,
		setCount,
	};
}
`;
