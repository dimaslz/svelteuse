import { render } from "@testing-library/svelte";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import TestWrapper from "./useIntersectionObserverTestWrapper.svelte";

describe("Hooks - useIntersectionObserver (via TestWrapper)", () => {
	let observeMock: any;
	let disconnectMock: any;
	let triggerCallback: ((entries: IntersectionObserverEntry[]) => void) | null = null;

	beforeEach(() => {
		disconnectMock = vi.fn();
		observeMock = vi.fn();

		globalThis.IntersectionObserver = vi.fn(function (this: any, cb: any) {
			triggerCallback = cb;
			this.observe = observeMock;
			this.disconnect = disconnectMock;
			this.thresholds = [0.5];
		}) as any;
	});

	afterEach(() => {
		vi.restoreAllMocks();
		triggerCallback = null;
	});

	it("should call the callback when intersection occurs", async () => {
		const callback = vi.fn();
		const { getByTestId } = render(TestWrapper, { props: { callback } });

		const node = getByTestId("observed");

		expect(observeMock).toHaveBeenCalledWith(node);

		const mockEntry = {
			isIntersecting: true,
			intersectionRatio: 0.6,
			target: node,
		} as unknown as IntersectionObserverEntry;

		// simulate observer callback
		triggerCallback?.([mockEntry]);

		expect(callback).toHaveBeenCalledWith(true, mockEntry);
	});

	it("should freeze observation after visible if freezeOnceVisible is true", async () => {
		const callback = vi.fn();
		const { getByTestId } = render(TestWrapper, { props: { callback } });
		const node = getByTestId("observed");

		const mockEntry = {
			isIntersecting: true,
			intersectionRatio: 0.6,
			target: node,
		} as unknown as IntersectionObserverEntry;

		triggerCallback?.([mockEntry]);
		triggerCallback?.([mockEntry]); // simulate second trigger

		expect(callback).toHaveBeenCalledTimes(1); // should stop after first
		expect(disconnectMock).toHaveBeenCalled();
	});
});
