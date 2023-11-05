import { onMount } from "svelte";

export function useIntervalFn(callback: () => void, delay: number | null): void {
	let savedCallback = callback;

	onMount(() => {
		savedCallback = callback;

		if (!delay && delay !== 0) {
			return;
		}

		const id = setInterval(() => {
			savedCallback();
		}, delay);

		return () => clearInterval(id);
	});
}
