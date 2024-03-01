import { useEventListener } from "..";

type Handler = (event: MouseEvent) => void;

export function useClickOutside<T extends HTMLElement = HTMLElement>(
	ref: T,
	handler: Handler,
	mouseEvent: "mousedown" | "mouseup" = "mousedown",
): void {
	useEventListener(mouseEvent, (event: MouseEvent) => {
		const el = ref;

		if (!el || el.contains(event.target as Node)) {
			return;
		}

		handler(event);
	});
}
