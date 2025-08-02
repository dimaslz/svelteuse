import { fireEvent, render } from "@testing-library/svelte";

import UseEventListenerComponent from "./useEventListener.svelte";

describe("Hooks - useEventListener", () => {
	describe("default", () => {
		test.each([
			["click", new MouseEvent("")],
			["change", new Event("")],
			["focus", new FocusEvent("")],
			["blur", new FocusEvent("")],
			["select", new Event("")],
			["mouseUp", new MouseEvent("")],
			["mouseDown", new MouseEvent("")],
			["mouseOver", new MouseEvent("")],
			["mouseEnter", new MouseEvent("")],
			["mouseLeave", new MouseEvent("")],
			["mouseMove", new MouseEvent("")],
			["mouseOut", new MouseEvent("")],
			["scroll", new UIEvent("")],
		])("on listen %s", async (eventName, eventType) => {
			const callbackMock = vi.fn();
			const { unmount } = render(UseEventListenerComponent, {
				props: {
					eventType: eventName.toLowerCase(),
					callbackListener: callbackMock,
					element: window,
				},
			});

			await (fireEvent as any)[eventName](window);

			expect(callbackMock).nthCalledWith(1, eventType);

			await unmount();

			await (fireEvent as any)[eventName](window);

			expect(callbackMock).not.nthCalledWith(2);
		});
	});

	describe("throttle", () => {
		test.each([
			["click", new MouseEvent("")],
			["change", new Event("")],
			["focus", new FocusEvent("")],
			["blur", new FocusEvent("")],
			["select", new Event("")],
			["mouseUp", new MouseEvent("")],
			["mouseDown", new MouseEvent("")],
			["mouseOver", new MouseEvent("")],
			["mouseEnter", new MouseEvent("")],
			["mouseLeave", new MouseEvent("")],
			["mouseMove", new MouseEvent("")],
			["mouseOut", new MouseEvent("")],
			["scroll", new UIEvent("")],
		])("on listen %s", async (eventName, eventType) => {
			vi.useFakeTimers();
			const callbackMock = vi.fn();
			const { unmount } = render(UseEventListenerComponent, {
				props: {
					eventType: eventName.toLowerCase(),
					callbackListener: callbackMock,
					element: window,
					throttle: 200,
				},
			});

			await (fireEvent as any)[eventName](window);

			// vi.advanceTimersByTime(200);

			expect(callbackMock).toBeCalledTimes(1);
			expect(callbackMock).nthCalledWith(1, eventType);

			await unmount();

			await (fireEvent as any)[eventName](window);

			expect(callbackMock).not.nthCalledWith(2);
		});
	});
});
