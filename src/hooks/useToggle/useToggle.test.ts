import { get } from "svelte/store";

import { useToggle } from "@/hooks";

describe("Hooks - useToggle", () => {
	test("should word", () => {
		const { value, toggle, update } = useToggle(false);

		expect(get(value)).toBe(false);

		toggle();

		expect(get(value)).toBe(true);

		update(false);

		expect(get(value)).toBe(false);
	});
});
