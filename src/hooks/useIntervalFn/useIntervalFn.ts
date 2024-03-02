import { BROWSER } from "esm-env";

import { useState } from "@/hooks";

type Options = {
	immediate?: boolean;
	immediateCallback?: boolean;
};

export type ReturnControls = {
	isActive: SvelteStore<boolean>;
	pause: () => void;
	resume: () => void;
};

export function useIntervalFn(
	callback: () => void,
	interval: number = 1000,
	options: Options = {},
): ReturnControls {
	const { immediate = true, immediateCallback = false } = options;

	let timer: ReturnType<typeof setInterval> | null = null;
	const [isActive, setIsActive] = useState(false);

	function clean() {
		if (timer) {
			clearInterval(timer);
			timer = null;
		}
	}

	function pause() {
		setIsActive(false);
		clean();
	}

	function resume() {
		const intervalValue = interval;
		if (intervalValue <= 0) {
			return;
		}

		setIsActive(true);

		if (immediateCallback) {
			callback();
		}

		clean();

		timer = setInterval(callback, intervalValue);
	}

	if (immediate && BROWSER) {
		resume();
	}

	return {
		isActive,
		pause,
		resume,
	};
}
