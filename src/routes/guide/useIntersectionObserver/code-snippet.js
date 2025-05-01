export const exampleCode = `
<!-- javascript -->
<script lang="ts">
	import { useIntersectionObserver } from "@dimaslz/svelteuse";

	const {
    action: intersectionObserver,
    isIntersecting,
    entry
  } = useIntersectionObserver({
    threshold: 0.5,
    rootMargin: '0px',
    // freezeOnceVisible: true,
    // initialIsIntersecting: false,
    onChange: (intersecting, entry) => {
      console.log('Changed:', intersecting, entry.target.textContent);
			if (intersecting) {
				entry.target.classList.remove("bg-red-300");
				entry.target.classList.add("bg-green-300");
			} else {
				entry.target.classList.remove("bg-green-300");
				entry.target.classList.add("bg-red-300");
			}
    }
  });

	const sections = Array.from({ length: 5 }, (_, i) => \`\${i + 1}\`);
</script>

<!-- html -->
<div>
	<div>
		{#each sections as title (title)}
			<section class="h-[400px] flex items-center justify-center text-black text-4xl" title={title} use:intersectionObserver>
				intersecting block {title}
			</section>
		{/each}
	</div>
</div>
`;

export const sourceCode = `
import { writable } from 'svelte/store';
import { onDestroy } from 'svelte';

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
		rootMargin = '0%',
		freezeOnceVisible = false,
		onChange,
		initialIsIntersecting = false,
	} = options;

	const isIntersecting = writable(initialIsIntersecting);
	const entry = writable<IntersectionObserverEntry | undefined>(undefined);

	let observer: IntersectionObserver | undefined;
	let frozen = false;

	function observe(node: Element) {
		if (!('IntersectionObserver' in window)) return;

		observer = new IntersectionObserver(
			(entries) => {
				const thresholds = Array.isArray(observer?.thresholds)
					? observer?.thresholds
					: [observer?.thresholds];

				if (frozen) return;

				entries.forEach((e) => {
					const intersecting =
						e.isIntersecting &&
						thresholds.some((t) => e.intersectionRatio >= t);

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
			{ root, rootMargin, threshold }
		);

		if (!frozen) {
			observer.observe(node);
		}

		return {
			destroy() {
				observer?.disconnect();
			}
		};
	}

	onDestroy(() => {
		observer?.disconnect();
	});

	return {
		action: observe,
		isIntersecting,
		entry
	};
};
`;
