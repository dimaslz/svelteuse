import { onMount } from "svelte";

import { useEventListener, useState } from "..";

export function useScreen(): SvelteStore<Screen | undefined> {
	const getScreen = (): Screen | undefined => {
		if (typeof window !== "undefined" && window.screen) {
			return window.screen;
		}
		return undefined;
	};

	const [screen, setScreen] = useState<Screen | undefined>(getScreen());

	function handleSize() {
		setScreen(getScreen());
	}

	useEventListener("resize", handleSize);

	onMount(() => {
		handleSize();
	});

	return screen;
}
