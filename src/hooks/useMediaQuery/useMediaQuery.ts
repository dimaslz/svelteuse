import { useState } from "@/hooks/useState/useState";
export function useMediaQuery(query: string): {
	matches: SvelteStore<boolean>;
	unsubscribe: () => void;
} {
	const getMatches = (query: string): boolean => {
		if (typeof window !== "undefined") {
			return window.matchMedia(query).matches;
		}

		return false;
	};

	function handleChange() {
		setMatches(getMatches(query));
	}

	const [matches, setMatches] = useState<boolean>(
		typeof window === "undefined" ? false : getMatches(query),
	);

	if (typeof window === "undefined") {
		return {
			matches,
			unsubscribe: () => {},
		};
	}

	matches.subscribe;
	const matchMedia = window.matchMedia(query);

	handleChange();

	if (matchMedia.addListener) {
		matchMedia.addListener(handleChange);
	} else {
		matchMedia.addEventListener("change", () => {
			handleChange();
		});
	}

	return {
		matches,
		unsubscribe: () => {
			if (matchMedia.removeListener) {
				matchMedia.removeListener(handleChange);
			} else {
				matchMedia.removeEventListener("change", handleChange);
			}
		},
	};
}
