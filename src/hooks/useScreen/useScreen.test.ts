import { useScreen } from "@/hooks";

describe("Hooks - useScreen", () => {
	test("default", () => {
		Object.defineProperty(window, "screen", {
			writable: true,
			value: {
				width: 1000,
				height: 1000,
			},
		});

		const screenSize = useScreen();

		expect(screenSize).toEqual({
			width: 1000,
			height: 1000,
		});
	});
});
