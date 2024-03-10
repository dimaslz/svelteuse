import { get } from "svelte/store";

import { type ReturnControls as IntervalFnReturnControls, useIntervalFn, useState } from "@/hooks";

type IntervalOptions = {
	controls?: boolean;
	immediate?: boolean;
	callback?: (count: number) => void;
};

type ReturnControls = {
	state: SvelteStore<number>;
	reset: () => void;
} & IntervalFnReturnControls;

export function useInterval(interval: number): SvelteStore<number>;
export function useInterval(
	interval: number,
	options?: Omit<IntervalOptions, "controls">,
): SvelteStore<number>;
export function useInterval(interval: number, options: IntervalOptions): ReturnControls;

export function useInterval(interval: number, options: IntervalOptions = {}): unknown {
	const { controls: exposeControls = false, immediate = true, callback } = options;

	const [state, updateState] = useState<number>(0);

	const update = () => {
		updateState((c) => {
			return c + 1;
		});
	};

	const reset = () => {
		updateState(0);
	};

	const controls = useIntervalFn(
		callback
			? () => {
					update();
					callback(get(state));
				}
			: update,
		interval,
		{ immediate },
	);

	if (exposeControls) {
		return {
			state,
			reset,
			...controls,
		};
	}

	return state;
}
