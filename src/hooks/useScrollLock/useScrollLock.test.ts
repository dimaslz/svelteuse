import { get } from "svelte/store";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { useScrollLock } from "./useScrollLock";

describe("Hook - useScrollLock", () => {
	let originalOverflow: string;

	beforeEach(() => {
		originalOverflow = document.body.style.overflow;
	});

	afterEach(() => {
		document.body.style.overflow = originalOverflow;
	});

	it("initial state false and no lock", () => {
		const { isLocked } = useScrollLock();
		expect(get(isLocked)).toBe(false);
		expect(document.body.style.overflow).toBe(originalOverflow);
	});

	it("lock() should disable scroll", () => {
		const { isLocked, lock } = useScrollLock();
		lock();
		expect(get(isLocked)).toBe(true);
		expect(document.body.style.overflow).toBe("hidden");
	});

	it("unlock() should restore scroll", () => {
		const { isLocked, lock, unlock } = useScrollLock();
		lock();
		unlock();
		expect(get(isLocked)).toBe(false);
		expect(document.body.style.overflow).toBe(originalOverflow);
	});

	it("set(true/false) should toggle lock accordingly", () => {
		const { isLocked, set } = useScrollLock();
		set(true);
		expect(get(isLocked)).toBe(true);
		set(false);
		expect(get(isLocked)).toBe(false);
	});

	it("initial lock set to true should lock on init", () => {
		const { isLocked } = useScrollLock(undefined, true);
		expect(get(isLocked)).toBe(true);
		expect(document.body.style.overflow).toBe("hidden");
	});
});
