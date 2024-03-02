import { useIntervalFn } from "@/hooks";

vi.useFakeTimers();

describe("Hooks - useIntervalFn", () => {
	test("should interval every 100ms", () => {
		const intervalCallbackMock = vi.fn();
		const intervalIntance = useIntervalFn(intervalCallbackMock, 100);

		vi.advanceTimersByTime(100);

		expect(intervalCallbackMock).toBeCalledTimes(1);

		vi.advanceTimersByTime(500);
		expect(intervalCallbackMock).toBeCalledTimes(6);

		intervalIntance();

		vi.advanceTimersByTime(100);
		expect(intervalCallbackMock).toBeCalledTimes(6);
	});

	test("should throw an exception on pass null delay", () => {
		const intervalCallbackMock = vi.fn();

		expect(() => {
			useIntervalFn(intervalCallbackMock, null);
		}).toThrowError("Delay time are mandatory and should be from 1ms");
	});

	test("should throw an exception on pass delay less than 1", () => {
		const intervalCallbackMock = vi.fn();

		expect(() => {
			useIntervalFn(intervalCallbackMock, 0);
		}).toThrowError("Delay time are mandatory and should be from 1ms");
	});
});
