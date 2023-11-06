import { onMount } from "svelte";
import { get } from "svelte/store";

import { useEventListener, useState } from ".";

interface Size {
	width: number;
	height: number;
}

export function useElementSize<T extends HTMLElement = HTMLDivElement>(): [
	(node: T | null) => void,
	SvelteStore<Size>,
] {
	const [ref, setRef] = useState<T | null>(null);
	const [size, setSize] = useState<Size>({
		width: 0,
		height: 0,
	});

	// Prevent too many rendering using useCallback
	const handleSize = () => {
		setSize({
			width: get(ref)?.offsetWidth || 0,
			height: get(ref)?.offsetHeight || 0,
		});
	};

	const setup = (_ref: T | null) => {
		useEventListener("resize", handleSize, _ref);
		setRef(_ref);
	};

	onMount(() => {
		ref.subscribe(() => {
			handleSize();
		});
	});

	return [setup, size];
}
