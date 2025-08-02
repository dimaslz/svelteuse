import { isClient } from "@/utils/is-client";

const eventListeners = new Map();

function throttleFn(func: (...args: any) => void, timeFrame: number) {
	let lastTime = 0;
	return function (...args: any) {
		const now = new Date().getTime();
		if (now - lastTime >= timeFrame) {
			func(...args);
			lastTime = now;
		}
	};
}

export function useEventListener<E extends Event = Event>(
	eventName: string,
	handler: (event: E) => void,
	element: Element | Window | null = isClient() ? window : null,
	options: boolean | AddEventListenerOptions = true,
	throttle: number = 0,
): () => void {
	if (!element) {
		return () => {};
	}

	const id = Math.random().toString(36).substr(2, 9);
	const listener = (event: E) => handler(event);

	eventListeners.set(id, {
		eventName,
		handler: throttle ? throttleFn(listener, throttle) : listener,
		element,
		options,
	});

	element.addEventListener(
		eventName,
		throttle ? throttleFn(listener as EventListener, throttle) : (listener as EventListener),
		options,
	);

	return (): void => {
		element.removeEventListener(
			eventName,
			throttle ? throttleFn(listener as EventListener, throttle) : (listener as EventListener),
			options,
		);
		eventListeners.delete(id);
	};
}
