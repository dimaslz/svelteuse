import { onDestroy } from "svelte";
import { writable } from "svelte/store";

export type UseIntersectionObserverOptions = {
	root?: Element | Document | null;
	rootMargin?: string;
	threshold?: number | number[];
	freezeOnceVisible?: boolean;
	onChange?: (isIntersecting: boolean, entry: IntersectionObserverEntry) => void;
	initialIsIntersecting?: boolean;
};

export function useIntersectionObserver(options: UseIntersectionObserverOptions = {}) {
	const {
		threshold = 0,
		root = null,
		rootMargin = "0%",
		freezeOnceVisible = false,
		onChange,
		initialIsIntersecting = false,
	} = options;

	const isIntersecting = writable(initialIsIntersecting);
	const entry = writable<IntersectionObserverEntry | undefined>(undefined);

	let observer: IntersectionObserver | undefined;
	let frozen = false;

	function observe(node: Element) {
		if (!("IntersectionObserver" in window)) return;

		observer = new IntersectionObserver(
			(entries) => {
				const thresholds = Array.isArray(observer?.thresholds)
					? observer?.thresholds
					: [observer?.thresholds];

				if (frozen) return;

				entries.forEach((e) => {
					const intersecting = e.isIntersecting && thresholds.some((t) => e.intersectionRatio >= t);

					isIntersecting.set(intersecting);
					entry.set(e);

					if (onChange) {
						onChange(intersecting, e);
					}

					if (intersecting && freezeOnceVisible && observer) {
						frozen = true;
						observer.disconnect();
					}
				});
			},
			{ root, rootMargin, threshold },
		);

		if (!frozen) {
			observer.observe(node);
		}

		return {
			destroy() {
				observer?.disconnect();
			},
		};
	}

	onDestroy(() => {
		observer?.disconnect();
	});

	return {
		action: observe,
		isIntersecting,
		entry,
	};
}
