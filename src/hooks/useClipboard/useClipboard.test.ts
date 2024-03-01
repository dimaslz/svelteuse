import { get } from "svelte/store";

import { useClipboard } from "@/hooks";

describe("Hooks - useClipboard", () => {
	const originalClipboard = { ...navigator.clipboard };
	const mockData = "Test value";

	beforeEach(() => {
		const mockClipboard = {
			writeText: vi.fn(),
		};

		(navigator as any).clipboard = mockClipboard;
	});

	afterEach(() => {
		vi.resetAllMocks();
		(navigator as any).clipboard = originalClipboard;
	});

	test("value 0 by default", async () => {
		const [clipboard, copyClipboard] = useClipboard();

		expect(get(clipboard)).toBe(null);
		await copyClipboard(mockData);

		expect(get(clipboard)).toBe(mockData);
	});
});
