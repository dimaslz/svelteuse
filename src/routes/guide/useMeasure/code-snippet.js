export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useMeasure } from "@dimaslz/svelteuse";

	const { element, dimensions } = useMeasure();
</script>

<!-- html -->
<div class="p-4">
	<div
		use:element
		class="resize border-2 border-amber-600 p-4 overflow-auto"
	>
		{JSON.stringify($dimensions, null, 2)}
	</div>
</div>
`;

export const sourceCode = `import { writable, type Writable } from "svelte/store";

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
`;
