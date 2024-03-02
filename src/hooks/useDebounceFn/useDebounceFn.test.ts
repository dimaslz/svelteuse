import { useDebounceFn } from "..";

vi.useFakeTimers();

describe("Hooks - useDebounceFn", () => {
	test("the value is not updated before the delay", () => {
		const mockFn = vi.fn();
		const updateStateFn = useDebounceFn(mockFn, 500);

		updateStateFn("new value");

		vi.advanceTimersByTime(400);

		expect(mockFn).not.toBeCalled();
	});

	test("updates the value after the specified delay", () => {
		const mockFn = vi.fn();
		const updateStateFn = useDebounceFn(mockFn, 500);

		updateStateFn("new value");

		vi.advanceTimersByTime(500);

		expect(mockFn).toBeCalled();
	});
});
