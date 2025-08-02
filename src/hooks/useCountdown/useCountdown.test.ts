import { get } from "svelte/store";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useCountdown } from "./useCountdown";

describe("Hooks - useCountdown", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should count down to stop value", () => {
		const [count, { start }] = useCountdown({
			countStart: 3,
			countStop: 0,
			intervalMs: 1000,
		});

		start();
		vi.advanceTimersByTime(3000);
		expect(get(count)).toBe(0);
	});

	it("should count up if isIncrement is true", () => {
		const [count, { start }] = useCountdown({
			countStart: 0,
			countStop: 3,
			intervalMs: 1000,
			isIncrement: true,
		});

		start();
		vi.advanceTimersByTime(3000);
		expect(get(count)).toBe(3);
	});

	it("should stop countdown manually", () => {
		const [count, { start, stop }] = useCountdown({
			countStart: 5,
			intervalMs: 1000,
		});

		start();
		vi.advanceTimersByTime(1000);
		stop();
		vi.advanceTimersByTime(2000);
		expect(get(count)).toBe(4);
	});

	it("should reset countdown", () => {
		const [count, { start, reset }] = useCountdown({
			countStart: 5,
			intervalMs: 1000,
		});

		start();
		vi.advanceTimersByTime(2000);
		reset();
		expect(get(count)).toBe(5);
	});

	it("should start countdown after stop it", () => {
		const [count, { start, stop }] = useCountdown({
			countStart: 5,
			intervalMs: 1000,
		});

		start();
		vi.advanceTimersByTime(1000);

		stop();
		vi.advanceTimersByTime(5000);
		expect(get(count)).toBe(4);

		start();
		vi.advanceTimersByTime(5000);
		expect(get(count)).toBe(0);
	});
});
