import { get } from "svelte/store";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useOrientation } from "./useOrientation";

describe("Hooks - useOrientation", () => {
	let originalScreen: typeof window.screen;
	let originalOrientation: any;

	beforeEach(() => {
		originalScreen = window.screen;
		originalOrientation = (window as Window).orientation;

		// Mock modern screen.orientation API
		window.screen = {
			orientation: {
				angle: 90,
				type: "landscape-primary",
				addEventListener: vi.fn(),
				removeEventListener: vi.fn(),
			},
		} as unknown as Screen;
	});

	afterEach(() => {
		window.screen = originalScreen;
		(window as any).orientation = originalOrientation;
		vi.restoreAllMocks();
	});

	it("should return initial orientation from screen.orientation", () => {
		const orientation = useOrientation();
		const state = get(orientation);

		expect(state.angle).toBe(90);
		expect(state.type).toBe("landscape-primary");
	});

	it("should respond to screen.orientation change event", () => {
		const listeners: Record<string, Function> = {};
		window.screen.orientation.addEventListener = vi.fn((event, cb) => {
			listeners[event] = cb;
		});

		const orientation = useOrientation();

		// Simulate a change
		window.screen.orientation.angle = 180;
		window.screen.orientation.type = "portrait-secondary";

		listeners["change"]?.();

		const state = get(orientation);
		expect(state.angle).toBe(180);
		expect(state.type).toBe("portrait-secondary");
	});

	it("should fallback to window.orientation if screen.orientation is not supported", () => {
		delete (window as any).screen.orientation;
		(window as any).orientation = 270;

		const orientation = useOrientation();
		const state = get(orientation);

		expect(state.angle).toBe(270);
		expect(state.type).toBe("UNKNOWN");
	});

	it("should respond to orientationchange in fallback mode", () => {
		delete (window as any).screen.orientation;
		(window as any).orientation = 0;

		const listeners: Record<string, Function> = {};
		window.addEventListener = vi.fn((event, cb) => {
			listeners[event] = cb;
		});

		const orientation = useOrientation();

		(window as any).orientation = 180;
		listeners["orientationchange"]?.();

		const state = get(orientation);
		expect(state.angle).toBe(180);
		expect(state.type).toBe("UNKNOWN");
	});
});
