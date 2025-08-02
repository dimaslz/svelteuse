import { get } from "svelte/store";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useMeasure } from "./useMeasure";

describe("useMeasure", () => {
	let mockObserve: any;
	let mockDisconnect: any;
	let element: HTMLElement;

	beforeEach(() => {
		element = document.createElement("div");
		mockObserve = vi.fn();
		mockDisconnect = vi.fn();

		globalThis.ResizeObserver = vi.fn().mockImplementation((callback) => {
			// Store callback to trigger later
			(globalThis as any).__resizeCallback = callback;

			return {
				observe: mockObserve,
				disconnect: mockDisconnect,
			};
		});
	});

	it("initializes with null width and height", () => {
		const { dimensions } = useMeasure();
		expect(get(dimensions)).toEqual({ width: null, height: null });
	});

	it("calls ResizeObserver on element", () => {
		const { element: setElement } = useMeasure();
		setElement(element);

		expect(mockObserve).toHaveBeenCalledWith(element);
	});

	it("updates dimensions when ResizeObserver triggers", () => {
		const { element: setElement, dimensions } = useMeasure();
		setElement(element);

		const entry = {
			borderBoxSize: [{ inlineSize: 150, blockSize: 75 }],
		};

		(globalThis as any).__resizeCallback([entry]);

		expect(get(dimensions)).toEqual({ width: 150, height: 75 });
	});

	it("disconnects previous observer on new element", () => {
		const { element: setElement } = useMeasure();
		setElement(element);
		setElement(element); // again

		expect(mockDisconnect).toHaveBeenCalledTimes(1);
	});
});
