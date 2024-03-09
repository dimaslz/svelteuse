export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { onMount } from "svelte";
	import { useWindowSize } from "@dimaslz/svelteuse";

	const { windowSize, removeEvent } = useWindowSize();

	onMount(() => {
		return () => {
			removeEvent();
		};
	});
</script>

<!-- html -->
<div>
	The current window dimensions are:{" "}
	<code>{JSON.stringify({ width: $windowSize.width, height: $windowSize.height })}</code>
</div>
`;

export const sourceCode = `
import { onMount } from "svelte";

import { useEventListener, useState } from "@dimaslz/svelteuse"

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
`;
