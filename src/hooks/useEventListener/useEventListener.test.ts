import { fireEvent, render } from "@testing-library/svelte";

import UseEventListenerComponent from "./useEventListener.svelte";

vi.mock("esm-env", async (importOriginal) => {
	const actual: any = await importOriginal();

	return {
		...actual,
		BROWSER: true,
	};
});

describe("Hooks - useEventListener", () => {
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
