import { get } from "svelte/store";

import { useThrottle } from ".";

vi.useFakeTimers();

describe("Hooks - useThrottle", () => {
	test("the value is not updated before the delay", () => {
		const [testValue, setThrottleValue] = useThrottle("initial", 200);

		vi.advanceTimersByTime(200);
		setThrottleValue(get(testValue) + " foo");

		vi.advanceTimersByTime(200);
		setThrottleValue(get(testValue) + " bar");

		vi.advanceTimersByTime(100);
		setThrottleValue(get(testValue) + " bizz");

		let currentValue;
		testValue.subscribe((value) => {
			currentValue = value;
		})();

		expect(currentValue).toBe("initial foo bar");
	});

	test("updates the value by function after the specified delay", () => {
		const mockFnValue = vi.fn(() => "initial");
		const [testValue, setThrottleValue] = useThrottle(mockFnValue, 200);

		vi.advanceTimersByTime(200);
		setThrottleValue(get(testValue) + " foo");

		vi.advanceTimersByTime(200);
		setThrottleValue(get(testValue) + " bar");

		vi.advanceTimersByTime(100);
		setThrottleValue(get(testValue) + " bizz");

		let currentValue;
		testValue.subscribe((value) => {
			currentValue = value;
		})();

		expect(currentValue).toBe("initial foo bar");
		expect(mockFnValue).toBeCalled();
	});
});
