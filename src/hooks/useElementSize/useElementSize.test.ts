import { render, screen } from "@testing-library/svelte";

import useElementSizeComponent from "./useElementSize.svelte";

describe("Hooks - useElementSize", () => {
	test("cycle should work", async () => {
		const resizeObserverCallback = vi.fn();
		const resizeUnObserverCallback = vi.fn();

		globalThis.ResizeObserver = vi.fn().mockImplementation(() => ({
			observe: resizeObserverCallback,
			unobserve: resizeUnObserverCallback,
			disconnect: vi.fn(),
		}));

		const { unmount } = render(useElementSizeComponent);
		const element = screen.getByTestId("element");

		const resizeEvent = document.createEvent("Event");
		resizeEvent.initEvent("resize", true, true);

		element.resizeTo = (width, height) => {
			element.style.width = `${width}px` || element.style.width;
			element.style.height = `${height}px` || element.style.height;
			element.dispatchEvent(resizeEvent);
		};

		element.resizeTo(769, 1000);

		expect(element.style.width).toBe("769px");
		expect(element.style.height).toBe("1000px");
		expect(resizeObserverCallback).toBeCalled();

		await unmount();

		expect(resizeUnObserverCallback).toBeCalled();
	});
});
