import { get } from "svelte/store";

import { useIntervalFn } from "@/hooks";

vi.mock("esm-env", async (importOriginal) => {
	const actual: any = await importOriginal();

	return {
		...actual,
		BROWSER: true,
	};
});

vi.useFakeTimers();

describe("Hooks - useIntervalFn", () => {
	test("should interval every 100ms using controls", () => {
		const intervalCallbackMock = vi.fn();
		const { isActive, pause, resume } = useIntervalFn(intervalCallbackMock, 100, {
			immediate: true,
		});

		vi.advanceTimersByTime(100);

		expect(intervalCallbackMock).toBeCalledTimes(1);
		expect(get(isActive)).toBe(true);

		vi.advanceTimersByTime(500);
		expect(intervalCallbackMock).toBeCalledTimes(6);

		pause();

		vi.advanceTimersByTime(200);

		expect(intervalCallbackMock).toBeCalledTimes(6);

		resume();

		vi.advanceTimersByTime(200);

		expect(intervalCallbackMock).toBeCalledTimes(8);
	});

	test("should interval every 100ms without controls", () => {
		const intervalCallbackMock = vi.fn();
		useIntervalFn(intervalCallbackMock, 100, {
			immediate: true,
		});

		vi.advanceTimersByTime(100);

		expect(intervalCallbackMock).toBeCalledTimes(1);

		vi.advanceTimersByTime(500);
		expect(intervalCallbackMock).toBeCalledTimes(6);

		vi.advanceTimersByTime(200);

		expect(intervalCallbackMock).toBeCalledTimes(8);
	});
});
