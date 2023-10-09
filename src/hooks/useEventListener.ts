import { browser } from "$app/environment";

const eventListeners = new Map();

export function useEventListener(
	eventName: string,
	handler: (e: Event) => void,
	element: Element | Window | null = browser ? window : null,
	options: boolean = false,
): () => void {
	if (!element) {
		return () => {};
	}

	const id = Math.random().toString(36).substr(2, 9);
	const listener = (event: Event) => handler(event);

	eventListeners.set(id, {
		eventName,
		handler: listener,
		element,
		options,
	});

	element.addEventListener(eventName, listener, options);

	return () => {
		element.removeEventListener(eventName, listener, options);
		eventListeners.delete(id);
	};
}
