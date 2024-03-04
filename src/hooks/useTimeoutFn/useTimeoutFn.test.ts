import { render } from "@testing-library/svelte";

import UseTimeoutFn from "@/hooks/useTimeoutFn/useTimeoutFn.svelte";

vi.useFakeTimers();

describe("Hooks - useTimeoutFn", () => {
	test("should execute after 1 second by default", () => {
		const mockFn = vi.fn();

		render(UseTimeoutFn, { mockFn });

		vi.advanceTimersByTime(500);
		expect(mockFn).not.toBeCalled();

		vi.advanceTimersByTime(500);

		expect(mockFn).toBeCalled();
	});

	test("should execute after defined seconds", () => {
		const mockFn = vi.fn();

		render(UseTimeoutFn, { mockFn, ms: 2000 });

		vi.advanceTimersByTime(1000);
		expect(mockFn).not.toBeCalled();

		vi.advanceTimersByTime(1000);

		expect(mockFn).toBeCalled();
	});

	test("should not execute after unmount", async () => {
		const mockFn = vi.fn();

		const { unmount } = render(UseTimeoutFn, { mockFn, ms: 2000 });

		vi.advanceTimersByTime(1000);
		expect(mockFn).not.toBeCalled();

		await unmount();

		vi.advanceTimersByTime(1000);

		expect(mockFn).not.toBeCalled();
	});
});
