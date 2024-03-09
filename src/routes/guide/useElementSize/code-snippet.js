export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { onMount } from "svelte";

	import { useElementSize } from "@dimaslz/svelteuse";

	const [setElementRef, elementSize, killInstance] = useElementSize();

	let elementRef: HTMLDivElement;

	onMount(() => {
		if (elementRef) {
			setElementRef(elementRef);
		}

		return () => {
			killInstance(); // kill event listener
		}
	});
</script>

<!-- html -->
<div class="w-full">
	<p>
		Element size are <code>{JSON.stringify($elementSize, null, 2)}</code>
	</p>
	<div id="some" bind:this={elementRef} class="border overflow-auto resize">
		<h1>This is the element</h1>
		<p>
			Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque doloribus nemo porro doloremque,
			esse delectus enim reprehenderit quisquam, odio obcaecati officia adipisci expedita nostrum ex
			natus praesentium quos accusamus dolore!
		</p>
	</div>
</div>
`;

export const sourceCode = `
import { get } from "svelte/store";

import { useState } from "@dimaslz/svelteuse"

interface Size {
	width: number;
	height: number;
}

export function useElementSize<T extends Element>(): [
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

	return [setup, size, unobserve];
}
`;
