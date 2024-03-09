export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useState, useThrottleFn } from "@dimaslz/svelteuse";

	let value: string = "";
	const [state, setState] = useState(value);

	// the params here, are the same of possible params on throttledFunction(...)
	const updateState = (value: string) => {
		setState(value);
	};

	const throttledFunction = useThrottleFn(updateState, 500);

	const onInput = ($event: Event) => {
		const { value: _value } = $event.target as HTMLInputElement;

		// the possible params are the same of updateState(...)
		throttledFunction(_value);
	};
</script>

<!-- html -->
<div>
	<p>
		<span class="font-bold">sync value:</span> <code>{value}</code>
	</p>
	<p>
		<span class="font-bold">debounced value:</span> <code>{$state}</code>
	</p>
	<div>
		<input bind:value on:input={onInput} />
	</div>
</div>
`;

export const sourceCode = `
export type FunctionArgs<Args extends any[] = any[], Return = void> = (...args: Args) => Return;

export function useThrottleFn<T extends FunctionArgs>(fn: T, interval: number = 1000): T {
	let lastUpdated: number = 0;
	let id: number;

	return (...args) => {
		const now = Date.now();
		if (now - lastUpdated < interval) {
			if (id) {
				clearTimeout(id);
			}

			id = setTimeout(() => {
				clearTimeout(id);
				fn(...args);
			}, interval);

			return;
		}

		lastUpdated = now;
		return fn(...args);
	};
}
`;
