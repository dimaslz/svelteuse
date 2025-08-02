import { type Writable, writable } from "svelte/store";

type Dimensions = {
	width: number | null;
	height: number | null;
};

export function useMeasure(): {
	element: (el: Element | null) => void;
	dimensions: Writable<Dimensions>;
} {
	const dimensions = writable<Dimensions>({ width: null, height: null });

	let observer: ResizeObserver | null = null;

	function element(el: Element | null) {
		if (observer) {
			observer.disconnect();
			observer = null;
		}

		if (el && el.nodeType === Node.ELEMENT_NODE) {
			observer = new ResizeObserver(([entry]) => {
				if (entry && entry.borderBoxSize) {
					const size = Array.isArray(entry.borderBoxSize)
						? entry.borderBoxSize[0]
						: entry.borderBoxSize;

					const { inlineSize: width, blockSize: height } = size;
					dimensions.set({ width, height });
				}
			});

			observer.observe(el);
		}
	}

	return { element, dimensions };
}
