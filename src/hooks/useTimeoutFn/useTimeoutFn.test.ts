import { get } from "svelte/store";

import { useTimeoutFn } from "@/hooks";

vi.useFakeTimers();

describe("Hooks - useTimeoutFn", () => {
	test("should execute after 1 second by default", async () => {
		const mockFn = vi.fn();
		const { isPending } = useTimeoutFn(mockFn, undefined, { component: false });

		expect(get(isPending)).toBe(true);

		vi.advanceTimersByTime(1000);

		expect(get(isPending)).toBe(false);
		expect(mockFn).toBeCalled();
	});

	test("should execute after defined seconds", async () => {
		const mockFn = vi.fn();
		const { isPending } = useTimeoutFn(mockFn, 2000, { component: false });

		expect(get(isPending)).toBe(true);

		vi.advanceTimersByTime(2000);

		expect(get(isPending)).toBe(false);
		expect(mockFn).toBeCalled();
	});

	test("should not execute after stop", async () => {
		const mockFn = vi.fn();
		const { stop, isPending } = useTimeoutFn(mockFn, 2000, { component: false });

		expect(get(isPending)).toBe(true);

		vi.advanceTimersByTime(1000);

		stop();

		vi.advanceTimersByTime(1000);

		expect(get(isPending)).toBe(false);
		expect(mockFn).not.toBeCalled();
	});

	test("should start execution after stop", async () => {
		const mockFn = vi.fn();
		const { stop, isPending, start } = useTimeoutFn(mockFn, 2000, { component: false });

		expect(get(isPending)).toBe(true);

		vi.advanceTimersByTime(1000);

		stop();

		vi.advanceTimersByTime(1000);

		expect(get(isPending)).toBe(false);
		expect(mockFn).not.toBeCalled();

		start();

		expect(get(isPending)).toBe(true);

		vi.advanceTimersByTime(2000);

		expect(mockFn).toBeCalled();
	});
});
