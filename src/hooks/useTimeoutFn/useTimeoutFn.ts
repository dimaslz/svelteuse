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
