import { onMount } from "svelte";

import { useState } from "@/hooks/useState";

export function useMediaQuery(query: string): SvelteStore<boolean> {
	const getMatches = (query: string): boolean => {
		if (typeof window !== "undefined") {
			return window.matchMedia(query).matches;
		}

		return false;
	};

	const [matches, setMatches] = useState<boolean>(getMatches(query));

	function handleChange() {
		setMatches(getMatches(query));
	}

	onMount(() => {
		matches.subscribe(() => {});
		const matchMedia = window.matchMedia(query);

		handleChange();

		if (matchMedia.addListener) {
			matchMedia.addListener(handleChange);
		} else {
			matchMedia.addEventListener("change", () => {
				handleChange();
			});
		}

		return () => {
			if (matchMedia.removeListener) {
				matchMedia.removeListener(handleChange);
			} else {
				matchMedia.removeEventListener("change", handleChange);
			}
		};
	});

	return matches;
}
