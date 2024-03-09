export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useState } from "@dimaslz/svelteuse";

	const [state, setState] = useState<number>(0);

	// option A: update state by direct value
	const updateState = () => {
		setState($state + 1);
	};

	// option B: update state by function with return value
	const updateStateByFn = () => {
		setState((prev) => prev + 1);
	};
</script>


<!-- html -->
<div>
	<p>
		Value is <code>{$state}</code>
	</p>

	<button on:click={updateState}>update state</button>
	<button on:click={updateStateByFn}>update by function</button>
</div>
`;

export const sourceCode = `
import { get, writable } from "svelte/store";
export type TsetValue<T> = (v: T | TFn<T>) => void;

type TFn<T> = (f: T) => T;
type TNewState<T> = TFn<T> | T;
type UseStateOutput<T> = [SvelteStore<T>, TsetValue<T>];

export const useState = <T>(value: TFn<T> | T | null = null): UseStateOutput<T> => {
	const { subscribe, update } = writable<T>(
		typeof value === "function" ? (value as () => T)() : (value as T),
	);

	const setState = (newState: TNewState<T>): void => {
		if (newState instanceof Function) {
			update(() => newState(get({ subscribe })));
		} else {
			update(() => newState);
		}
	};

	return [{ subscribe }, setState];
};
`;
