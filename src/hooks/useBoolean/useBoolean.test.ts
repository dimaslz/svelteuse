import { get } from "svelte/store";

import { useBoolean } from "@/hooks";

describe("Hooks - useBoolean", () => {
	const { value, setValue, setTrue, setFalse, toggle } = useBoolean(false);

	test("is false by default", () => {
		expect(get(value)).toBe(false);
	});

	test("set to true", () => {
		setTrue();
		expect(get(value)).toBe(true);
	});

	test("set to false", () => {
		setFalse();
		expect(get(value)).toBe(false);
	});

	test("toggle value", () => {
		toggle();
		expect(get(value)).toBe(true);

		toggle();
		expect(get(value)).toBe(false);
	});

	test("set specific value", () => {
		setValue(true);
		expect(get(value)).toBe(true);
	});
});
