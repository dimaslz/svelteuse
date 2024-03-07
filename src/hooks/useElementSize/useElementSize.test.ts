import { render, screen } from "@testing-library/svelte";

import { useElementSize } from "@/hooks";

import UseElementSizeComponent from "./useElementSize.svelte";

describe("Hooks - useElementSize", () => {
	test("hook is defined", () => {
		expect(useElementSize).toBeDefined();
	});

	test.todo("cycle should work", async () => {
		// TODO: How to trigger the resize observer properly
		const resizeObserverCallback = vi.fn();
		const resizeUnObserverCallback = vi.fn();

		globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
			observe: resizeObserverCallback,
			unobserve: resizeUnObserverCallback,
			disconnect: vi.fn(),
		}));

		const { unmount } = render(UseElementSizeComponent);
		const element: any = screen.getByTestId("element");

		// const resizeEvent = document.createEvent("Event");
		// resizeEvent.initEvent("resize", true, true);

		// TODO: this is not useful, we should move to better approach
		// element.resizeTo = (width: number, height: number) => {
		// 	element.style.width = `${width}px` || element.style.width;
		// 	element.style.height = `${height}px` || element.style.height;
		element.dispatchEvent(new Event("resize"));
		// };

		// element.resizeTo(769, 1000);

		// expect(element.style.width).toBe("769px");
		// expect(element.style.height).toBe("1000px");
		// expect(resizeObserverCallback).toBeCalled();
		expect(resizeObserverCallback).toBeCalledTimes(1);

		await unmount();

		expect(resizeUnObserverCallback).toBeCalled();
	});
});
