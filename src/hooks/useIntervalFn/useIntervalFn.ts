import { useState } from "@/hooks";
import { isClient } from "@/utils/is-client";

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
	callback: (timer?: any) => void,
	interval: number | null = 1000,
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
		if (intervalValue === null || intervalValue <= 0) {
			return;
		}

		setIsActive(true);

		if (immediateCallback) {
			callback(timer);
		}

		clean();

		timer = setInterval(callback, intervalValue);
	}

	if (immediate && isClient()) {
		resume();
	}

	return {
		isActive,
		pause,
		resume,
	};
}
