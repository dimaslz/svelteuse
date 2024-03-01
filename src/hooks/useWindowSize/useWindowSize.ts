import { onMount } from "svelte";

import { useEventListener, useState } from "..";

interface WindowSize {
	width: number;
	height: number;
}

export function useWindowSize(): SvelteStore<WindowSize> {
	const [windowSize, setWindowSize] = useState<WindowSize>({
		width: 0,
		height: 0,
	});

	const handleSize = () => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	useEventListener("resize", handleSize);

	// Set size at the first client-side load
	onMount(() => {
		handleSize();
	});

	return windowSize;
}
