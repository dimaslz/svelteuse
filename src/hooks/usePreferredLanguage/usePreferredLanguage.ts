import { readable } from "svelte/store";

import { isClient } from "@/utils/is-client";

export function usePreferredLanguage() {
	return readable<string>("en", (set) => {
		if (!isClient()) return;

		const update = () => set(navigator.language || "en");

		update(); // initialize immediately

		window.addEventListener("languagechange", update);

		return () => {
			window.removeEventListener("languagechange", update);
		};
	});
}
