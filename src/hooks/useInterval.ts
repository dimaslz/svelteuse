import { onMount } from "svelte";

import { useState } from "@/hooks/useState";

export function useInterval(callback: () => void, delay: number | null) {
	const [state, setState] = useState<number>(0);
	let savedCallback = callback;

	// Set up the interval.
	onMount(() => {
		savedCallback = callback;
		// Don't schedule if no delay is specified.
		// Note: 0 is a valid value for delay.
		if (!delay && delay !== 0) {
			return;
		}

		const id = setInterval(() => savedCallback(), delay);

		return () => clearInterval(id);
	});
}
