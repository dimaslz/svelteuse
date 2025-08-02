import { readable } from "svelte/store";

import { isClient } from "@/utils/is-client";

export function useVisibilityChange() {
	return readable<boolean>(true, (set) => {
		if (!isClient()) {
			return;
		}

		const update = () => {
			set(document.visibilityState === "visible");
		};

		update();

		document.addEventListener("visibilitychange", update);

		return () => {
			document.removeEventListener("visibilitychange", update);
		};
	});
}
