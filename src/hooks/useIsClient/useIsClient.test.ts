import { useIsClient } from "@/hooks";

describe("Hooks - useIsClient", () => {
	it("should show that is client", async () => {
		const isClient = useIsClient();

		expect(isClient).toBe(true);
	});

	it("should show that is client", async () => {
		// @ts-ignore simulate SSR
		delete globalThis.window;
		// @ts-ignore simulate SSR
		delete globalThis.document;

		const isClient = useIsClient();

		expect(isClient).toBe(false);
	});
});
