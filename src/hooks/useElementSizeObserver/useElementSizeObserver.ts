import { onMount } from "svelte";
import { get } from "svelte/store";

import { useState } from "..";

interface Size {
	width: number;
	height: number;
}

export function useElementSizeObserver<T extends Element>(): [
	(node: T) => void,
	SvelteStore<Size>,
	() => void,
] {
	let observer: ResizeObserver;
	const [ref, setRef] = useState<T>(null);
	const [size, setSize] = useState<Size>({
		width: 0,
		height: 0,
	});

	// Prevent too many rendering using useCallback
	const handleSize = () => {
		setSize({
			width: get(ref)?.clientWidth || 0,
			height: get(ref)?.clientHeight || 0,
		});
	};

	const setup = (_ref: T) => {
		setRef(_ref);
		observer = new ResizeObserver(handleSize);
		observer.observe(_ref);
	};

	const unobserve = () => {
		if (observer) observer.unobserve(get(ref));
	};

	onMount(() => {
		return () => unobserve();
	});

	return [setup, size, unobserve];
}
