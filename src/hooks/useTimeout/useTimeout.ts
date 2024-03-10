import { onMount } from "svelte";

import { useState } from "@/hooks";

type Options = {
	controls?: boolean;
	component?: boolean;
	cancelOnUnmount?: boolean;
	immediate?: boolean;
};

type ReturnControls = {
	ready: SvelteStore<boolean>;
	stop: () => void;
	start: () => void;
};

export function useTimeout(interval: number): SvelteStore<boolean>;
export function useTimeout(
	interval: number,
	options?: Omit<Options, "controls">,
): SvelteStore<boolean>;
export function useTimeout(interval: number, options?: Options): ReturnControls;

export function useTimeout(interval: number, options: Options = {}): unknown {
	const { controls = false, component = true, cancelOnUnmount = true, immediate = true } = options;

	const [ready, setReady] = useState(false);
	let timer: ReturnType<typeof setTimeout> | null = null;

	const clear = () => {
		if (timer) {
			clearTimeout(timer);
			timer = null;
		}
	};

	const start = () => {
		setReady(false);
		clear();
		timer = setTimeout(() => {
			setReady(true);
			timer = null;
		}, interval);
	};

	const stop = () => {
		setReady(false);
		clear();
	};

	if (component) {
		onMount(() => {
			if (immediate) {
				start();
			}

			return () => {
				if (cancelOnUnmount) {
					clear();
				}
			};
		});
	} else if (immediate) {
		start();
	}

	if (controls) {
		return {
			ready,
			start,
			stop,
		};
	}

	return ready;
}
