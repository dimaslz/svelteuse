import { readable } from "svelte/store";

import { isClient } from "@/utils/is-client";

type OrientationState = {
	angle: number;
	type: string;
};

export function useOrientation() {
	const initial: OrientationState = {
		angle: 0,
		type: "landscape-primary",
	};

	return readable<OrientationState>(initial, (set) => {
		const supportsScreenOrientation = typeof window !== "undefined" && !!window.screen?.orientation;

		const handleChange = () => {
			const { angle, type } = window.screen.orientation;
			set({ angle, type });
		};

		const handleFallback = () => {
			if (!isClient()) return;

			set({
				angle: (window.orientation as number) || 0,
				type: "UNKNOWN",
			});
		};

		if (!isClient()) return;

		// Attach appropriate event listeners
		if (supportsScreenOrientation) {
			handleChange();
			window.screen.orientation.addEventListener("change", handleChange);
		} else {
			handleFallback();
			window.addEventListener("orientationchange", handleFallback);
		}

		// Cleanup
		return () => {
			if (supportsScreenOrientation) {
				window.screen.orientation.removeEventListener("change", handleChange);
			} else {
				window.removeEventListener("orientationchange", handleFallback);
			}
		};
	});
}
