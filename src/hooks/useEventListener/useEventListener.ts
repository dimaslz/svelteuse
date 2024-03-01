import { BROWSER } from "esm-env";

const eventListeners = new Map();

export function useEventListener<E extends Event = Event>(
	eventName: string,
	handler: (event: E) => void,
	element: Element | Window | null = BROWSER ? window : null,
	options: boolean = true,
): () => void {
	if (!element) {
		return () => {};
	}

	const id = Math.random().toString(36).substr(2, 9);
	const listener = (event: E) => handler(event);

	eventListeners.set(id, {
		eventName,
		handler: listener,
		element,
		options,
	});

	element.addEventListener(eventName, listener as EventListener, options);

	return (): void => {
		element.removeEventListener(eventName, listener as EventListener, options);
		eventListeners.delete(id);
	};
}
