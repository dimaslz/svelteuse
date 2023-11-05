import { onMount } from "svelte";
import { get } from "svelte/store";

import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useMediaQuery } from "@/hooks/useMediaQuery";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

interface UseDarkModeOutput {
	isDarkMode: SvelteStore<boolean>;
	toggle: () => void;
	enable: () => void;
	disable: () => void;
}

export function useDarkMode(defaultValue?: boolean): UseDarkModeOutput {
	const isDarkOS = useMediaQuery(COLOR_SCHEME_QUERY);
	const [isDarkMode, setDarkMode] = useLocalStorage<boolean>(
		"dark-mode",
		defaultValue ?? get(isDarkOS) ?? false,
	);

	// Update darkMode if os prefers changes
	onMount(() => {
		setDarkMode(false);

		isDarkOS.subscribe((value) => {
			setDarkMode(value);
		});
	});

	return {
		isDarkMode,
		toggle: () => setDarkMode((prev) => !prev),
		enable: () => setDarkMode(true),
		disable: () => setDarkMode(false),
	};
}
