import { get } from "svelte/store";

import { useInterval } from "@/hooks";

vi.mock("esm-env", async (importOriginal) => {
	const actual: any = await importOriginal();

	return {
		...actual,
		BROWSER: true,
	};
});

vi.useFakeTimers();

describe("Hooks - useInterval", () => {
	describe("with controls", () => {
		test("counter update with controls", async () => {
			const mockFn = vi.fn();
			const { state, reset, pause, resume, isActive } = useInterval(100, {
				controls: true,
				callback: mockFn,
			});

			vi.advanceTimersByTime(200);

			expect(mockFn).toBeCalled();
			expect(get(state)).toBe(2);

			reset();

			expect(get(isActive)).toBe(true);
			expect(get(state)).toBe(0);

			pause();

			expect(get(isActive)).toBe(false);
			vi.advanceTimersByTime(200);

			expect(get(state)).toBe(0);

			resume();

			vi.advanceTimersByTime(200);

			expect(get(state)).toBe(2);
			expect(get(isActive)).toBe(true);
		});
	});
	describe("without controls", () => {
		test("counter update with controls", async () => {
			const value = useInterval(100, { immediate: true });

			vi.advanceTimersByTime(200);

			expect(get(value)).toBe(2);
		});
	});
});
