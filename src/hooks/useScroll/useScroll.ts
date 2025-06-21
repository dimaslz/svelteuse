import type { Readable, Writable } from "svelte/store";
import { get, readable, writable } from "svelte/store";

import { useDebounceFn } from "@/hooks/useDebounceFn";
import { useEventListener } from "@/hooks/useEventListener";
import { isClient } from "@/utils/is-client";

type ScrollPosition = {
	x: number | null;
	y: number | null;
	isScrolling: boolean;
	directions: {
		top: boolean;
		bottom: boolean;
		left: boolean;
		right: boolean;
	};
	topArrived: boolean;
	bottomArrived: boolean;
	leftArrived: boolean;
	rightArrived: boolean;
};

type ScrollToParams = ScrollToOptions | number;

function isScrollToOptions(arg: unknown): arg is ScrollToOptions {
	return typeof arg === "object" && arg !== null && "top" in arg;
}

function getScrollContainer(element: Writable<Window | Document | Element>): Element {
	if (!get(element)) {
		return window?.document?.documentElement;
	}

	return (get(element) as Window)?.document?.documentElement
		|| (get(element) as Document)?.documentElement
		|| (get(element) as Element)
}

function getData(scrollContainer: Element) {
	const x = scrollContainer?.scrollLeft ?? 0;
	const y = scrollContainer?.scrollTop ?? 0;
	const bottomArrived = scrollContainer?.scrollHeight - scrollContainer?.clientHeight === scrollContainer?.scrollTop;
	const topArrived = scrollContainer?.scrollTop === 0;
	const leftArrived = scrollContainer?.scrollLeft === 0;
	const rightArrived = scrollContainer?.clientWidth === scrollContainer?.scrollLeft;

	return {
		x,
		y,
		bottomArrived,
		topArrived,
		leftArrived,
		rightArrived,
	}
}

export function useScroll(): {
	scroll: Readable<ScrollPosition>;
	scrollTo: (...args: ScrollToParams[]) => void;
	trackScroll: (e: Window | Document | Element) => void;
} {
	let prevScrollY = 0;
	let prevScrollX = 0;
	const element = writable<Window | Document | Element>();

	const scrollTo = (...args: ScrollToParams[]) => {
		if (!isClient()) return;

		let first, second;
		if (Array.isArray(args)) {
			[first, second] = args;
		}

		const scrollContainer = getScrollContainer(element);

		if (isScrollToOptions(first)) {
			scrollContainer?.scrollTo?.(first);
		} else if (typeof first === "number" && typeof second === "number") {
			scrollContainer.scrollTo(first, second);
		} else {
			throw new Error(
				"Invalid arguments passed to scrollTo. See: https://developer.mozilla.org/en-US/docs/Web/API/Window/scrollTo",
			);
		}
	};

	const store = readable<ScrollPosition>(
		{
			x: null,
			y: null,
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
		},
		(set) => {
			if (!isClient()) return;

			const update = ({
				x = 0,
				y = 0,
				isScrolling = false,
				directions = {
					top: false,
					bottom: false,
					left: false,
					right: false,
				},
				topArrived = false,
				bottomArrived = false,
				leftArrived = false,
				rightArrived = false,
			}: {
				x?: null | number;
				y?: null | number;
				isScrolling?: boolean;
				directions?: {
					top: boolean;
					bottom: boolean;
					left: boolean;
					right: boolean;
				};
				topArrived?: boolean;
				bottomArrived?: boolean;
				leftArrived?: boolean;
				rightArrived?: boolean;
				} = {}
			) => {
				set({
					x,
					y,
					isScrolling,
					directions,
					topArrived,
					bottomArrived,
					leftArrived,
					rightArrived,
				});
			};

			const onScrollEnd = () => {
				const scrollContainer = getScrollContainer(element);
				const data = getData(scrollContainer);

				update({
					...get(store),
					directions: get(store).directions,
					isScrolling: false,
					...data
				});
			};

			const onScrollHandler = () => {
				if (!window) return;

				const scrollContainer = getScrollContainer(element);
				const data = getData(scrollContainer);

				const internalY = scrollContainer.scrollTop;
				const internalX = scrollContainer.scrollLeft;

				const scrollUp = prevScrollY > internalY;
				const scrollDown = prevScrollY < internalY;
				const scrollLeft = prevScrollX > internalX;
				const scrollRight = prevScrollX < internalX;

				update({
					isScrolling: true,
					directions: {
						top: scrollUp,
						bottom: scrollDown,
						left: scrollLeft,
						right: scrollRight,
					},
					...data,
				});

				prevScrollY = internalY;
				prevScrollX = internalX;
				onScrollEndDebounced();
			};

			const onScrollEndDebounced = useDebounceFn(onScrollEnd, 200);

			update(); // initialize

			const scrollContainer = !get(element) ? window : getScrollContainer(element);

			useEventListener("scroll", onScrollHandler, scrollContainer, true, 100);
		},
	);

	function trackScroll(e: Window | Document | Element) {
		element.set(e);
	}

	return { scroll: store, scrollTo, trackScroll };
}
