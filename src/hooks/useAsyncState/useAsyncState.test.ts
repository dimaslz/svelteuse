import { get } from "svelte/store";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useAsyncState } from "./useAsyncState";

describe("Hooks - useAsyncState", () => {
	beforeEach(() => {
		vi.useRealTimers();
	});

	it("initializes with default values", () => {
		const store = useAsyncState(async () => 1, 0, { immediate: false });

		expect(get(store.state)).toBe(0);
		expect(get(store.isLoading)).toBe(false);
		expect(get(store.isReady)).toBe(false);
		expect(get(store.error)).toBe(null);
	});

	it("executes async function and updates state flags", async () => {
		const fn = vi.fn(async () => {
			await new Promise((r) => setTimeout(r, 10));
			return 42;
		});
		const store = useAsyncState(fn, 0, { immediate: false });

		const promise = store.execute();

		expect(get(store.isLoading)).toBe(true);

		await promise;

		expect(fn).toHaveBeenCalled();
		expect(get(store.state)).toBe(42);
		expect(get(store.isReady)).toBe(true);
		expect(get(store.isLoading)).toBe(false);
		expect(get(store.error)).toBeNull();
	});

	it("captures errors correctly", async () => {
		const err = new Error("fail");
		const store = useAsyncState(
			async () => {
				throw err;
			},
			0,
			{ immediate: false },
		);

		await expect(store.execute()).rejects.toThrow("fail");
		expect(get(store.isLoading)).toBe(false);
		expect(get(store.error)).toBe(err);
		expect(get(store.isReady)).toBe(false);
	});

	it("resets state before execute if resetOnExecute is true", async () => {
		const store = useAsyncState(async () => 99, 5, { immediate: false });
		await store.execute();
		store.execute();

		expect(get(store.state)).toBe(5);
	});

	it("supports delay option", async () => {
		vi.useFakeTimers();
		const store = useAsyncState(async () => 100, 0, { immediate: false, delay: 100 });
		const exec = store.execute();
		vi.advanceTimersByTime(100);
		await exec;

		expect(get(store.state)).toBe(100);
	});
});
