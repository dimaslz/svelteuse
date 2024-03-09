import { get } from "svelte/store";

import { useLocalStorage, useMediaQuery } from "@/hooks";

const COLOR_SCHEME_QUERY = "(prefers-color-scheme: dark)";

interface UseDarkModeOutput {
	isDarkMode: SvelteStore<boolean>;
	toggle: () => void;
	enable: () => void;
	disable: () => void;
}

export function useDarkMode(defaultValue?: boolean): UseDarkModeOutput {
	const { matches: isDarkOS } = useMediaQuery(COLOR_SCHEME_QUERY);

	const { store: isDarkMode, update: setDarkMode } = useLocalStorage<boolean>(
		"dark-mode",
		defaultValue ?? get(isDarkOS) ?? false,
	);

	return {
		isDarkMode,
		toggle: () => setDarkMode((prev) => !prev),
		enable: () => setDarkMode(true),
		disable: () => setDarkMode(false),
	};
}
