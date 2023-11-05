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
		console.log("handleSize");
		setSize({
			width: get(ref)?.offsetWidth || 0,
			height: get(ref)?.offsetHeight || 0,
		});
	};

	const setup = (_ref: T | null) => {
		console.log("AAA", _ref);
		useEventListener("resize", handleSize, _ref);
		setRef(_ref);
	};

	onMount(() => {
		ref.subscribe(() => {
			console.log("FFJFJFJJF");
			handleSize();
		});

		// if (ref) {
		// 	console.log("AAA", get(ref));
		// 	useEventListener("resize", handleSize);
		// }
	});

	return [setup, size];
}
