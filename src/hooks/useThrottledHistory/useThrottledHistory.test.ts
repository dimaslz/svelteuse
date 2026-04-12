import { get } from "svelte/store";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { useThrottledHistory } from "./useThrottledHistory";

describe("Hooks - useThrottledHistory", () => {
	vi.useFakeTimers();
	let now = 0;

	beforeEach(() => {
		now = 1000000;
		vi.setSystemTime(now);
	});

	it("should create an initial snapshot immediately", () => {
		const store = useThrottledHistory("start", { throttle: 1000 });
		const history = get(store.history);

		expect(history.length).toBe(1);
		expect(history[0].snapshot).toBe("start");
	});

	it("should throttle snapshots", () => {
		const store = useThrottledHistory(1, { throttle: 1000 });

		store.set(2);
		store.set(3);
		store.set(4);

		// nothing should be added yet due to throttle
		expect(get(store.history).length).toBe(1);

		// fast-forward 1 second
		vi.advanceTimersByTime(1000);

		expect(get(store.history).length).toBe(2);
		expect(get(store.history)[0].snapshot).toBe(4);
	});

	it("should reset throttle and delay subsequent records", () => {
		const store = useThrottledHistory(1, { throttle: 500 });

		store.set(2);
		vi.advanceTimersByTime(250); // halfway through throttle
		store.set(3); // should not reset the throttle

		vi.advanceTimersByTime(250); // 500 total

		expect(get(store.history).length).toBe(2);
		expect(get(store.history)[0].snapshot).toBe(3);
	});

	it("should undo and redo correctly", () => {
		const store = useThrottledHistory("a", { throttle: 300 });

		store.set("b");
		vi.advanceTimersByTime(300);
		store.set("c");
		vi.advanceTimersByTime(300);

		let currentVal = "";
		store.subscribe((v) => (currentVal = v));

		expect(get(store.history).map((h) => h.snapshot)).toEqual(["c", "b", "a"]);

		store.undo();
		expect(currentVal).toBe("b");

		store.undo();
		expect(currentVal).toBe("a");

		store.redo();
		expect(currentVal).toBe("b");

		store.redo();
		expect(currentVal).toBe("c");
	});

	it("should not undo past the initial state", () => {
		const store = useThrottledHistory(10, { throttle: 500 });

		store.set(11);
		vi.advanceTimersByTime(500);

		store.undo();
		store.undo(); // should be ignored

		let current;
		store.subscribe((v) => (current = v))();
		expect(current).toBe(10);
	});

	it("should clear undo/redo stacks and history", () => {
		const store = useThrottledHistory(1, { throttle: 500 });

		store.set(2);
		store.set(3);

		vi.advanceTimersByTime(500);

		store.clear();

		expect(get(store.history)).toEqual([]);

		let current;
		store.subscribe((v) => (current = v))();

		expect(current).toBe(3);
	});

	it("should respect capacity limits", () => {
		const store = useThrottledHistory(0, { throttle: 100, capacity: 3 });

		store.set(1);
		vi.advanceTimersByTime(100);

		store.set(2);
		vi.advanceTimersByTime(100);

		store.set(3);
		vi.advanceTimersByTime(100);

		store.set(4);
		vi.advanceTimersByTime(100);

		const hist = get(store.history);
		expect(hist.map((h) => h.snapshot)).toEqual([4, 3, 2]); // 1 was dropped
	});

	it("should deeply clone objects if deep option is enabled", () => {
		const obj = { count: 1 };
		const store = useThrottledHistory(obj, { throttle: 500, deep: true });

		const newObj = { count: 2 };
		store.set(newObj);
		vi.advanceTimersByTime(500);

		newObj.count = 999;

		const lastSnap = get(store.history)[0].snapshot;
		expect(lastSnap).toEqual({ count: 2 });
	});

	it("should not clone deeply if deep is false", () => {
		const obj = { name: "svelte" };
		const store = useThrottledHistory(obj, { throttle: 500, deep: false });

		store.set(obj);
		vi.advanceTimersByTime(500);

		obj.name = "changed";

		const lastSnap = get(store.history)[0].snapshot;
		expect(lastSnap).toEqual({ name: "changed" }); // reference, not cloned
	});
});
