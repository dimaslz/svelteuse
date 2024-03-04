import { render, screen } from "@testing-library/svelte";
import { get } from "svelte/store";

import { useWindowSize } from "@/hooks";
import UseWindowSize from "@/hooks/useWindowSize/useWindowSize.svelte";

vi.mock("esm-env", async (importOriginal) => {
	const actual: any = await importOriginal();

	return {
		...actual,
		BROWSER: true,
	};
});

describe("Hooks - useWindowSize", () => {
	test("without a component should works", () => {
		const { windowSize } = useWindowSize();

		expect(get(windowSize)).toEqual({
			height: 768,
			width: 1024,
		});

		window.innerWidth = 1000;
		window.innerHeight = 1000;

		window.dispatchEvent(new Event("resize"));

		expect(get(windowSize)).toEqual({
			height: 1000,
			width: 1000,
		});
	});

	test("into a component should works", () => {
		const { rerender } = render(UseWindowSize);

		expect(screen.getByText(/width: 1000/i));
		expect(screen.getByText(/height: 1000/i));

		window.innerWidth = 2000;
		window.innerHeight = 2000;

		window.dispatchEvent(new Event("resize"));

		rerender({});

		expect(screen.getByText(/width: 2000/i));
		expect(screen.getByText(/height: 2000/i));
	});
});
