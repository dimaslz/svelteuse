import { onMount } from "svelte";

import { useEventListener, useState } from "..";

interface WindowSize {
	width: number;
	height: number;
}

export function useWindowSize({ intoComponent = false }: { intoComponent?: boolean } = {}): {
	windowSize: SvelteStore<WindowSize>;
	removeEvent: () => void;
} {
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

	const listenerInstance = useEventListener("resize", handleSize);

	if (intoComponent) {
		onMount(() => {
			handleSize();

			return () => {
				listenerInstance();
			};
		});
	} else if (typeof window !== "undefined") {
		handleSize();
	}

	return {
		windowSize,
		removeEvent: () => {
			listenerInstance();
		},
	};
}
