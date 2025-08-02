import { fireEvent, render, waitFor } from "@testing-library/svelte";
import { tick } from "svelte";
import { get } from "svelte/store";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useScroll } from "./useScroll";
import UseScrollTrackElementPlayground from "./useScroll-track-element.svelte";
import UseScrollPlayground from "./useScroll-track-window.svelte";

vi.mock("@/utils/is-client", () => ({
	isClient: () => true,
}));

vi.useFakeTimers();

describe("useScroll", () => {
	let mockElement: HTMLElement;

	beforeEach(() => {
		mockElement = document.createElement("div");

		Object.defineProperty(mockElement, "scrollTop", {
			value: 100,
			writable: true,
		});
		Object.defineProperty(mockElement, "scrollLeft", {
			value: 50,
			writable: true,
		});
		Object.defineProperty(mockElement, "scrollHeight", {
			value: 1000,
			writable: true,
		});
		Object.defineProperty(mockElement, "clientHeight", {
			value: 900,
			writable: true,
		});
		Object.defineProperty(mockElement, "scrollWidth", {
			value: 500,
			writable: true,
		});
		Object.defineProperty(mockElement, "clientWidth", {
			value: 500,
			writable: true,
		});
	});

	afterEach(() => {
		vi.clearAllTimers();
	});

	describe("window", () => {
		describe("checking hook function", () => {
			beforeEach(() => {
				vi.resetAllMocks();
				vi.resetModules();

				document.documentElement.scrollTop = 0;
				document.documentElement.scrollLeft = 0;
			});

			it("initializes with default scroll state", () => {
				const { scroll } = useScroll();

				expect(get(scroll)).toEqual({
					x: 0,
					y: 0,
					isScrolling: false,
					directions: {
						top: false,
						bottom: false,
						left: false,
						right: false,
					},
					topArrived: false,
					bottomArrived: false,
					leftArrived: false,
					rightArrived: false,
				});
			});

			it("calls scrollTo with options object", () => {
				const scrollToSpy = vi.fn();
				window.document.documentElement.scrollTo = scrollToSpy;

				const { scrollTo } = useScroll();
				scrollTo({ top: 200, left: 100, behavior: "smooth" });

				expect(scrollToSpy).toHaveBeenCalledWith({ top: 200, left: 100, behavior: "smooth" });
			});

			it("calls scrollTo with x, y coordinates", () => {
				const scrollToSpy = vi.fn();
				window.document.documentElement.scrollTo = scrollToSpy;

				const { scrollTo } = useScroll();
				scrollTo(300, 400);

				expect(scrollToSpy).toHaveBeenCalledWith(300, 400);
			});

			it("throws when scrollTo is called with invalid arguments", () => {
				const { scrollTo } = useScroll();

				expect(() => scrollTo("badArg" as any)).toThrowError(
					/Invalid arguments passed to scrollTo/,
				);
			});
		});

		describe("with playground component", () => {
			beforeEach(() => {
				vi.resetAllMocks();
				vi.resetModules();

				document.documentElement.scrollTop = 0;
				document.documentElement.scrollLeft = 0;
			});

			it("resets isScrolling after debounce", async () => {
				const wrapper = render(UseScrollPlayground);

				document.documentElement.scrollTop = 100;
				document.documentElement.scrollLeft = 50;

				window.dispatchEvent(new Event("scroll", { bubbles: true }));
				await tick();

				expect(wrapper.getByText("isScrolling: true"));

				vi.advanceTimersByTime(200);
				await tick();

				expect(wrapper.getByText("isScrolling: false"));
			});

			it("scroll to bottom and top", async () => {
				const wrapper = render(UseScrollPlayground);

				document.documentElement.scrollTop = 1000;

				window.dispatchEvent(new Event("scroll", { bubbles: true }));

				await tick();

				expect(wrapper.getByText("direction top: false"));
				expect(wrapper.getByText("direction bottom: true"));
				expect(wrapper.getByText("direction left: false"));
				expect(wrapper.getByText("direction right: false"));
				expect(wrapper.getByText("isScrolling: true"));
				expect(wrapper.getByText("coordenades: 0 - 1000"));

				vi.advanceTimersByTime(200);
				await tick();

				expect(wrapper.getByText("direction top: false"));
				expect(wrapper.getByText("direction bottom: true"));
				expect(wrapper.getByText("direction left: false"));
				expect(wrapper.getByText("direction right: false"));
				expect(wrapper.getByText("isScrolling: false"));
				expect(wrapper.getByText("coordenades: 0 - 1000"));

				document.documentElement.scrollTop = 500;

				window.dispatchEvent(new Event("scroll", { bubbles: true }));

				await tick();

				expect(wrapper.getByText("direction top: true"));
				expect(wrapper.getByText("direction bottom: false"));
				expect(wrapper.getByText("direction left: false"));
				expect(wrapper.getByText("direction right: false"));
				expect(wrapper.getByText("isScrolling: true"));
				expect(wrapper.getByText("coordenades: 0 - 500"));

				vi.advanceTimersByTime(200);
				await tick();

				expect(wrapper.getByText("direction top: true"));
				expect(wrapper.getByText("direction bottom: false"));
				expect(wrapper.getByText("direction left: false"));
				expect(wrapper.getByText("direction right: false"));
				expect(wrapper.getByText("isScrolling: false"));
				expect(wrapper.getByText("coordenades: 0 - 500"));
			});

			it("scroll to right and left", async () => {
				const wrapper = render(UseScrollPlayground);

				document.documentElement.scrollLeft = 1000;

				window.dispatchEvent(new Event("scroll", { bubbles: true }));

				await tick();

				expect(wrapper.getByText("direction top: false"));
				expect(wrapper.getByText("direction bottom: false"));
				expect(wrapper.getByText("direction left: false"));
				expect(wrapper.getByText("direction right: true"));
				expect(wrapper.getByText("isScrolling: true"));
				expect(wrapper.getByText("coordenades: 1000 - 0"));

				vi.advanceTimersByTime(200);
				await tick();

				expect(wrapper.getByText("direction top: false"));
				expect(wrapper.getByText("direction bottom: false"));
				expect(wrapper.getByText("direction left: false"));
				expect(wrapper.getByText("direction right: true"));
				expect(wrapper.getByText("isScrolling: false"));
				expect(wrapper.getByText("coordenades: 1000 - 0"));

				document.documentElement.scrollLeft = 500;

				window.dispatchEvent(new Event("scroll", { bubbles: true }));

				await tick();

				expect(wrapper.getByText("direction top: false"));
				expect(wrapper.getByText("direction bottom: false"));
				expect(wrapper.getByText("direction left: true"));
				expect(wrapper.getByText("direction right: false"));
				expect(wrapper.getByText("isScrolling: true"));
				expect(wrapper.getByText("coordenades: 500 - 0"));

				vi.advanceTimersByTime(200);
				await tick();

				expect(wrapper.getByText("direction top: false"));
				expect(wrapper.getByText("direction bottom: false"));
				expect(wrapper.getByText("direction left: true"));
				expect(wrapper.getByText("direction right: false"));
				expect(wrapper.getByText("isScrolling: false"));
				expect(wrapper.getByText("coordenades: 500 - 0"));
			});
		});
	});

	describe("tracking an element", () => {
		describe("checking hook function", () => {
			beforeEach(() => {
				vi.resetAllMocks();
				vi.resetModules();
			});

			it("calls scrollTo with x, y coordinates", () => {
				const container = document.createElement("div");
				const scrollToSpy = vi.fn();
				container.scrollTo = scrollToSpy;

				const { scrollTo, trackScroll } = useScroll();
				trackScroll(container);
				scrollTo(300, 400);

				expect(scrollToSpy).toHaveBeenCalledWith(300, 400);
			});

			it("calls scrollTo with x, y coordinates", () => {
				const container = document.createElement("div");
				const scrollToSpy = vi.fn();
				container.scrollTo = scrollToSpy;

				const { scrollTo, trackScroll } = useScroll();
				trackScroll(container);
				scrollTo(300, 400);

				expect(scrollToSpy).toHaveBeenCalledWith(300, 400);
			});

			it("calls scrollTo with options object", () => {
				const container = document.createElement("div");
				const scrollToSpy = vi.fn();
				container.scrollTo = scrollToSpy;

				const { scrollTo, trackScroll } = useScroll();
				trackScroll(container);
				scrollTo({ top: 200, left: 100, behavior: "smooth" });

				expect(scrollToSpy).toHaveBeenCalledWith({ top: 200, left: 100, behavior: "smooth" });
			});
		});

		describe("with playground component", () => {
			beforeEach(() => {
				vi.resetAllMocks();
				vi.resetModules();
				vi.clearAllTimers();
				vi.runAllTicks();
			});

			it("is scrolling and stop after debounce", async () => {
				const wrapper = render(UseScrollTrackElementPlayground);

				const elmContainer = wrapper.getByTestId("container");

				elmContainer.scrollTop = 100;
				elmContainer.scrollLeft = 50;

				elmContainer.dispatchEvent(new Event("scroll", { bubbles: true }));

				await tick();

				expect(wrapper.getByText("isScrolling: true"));

				vi.advanceTimersByTime(200);
				await tick();

				expect(wrapper.getByText("isScrolling: false"));
			});

			it("scroll to bottom and top", async () => {
				const wrapper = render(UseScrollTrackElementPlayground);

				const elmContainer = wrapper.getByTestId("container");

				elmContainer.scrollTop = 1000;

				elmContainer.dispatchEvent(new Event("scroll", { bubbles: true }));

				await tick();

				expect(wrapper.getByText("direction top: false"));
				expect(wrapper.getByText("direction bottom: true"));
				expect(wrapper.getByText("direction left: false"));
				expect(wrapper.getByText("direction right: false"));
				expect(wrapper.getByText("isScrolling: true"));
				expect(wrapper.getByText("coordenades: 0 - 1000"));

				vi.advanceTimersByTime(200);
				await tick();

				expect(wrapper.getByText("direction top: false"));
				expect(wrapper.getByText("direction bottom: true"));
				expect(wrapper.getByText("direction left: false"));
				expect(wrapper.getByText("direction right: false"));
				expect(wrapper.getByText("isScrolling: false"));
				expect(wrapper.getByText("coordenades: 0 - 1000"));

				elmContainer.scrollTop = 500;

				elmContainer.dispatchEvent(new Event("scroll", { bubbles: true }));

				await tick();

				expect(wrapper.getByText("direction top: true"));
				expect(wrapper.getByText("direction bottom: false"));
				expect(wrapper.getByText("direction left: false"));
				expect(wrapper.getByText("direction right: false"));
				expect(wrapper.getByText("isScrolling: true"));
				expect(wrapper.getByText("coordenades: 0 - 500"));

				vi.advanceTimersByTime(200);
				await tick();

				expect(wrapper.getByText("direction top: true"));
				expect(wrapper.getByText("direction bottom: false"));
				expect(wrapper.getByText("direction left: false"));
				expect(wrapper.getByText("direction right: false"));
				expect(wrapper.getByText("isScrolling: false"));
				expect(wrapper.getByText("coordenades: 0 - 500"));
			});

			// TODO: over timeout :(
			it.skip("scroll to right and left", async () => {
				const wrapper = render(UseScrollTrackElementPlayground);

				const elmContainer = wrapper.getByTestId("container");

				elmContainer.scrollLeft = 500;

				elmContainer.dispatchEvent(new Event("scroll", { bubbles: true }));

				await tick();

				expect(wrapper.getByText("direction top: false"));
				expect(wrapper.getByText("direction bottom: false"));
				expect(wrapper.getByText("direction left: false"));
				expect(wrapper.getByText("direction right: true"));
				expect(wrapper.getByText("isScrolling: true"));
				expect(wrapper.getByText("coordenades: 500 - 0"));

				vi.advanceTimersByTime(200);
				await tick();

				expect(wrapper.getByText("direction top: false"));
				expect(wrapper.getByText("direction bottom: false"));
				expect(wrapper.getByText("direction left: false"));
				expect(wrapper.getByText("direction right: true"));
				expect(wrapper.getByText("isScrolling: false"));
				expect(wrapper.getByText("coordenades: 500 - 0"));

				elmContainer.scrollLeft = 100;

				elmContainer.dispatchEvent(new Event("scroll", { bubbles: true }));

				await tick();

				expect(wrapper.getByText("direction top: false"));
				expect(wrapper.getByText("direction bottom: false"));
				expect(wrapper.getByText("direction left: true"));
				expect(wrapper.getByText("direction right: false"));
				expect(wrapper.getByText("isScrolling: true"));
				expect(wrapper.getByText("coordenades: 100 - 0"));

				vi.advanceTimersByTime(200);
				await tick();

				expect(wrapper.getByText("direction top: false"));
				expect(wrapper.getByText("direction bottom: false"));
				expect(wrapper.getByText("direction left: true"));
				expect(wrapper.getByText("direction right: false"));
				expect(wrapper.getByText("isScrolling: false"));
				expect(wrapper.getByText("coordenades: 100 - 0"));
			});

			it("scroll to bottom - right", async () => {
				const wrapper = render(UseScrollTrackElementPlayground);

				const elmContainer = wrapper.getByTestId("container");

				elmContainer.scrollTop = 100;
				elmContainer.scrollLeft = 50;

				elmContainer.dispatchEvent(new Event("scroll", { bubbles: true }));

				await tick();

				expect(wrapper.getByText("direction top: false"));
				expect(wrapper.getByText("direction bottom: true"));
				expect(wrapper.getByText("direction left: false"));
				expect(wrapper.getByText("direction right: true"));
				expect(wrapper.getByText("isScrolling: true"));
				expect(wrapper.getByText("coordenades: 50 - 100"));

				vi.advanceTimersByTime(200);
				await tick();

				expect(wrapper.getByText("direction top: false"));
				expect(wrapper.getByText("direction bottom: true"));
				expect(wrapper.getByText("direction left: false"));
				expect(wrapper.getByText("direction right: true"));
				expect(wrapper.getByText("isScrolling: false"));
				expect(wrapper.getByText("coordenades: 50 - 100"));
			});
		});
	});
});
