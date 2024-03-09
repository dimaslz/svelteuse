export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { onMount } from "svelte";
	import { useClickAnyWhere } from "@dimaslz/svelteuse";

	const someCallback = () => {
		console.log("click anywhere!");
	};

	onMount(() => {
		const eventClickAnyWhere = useClickAnyWhere(someCallback);

		return () => {
			eventClickAnyWhere();
		}
	})
</script>

<!-- html -->
<div>
	content
</div>
`;

export const sourceCode = `
import { onMount } from "svelte";

import { useEventListener } from "@dimaslz/svelteuse"

type Handler = (event: MouseEvent) => void;

type Options = {
	handler: Handler;
	mouseEvent?: "mousedown" | "mouseup";
	component?: boolean;
};

export function useClickOutside<T extends HTMLElement = HTMLElement>({
	handler,
	mouseEvent = "mousedown",
	component = false,
}: Options): { setElementRef: (elm: T) => void; removeListener: () => void } {
	let element: T;

	const removeListener = useEventListener(mouseEvent, (event: MouseEvent) => {
		if (!element || element.contains(event.target as Node)) {
			return;
		}

		handler(event);
	});

	if (component) {
		onMount(() => {
			return () => {
				removeListener();
			};
		});
	}

	return {
		setElementRef: (elm) => (element = elm),
		removeListener,
	};
}
`;
