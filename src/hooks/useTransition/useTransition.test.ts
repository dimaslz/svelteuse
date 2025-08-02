// src/lib/__tests__/useTransition.test.ts
import { get, writable } from "svelte/store";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useTransition } from "./useTransition";

describe("Hooks - useTransition", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.spyOn(globalThis, "requestAnimationFrame").mockImplementation((cb) =>
			setTimeout(() => cb(performance.now()), 16),
		);
		vi.spyOn(globalThis, "cancelAnimationFrame").mockImplementation((id) => clearTimeout(id));
	});

	afterEach(() => {
		vi.useRealTimers();
		vi.restoreAllMocks();
	});

	it("should interpolate value over time", async () => {
		const source = writable(0);
		const animated = useTransition(source, { duration: 1000 });

		source.set(100);

		vi.advanceTimersByTime(500); // halfway

		const val = get(animated);
		expect(val).toBeGreaterThan(45);
		expect(val).toBeLessThan(55);
	});

	it("should reach target value at end", () => {
		const source = writable(0);
		const animated = useTransition(source, { duration: 1000 });

		source.set(100);

		vi.advanceTimersByTime(1000);
		vi.runAllTimers(); // flush final frame

		expect(get(animated)).toBeCloseTo(100, 1); // Accepts ~99.999+ as OK
	});

	it("should call onStarted and onFinished hooks", () => {
		const onStarted = vi.fn();
		const onFinished = vi.fn();

		const source = writable(0);
		const animated = useTransition(source, {
			duration: 1000,
			onStarted,
			onFinished,
		});

		source.set(100);

		vi.advanceTimersByTime(100); // begin
		expect(onStarted).toHaveBeenCalled();

		vi.advanceTimersByTime(1000); // finish
		expect(onFinished).toHaveBeenCalled();
	});

	it("should apply easing function correctly", () => {
		const easeOut = (n: number) => 1 - Math.pow(1 - n, 2); // quadratic out
		const source = writable(0);
		const animated = useTransition(source, { duration: 1000, easing: easeOut });

		source.set(100);

		vi.advanceTimersByTime(500); // mid transition
		const midVal = get(animated);

		// easeOut should overshoot linear mid-point
		expect(midVal).toBeGreaterThan(50);
	});

	it("should update immediately if disabled", () => {
		const source = writable(0);
		const animated = useTransition(source, { disabled: true });

		source.set(100);
		expect(get(animated)).toBe(100);
	});
});
