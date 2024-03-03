import { get } from "svelte/store";

import { useMediaQuery } from "@/hooks";

const mockMatchMedia = (matches: boolean): void => {
	Object.defineProperty(window, "matchMedia", {
		writable: true,
		value: vi.fn().mockImplementation((query) => ({
			matches,
			media: query,
			onchange: null,
			addEventListener: vi.fn(),
			removeEventListener: vi.fn(),
			dispatchEvent: vi.fn(),
		})),
	});
};

describe("Hooks - useMediaQuery", () => {
	test("on media width 768px", () => {
		mockMatchMedia(true);
		const { matches } = useMediaQuery("(min-width: 768px)");

		expect(get(matches)).toBe(true);
	});

	test("on media width 768px", () => {
		mockMatchMedia(false);
		const { matches } = useMediaQuery("(min-width: 768px)");

		expect(get(matches)).toBe(false);
	});
});
