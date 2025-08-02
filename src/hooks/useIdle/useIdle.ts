import { writable } from "svelte/store";

export function useIdle(
	ms = 20000,
	events: (keyof WindowEventMap)[] = [
		"mousemove",
		"mousedown",
		"keydown",
		"touchstart",
		"wheel",
		"resize",
	],
) {
	const { subscribe, set } = writable(false);
	const isTracking = writable(true);
	let timer: ReturnType<typeof setTimeout>;

	function reset() {
		clearTimeout(timer);
		set(false);
		timer = setTimeout(() => set(true), ms);
	}

	function start() {
		reset();
		events.forEach((e) => window.addEventListener(e, reset));
		isTracking.set(true);
	}

	function stop() {
		clearTimeout(timer);
		events.forEach((e) => window.removeEventListener(e, reset));
		isTracking.set(false);
	}

	// auto-start on import
	if (typeof window !== "undefined") start();

	return { subscribe, isTracking, start, stop };
}
