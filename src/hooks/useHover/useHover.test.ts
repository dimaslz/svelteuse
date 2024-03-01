import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

import useHoverView from "./useHover.svelte";

describe("useHover", () => {
	test("should be hover element", async () => {
		const user = userEvent.setup();
		render(useHoverView);

		screen.getByText("is not hover");

		const element = screen.getByTestId("element-to-hover");

		await user.hover(element);

		screen.getByText("is hover");
	});

	test("should be excecute a callback on hover the element", async () => {
		const onEnterFn = vi.fn();
		const user = userEvent.setup();
		render(useHoverView, { props: { onEnter: onEnterFn } });

		screen.getByText("is not hover");

		const element = screen.getByTestId("element-to-hover");

		await user.hover(element);

		screen.getByText("is hover");
		expect(onEnterFn).toBeCalled();
	});

	test("should be excecute a callback on leave the element", async () => {
		const onLeaveFn = vi.fn();
		const user = userEvent.setup();
		render(useHoverView, { props: { onLeave: onLeaveFn } });

		screen.getByText("is not hover");

		const element = screen.getByTestId("element-to-hover");

		await user.hover(element);
		await user.unhover(element);

		expect(onLeaveFn).toBeCalled();
	});
});
