import { get } from "svelte/store";

import { useNow } from "./useNow";

describe("Hooks - useNow", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime("2025-05-03T10:10:10.000Z");
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it("should show current date", async () => {
		const $now = useNow();

		expect(get($now)).toStrictEqual(new Date("2025-05-03T10:10:10.000Z"));
	});

	it("should show current date after 1 hour", async () => {
		const $now = useNow();

		vi.advanceTimersByTime(3600000);

		expect(get($now)).toStrictEqual(new Date("2025-05-03T11:10:10.000Z"));
	});
});
