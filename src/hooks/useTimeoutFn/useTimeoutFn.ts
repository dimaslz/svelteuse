import { onMount } from "svelte";

export function useTimeoutFn(callback: () => void, delay: number | null) {
	let savedCallback = callback;

	// Set up the timeout.
	onMount(() => {
		savedCallback = callback;

		// Don't schedule if no delay is specified.
		// Note: 0 is a valid value for delay.
		if (!delay && delay !== 0) {
			return;
		}

		const id = setTimeout(() => savedCallback(), delay);

		return () => clearTimeout(id);
	});
}
