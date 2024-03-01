import { onMount } from "svelte";

export function useEventCallback<Args extends unknown[], R>(fn: (...args: Args) => R) {
	let ref: typeof fn = () => {
		throw new Error("Cannot call an event handler while rendering.");
	};

	onMount(() => {
		ref = fn;
	});

	return (...args: Args) => ref(...args);
}
