import { useDebounce } from ".";

vi.useFakeTimers();

describe("useDebounce", () => {
	test("the value is not updated before the delay", () => {
		const [testValue, setDebouncedValue] = useDebounce("initial", 500);

		setDebouncedValue("updated");
		vi.advanceTimersByTime(400);

		let currentValue;
		testValue.subscribe((value) => {
			currentValue = value;
		})();

		expect(currentValue).toBe("initial");
	});

	test("updates the value after the specified delay", () => {
		const [testValue, setDebouncedValue] = useDebounce("initial", 500);

		setDebouncedValue("updated");
		vi.advanceTimersByTime(500);

		let currentValue;
		testValue.subscribe((value) => {
			currentValue = value;
		})();

		expect(currentValue).toBe("updated");
	});

	test("updates the value by function after the specified delay", () => {
		const mockFnValue = vi.fn();
		const [testValue, setDebouncedValue] = useDebounce(mockFnValue, 500);

		setDebouncedValue("updated");
		vi.advanceTimersByTime(500);

		let currentValue;
		testValue.subscribe((value) => {
			currentValue = value;
		})();

		expect(currentValue).toBe("updated");
		expect(mockFnValue).toBeCalled();
	});
});
