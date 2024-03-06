import { onMount } from "svelte";

import { useEventListener } from "..";

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
