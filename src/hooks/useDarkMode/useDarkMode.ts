import { get } from "svelte/store";

import { useLocalStorage } from "@/hooks/useLocalStorage/useLocalStorage";
import { useMediaQuery } from "@/hooks/useMediaQuery/useMediaQuery";

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

	return {
		isDarkMode,
		toggle: () => setDarkMode((prev) => !prev),
		enable: () => setDarkMode(true),
		disable: () => setDarkMode(false),
	};
}
