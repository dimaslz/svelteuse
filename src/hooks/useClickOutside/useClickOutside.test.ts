import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

import UseClickOutside from "@/hooks/useClickOutside/useClickOutside.svelte";

vi.mock("esm-env", async (importOriginal) => {
	const actual: any = await importOriginal();

	return {
		...actual,
		BROWSER: true,
	};
});

describe("Hooks - useClickOutside", () => {
	test("should work on click outside the element", async () => {
		const clickMockFn = vi.fn();

		render(UseClickOutside, { onClick: clickMockFn });

		const element = screen.getByText(/hello/i);

		await userEvent.click(element);

		expect(clickMockFn).not.toBeCalled();

		await userEvent.click(document.body);

		expect(clickMockFn).toBeCalled();
	});

	test("should NOT work after unmount component", async () => {
		const clickMockFn = vi.fn();

		const { unmount } = render(UseClickOutside, { onClick: clickMockFn });

		await unmount();

		await userEvent.click(document.body);

		expect(clickMockFn).not.toBeCalled();
	});
});
