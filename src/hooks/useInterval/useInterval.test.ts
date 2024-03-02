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
	test("counter update with controls", async () => {
		const { state } = useInterval(100, { controls: true });

		vi.advanceTimersByTime(200);

		expect(get(state)).toBe(2);
	});
});
