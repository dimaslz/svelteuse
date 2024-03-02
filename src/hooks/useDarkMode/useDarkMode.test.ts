import { get } from "svelte/store";

import { useDarkMode } from ".";

// class LocalStorageMock {
// 	store: Record<string, unknown> = {};

// 	clear() {
// 		this.store = {};
// 	}

// 	getItem(key: string) {
// 		return this.store[key] || null;
// 	}

// 	setItem(key: string, value: unknown) {
// 		this.store[key] = value + "";
// 	}

// 	removeItem(key: string) {
// 		delete this.store[key];
// 	}
// }

// Object.defineProperty(window, "localStorage", {
// 	value: new LocalStorageMock(),
// });

const mockMatchMedia = (matches: boolean): void => {
	// window.matchMedia.matches = matches;
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

describe("Hooks - useDarkMode", () => {
	beforeEach(() => {
		vi.resetAllMocks();
		vi.resetModules();
		vi.restoreAllMocks();

		mockMatchMedia(true);
	});

	test("should initiate correctly", () => {
		mockMatchMedia(true);
		const { isDarkMode, disable, toggle, enable } = useDarkMode();

		expect(typeof get(isDarkMode)).toBe("boolean");
		expect(typeof disable).toBe("function");
		expect(typeof toggle).toBe("function");
		expect(typeof enable).toBe("function");
	});

	test.todo("should have default value (light)", () => {
		mockMatchMedia(false);
		const { isDarkMode } = useDarkMode();

		expect(get(isDarkMode)).toBe(false);
	});

	test("should have default value (dark)", () => {
		mockMatchMedia(true);
		const { isDarkMode } = useDarkMode();

		expect(get(isDarkMode)).toBe(true);
	});

	test.todo("should toggle to dark", async () => {
		mockMatchMedia(false);

		const { isDarkMode, toggle } = useDarkMode(false);

		expect(get(isDarkMode)).toBe(false);

		toggle();
		expect(get(isDarkMode)).toBe(true);
	});
});
