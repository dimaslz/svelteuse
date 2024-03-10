import { get } from "svelte/store";

import { useTimeout } from "@/hooks";

vi.useFakeTimers();

describe("Hooks - useTimeout", () => {
	describe("without controls", () => {
		test("should execute after 1 second by default", async () => {
			const ready = useTimeout(1000, { component: false });

			expect(get(ready)).toBe(false);

			vi.advanceTimersByTime(1000);

			expect(get(ready)).toBe(true);
		});
	});
	describe("with controls", () => {
		test("should execute by controls usage", async () => {
			const { ready, stop, start } = useTimeout(1000, { component: false, controls: true });

			expect(get(ready)).toBe(false);

			vi.advanceTimersByTime(500);

			stop();

			expect(get(ready)).toBe(false);

			start();

			vi.advanceTimersByTime(1000);

			expect(get(ready)).toBe(true);
		});
	});
});
