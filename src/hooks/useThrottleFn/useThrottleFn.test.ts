import { useThrottleFn } from "@/hooks";

vi.useFakeTimers();

export function promiseTimeout(
	ms: number,
	throwOnTimeout = false,
	reason = "Timeout",
): Promise<void> {
	return new Promise((resolve, reject) => {
		if (throwOnTimeout) setTimeout(() => reject(reason), ms);
		else setTimeout(resolve, ms);
	});
}

describe("Hooks - useThrottleFn", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	it("should be defined", () => {
		expect(useThrottleFn).toBeDefined();
	});

	test("the value is not updated before the delay", async () => {
		const mockFn = vi.fn((value: string) => value);
		const updateStateFn = useThrottleFn(mockFn, 20);

		updateStateFn("a");
		vi.advanceTimersByTime(10);
		updateStateFn("ab");
		vi.advanceTimersByTime(10);
		updateStateFn("abc");

		expect(mockFn).toBeCalledTimes(2);

		expect(mockFn).nthCalledWith(1, "a");
		expect(mockFn).nthCalledWith(2, "abc");
	});
});
